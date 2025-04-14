#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::{
        pallet_prelude::*,
        traits::{Currency, ReservableCurrency, ExistenceRequirement},
    };
    use frame_system::pallet_prelude::*;
    use sp_std::prelude::*;

    type BalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

    #[pallet::pallet]
    #[pallet::generate_store(pub(super) trait Store)]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
        
        /// The currency used for pool deposits and claims
        type Currency: ReservableCurrency<Self::AccountId>;
        
        /// The minimum amount required to create a pool
        #[pallet::constant]
        type MinimumPoolDeposit: Get<BalanceOf<Self>>;
    }

    /// Insurance pools storage
    #[pallet::storage]
    #[pallet::getter(fn insurance_pools)]
    pub type InsurancePools<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        PoolId,
        PoolInfo<T::AccountId, BalanceOf<T>>,
        OptionQuery,
    >;

    /// Mapping from account to all pools they own
    #[pallet::storage]
    #[pallet::getter(fn account_pools)]
    pub type AccountPools<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        T::AccountId,
        BoundedVec<PoolId, ConstU32<100>>,
        ValueQuery,
    >;

    /// Policy holders and their policies
    #[pallet::storage]
    #[pallet::getter(fn policies)]
    pub type Policies<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        PolicyId,
        PolicyInfo<T::AccountId, BalanceOf<T>, T::BlockNumber>,
        OptionQuery,
    >;

    /// Claims against policies
    #[pallet::storage]
    #[pallet::getter(fn claims)]
    pub type Claims<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        ClaimId,
        ClaimInfo<T::AccountId, BalanceOf<T>, T::BlockNumber>,
        OptionQuery,
    >;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// A new pool was created
        PoolCreated {
            pool_id: PoolId,
            owner: T::AccountId,
            initial_deposit: BalanceOf<T>,
        },
        /// Funds were added to a pool
        PoolFunded {
            pool_id: PoolId,
            from: T::AccountId,
            amount: BalanceOf<T>,
        },
        /// A policy was issued
        PolicyIssued {
            policy_id: PolicyId,
            pool_id: PoolId,
            insured: T::AccountId,
            coverage_amount: BalanceOf<T>,
            premium: BalanceOf<T>,
        },
        /// A claim was filed
        ClaimFiled {
            claim_id: ClaimId,
            policy_id: PolicyId,
            claimant: T::AccountId,
            amount: BalanceOf<T>,
        },
        /// A claim was approved
        ClaimApproved {
            claim_id: ClaimId,
            approved_by: T::AccountId,
            amount: BalanceOf<T>,
        },
        /// A claim was rejected
        ClaimRejected {
            claim_id: ClaimId,
            rejected_by: T::AccountId,
            reason: BoundedVec<u8, ConstU32<256>>,
        },
    }

    #[pallet::error]
    pub enum Error<T> {
        /// Pool not found
        PoolNotFound,
        /// Not the pool owner
        NotPoolOwner,
        /// Insufficient funds
        InsufficientFunds,
        /// Pool ID already taken
        PoolIdAlreadyTaken,
        /// Policy not found
        PolicyNotFound,
        /// Claim not found
        ClaimNotFound,
        /// Policy expired
        PolicyExpired,
        /// Not authorized for this operation
        NotAuthorized,
        /// Exceeds coverage amount
        ExceedsCoverageAmount,
        /// Claim already processed
        ClaimAlreadyProcessed,
    }

    /// Type for pool IDs
    pub type PoolId = [u8; 16];
    /// Type for policy IDs
    pub type PolicyId = [u8; 16];
    /// Type for claim IDs
    pub type ClaimId = [u8; 16];

    /// Structure for pool information
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct PoolInfo<AccountId, Balance> {
        /// ID of the pool
        pub id: PoolId,
        /// Owner of the pool
        pub owner: AccountId,
        /// Total amount in the pool
        pub total_amount: Balance,
        /// Current available amount (total minus reserved)
        pub available_amount: Balance,
        /// Description of the pool
        pub description: BoundedVec<u8, ConstU32<256>>,
        /// Risk profile (higher means more risky)
        pub risk_profile: u8,
    }

    /// Structure for policy information
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub struct PolicyInfo<AccountId, Balance, BlockNumber> {
        /// ID of the policy
        pub id: PolicyId,
        /// ID of the pool that backs this policy
        pub pool_id: PoolId,
        /// Account that is insured
        pub insured: AccountId,
        /// Maximum amount of coverage
        pub coverage_amount: Balance,
        /// Premium paid for the policy
        pub premium: Balance,
        /// When the policy becomes active
        pub start_block: BlockNumber,
        /// When the policy expires
        pub end_block: BlockNumber,
        /// Policy terms and conditions
        pub terms: BoundedVec<u8, ConstU32<512>>,
    }

    /// Structure for claim information
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub struct ClaimInfo<AccountId, Balance, BlockNumber> {
        /// ID of the claim
        pub id: ClaimId,
        /// ID of the policy being claimed against
        pub policy_id: PolicyId,
        /// Account making the claim
        pub claimant: AccountId,
        /// Amount being claimed
        pub amount: Balance,
        /// When the claim was filed
        pub filed_at: BlockNumber,
        /// Current status of the claim
        pub status: ClaimStatus,
        /// Evidence supporting the claim
        pub evidence: BoundedVec<u8, ConstU32<1024>>,
    }

    /// Enum representing claim status
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub enum ClaimStatus {
        Pending,
        Approved {
            amount: BalanceOf<T>,
            approved_by: T::AccountId,
            approved_at: T::BlockNumber,
        },
        Rejected {
            rejected_by: T::AccountId,
            rejected_at: T::BlockNumber,
            reason: BoundedVec<u8, ConstU32<256>>,
        },
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// Create a new insurance pool
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn create_pool(
            origin: OriginFor<T>,
            pool_id: PoolId,
            initial_deposit: BalanceOf<T>,
            description: BoundedVec<u8, ConstU32<256>>,
            risk_profile: u8,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Check if deposit meets minimum
            ensure!(initial_deposit >= T::MinimumPoolDeposit::get(), Error::<T>::InsufficientFunds);
            
            // Check if pool ID is already taken
            ensure!(!InsurancePools::<T>::contains_key(&pool_id), Error::<T>::PoolIdAlreadyTaken);
            
            // Reserve funds from creator's account
            T::Currency::reserve(&who, initial_deposit)?;
            
            // Create pool info
            let pool_info = PoolInfo {
                id: pool_id,
                owner: who.clone(),
                total_amount: initial_deposit,
                available_amount: initial_deposit,
                description,
                risk_profile,
            };
            
            // Store pool info
            InsurancePools::<T>::insert(&pool_id, pool_info);
            
            // Add pool to account's pools
            AccountPools::<T>::try_mutate(&who, |pools| {
                pools.try_push(pool_id)
            }).map_err(|_| Error::<T>::InsufficientFunds)?;
            
            // Emit event
            Self::deposit_event(Event::PoolCreated {
                pool_id,
                owner: who,
                initial_deposit,
            });
            
            Ok(())
        }
        
        /// Add funds to an existing pool
        #[pallet::call_index(1)]
        #[pallet::weight(10_000)]
        pub fn fund_pool(
            origin: OriginFor<T>,
            pool_id: PoolId,
            amount: BalanceOf<T>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Get pool info
            let mut pool_info = Self::get_pool(&pool_id)?;
            
            // Reserve funds from account
            T::Currency::reserve(&who, amount)?;
            
            // Update pool amounts
            pool_info.total_amount = pool_info.total_amount.saturating_add(amount);
            pool_info.available_amount = pool_info.available_amount.saturating_add(amount);
            
            // Update pool info
            InsurancePools::<T>::insert(&pool_id, pool_info);
            
            // Emit event
            Self::deposit_event(Event::PoolFunded {
                pool_id,
                from: who,
                amount,
            });
            
            Ok(())
        }
        
        /// Issue a new insurance policy
        #[pallet::call_index(2)]
        #[pallet::weight(10_000)]
        pub fn issue_policy(
            origin: OriginFor<T>,
            pool_id: PoolId,
            insured: T::AccountId,
            coverage_amount: BalanceOf<T>,
            premium: BalanceOf<T>,
            duration: T::BlockNumber,
            terms: BoundedVec<u8, ConstU32<512>>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Get pool info
            let mut pool_info = Self::get_pool(&pool_id)?;
            
            // Ensure caller is pool owner
            ensure!(pool_info.owner == who, Error::<T>::NotPoolOwner);
            
            // Ensure pool has sufficient funds for coverage
            ensure!(pool_info.available_amount >= coverage_amount, Error::<T>::InsufficientFunds);
            
            // Generate policy ID
            let policy_id = Self::generate_policy_id(&pool_id, &insured);
            
            // Transfer premium to pool
            T::Currency::transfer(
                &insured, 
                &who, 
                premium, 
                ExistenceRequirement::KeepAlive
            )?;
            
            // Reserve coverage amount from pool
            pool_info.available_amount = pool_info.available_amount.saturating_sub(coverage_amount);
            
            // Update pool info
            InsurancePools::<T>::insert(&pool_id, pool_info);
            
            // Create policy
            let current_block = <frame_system::Pallet<T>>::block_number();
            let end_block = current_block.saturating_add(duration);
            
            let policy_info = PolicyInfo {
                id: policy_id,
                pool_id,
                insured: insured.clone(),
                coverage_amount,
                premium,
                start_block: current_block,
                end_block,
                terms,
            };
            
            // Store policy
            Policies::<T>::insert(&policy_id, policy_info);
            
            // Emit event
            Self::deposit_event(Event::PolicyIssued {
                policy_id,
                pool_id,
                insured,
                coverage_amount,
                premium,
            });
            
            Ok(())
        }
        
        /// File a claim against a policy
        #[pallet::call_index(3)]
        #[pallet::weight(10_000)]
        pub fn file_claim(
            origin: OriginFor<T>,
            policy_id: PolicyId,
            amount: BalanceOf<T>,
            evidence: BoundedVec<u8, ConstU32<1024>>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Get policy info
            let policy_info = Self::get_policy(&policy_id)?;
            
            // Ensure caller is the insured
            ensure!(policy_info.insured == who, Error::<T>::NotAuthorized);
            
            // Ensure policy has not expired
            let current_block = <frame_system::Pallet<T>>::block_number();
            ensure!(current_block <= policy_info.end_block, Error::<T>::PolicyExpired);
            
            // Ensure claim amount is within coverage
            ensure!(amount <= policy_info.coverage_amount, Error::<T>::ExceedsCoverageAmount);
            
            // Generate claim ID
            let claim_id = Self::generate_claim_id(&policy_id, &who);
            
            // Create claim
            let claim_info = ClaimInfo {
                id: claim_id,
                policy_id,
                claimant: who.clone(),
                amount,
                filed_at: current_block,
                status: ClaimStatus::Pending,
                evidence,
            };
            
            // Store claim
            Claims::<T>::insert(&claim_id, claim_info);
            
            // Emit event
            Self::deposit_event(Event::ClaimFiled {
                claim_id,
                policy_id,
                claimant: who,
                amount,
            });
            
            Ok(())
        }
        
        /// Approve a claim
        #[pallet::call_index(4)]
        #[pallet::weight(10_000)]
        pub fn approve_claim(
            origin: OriginFor<T>,
            claim_id: ClaimId,
            approved_amount: BalanceOf<T>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Get claim info
            let mut claim_info = Self::get_claim(&claim_id)?;
            
            // Get policy info
            let policy_info = Self::get_policy(&claim_info.policy_id)?;
            
            // Get pool info
            let mut pool_info = Self::get_pool(&policy_info.pool_id)?;
            
            // Ensure caller is pool owner
            ensure!(pool_info.owner == who, Error::<T>::NotPoolOwner);
            
            // Ensure claim is pending
            ensure!(matches!(claim_info.status, ClaimStatus::Pending), Error::<T>::ClaimAlreadyProcessed);
            
            // Ensure approved amount is within claim amount
            let amount_to_pay = approved_amount.min(claim_info.amount);
            
            // Transfer funds to claimant
            T::Currency::unreserve(&pool_info.owner, amount_to_pay);
            T::Currency::transfer(
                &pool_info.owner,
                &claim_info.claimant,
                amount_to_pay,
                ExistenceRequirement::KeepAlive
            )?;
            
            // Update pool info
            pool_info.total_amount = pool_info.total_amount.saturating_sub(amount_to_pay);
            InsurancePools::<T>::insert(&policy_info.pool_id, pool_info);
            
            // Update claim status
            claim_info.status = ClaimStatus::Approved {
                amount: amount_to_pay,
                approved_by: who.clone(),
                approved_at: <frame_system::Pallet<T>>::block_number(),
            };
            Claims::<T>::insert(&claim_id, claim_info);
            
            // Emit event
            Self::deposit_event(Event::ClaimApproved {
                claim_id,
                approved_by: who,
                amount: amount_to_pay,
            });
            
            Ok(())
        }
        
        /// Reject a claim
        #[pallet::call_index(5)]
        #[pallet::weight(10_000)]
        pub fn reject_claim(
            origin: OriginFor<T>,
            claim_id: ClaimId,
            reason: BoundedVec<u8, ConstU32<256>>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Get claim info
            let mut claim_info = Self::get_claim(&claim_id)?;
            
            // Get policy info
            let policy_info = Self::get_policy(&claim_info.policy_id)?;
            
            // Get pool info
            let pool_info = Self::get_pool(&policy_info.pool_id)?;
            
            // Ensure caller is pool owner
            ensure!(pool_info.owner == who, Error::<T>::NotPoolOwner);
            
            // Ensure claim is pending
            ensure!(matches!(claim_info.status, ClaimStatus::Pending), Error::<T>::ClaimAlreadyProcessed);
            
            // Update claim status
            claim_info.status = ClaimStatus::Rejected {
                rejected_by: who.clone(),
                rejected_at: <frame_system::Pallet<T>>::block_number(),
                reason: reason.clone(),
            };
            Claims::<T>::insert(&claim_id, claim_info);
            
            // Emit event
            Self::deposit_event(Event::ClaimRejected {
                claim_id,
                rejected_by: who,
                reason,
            });
            
            Ok(())
        }
    }

    impl<T: Config> Pallet<T> {
        /// Get a pool by ID
        fn get_pool(pool_id: &PoolId) -> Result<PoolInfo<T::AccountId, BalanceOf<T>>, Error<T>> {
            InsurancePools::<T>::get(pool_id).ok_or(Error::<T>::PoolNotFound)
        }
        
        /// Get a policy by ID
        fn get_policy(policy_id: &PolicyId) -> Result<PolicyInfo<T::AccountId, BalanceOf<T>, T::BlockNumber>, Error<T>> {
            Policies::<T>::get(policy_id).ok_or(Error::<T>::PolicyNotFound)
        }
        
        /// Get a claim by ID
        fn get_claim(claim_id: &ClaimId) -> Result<ClaimInfo<T::AccountId, BalanceOf<T>, T::BlockNumber>, Error<T>> {
            Claims::<T>::get(claim_id).ok_or(Error::<T>::ClaimNotFound)
        }
        
        /// Generate a policy ID
        fn generate_policy_id(pool_id: &PoolId, insured: &T::AccountId) -> PolicyId {
            let mut policy_id = [0u8; 16];
            let insured_bytes = insured.encode();
            
            // Mix pool ID and insured
            for i in 0..8 {
                policy_id[i] = pool_id[i];
            }
            
            let now = Self::get_current_timestamp();
            let now_bytes = now.to_be_bytes();
            
            for i in 0..8 {
                policy_id[8 + i] = now_bytes[i];
            }
            
            for i in 0..insured_bytes.len().min(16) {
                policy_id[i] = policy_id[i].wrapping_add(insured_bytes[i]);
            }
            
            policy_id
        }
        
        /// Generate a claim ID
        fn generate_claim_id(policy_id: &PolicyId, claimant: &T::AccountId) -> ClaimId {
            let mut claim_id = [0u8; 16];
            let claimant_bytes = claimant.encode();
            
            // Mix policy ID and claimant
            for i in 0..8 {
                claim_id[i] = policy_id[i];
            }
            
            let now = Self::get_current_timestamp();
            let now_bytes = now.to_be_bytes();
            
            for i in 0..8 {
                claim_id[8 + i] = now_bytes[i];
            }
            
            for i in 0..claimant_bytes.len().min(16) {
                claim_id[i] = claim_id[i].wrapping_add(claimant_bytes[i]);
            }
            
            claim_id
        }
        
        /// Get current timestamp (mock implementation)
        fn get_current_timestamp() -> u64 {
            // In a real implementation, this would use the Timestamp pallet
            // For simplicity, we return a mock value
            42_000_000
        }
    }
} 