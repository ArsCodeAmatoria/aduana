#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

// Import the runtime_integration module
pub mod runtime_integration;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::{
        dispatch::DispatchResultWithPostInfo,
        pallet_prelude::*,
        traits::{Currency, ExistenceRequirement, ReservableCurrency, Get},
        transactional,
    };
    use frame_system::pallet_prelude::*;
    use sp_runtime::traits::StaticLookup;
    use sp_std::prelude::*;

    // Import integration module components
    use crate::runtime_integration::{PopApiClient, ZkClaim, ClaimType, VerificationResult, CrossChainMessage, XcmHelper};

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
        
        /// The maximum length for product metadata
        #[pallet::constant]
        type MaxMetadataLength: Get<u32>;
        
        /// The amount of time (in blocks) to wait before considering a verification request timed out
        #[pallet::constant]
        type VerificationTimeout: Get<Self::BlockNumber>;
        
        /// Account that has admin privileges
        #[pallet::constant]
        type AdminAccount: Get<Self::AccountId>;
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
        pub metadata: BoundedVec<u8, T::MaxMetadataLength>,
        /// When the product was registered (block number)
        pub registered_at: T::BlockNumber,
        /// Whether the product is active or has been deprecated
        pub active: bool,
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
        /// Verification timed out
        TimedOut,
        /// Verification was revoked after being approved
        Revoked(Vec<u8>),
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
        /// Unique identifier for this claim
        pub claim_id: Vec<u8>,
        /// Whether this claim is cross-chain
        pub is_cross_chain: bool,
        /// Para ID if this is a cross-chain claim
        pub source_para_id: Option<u32>,
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
        Vec<u8>,  // Claim ID
        (Vec<u8>, T::BlockNumber),  // (Product ID, Timeout block number)
        OptionQuery,
    >;

    /// Storage for verification fee schedule by claim type
    #[pallet::storage]
    #[pallet::getter(fn verification_fees)]
    pub type VerificationFees<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        ClaimType,  // Claim type 
        BalanceOf<T>,
        ValueQuery,
    >;
    
    /// Authorized verifiers list
    #[pallet::storage]
    #[pallet::getter(fn authorized_verifiers)]
    pub type AuthorizedVerifiers<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        T::AccountId,
        bool,
        ValueQuery,
    >;
    
    /// Mapping of product ID to its owner's DID
    #[pallet::storage]
    #[pallet::getter(fn product_owner_dids)]
    pub type ProductOwnerDIDs<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        Vec<u8>,  // Product ID
        Vec<u8>,  // Owner DID
        OptionQuery,
    >;
    
    /// Cross-chain pending verification requests
    #[pallet::storage]
    #[pallet::getter(fn cross_chain_verifications)]
    pub type CrossChainVerifications<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        Vec<u8>,  // Claim ID
        (u32, Vec<u8>, T::BlockNumber),  // (Para ID, Product ID, Timeout block number)
        OptionQuery,
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
            claim_id: Vec<u8>,
            claim_type: ClaimType,
            submitter: T::AccountId,
        },
        /// A claim was verified
        ClaimVerified {
            product_id: Vec<u8>,
            claim_id: Vec<u8>,
            claim_type: ClaimType,
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
            claim_type: ClaimType,
            new_fee: BalanceOf<T>,
        },
        /// A claim verification was revoked
        ClaimRevoked {
            product_id: Vec<u8>,
            claim_id: Vec<u8>,
            reason: Vec<u8>,
        },
        /// A verifier was added or removed from the authorized list
        VerifierAuthorizationChanged {
            account: T::AccountId,
            authorized: bool,
        },
        /// Product information was updated
        ProductUpdated {
            product_id: Vec<u8>,
        },
        /// A cross-chain verification request was sent
        CrossChainVerificationSent {
            para_id: u32,
            claim_id: Vec<u8>,
        },
        /// A cross-chain verification response was received
        CrossChainVerificationReceived {
            from_para_id: u32,
            claim_id: Vec<u8>,
            success: bool,
        },
        /// A verification request timed out
        VerificationTimedOut {
            claim_id: Vec<u8>,
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
        /// The product is not active
        ProductNotActive,
        /// The claim does not exist
        ClaimNotFound,
        /// The claim is not in the correct state for the requested operation
        InvalidClaimState,
        /// Metadata is too long
        MetadataTooLong,
        /// Invalid country code format (must be ISO 3166-1 alpha-2)
        InvalidCountryCode,
        /// Invalid HS code format
        InvalidHsCode,
        /// Admin privileges required for this operation
        RequiresAdminPrivileges,
        /// DID resolution failed
        DIDResolutionFailed,
        /// Cross-chain communication error
        CrossChainError,
        /// The claim has already been verified
        ClaimAlreadyVerified,
        /// Operation not supported
        NotSupported,
        /// Claim ID already exists
        ClaimIdAlreadyExists,
    }

    #[pallet::hooks]
    impl<T: Config> Hooks<T::BlockNumber> for Pallet<T> {
        fn on_initialize(n: T::BlockNumber) -> Weight {
            // Process any pending verifications that are ready
            Self::process_pending_verifications(n)
        }
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// Register a new product with verifiable origin information
        /// 
        /// # Arguments
        /// 
        /// * `product_id` - Unique identifier for the product
        /// * `name` - Product name
        /// * `description` - Product description
        /// * `origin_country` - Origin country code (ISO 3166-1 alpha-2)
        /// * `hs_code` - Harmonized System code for tariff classification
        /// * `manufacture_date` - Manufacturing date (UNIX timestamp)
        /// * `metadata` - Additional product metadata
        /// * `owner_did` - Decentralized Identifier for the product owner (optional)
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        #[transactional]
        pub fn register_product(
            origin: OriginFor<T>,
            product_id: Vec<u8>,
            name: Vec<u8>,
            description: Vec<u8>,
            origin_country: Vec<u8>,
            hs_code: Vec<u8>,
            manufacture_date: u64,
            metadata: Vec<u8>,
            owner_did: Option<Vec<u8>>,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Validate inputs
            ensure!(!product_id.is_empty(), Error::<T>::InvalidClaimData);
            ensure!(origin_country.len() == 2, Error::<T>::InvalidCountryCode);
            ensure!(!hs_code.is_empty(), Error::<T>::InvalidHsCode);
            ensure!(metadata.len() as u32 <= T::MaxMetadataLength::get(), Error::<T>::MetadataTooLong);
            
            // Ensure product doesn't already exist
            ensure!(!Products::<T>::contains_key(&product_id), Error::<T>::ProductAlreadyExists);
            
            // Create and store the product
            let bounded_metadata = BoundedVec::<u8, T::MaxMetadataLength>::try_from(metadata)
                .map_err(|_| Error::<T>::MetadataTooLong)?;
                
            let product = Product {
                id: product_id.clone(),
                owner: who.clone(),
                name,
                description,
                origin_country,
                hs_code,
                manufacture_date,
                origin_verified: false,
                metadata: bounded_metadata,
                registered_at: <frame_system::Pallet<T>>::block_number(),
                active: true,
            };
            
            Products::<T>::insert(&product_id, product);
            
            // Store owner DID if provided
            if let Some(did) = owner_did {
                if !did.is_empty() {
                    // Verify the DID is valid by attempting to resolve it
                    let resolution_result = PopApiClient::resolve_did(&did);
                    ensure!(resolution_result.is_some(), Error::<T>::DIDResolutionFailed);
                    
                    // Store the DID
                    ProductOwnerDIDs::<T>::insert(&product_id, did);
                }
            }
            
            // Emit event
            Self::deposit_event(Event::ProductRegistered {
                product_id,
                owner: who,
            });
            
            Ok(().into())
        }
        
        /// Submit a claim for verification with a zero-knowledge proof
        /// 
        /// # Arguments
        /// 
        /// * `product_id` - ID of the product the claim is for
        /// * `claim` - The ZK claim data
        /// * `claim_id` - Unique identifier for this claim
        #[pallet::call_index(1)]
        #[pallet::weight(20_000)]
        #[transactional]
        pub fn submit_claim(
            origin: OriginFor<T>,
            product_id: Vec<u8>,
            claim: ZkClaim,
            claim_id: Vec<u8>,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Validate inputs
            ensure!(!claim_id.is_empty(), Error::<T>::InvalidClaimData);
            ensure!(!claim.proof.is_empty(), Error::<T>::InvalidClaimData);
            
            // Ensure product exists and is active
            let product = Products::<T>::get(&product_id).ok_or(Error::<T>::ProductNotFound)?;
            ensure!(product.active, Error::<T>::ProductNotActive);
            
            // Check for existing claims with the same ID
            let product_claims = ProductClaims::<T>::get(&product_id);
            for existing_claim in product_claims.iter() {
                ensure!(existing_claim.claim_id != claim_id, Error::<T>::ClaimIdAlreadyExists);
            }
            
            // Calculate verification fee based on claim type
            let fee = VerificationFees::<T>::get(claim.claim_type.clone());
            
            // Reserve the verification fee
            T::Currency::reserve(&who, fee)
                .map_err(|_| Error::<T>::VerificationFeesNotPaid)?;
                
            // Create a verified claim record with pending status
            let verified_claim = VerifiedClaim {
                claim: claim.clone(),
                submitter: who.clone(),
                submitted_at: <frame_system::Pallet<T>>::block_number(),
                status: VerificationStatus::Pending,
                verifier: None,
                verified_at: None,
                claim_id: claim_id.clone(),
                is_cross_chain: false,
                source_para_id: None,
            };
            
            // Add the claim to the product's claims
            ProductClaims::<T>::try_mutate(&product_id, |claims| {
                claims.try_push(verified_claim).map_err(|_| Error::<T>::TooManyClaims)
            })?;
            
            // Calculate timeout block number
            let timeout_block = <frame_system::Pallet<T>>::block_number() + T::VerificationTimeout::get();
            
            // Add to pending verifications with timeout
            PendingVerifications::<T>::insert(&claim_id, (product_id.clone(), timeout_block));
            
            // Emit event
            Self::deposit_event(Event::ClaimSubmitted {
                product_id,
                claim_id,
                claim_type: claim.claim_type,
                submitter: who,
            });
            
            Ok(().into())
        }
        
        /// Manually verify a pending claim
        /// 
        /// # Arguments
        /// 
        /// * `product_id` - ID of the product
        /// * `claim_id` - ID of the claim to verify
        /// * `approved` - Whether the claim is approved
        /// * `reason` - Optional reason for rejection
        #[pallet::call_index(2)]
        #[pallet::weight(15_000)]
        #[transactional]
        pub fn verify_claim(
            origin: OriginFor<T>,
            product_id: Vec<u8>,
            claim_id: Vec<u8>,
            approved: bool,
            reason: Option<Vec<u8>>,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Check if caller is authorized to verify claims
            ensure!(
                AuthorizedVerifiers::<T>::get(&who) || who == T::AdminAccount::get(),
                Error::<T>::NotAuthorizedVerifier
            );
            
            // Ensure product exists
            ensure!(Products::<T>::contains_key(&product_id), Error::<T>::ProductNotFound);
            
            // Find the claim with matching ID
            let claim_index = Self::find_claim_index(&product_id, &claim_id)?;
            
            // Update the claim verification status
            ProductClaims::<T>::try_mutate(&product_id, |claims| -> DispatchResult {
                let claim = claims.get_mut(claim_index as usize)
                    .ok_or(Error::<T>::ClaimNotFound)?;
                
                // Ensure the claim is in pending status
                ensure!(
                    matches!(claim.status, VerificationStatus::Pending),
                    Error::<T>::InvalidClaimState
                );
                
                // Update claim status
                claim.status = if approved {
                    VerificationStatus::Approved
                } else {
                    VerificationStatus::Rejected(reason.clone().unwrap_or_default())
                };
                
                claim.verifier = Some(who.clone());
                claim.verified_at = Some(<frame_system::Pallet<T>>::block_number());
                
                Ok(())
            })?;
            
            // If this is an origin country claim and it was approved, update the product's origin verification
            let claims = ProductClaims::<T>::get(&product_id);
            let claim = claims.get(claim_index as usize).ok_or(Error::<T>::ClaimNotFound)?;
            
            if approved && matches!(claim.claim.claim_type, ClaimType::OriginCountry) {
                Products::<T>::try_mutate(&product_id, |maybe_product| -> DispatchResult {
                    let product = maybe_product.as_mut().ok_or(Error::<T>::ProductNotFound)?;
                    product.origin_verified = true;
                    
                    // Emit origin verified event
                    Self::deposit_event(Event::OriginVerified {
                        product_id: product_id.clone(),
                        verified: true,
                    });
                    
                    Ok(())
                })?;
            }
            
            // Remove from pending verifications if present
            if let Some((_, timeout)) = PendingVerifications::<T>::take(&claim_id) {
                // The claim was in the pending pool and has now been processed
            }
            
            // Unreserve the verification fee and transfer to the verifier
            let submitter = claim.submitter.clone();
            let fee = VerificationFees::<T>::get(claim.claim.claim_type.clone());
            T::Currency::unreserve(&submitter, fee);
            
            if approved {
                // If approved, split the fee between verifier and treasury
                let verifier_share = fee / 2u32.into();
                let treasury_share = fee - verifier_share;
                
                // Transfer verifier's share
                let _ = T::Currency::transfer(
                    &submitter, 
                    &who, 
                    verifier_share,
                    ExistenceRequirement::KeepAlive
                );
                
                // Treasury share goes to the admin account for now
                // In a real implementation, this would go to a proper treasury account
                let _ = T::Currency::transfer(
                    &submitter,
                    &T::AdminAccount::get(),
                    treasury_share,
                    ExistenceRequirement::KeepAlive
                );
            }
            
            // Emit event
            Self::deposit_event(Event::ClaimVerified {
                product_id,
                claim_id,
                claim_type: claim.claim.claim_type.clone(),
                success: approved,
                reason,
            });
            
            Ok(().into())
        }
        
        /// Revoke a previously approved claim
        /// 
        /// # Arguments
        /// 
        /// * `product_id` - ID of the product
        /// * `claim_id` - ID of the claim to revoke
        /// * `reason` - Reason for revocation
        #[pallet::call_index(3)]
        #[pallet::weight(10_000)]
        #[transactional]
        pub fn revoke_claim(
            origin: OriginFor<T>,
            product_id: Vec<u8>,
            claim_id: Vec<u8>,
            reason: Vec<u8>,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Only admin can revoke claims
            ensure!(who == T::AdminAccount::get(), Error::<T>::RequiresAdminPrivileges);
            
            // Ensure product exists
            ensure!(Products::<T>::contains_key(&product_id), Error::<T>::ProductNotFound);
            
            // Find the claim with matching ID
            let claim_index = Self::find_claim_index(&product_id, &claim_id)?;
            
            // Update the claim verification status
            ProductClaims::<T>::try_mutate(&product_id, |claims| -> DispatchResult {
                let claim = claims.get_mut(claim_index as usize)
                    .ok_or(Error::<T>::ClaimNotFound)?;
                
                // Ensure the claim was previously approved
                ensure!(
                    matches!(claim.status, VerificationStatus::Approved),
                    Error::<T>::InvalidClaimState
                );
                
                // Update claim status to revoked
                claim.status = VerificationStatus::Revoked(reason.clone());
                
                Ok(())
            })?;
            
            // If this is an origin country claim, update the product's origin verification
            let claims = ProductClaims::<T>::get(&product_id);
            let claim = claims.get(claim_index as usize).ok_or(Error::<T>::ClaimNotFound)?;
            
            if matches!(claim.claim.claim_type, ClaimType::OriginCountry) {
                Products::<T>::try_mutate(&product_id, |maybe_product| -> DispatchResult {
                    let product = maybe_product.as_mut().ok_or(Error::<T>::ProductNotFound)?;
                    product.origin_verified = false;
                    
                    // Emit origin verified event
                    Self::deposit_event(Event::OriginVerified {
                        product_id: product_id.clone(),
                        verified: false,
                    });
                    
                    Ok(())
                })?;
            }
            
            // Emit event
            Self::deposit_event(Event::ClaimRevoked {
                product_id,
                claim_id,
                reason,
            });
            
            Ok(().into())
        }
        
        /// Update verification fee for a specific claim type
        /// 
        /// # Arguments
        /// 
        /// * `claim_type` - Type of claim to update fee for
        /// * `new_fee` - New verification fee amount
        #[pallet::call_index(4)]
        #[pallet::weight(5_000)]
        pub fn update_verification_fee(
            origin: OriginFor<T>,
            claim_type: ClaimType,
            new_fee: BalanceOf<T>,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Only admin can update fees
            ensure!(who == T::AdminAccount::get(), Error::<T>::RequiresAdminPrivileges);
            
            // Update the fee
            VerificationFees::<T>::insert(claim_type.clone(), new_fee);
            
            // Emit event
            Self::deposit_event(Event::VerificationFeeUpdated {
                claim_type,
                new_fee,
            });
            
            Ok(().into())
        }
        
        /// Add or remove an authorized verifier
        /// 
        /// # Arguments
        /// 
        /// * `verifier` - Account to add or remove from the authorized verifiers list
        /// * `authorized` - Whether to authorize (true) or deauthorize (false)
        #[pallet::call_index(5)]
        #[pallet::weight(5_000)]
        pub fn set_verifier_authorization(
            origin: OriginFor<T>,
            verifier: <T::Lookup as StaticLookup>::Source,
            authorized: bool,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Only admin can manage verifiers
            ensure!(who == T::AdminAccount::get(), Error::<T>::RequiresAdminPrivileges);
            
            // Resolve the account
            let verifier = T::Lookup::lookup(verifier)?;
            
            // Update authorization
            AuthorizedVerifiers::<T>::insert(&verifier, authorized);
            
            // Emit event
            Self::deposit_event(Event::VerifierAuthorizationChanged {
                account: verifier,
                authorized,
            });
            
            Ok(().into())
        }
        
        /// Update product information
        /// 
        /// # Arguments
        /// 
        /// * `product_id` - ID of the product to update
        /// * `name` - New product name (optional)
        /// * `description` - New product description (optional)
        /// * `metadata` - New product metadata (optional)
        #[pallet::call_index(6)]
        #[pallet::weight(10_000)]
        #[transactional]
        pub fn update_product_info(
            origin: OriginFor<T>,
            product_id: Vec<u8>,
            name: Option<Vec<u8>>,
            description: Option<Vec<u8>>,
            metadata: Option<Vec<u8>>,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Ensure product exists
            Products::<T>::try_mutate(&product_id, |maybe_product| -> DispatchResult {
                let product = maybe_product.as_mut().ok_or(Error::<T>::ProductNotFound)?;
                
                // Check if caller is product owner or admin
                ensure!(
                    product.owner == who || who == T::AdminAccount::get(),
                    Error::<T>::NotProductOwner
                );
                
                // Update product fields if provided
                if let Some(new_name) = name {
                    product.name = new_name;
                }
                
                if let Some(new_description) = description {
                    product.description = new_description;
                }
                
                if let Some(new_metadata) = metadata {
                    ensure!(new_metadata.len() as u32 <= T::MaxMetadataLength::get(), Error::<T>::MetadataTooLong);
                    product.metadata = BoundedVec::<u8, T::MaxMetadataLength>::try_from(new_metadata)
                        .map_err(|_| Error::<T>::MetadataTooLong)?;
                }
                
                Ok(())
            })?;
            
            // Emit event
            Self::deposit_event(Event::ProductUpdated {
                product_id,
            });
            
            Ok(().into())
        }
        
        /// Submit a cross-chain verification request
        /// 
        /// # Arguments
        /// 
        /// * `para_id` - Parachain ID to send the verification request to
        /// * `product_id` - ID of the product the claim is for
        /// * `claim` - The ZK claim data
        /// * `claim_id` - Unique identifier for this claim
        #[pallet::call_index(7)]
        #[pallet::weight(25_000)]
        #[transactional]
        pub fn submit_cross_chain_verification(
            origin: OriginFor<T>,
            para_id: u32,
            product_id: Vec<u8>,
            claim: ZkClaim,
            claim_id: Vec<u8>,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Validate inputs
            ensure!(!claim_id.is_empty(), Error::<T>::InvalidClaimData);
            ensure!(!claim.proof.is_empty(), Error::<T>::InvalidClaimData);
            
            // Ensure product exists and is active
            let product = Products::<T>::get(&product_id).ok_or(Error::<T>::ProductNotFound)?;
            ensure!(product.active, Error::<T>::ProductNotActive);
            
            // Calculate verification fee based on claim type (cross-chain fees are double)
            let base_fee = VerificationFees::<T>::get(claim.claim_type.clone());
            let fee = base_fee * 2u32.into(); // Double fee for cross-chain verification
            
            // Reserve the verification fee
            T::Currency::reserve(&who, fee)
                .map_err(|_| Error::<T>::VerificationFeesNotPaid)?;
                
            // Create a cross-chain message
            let message = CrossChainMessage::VerificationRequest(claim.clone());
            
            // Send the cross-chain message
            let sent = XcmHelper::send_message(para_id, message);
            ensure!(sent, Error::<T>::CrossChainError);
            
            // Create a verified claim record with pending status
            let verified_claim = VerifiedClaim {
                claim: claim.clone(),
                submitter: who.clone(),
                submitted_at: <frame_system::Pallet<T>>::block_number(),
                status: VerificationStatus::Pending,
                verifier: None,
                verified_at: None,
                claim_id: claim_id.clone(),
                is_cross_chain: true,
                source_para_id: Some(para_id),
            };
            
            // Add the claim to the product's claims
            ProductClaims::<T>::try_mutate(&product_id, |claims| {
                claims.try_push(verified_claim).map_err(|_| Error::<T>::TooManyClaims)
            })?;
            
            // Calculate timeout block number
            let timeout_block = <frame_system::Pallet<T>>::block_number() + T::VerificationTimeout::get() * 2u32.into(); // Longer timeout for cross-chain
            
            // Add to cross-chain pending verifications with timeout
            CrossChainVerifications::<T>::insert(&claim_id, (para_id, product_id.clone(), timeout_block));
            
            // Emit event
            Self::deposit_event(Event::CrossChainVerificationSent {
                para_id,
                claim_id,
            });
            
            Ok(().into())
        }
        
        /// Deactivate a product
        /// 
        /// # Arguments
        /// 
        /// * `product_id` - ID of the product to deactivate
        #[pallet::call_index(8)]
        #[pallet::weight(5_000)]
        pub fn deactivate_product(
            origin: OriginFor<T>,
            product_id: Vec<u8>,
        ) -> DispatchResultWithPostInfo {
            let who = ensure_signed(origin)?;
            
            // Ensure product exists
            Products::<T>::try_mutate(&product_id, |maybe_product| -> DispatchResult {
                let product = maybe_product.as_mut().ok_or(Error::<T>::ProductNotFound)?;
                
                // Check if caller is product owner or admin
                ensure!(
                    product.owner == who || who == T::AdminAccount::get(),
                    Error::<T>::NotProductOwner
                );
                
                // Deactivate the product
                product.active = false;
                
                Ok(())
            })?;
            
            // Emit event
            Self::deposit_event(Event::ProductUpdated {
                product_id,
            });
            
            Ok(().into())
        }
    }

    // Helper functions implementation
    impl<T: Config> Pallet<T> {
        /// Process pending verifications using the integration API
        fn process_pending_verifications(n: T::BlockNumber) -> Weight {
            let mut total_weight: Weight = Weight::from_parts(0u64, 0);
            let verification_limit = 10; // Limit the number of verifications per block
            let mut processed = 0;
            
            // Process regular verifications
            for (claim_id, (product_id, timeout_block)) in PendingVerifications::<T>::iter() {
                if processed >= verification_limit {
                    break;
                }
                
                // Check if verification has timed out
                if n >= timeout_block {
                    // Handle timeout by marking the claim as timed out
                    Self::handle_verification_timeout(&product_id, &claim_id);
                    
                    // Remove from pending verifications
                    PendingVerifications::<T>::remove(&claim_id);
                    processed += 1;
                    total_weight = total_weight.saturating_add(Weight::from_parts(5_000u64, 0));
                    continue;
                }
                
                // Try to find the claim in the product's claims
                if let Some(claim_index) = Self::find_claim_index_or_none(&product_id, &claim_id) {
                    let mut claims = ProductClaims::<T>::get(&product_id);
                    if let Some(claim) = claims.get(claim_index as usize) {
                        // Only attempt verification if the claim is still pending
                        if matches!(claim.status, VerificationStatus::Pending) {
                            // Perform verification
                            let result = PopApiClient::verify_zk_claim(&claim.claim);
                            
                            match result {
                                VerificationResult::Success => {
                                    // Update claim status to approved
                                    if let Some(claim) = claims.get_mut(claim_index as usize) {
                                        claim.status = VerificationStatus::Approved;
                                        claim.verified_at = Some(n);
                                        claim.verifier = None; // Automated verification has no verifier
                                    }
                                    
                                    // Save the updated claims
                                    ProductClaims::<T>::insert(&product_id, claims);
                                    
                                    // Check if this is an origin country claim and update product if so
                                    if matches!(claim.claim.claim_type, ClaimType::OriginCountry) {
                                        let _ = Products::<T>::try_mutate(&product_id, |maybe_product| -> DispatchResult {
                                            let product = maybe_product.as_mut().ok_or(Error::<T>::ProductNotFound)?;
                                            product.origin_verified = true;
                                            
                                            // Emit origin verified event
                                            Self::deposit_event(Event::OriginVerified {
                                                product_id: product_id.clone(),
                                                verified: true,
                                            });
                                            
                                            Ok(())
                                        });
                                    }
                                    
                                    // Unreserve the verification fee
                                    let fee = VerificationFees::<T>::get(claim.claim.claim_type.clone());
                                    T::Currency::unreserve(&claim.submitter, fee);
                                    
                                    // Emit event
                                    Self::deposit_event(Event::ClaimVerified {
                                        product_id: product_id.clone(),
                                        claim_id: claim_id.clone(),
                                        claim_type: claim.claim.claim_type.clone(),
                                        success: true,
                                        reason: None,
                                    });
                                },
                                VerificationResult::Failure(reason) => {
                                    // Update claim status to rejected
                                    if let Some(claim) = claims.get_mut(claim_index as usize) {
                                        claim.status = VerificationStatus::Rejected(reason.clone());
                                        claim.verified_at = Some(n);
                                        claim.verifier = None; // Automated verification has no verifier
                                    }
                                    
                                    // Save the updated claims
                                    ProductClaims::<T>::insert(&product_id, claims);
                                    
                                    // Unreserve the verification fee
                                    let fee = VerificationFees::<T>::get(claim.claim.claim_type.clone());
                                    T::Currency::unreserve(&claim.submitter, fee);
                                    
                                    // Emit event
                                    Self::deposit_event(Event::ClaimVerified {
                                        product_id: product_id.clone(),
                                        claim_id: claim_id.clone(),
                                        claim_type: claim.claim.claim_type.clone(),
                                        success: false,
                                        reason: Some(reason),
                                    });
                                },
                                VerificationResult::Pending => {
                                    // No change, keep in pending state
                                    continue;
                                },
                                VerificationResult::Impossible => {
                                    // Update claim status to failed
                                    if let Some(claim) = claims.get_mut(claim_index as usize) {
                                        claim.status = VerificationStatus::Failed(b"Verification impossible".to_vec());
                                        claim.verified_at = Some(n);
                                        claim.verifier = None; // Automated verification has no verifier
                                    }
                                    
                                    // Save the updated claims
                                    ProductClaims::<T>::insert(&product_id, claims);
                                    
                                    // Unreserve the verification fee
                                    let fee = VerificationFees::<T>::get(claim.claim.claim_type.clone());
                                    T::Currency::unreserve(&claim.submitter, fee);
                                    
                                    // Emit event
                                    Self::deposit_event(Event::ClaimVerified {
                                        product_id: product_id.clone(),
                                        claim_id: claim_id.clone(),
                                        claim_type: claim.claim.claim_type.clone(),
                                        success: false,
                                        reason: Some(b"Verification impossible".to_vec()),
                                    });
                                },
                            }
                        }
                    }
                }
                
                // Remove from pending verifications
                PendingVerifications::<T>::remove(&claim_id);
                processed += 1;
                total_weight = total_weight.saturating_add(Weight::from_parts(10_000u64, 0));
            }
            
            // Process cross-chain verifications (check timeouts only)
            for (claim_id, (para_id, product_id, timeout_block)) in CrossChainVerifications::<T>::iter() {
                if processed >= verification_limit {
                    break;
                }
                
                // Check if verification has timed out
                if n >= timeout_block {
                    // Handle timeout by marking the claim as timed out
                    Self::handle_verification_timeout(&product_id, &claim_id);
                    
                    // Remove from cross-chain pending verifications
                    CrossChainVerifications::<T>::remove(&claim_id);
                    processed += 1;
                    total_weight = total_weight.saturating_add(Weight::from_parts(5_000u64, 0));
                }
            }
            
            total_weight
        }
        
        /// Find the index of a claim in a product's claims by claim ID
        fn find_claim_index(product_id: &[u8], claim_id: &[u8]) -> Result<u32, Error<T>> {
            let claims = ProductClaims::<T>::get(product_id);
            
            for (i, claim) in claims.iter().enumerate() {
                if claim.claim_id == claim_id {
                    return Ok(i as u32);
                }
            }
            
            Err(Error::<T>::ClaimNotFound)
        }
        
        /// Find the index of a claim in a product's claims by claim ID, returning None if not found
        fn find_claim_index_or_none(product_id: &[u8], claim_id: &[u8]) -> Option<u32> {
            let claims = ProductClaims::<T>::get(product_id);
            
            for (i, claim) in claims.iter().enumerate() {
                if claim.claim_id == claim_id {
                    return Some(i as u32);
                }
            }
            
            None
        }
        
        /// Handle a verification timeout
        fn handle_verification_timeout(product_id: &[u8], claim_id: &[u8]) {
            if let Some(claim_index) = Self::find_claim_index_or_none(product_id, claim_id) {
                let mut claims = ProductClaims::<T>::get(product_id);
                
                if let Some(claim) = claims.get_mut(claim_index as usize) {
                    // Only update if still in pending state
                    if matches!(claim.status, VerificationStatus::Pending) {
                        // Set status to timed out
                        claim.status = VerificationStatus::TimedOut;
                        
                        // Save the updated claims
                        ProductClaims::<T>::insert(product_id, claims.clone());
                        
                        // Unreserve the verification fee
                        let fee = VerificationFees::<T>::get(claim.claim.claim_type.clone());
                        T::Currency::unreserve(&claim.submitter, fee);
                        
                        // Emit timeout event
                        Self::deposit_event(Event::VerificationTimedOut {
                            claim_id: claim_id.to_vec(),
                        });
                    }
                }
            }
        }
        
        /// Handle a received cross-chain message
        pub fn handle_cross_chain_message(para_id: u32, message: CrossChainMessage) -> DispatchResult {
            match message {
                CrossChainMessage::VerificationResponse { claim_id, result } => {
                    // Find the pending cross-chain verification
                    if let Some((_, product_id, _)) = CrossChainVerifications::<T>::take(&claim_id) {
                        if let Some(claim_index) = Self::find_claim_index_or_none(&product_id, &claim_id) {
                            let mut claims = ProductClaims::<T>::get(&product_id);
                            
                            if let Some(claim) = claims.get_mut(claim_index as usize) {
                                // Update claim status based on result
                                match result {
                                    VerificationResult::Success => {
                                        claim.status = VerificationStatus::Approved;
                                        claim.verified_at = Some(<frame_system::Pallet<T>>::block_number());
                                        
                                        // Check if this is an origin country claim and update product if so
                                        if matches!(claim.claim.claim_type, ClaimType::OriginCountry) {
                                            let _ = Products::<T>::try_mutate(&product_id, |maybe_product| -> DispatchResult {
                                                let product = maybe_product.as_mut().ok_or(Error::<T>::ProductNotFound)?;
                                                product.origin_verified = true;
                                                
                                                // Emit origin verified event
                                                Self::deposit_event(Event::OriginVerified {
                                                    product_id: product_id.clone(),
                                                    verified: true,
                                                });
                                                
                                                Ok(())
                                            });
                                        }
                                        
                                        // Emit event
                                        Self::deposit_event(Event::CrossChainVerificationReceived {
                                            from_para_id: para_id,
                                            claim_id: claim_id.clone(),
                                            success: true,
                                        });
                                    },
                                    VerificationResult::Failure(reason) => {
                                        claim.status = VerificationStatus::Rejected(reason);
                                        claim.verified_at = Some(<frame_system::Pallet<T>>::block_number());
                                        
                                        // Emit event
                                        Self::deposit_event(Event::CrossChainVerificationReceived {
                                            from_para_id: para_id,
                                            claim_id: claim_id.clone(),
                                            success: false,
                                        });
                                    },
                                    VerificationResult::Pending => {
                                        // This shouldn't happen, but handle it gracefully
                                        // Re-add to pending verifications
                                        let timeout_block = <frame_system::Pallet<T>>::block_number() + T::VerificationTimeout::get();
                                        CrossChainVerifications::<T>::insert(&claim_id, (para_id, product_id.clone(), timeout_block));
                                        return Ok(());
                                    },
                                    VerificationResult::Impossible => {
                                        claim.status = VerificationStatus::Failed(b"Cross-chain verification impossible".to_vec());
                                        claim.verified_at = Some(<frame_system::Pallet<T>>::block_number());
                                        
                                        // Emit event
                                        Self::deposit_event(Event::CrossChainVerificationReceived {
                                            from_para_id: para_id,
                                            claim_id: claim_id.clone(),
                                            success: false,
                                        });
                                    },
                                }
                                
                                // Save the updated claims
                                ProductClaims::<T>::insert(&product_id, claims);
                                
                                // Unreserve the verification fee
                                let fee = VerificationFees::<T>::get(claim.claim.claim_type.clone());
                                T::Currency::unreserve(&claim.submitter, fee);
                            }
                        }
                    }
                },
                CrossChainMessage::CredentialRevocation { credential_id, reason } => {
                    // This would handle credential revocations from other chains
                    // Not fully implemented in this version
                    Ok(())
                },
                _ => {
                    // Not handling other message types in this version
                    Ok(())
                }
            }
        }
    }
}

/// Runtime integration module for external interactions
pub mod runtime_integration {
    // Reexport the integration module
    pub use crate::runtime_integration::*;
}

#[pallet::genesis_config]
pub struct GenesisConfig<T: Config> {
    /// Initial authorized verifiers
    pub authorized_verifiers: Vec<(T::AccountId, bool)>,
    /// Initial verification fees by claim type
    pub verification_fees: Vec<(ClaimType, BalanceOf<T>)>,
}

#[cfg(feature = "std")]
impl<T: Config> Default for GenesisConfig<T> {
    fn default() -> Self {
        Self {
            authorized_verifiers: Vec::new(),
            verification_fees: Vec::new(),
        }
    }
}

#[pallet::genesis_build]
impl<T: Config> GenesisBuild<T> for GenesisConfig<T> {
    fn build(&self) {
        // Set up initial authorized verifiers
        for (account, is_authorized) in &self.authorized_verifiers {
            <AuthorizedVerifiers<T>>::insert(account, *is_authorized);
        }
        
        // Set up initial verification fees
        for (claim_type, fee) in &self.verification_fees {
            <VerificationFees<T>>::insert(claim_type, fee);
        }
        
        // Set a default verification fee if none provided for a claim type
        if !<VerificationFees<T>>::contains_key(&ClaimType::OriginCountry) {
            <VerificationFees<T>>::insert(ClaimType::OriginCountry, T::VerificationFee::get());
        }
    }
} 