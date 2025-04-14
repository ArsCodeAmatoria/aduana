#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::{
        dispatch::{DispatchResultWithPostInfo, PostDispatchInfo},
        pallet_prelude::*,
        traits::Get,
    };
    use frame_system::pallet_prelude::*;
    use sp_runtime::offchain::storage::StorageValueRef;
    use sp_std::prelude::*;

    #[pallet::pallet]
    #[pallet::generate_store(pub(super) trait Store)]
    pub struct Pallet<T>(_);

    /// Configuration trait for Origin Verifier pallet
    #[pallet::config]
    pub trait Config: frame_system::Config {
        /// The overarching event type
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
        /// The minimum amount of data required for a valid proof
        #[pallet::constant]
        type MinProofSize: Get<u32>;
        /// The maximum amount of data allowed for a proof
        #[pallet::constant]
        type MaxProofSize: Get<u32>;
    }

    /// Storage for verified origin certificates
    #[pallet::storage]
    #[pallet::getter(fn origin_certificates)]
    pub type OriginCertificates<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        T::AccountId,
        CertificateData,
        OptionQuery,
    >;

    /// Storage for product origins
    #[pallet::storage]
    #[pallet::getter(fn product_origins)]
    pub type ProductOrigins<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        ProductId,
        OriginData<T::AccountId>,
        OptionQuery,
    >;

    /// Storage for verification requests
    #[pallet::storage]
    #[pallet::getter(fn verification_requests)]
    pub type VerificationRequests<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        RequestId,
        VerificationRequest<T::AccountId, T::BlockNumber>,
        OptionQuery,
    >;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// Origin certificate registered
        CertificateRegistered {
            account: T::AccountId,
            certificate_id: CertificateId,
        },
        /// Product origin verified
        ProductOriginVerified {
            product_id: ProductId,
            origin_country: CountryCode,
            certificate_id: CertificateId,
        },
        /// Verification request submitted
        VerificationRequested {
            request_id: RequestId,
            requester: T::AccountId,
            product_id: ProductId,
        },
        /// Verification request processed
        VerificationProcessed {
            request_id: RequestId,
            result: VerificationResult,
        },
    }

    #[pallet::error]
    pub enum Error<T> {
        /// Certificate already exists
        CertificateAlreadyExists,
        /// Invalid certificate data
        InvalidCertificateData,
        /// Certificate not found
        CertificateNotFound,
        /// Product already verified
        ProductAlreadyVerified,
        /// Invalid proof data
        InvalidProofData,
        /// Proof too small
        ProofTooSmall,
        /// Proof too large
        ProofTooLarge,
        /// Request not found
        RequestNotFound,
        /// Not authorized
        NotAuthorized,
    }

    /// Type for certificate IDs
    pub type CertificateId = [u8; 32];
    /// Type for product IDs
    pub type ProductId = [u8; 32];
    /// Type for request IDs
    pub type RequestId = [u8; 32];
    /// Type for country codes (ISO 3166-1 alpha-2)
    pub type CountryCode = [u8; 2];

    /// Certificate data structure
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct CertificateData {
        pub id: CertificateId,
        pub country_of_origin: CountryCode,
        pub issuer: [u8; 64],
        pub valid_until: u64,
        pub metadata: BoundedVec<u8, ConstU32<256>>,
    }

    /// Origin data structure
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct OriginData<AccountId> {
        pub country_code: CountryCode,
        pub certificate_id: CertificateId,
        pub verifier: AccountId,
        pub verification_date: u64,
    }

    /// Verification request structure
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub struct VerificationRequest<AccountId, BlockNumber> {
        pub id: RequestId,
        pub requester: AccountId,
        pub product_id: ProductId,
        pub proof_data: Vec<u8>,
        pub submitted_at: BlockNumber,
        pub status: RequestStatus,
    }

    /// Request status enum
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub enum RequestStatus {
        Pending,
        Approved,
        Rejected,
    }

    /// Verification result enum
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub enum VerificationResult {
        Approved { country_code: CountryCode },
        Rejected { reason: BoundedVec<u8, ConstU32<256>> },
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// Register a new origin certificate
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn register_certificate(
            origin: OriginFor<T>,
            certificate_data: CertificateData,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Ensure certificate doesn't already exist
            ensure!(!OriginCertificates::<T>::contains_key(&who), Error::<T>::CertificateAlreadyExists);
            
            // Basic validation
            ensure!(certificate_data.valid_until > 0, Error::<T>::InvalidCertificateData);
            
            // Store the certificate
            OriginCertificates::<T>::insert(&who, certificate_data.clone());
            
            // Emit event
            Self::deposit_event(Event::CertificateRegistered {
                account: who,
                certificate_id: certificate_data.id,
            });
            
            Ok(PostDispatchInfo::default())
        }
        
        /// Submit a verification request
        #[pallet::call_index(1)]
        #[pallet::weight(10_000)]
        pub fn submit_verification_request(
            origin: OriginFor<T>,
            product_id: ProductId,
            proof_data: Vec<u8>,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Ensure proof data size is within limits
            ensure!(proof_data.len() >= T::MinProofSize::get() as usize, Error::<T>::ProofTooSmall);
            ensure!(proof_data.len() <= T::MaxProofSize::get() as usize, Error::<T>::ProofTooLarge);
            
            // Generate a unique request ID
            let request_id = Self::generate_request_id(&who, &product_id);
            
            // Create verification request
            let request = VerificationRequest {
                id: request_id,
                requester: who.clone(),
                product_id,
                proof_data,
                submitted_at: <frame_system::Pallet<T>>::block_number(),
                status: RequestStatus::Pending,
            };
            
            // Store the request
            VerificationRequests::<T>::insert(request_id, request);
            
            // Emit event
            Self::deposit_event(Event::VerificationRequested {
                request_id,
                requester: who,
                product_id,
            });
            
            Ok(PostDispatchInfo::default())
        }
        
        /// Process a verification request (typically called by a validator or oracle)
        #[pallet::call_index(2)]
        #[pallet::weight(10_000)]
        pub fn process_verification(
            origin: OriginFor<T>,
            request_id: RequestId,
            result: VerificationResult,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Get the request
            let mut request = VerificationRequests::<T>::get(request_id)
                .ok_or(Error::<T>::RequestNotFound)?;
            
            // Update the request status
            match &result {
                VerificationResult::Approved { country_code } => {
                    request.status = RequestStatus::Approved;
                    
                    // Store the origin data
                    let origin_data = OriginData {
                        country_code: *country_code,
                        certificate_id: Self::get_certificate_id_for_account(&who)?,
                        verifier: who.clone(),
                        verification_date: Self::get_current_timestamp(),
                    };
                    
                    ProductOrigins::<T>::insert(request.product_id, origin_data);
                }
                VerificationResult::Rejected { .. } => {
                    request.status = RequestStatus::Rejected;
                }
            }
            
            // Update the request
            VerificationRequests::<T>::insert(request_id, request);
            
            // Emit event
            Self::deposit_event(Event::VerificationProcessed {
                request_id,
                result,
            });
            
            Ok(PostDispatchInfo::default())
        }
    }

    impl<T: Config> Pallet<T> {
        /// Generate a request ID based on account, product, and current timestamp
        fn generate_request_id(account: &T::AccountId, product_id: &ProductId) -> RequestId {
            // This is a simplified implementation
            // In a real-world scenario, you would use a cryptographic hash function
            let timestamp = Self::get_current_timestamp();
            let account_bytes = account.encode();
            let mut request_id = [0u8; 32];
            
            // Mix account, product ID and timestamp
            for i in 0..min(32, account_bytes.len()) {
                request_id[i] = account_bytes[i];
            }
            
            for i in 0..32 {
                request_id[i] = request_id[i].wrapping_add(product_id[i]);
            }
            
            let timestamp_bytes = timestamp.to_be_bytes();
            for i in 0..min(8, timestamp_bytes.len()) {
                request_id[24 + i] = timestamp_bytes[i];
            }
            
            request_id
        }
        
        /// Get the current timestamp (mock implementation)
        fn get_current_timestamp() -> u64 {
            // In a real implementation, this would use the Timestamp pallet
            // For simplicity, we return a mock value
            42_000_000
        }
        
        /// Get certificate ID for an account
        fn get_certificate_id_for_account(account: &T::AccountId) -> Result<CertificateId, Error<T>> {
            OriginCertificates::<T>::get(account)
                .map(|cert| cert.id)
                .ok_or(Error::<T>::CertificateNotFound)
        }

        // Additional helper methods for verification logic would be implemented here
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use frame_support::{assert_noop, assert_ok, parameter_types};
    use sp_core::H256;
    use sp_runtime::{
        traits::{BlakeTwo256, IdentityLookup},
        BuildStorage,
    };

    type Block = frame_system::mocking::MockBlock<Test>;

    frame_support::construct_runtime!(
        pub enum Test
        {
            System: frame_system::{Pallet, Call, Config, Storage, Event<T>},
            OriginVerifier: pallet::{Pallet, Call, Storage, Event<T>},
        }
    );

    parameter_types! {
        pub const BlockHashCount: u64 = 250;
        pub const SS58Prefix: u8 = 42;
    }

    impl frame_system::Config for Test {
        type BaseCallFilter = frame_support::traits::Everything;
        type BlockWeights = ();
        type BlockLength = ();
        type DbWeight = ();
        type RuntimeOrigin = RuntimeOrigin;
        type RuntimeCall = RuntimeCall;
        type Nonce = u64;
        type Hash = H256;
        type Hashing = BlakeTwo256;
        type AccountId = u64;
        type Lookup = IdentityLookup<Self::AccountId>;
        type Block = Block;
        type RuntimeEvent = RuntimeEvent;
        type BlockHashCount = BlockHashCount;
        type Version = ();
        type PalletInfo = PalletInfo;
        type AccountData = ();
        type OnNewAccount = ();
        type OnKilledAccount = ();
        type SystemWeightInfo = ();
        type SS58Prefix = SS58Prefix;
        type OnSetCode = ();
        type MaxConsumers = frame_support::traits::ConstU32<16>;
    }

    parameter_types! {
        pub const MinProofSize: u32 = 32;
        pub const MaxProofSize: u32 = 10240; // 10KB
    }

    impl Config for Test {
        type RuntimeEvent = RuntimeEvent;
        type MinProofSize = MinProofSize;
        type MaxProofSize = MaxProofSize;
    }

    // Helper function to build genesis configuration
    pub fn new_test_ext() -> sp_io::TestExternalities {
        let t = frame_system::GenesisConfig::<Test>::default()
            .build_storage()
            .unwrap();
        let mut ext = sp_io::TestExternalities::new(t);
        ext.execute_with(|| System::set_block_number(1));
        ext
    }

    #[test]
    fn register_certificate_works() {
        new_test_ext().execute_with(|| {
            let account_id = 1;
            let certificate_data = CertificateData {
                id: [1; 32],
                country_of_origin: *b"US",
                issuer: [2; 64],
                valid_until: 1000,
                metadata: BoundedVec::try_from(vec![3; 32]).unwrap(),
            };

            // Register certificate
            assert_ok!(OriginVerifier::register_certificate(
                RuntimeOrigin::signed(account_id),
                certificate_data.clone()
            ));

            // Check storage
            assert_eq!(OriginVerifier::origin_certificates(account_id), Some(certificate_data));

            // Cannot register again
            assert_noop!(
                OriginVerifier::register_certificate(
                    RuntimeOrigin::signed(account_id),
                    certificate_data.clone()
                ),
                Error::<Test>::CertificateAlreadyExists
            );
        });
    }

    #[test]
    fn submit_verification_request_works() {
        new_test_ext().execute_with(|| {
            let account_id = 1;
            let product_id = [1; 32];
            let proof_data = vec![5; 100];

            // Submit verification request
            assert_ok!(OriginVerifier::submit_verification_request(
                RuntimeOrigin::signed(account_id),
                product_id,
                proof_data.clone()
            ));

            // Too small proof should fail
            assert_noop!(
                OriginVerifier::submit_verification_request(
                    RuntimeOrigin::signed(account_id),
                    product_id,
                    vec![1; 10]
                ),
                Error::<Test>::ProofTooSmall
            );

            // Too large proof should fail
            assert_noop!(
                OriginVerifier::submit_verification_request(
                    RuntimeOrigin::signed(account_id),
                    product_id,
                    vec![1; 20000]
                ),
                Error::<Test>::ProofTooLarge
            );
        });
    }
} 