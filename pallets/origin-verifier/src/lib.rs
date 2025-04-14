#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::{
        dispatch::DispatchResultWithPostInfo,
        pallet_prelude::*,
        traits::{Currency, ExistenceRequirement, ReservableCurrency},
    };
    use frame_system::pallet_prelude::*;
    use sp_runtime::traits::StaticLookup;
    use sp_std::prelude::*;

    // Import integration module components
    use crate::runtime_integration::{PopApiClient, ZkClaim, VerificationResult};

    /// Configure the pallet by specifying the parameters and types on which it depends.
    #[pallet::config]
    pub trait Config: frame_system::Config {
        /// The overarching event type.
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;

        /// The currency mechanism.
        type Currency: ReservableCurrency<Self::AccountId>;

        /// The verification fee amount
        #[pallet::constant]
        type VerificationFee: Get<BalanceOf<Self>>;

        /// The maximum number of claims that can be stored per product
        #[pallet::constant]
        type MaxClaimsPerProduct: Get<u32>;
    }

    type BalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

    /// Product information structure
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
    #[scale_info(skip_type_params(T))]
    pub struct Product<T: Config> {
        /// Unique product identifier
        pub id: Vec<u8>,
        /// Account that registered the product
        pub owner: T::AccountId,
        /// Product name
        pub name: Vec<u8>,
        /// Product description
        pub description: Vec<u8>,
        /// Origin country code (ISO 3166-1 alpha-2)
        pub origin_country: Vec<u8>,
        /// Product classification code (HS code)
        pub hs_code: Vec<u8>,
        /// Manufacturing date (UNIX timestamp)
        pub manufacture_date: u64,
        /// Whether the origin has been verified
        pub origin_verified: bool,
        /// Additional metadata about the product
        pub metadata: Vec<u8>,
    }

    /// Verification status for a claim
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
    pub enum VerificationStatus {
        /// Verification is pending
        Pending,
        /// Verification was approved
        Approved,
        /// Verification was rejected with a reason
        Rejected(Vec<u8>),
        /// Verification failed due to an error
        Failed(Vec<u8>),
    }

    /// Verified claim with additional metadata
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
    #[scale_info(skip_type_params(T))]
    pub struct VerifiedClaim<T: Config> {
        /// The ZK claim data
        pub claim: ZkClaim,
        /// Who submitted the claim
        pub submitter: T::AccountId,
        /// When the claim was submitted (block number)
        pub submitted_at: T::BlockNumber,
        /// Current verification status
        pub status: VerificationStatus,
        /// Who verified the claim (if applicable)
        pub verifier: Option<T::AccountId>,
        /// When the claim was verified (block number, if applicable)
        pub verified_at: Option<T::BlockNumber>,
    }

    #[pallet::pallet]
    #[pallet::generate_store(pub(super) trait Store)]
    pub struct Pallet<T>(_);

    /// Storage for products by their ID
    #[pallet::storage]
    #[pallet::getter(fn products)]
    pub type Products<T: Config> = StorageMap<_, Blake2_128Concat, Vec<u8>, Product<T>, OptionQuery>;

    /// Storage for verified claims by product ID
    #[pallet::storage]
    #[pallet::getter(fn product_claims)]
    pub type ProductClaims<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        Vec<u8>,
        BoundedVec<VerifiedClaim<T>, T::MaxClaimsPerProduct>,
        ValueQuery,
    >;

    /// Storage for pending verification requests
    #[pallet::storage]
    #[pallet::getter(fn pending_verifications)]
    pub type PendingVerifications<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        Vec<u8>,
        Vec<u8>,  // Product ID -> Verification request metadata
        OptionQuery,
    >;

    /// Storage for verification fee schedule by claim type
    #[pallet::storage]
    #[pallet::getter(fn verification_fees)]
    pub type VerificationFees<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        Vec<u8>,  // Claim type identifier
        BalanceOf<T>,
        ValueQuery,
    >;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// A new product was registered
        ProductRegistered {
            product_id: Vec<u8>,
            owner: T::AccountId,
        },
        /// A new claim was submitted for verification
        ClaimSubmitted {
            product_id: Vec<u8>,
            claim_type: Vec<u8>,
            submitter: T::AccountId,
        },
        /// A claim was verified
        ClaimVerified {
            product_id: Vec<u8>,
            claim_type: Vec<u8>,
            success: bool,
            reason: Option<Vec<u8>>,
        },
        /// Product origin status was updated
        OriginVerified {
            product_id: Vec<u8>,
            verified: bool,
        },
        /// Verification fee was updated
        VerificationFeeUpdated {
            claim_type: Vec<u8>,
            new_fee: BalanceOf<T>,
        },
    }

    #[pallet::error]
    pub enum Error<T> {
        /// The product ID already exists
        ProductAlreadyExists,
        /// The product does not exist
        ProductNotFound,
        /// The caller is not the owner of the product
        NotProductOwner,
        /// Invalid claim data provided
        InvalidClaimData,
        /// Maximum claims per product reached
        TooManyClaims,
        /// Verification fee not paid
        VerificationFeesNotPaid,
        /// Verification already in progress
        VerificationInProgress,
        /// Invalid verification result
        InvalidVerificationResult,
        /// Caller does not have permission to verify claims
        NotAuthorizedVerifier,
    }

    #[pallet::hooks]
    impl<T: Config> Hooks<T::BlockNumber> for Pallet<T> {
        fn on_initialize(_n: T::BlockNumber) -> Weight {
            // Process any pending verifications that are ready
            Self::process_pending_verifications()
        }
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// Register a new product
        #[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
        pub fn register_product(
            origin: OriginFor<T>,
            product_id: Vec<u8>,
            name: Vec<u8>,
            description: Vec<u8>,
            origin_country: Vec<u8>,
            hs_code: Vec<u8>,
            manufacture_date: u64,
            metadata: Vec<u8>,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Ensure product ID doesn't already exist
            ensure!(!Products::<T>::contains_key(&product_id), Error::<T>::ProductAlreadyExists);
            
            // Create new product
            let product = Product {
                id: product_id.clone(),
                owner: who.clone(),
                name,
                description,
                origin_country,
                hs_code,
                manufacture_date,
                origin_verified: false,
                metadata,
            };
            
            // Store the product
            Products::<T>::insert(&product_id, product);
            
            // Emit event
            Self::deposit_event(Event::ProductRegistered {
                product_id,
                owner: who,
            });
            
            Ok(().into())
        }
        
        /// Submit a claim for verification
        #[pallet::weight(10_000 + T::DbWeight::get().writes(2))]
        pub fn submit_claim(
            origin: OriginFor<T>,
            product_id: Vec<u8>,
            claim: ZkClaim,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Ensure product exists
            ensure!(Products::<T>::contains_key(&product_id), Error::<T>::ProductNotFound);
            
            // Ensure claim data is valid
            ensure!(!claim.proof.is_empty() && !claim.public_inputs.is_empty(), Error::<T>::InvalidClaimData);
            
            // Get claim type as string for event
            let claim_type = match &claim.claim_type {
                runtime_integration::ClaimType::OriginCountry => b"origin_country".to_vec(),
                runtime_integration::ClaimType::Manufacturing => b"manufacturing".to_vec(),
                runtime_integration::ClaimType::Shipping => b"shipping".to_vec(),
                runtime_integration::ClaimType::Customs => b"customs".to_vec(),
                runtime_integration::ClaimType::Certification => b"certification".to_vec(),
                runtime_integration::ClaimType::Custom(custom) => custom.clone(),
            };
            
            // Check if there's space for a new claim
            let mut claims = ProductClaims::<T>::get(&product_id);
            ensure!(claims.try_push(VerifiedClaim {
                claim: claim.clone(),
                submitter: who.clone(),
                submitted_at: <frame_system::Pallet<T>>::block_number(),
                status: VerificationStatus::Pending,
                verifier: None,
                verified_at: None,
            }).is_ok(), Error::<T>::TooManyClaims);
            
            // Store claims
            ProductClaims::<T>::insert(&product_id, claims);
            
            // Add to pending verifications
            PendingVerifications::<T>::insert(&product_id, claim_type.clone());
            
            // Emit event
            Self::deposit_event(Event::ClaimSubmitted {
                product_id,
                claim_type,
                submitter: who,
            });
            
            Ok(().into())
        }
        
        /// Manually verify a claim (for authorized verifiers)
        #[pallet::weight(10_000 + T::DbWeight::get().writes(2))]
        pub fn verify_claim(
            origin: OriginFor<T>,
            product_id: Vec<u8>,
            claim_index: u32,
            approved: bool,
            reason: Option<Vec<u8>>,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // TODO: Check if caller is an authorized verifier
            // This would typically involve checking against a list of authorized verifiers
            // For simplicity, we're skipping this check in this example
            
            // Ensure product exists
            ensure!(Products::<T>::contains_key(&product_id), Error::<T>::ProductNotFound);
            
            // Get claims and ensure the requested index exists
            let mut claims = ProductClaims::<T>::get(&product_id);
            ensure!(claim_index < claims.len() as u32, Error::<T>::InvalidClaimData);
            
            // Update claim status
            let claim = &mut claims[claim_index as usize];
            let claim_type = match &claim.claim.claim_type {
                runtime_integration::ClaimType::OriginCountry => b"origin_country".to_vec(),
                runtime_integration::ClaimType::Manufacturing => b"manufacturing".to_vec(),
                runtime_integration::ClaimType::Shipping => b"shipping".to_vec(),
                runtime_integration::ClaimType::Customs => b"customs".to_vec(),
                runtime_integration::ClaimType::Certification => b"certification".to_vec(),
                runtime_integration::ClaimType::Custom(custom) => custom.clone(),
            };
            
            claim.status = if approved {
                VerificationStatus::Approved
            } else {
                VerificationStatus::Rejected(reason.clone().unwrap_or_default())
            };
            claim.verifier = Some(who);
            claim.verified_at = Some(<frame_system::Pallet<T>>::block_number());
            
            // Store updated claims
            ProductClaims::<T>::insert(&product_id, claims);
            
            // If this was an origin claim and it was approved, update product origin status
            if let runtime_integration::ClaimType::OriginCountry = claim.claim.claim_type {
                if approved {
                    if let Some(mut product) = Products::<T>::get(&product_id) {
                        product.origin_verified = true;
                        Products::<T>::insert(&product_id, product);
                        
                        Self::deposit_event(Event::OriginVerified {
                            product_id: product_id.clone(),
                            verified: true,
                        });
                    }
                }
            }
            
            // Remove from pending verifications if present
            PendingVerifications::<T>::remove(&product_id);
            
            // Emit event
            Self::deposit_event(Event::ClaimVerified {
                product_id,
                claim_type,
                success: approved,
                reason,
            });
            
            Ok(().into())
        }
        
        /// Update verification fee for a claim type
        #[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
        pub fn update_verification_fee(
            origin: OriginFor<T>,
            claim_type: Vec<u8>,
            new_fee: BalanceOf<T>,
        ) -> DispatchResultWithPostInfo {
            ensure_root(origin)?;
            
            // Update fee in storage
            VerificationFees::<T>::insert(&claim_type, new_fee);
            
            // Emit event
            Self::deposit_event(Event::VerificationFeeUpdated {
                claim_type,
                new_fee,
            });
            
            Ok(().into())
        }
    }

    // Helper functions implementation
    impl<T: Config> Pallet<T> {
        /// Process pending verifications using the integration API
        fn process_pending_verifications() -> Weight {
            let mut total_weight: Weight = 0u64.into();
            let verification_limit = 10; // Limit the number of verifications per block
            let mut processed = 0;
            
            // Iterate through pending verifications
            for (product_id, _) in PendingVerifications::<T>::iter() {
                if processed >= verification_limit {
                    break;
                }
                
                if let Some(mut product) = Products::<T>::get(&product_id) {
                    let mut claims = ProductClaims::<T>::get(&product_id);
                    let mut origin_verified = false;
                    
                    // Process claims for this product
                    for claim in claims.iter_mut() {
                        if let VerificationStatus::Pending = claim.status {
                            // Attempt automatic verification
                            let result = PopApiClient::verify_zk_claim(&claim.claim);
                            
                            // Update claim status based on verification result
                            match result {
                                VerificationResult::Success => {
                                    claim.status = VerificationStatus::Approved;
                                    
                                    // If this is an origin claim, mark the product as verified
                                    if let runtime_integration::ClaimType::OriginCountry = claim.claim.claim_type {
                                        origin_verified = true;
                                    }
                                },
                                VerificationResult::Failure(reason) => {
                                    claim.status = VerificationStatus::Rejected(reason);
                                },
                                VerificationResult::Pending => {
                                    // Leave as pending
                                },
                                VerificationResult::Impossible => {
                                    claim.status = VerificationStatus::Failed(b"Verification impossible".to_vec());
                                },
                            }
                            
                            claim.verified_at = Some(<frame_system::Pallet<T>>::block_number());
                            
                            // For demo purposes, use a placeholder verifier account
                            // In reality, this would be a system account or similar
                            claim.verifier = Some(product.owner.clone());
                            
                            total_weight = total_weight.saturating_add(10_000u64.into());
                        }
                    }
                    
                    // Update claims storage
                    ProductClaims::<T>::insert(&product_id, claims);
                    
                    // If origin was verified, update product
                    if origin_verified {
                        product.origin_verified = true;
                        Products::<T>::insert(&product_id, product);
                        
                        Self::deposit_event(Event::OriginVerified {
                            product_id: product_id.clone(),
                            verified: true,
                        });
                    }
                    
                    // Remove from pending verifications
                    PendingVerifications::<T>::remove(&product_id);
                    processed += 1;
                }
            }
            
            total_weight
        }
    }
}

/// Module for integrating with external verification systems
pub mod runtime_integration {
    // Re-export types from integration module for use in the pallet
    pub use crate::runtime_integration::{
        PopApiClient,
        ZkClaim,
        ClaimType,
        VerificationResult,
    };
} 