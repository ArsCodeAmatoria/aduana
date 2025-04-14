#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::{
        pallet_prelude::*,
        traits::{Currency, ReservableCurrency, ExistenceRequirement, Get},
        Parameter,
    };
    use frame_system::pallet_prelude::*;
    use sp_runtime::{
        traits::{AtLeast32BitUnsigned, CheckedAdd, CheckedSub, Zero},
        DispatchResult,
    };
    use sp_std::prelude::*;
    use xcm::opaque::latest::prelude::*;

    type BalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

    #[pallet::pallet]
    #[pallet::generate_store(pub(super) trait Store)]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
        
        /// The currency used for staking and governance
        type Currency: ReservableCurrency<Self::AccountId>;
        
        /// The token ID type
        type TokenId: Member + Parameter + Default + Copy + AtLeast32BitUnsigned + MaxEncodedLen;
        
        /// The minimum amount required for staking
        #[pallet::constant]
        type MinimumStake: Get<BalanceOf<Self>>;
        
        /// The minimum amount required for creating a proposal
        #[pallet::constant]
        type MinimumProposalDeposit: Get<BalanceOf<Self>>;
        
        /// The minimum period for voting on a proposal
        #[pallet::constant]
        type VotingPeriod: Get<Self::BlockNumber>;
    }

    /// Total supply of the token
    #[pallet::storage]
    #[pallet::getter(fn total_supply)]
    pub type TotalSupply<T: Config> = StorageValue<_, BalanceOf<T>, ValueQuery>;

    /// Token balances by account
    #[pallet::storage]
    #[pallet::getter(fn balances)]
    pub type Balances<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        T::AccountId,
        BalanceOf<T>,
        ValueQuery,
    >;

    /// Staking positions by account
    #[pallet::storage]
    #[pallet::getter(fn staking_positions)]
    pub type StakingPositions<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        T::AccountId,
        StakingPosition<BalanceOf<T>, T::BlockNumber>,
        OptionQuery,
    >;

    /// Total staked amount
    #[pallet::storage]
    #[pallet::getter(fn total_staked)]
    pub type TotalStaked<T: Config> = StorageValue<_, BalanceOf<T>, ValueQuery>;

    /// Proposals storage
    #[pallet::storage]
    #[pallet::getter(fn proposals)]
    pub type Proposals<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        ProposalId,
        Proposal<T::AccountId, BalanceOf<T>, T::BlockNumber>,
        OptionQuery,
    >;

    /// Votes by account and proposal
    #[pallet::storage]
    #[pallet::getter(fn votes)]
    pub type Votes<T: Config> = StorageDoubleMap<
        _,
        Blake2_128Concat, ProposalId,
        Blake2_128Concat, T::AccountId,
        VoteInfo<BalanceOf<T>>,
        OptionQuery,
    >;

    /// XCM integration registry
    #[pallet::storage]
    #[pallet::getter(fn xcm_registry)]
    pub type XcmRegistry<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        MultiLocation,
        bool,
        ValueQuery,
    >;

    /// POP identity registry
    #[pallet::storage]
    #[pallet::getter(fn pop_identities)]
    pub type PopIdentities<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        T::AccountId,
        PopIdentityInfo,
        OptionQuery,
    >;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// Tokens were transferred
        Transfer {
            from: T::AccountId,
            to: T::AccountId,
            amount: BalanceOf<T>,
        },
        /// Tokens were staked
        Staked {
            account: T::AccountId,
            amount: BalanceOf<T>,
        },
        /// Tokens were unstaked
        Unstaked {
            account: T::AccountId,
            amount: BalanceOf<T>,
        },
        /// A proposal was created
        ProposalCreated {
            proposal_id: ProposalId,
            proposer: T::AccountId,
            description: BoundedVec<u8, ConstU32<256>>,
        },
        /// A vote was cast
        VoteCast {
            proposal_id: ProposalId,
            voter: T::AccountId,
            vote: Vote,
            weight: BalanceOf<T>,
        },
        /// A proposal was executed
        ProposalExecuted {
            proposal_id: ProposalId,
            result: ProposalResult,
        },
        /// A reward was distributed
        RewardDistributed {
            to: T::AccountId,
            amount: BalanceOf<T>,
        },
        /// An identity was associated with POP
        PopIdentityRegistered {
            account: T::AccountId,
            identity_id: BoundedVec<u8, ConstU32<64>>,
        },
        /// An XCM message was processed
        XcmMessageProcessed {
            origin: MultiLocation,
            success: bool,
        },
    }

    #[pallet::error]
    pub enum Error<T> {
        /// Insufficient balance
        InsufficientBalance,
        /// Not staked
        NotStaked,
        /// Insufficient stake
        InsufficientStake,
        /// Proposal not found
        ProposalNotFound,
        /// Already voted
        AlreadyVoted,
        /// Voting period ended
        VotingPeriodEnded,
        /// Voting period not ended
        VotingPeriodNotEnded,
        /// Not enough deposit
        InsufficientDeposit,
        /// Not authorized
        NotAuthorized,
        /// Invalid XCM location
        InvalidXcmLocation,
        /// Invalid POP identity
        InvalidPopIdentity,
        /// Arithmetic error
        ArithmeticError,
    }

    /// Type for proposal IDs
    pub type ProposalId = [u8; 16];

    /// Vote enum
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum Vote {
        Yes,
        No,
        Abstain,
    }

    /// Proposal result enum
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum ProposalResult {
        Passed,
        Rejected,
        Tied,
    }

    /// Staking position structure
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub struct StakingPosition<Balance, BlockNumber> {
        /// Amount staked
        pub amount: Balance,
        /// When the stake was created
        pub since: BlockNumber,
        /// Whether the stake is locked
        pub locked: bool,
    }

    /// Proposal structure
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub struct Proposal<AccountId, Balance, BlockNumber> {
        /// Proposal ID
        pub id: ProposalId,
        /// Account that created the proposal
        pub proposer: AccountId,
        /// Description of the proposal
        pub description: BoundedVec<u8, ConstU32<256>>,
        /// Deposit made by the proposer
        pub deposit: Balance,
        /// When the proposal was created
        pub created_at: BlockNumber,
        /// When the voting period ends
        pub voting_ends_at: BlockNumber,
        /// Yes votes
        pub yes_votes: Balance,
        /// No votes
        pub no_votes: Balance,
        /// Abstain votes
        pub abstain_votes: Balance,
        /// Whether the proposal has been executed
        pub executed: bool,
        /// Proposal execution result
        pub result: Option<ProposalResult>,
    }

    /// Vote information structure
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct VoteInfo<Balance> {
        /// The vote
        pub vote: Vote,
        /// Vote weight
        pub weight: Balance,
    }

    /// POP identity information
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct PopIdentityInfo {
        /// Identity ID
        pub identity_id: BoundedVec<u8, ConstU32<64>>,
        /// Validity timestamp
        pub valid_until: u64,
        /// Country code
        pub country_code: [u8; 2],
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// Transfer tokens to another account
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn transfer(
            origin: OriginFor<T>,
            to: T::AccountId,
            amount: BalanceOf<T>,
        ) -> DispatchResult {
            let from = ensure_signed(origin)?;
            
            // Ensure sufficient balance
            let from_balance = Self::balances(&from);
            ensure!(from_balance >= amount, Error::<T>::InsufficientBalance);
            
            // Update balances
            Balances::<T>::try_mutate(&from, |balance| -> DispatchResult {
                *balance = balance.checked_sub(&amount).ok_or(Error::<T>::ArithmeticError)?;
                Ok(())
            })?;
            
            Balances::<T>::try_mutate(&to, |balance| -> DispatchResult {
                *balance = balance.checked_add(&amount).ok_or(Error::<T>::ArithmeticError)?;
                Ok(())
            })?;
            
            // Emit event
            Self::deposit_event(Event::Transfer {
                from,
                to,
                amount,
            });
            
            Ok(())
        }
        
        /// Stake tokens for governance and rewards
        #[pallet::call_index(1)]
        #[pallet::weight(10_000)]
        pub fn stake(
            origin: OriginFor<T>,
            amount: BalanceOf<T>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Ensure sufficient balance
            let balance = Self::balances(&who);
            ensure!(balance >= amount, Error::<T>::InsufficientBalance);
            
            // Ensure minimum stake
            ensure!(amount >= T::MinimumStake::get(), Error::<T>::InsufficientStake);
            
            // Reserve tokens
            T::Currency::reserve(&who, amount)?;
            
            // Update or create staking position
            StakingPositions::<T>::try_mutate_exists(&who, |position_option| -> DispatchResult {
                let current_block = <frame_system::Pallet<T>>::block_number();
                
                if let Some(position) = position_option {
                    // Update existing position
                    position.amount = position.amount.checked_add(&amount).ok_or(Error::<T>::ArithmeticError)?;
                } else {
                    // Create new position
                    *position_option = Some(StakingPosition {
                        amount,
                        since: current_block,
                        locked: false,
                    });
                }
                
                Ok(())
            })?;
            
            // Update total staked
            TotalStaked::<T>::try_mutate(|total| -> DispatchResult {
                *total = total.checked_add(&amount).ok_or(Error::<T>::ArithmeticError)?;
                Ok(())
            })?;
            
            // Emit event
            Self::deposit_event(Event::Staked {
                account: who,
                amount,
            });
            
            Ok(())
        }
        
        /// Unstake tokens
        #[pallet::call_index(2)]
        #[pallet::weight(10_000)]
        pub fn unstake(
            origin: OriginFor<T>,
            amount: BalanceOf<T>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Ensure staking position exists
            let position = Self::staking_positions(&who).ok_or(Error::<T>::NotStaked)?;
            
            // Ensure not locked
            ensure!(!position.locked, Error::<T>::NotAuthorized);
            
            // Ensure sufficient stake
            ensure!(position.amount >= amount, Error::<T>::InsufficientStake);
            
            // Ensure remaining stake is either zero or at least minimum
            let remaining = position.amount.checked_sub(&amount).ok_or(Error::<T>::ArithmeticError)?;
            ensure!(remaining.is_zero() || remaining >= T::MinimumStake::get(), Error::<T>::InsufficientStake);
            
            // Update staking position
            if remaining.is_zero() {
                StakingPositions::<T>::remove(&who);
            } else {
                StakingPositions::<T>::try_mutate_exists(&who, |position_option| -> DispatchResult {
                    if let Some(position) = position_option {
                        position.amount = remaining;
                    }
                    Ok(())
                })?;
            }
            
            // Unreserve tokens
            T::Currency::unreserve(&who, amount);
            
            // Update total staked
            TotalStaked::<T>::try_mutate(|total| -> DispatchResult {
                *total = total.checked_sub(&amount).ok_or(Error::<T>::ArithmeticError)?;
                Ok(())
            })?;
            
            // Emit event
            Self::deposit_event(Event::Unstaked {
                account: who,
                amount,
            });
            
            Ok(())
        }
        
        /// Create a new governance proposal
        #[pallet::call_index(3)]
        #[pallet::weight(10_000)]
        pub fn create_proposal(
            origin: OriginFor<T>,
            description: BoundedVec<u8, ConstU32<256>>,
            deposit: BalanceOf<T>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Ensure minimum deposit
            ensure!(deposit >= T::MinimumProposalDeposit::get(), Error::<T>::InsufficientDeposit);
            
            // Ensure sufficient balance
            let balance = Self::balances(&who);
            ensure!(balance >= deposit, Error::<T>::InsufficientBalance);
            
            // Reserve deposit
            T::Currency::reserve(&who, deposit)?;
            
            // Generate proposal ID
            let proposal_id = Self::generate_proposal_id(&who);
            
            // Create proposal
            let current_block = <frame_system::Pallet<T>>::block_number();
            let voting_ends_at = current_block.saturating_add(T::VotingPeriod::get());
            
            let proposal = Proposal {
                id: proposal_id,
                proposer: who.clone(),
                description: description.clone(),
                deposit,
                created_at: current_block,
                voting_ends_at,
                yes_votes: Zero::zero(),
                no_votes: Zero::zero(),
                abstain_votes: Zero::zero(),
                executed: false,
                result: None,
            };
            
            // Store proposal
            Proposals::<T>::insert(proposal_id, proposal);
            
            // Emit event
            Self::deposit_event(Event::ProposalCreated {
                proposal_id,
                proposer: who,
                description,
            });
            
            Ok(())
        }
        
        /// Cast a vote on a proposal
        #[pallet::call_index(4)]
        #[pallet::weight(10_000)]
        pub fn vote(
            origin: OriginFor<T>,
            proposal_id: ProposalId,
            vote: Vote,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Get proposal
            let mut proposal = Self::proposals(&proposal_id).ok_or(Error::<T>::ProposalNotFound)?;
            
            // Ensure voting period not ended
            let current_block = <frame_system::Pallet<T>>::block_number();
            ensure!(current_block <= proposal.voting_ends_at, Error::<T>::VotingPeriodEnded);
            
            // Ensure not already voted
            ensure!(!Votes::<T>::contains_key(&proposal_id, &who), Error::<T>::AlreadyVoted);
            
            // Get staking position for vote weight
            let position = Self::staking_positions(&who).ok_or(Error::<T>::NotStaked)?;
            let weight = position.amount;
            
            // Update vote counts in proposal
            match vote {
                Vote::Yes => {
                    proposal.yes_votes = proposal.yes_votes.checked_add(&weight).ok_or(Error::<T>::ArithmeticError)?;
                },
                Vote::No => {
                    proposal.no_votes = proposal.no_votes.checked_add(&weight).ok_or(Error::<T>::ArithmeticError)?;
                },
                Vote::Abstain => {
                    proposal.abstain_votes = proposal.abstain_votes.checked_add(&weight).ok_or(Error::<T>::ArithmeticError)?;
                },
            }
            
            // Store updated proposal
            Proposals::<T>::insert(&proposal_id, proposal);
            
            // Store vote
            let vote_info = VoteInfo {
                vote: vote.clone(),
                weight,
            };
            Votes::<T>::insert(&proposal_id, &who, vote_info);
            
            // Emit event
            Self::deposit_event(Event::VoteCast {
                proposal_id,
                voter: who,
                vote,
                weight,
            });
            
            Ok(())
        }
        
        /// Execute a proposal after voting period ends
        #[pallet::call_index(5)]
        #[pallet::weight(10_000)]
        pub fn execute_proposal(
            origin: OriginFor<T>,
            proposal_id: ProposalId,
        ) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            
            // Get proposal
            let mut proposal = Self::proposals(&proposal_id).ok_or(Error::<T>::ProposalNotFound)?;
            
            // Ensure voting period ended
            let current_block = <frame_system::Pallet<T>>::block_number();
            ensure!(current_block > proposal.voting_ends_at, Error::<T>::VotingPeriodNotEnded);
            
            // Ensure not already executed
            ensure!(!proposal.executed, Error::<T>::NotAuthorized);
            
            // Determine proposal result
            let result = if proposal.yes_votes > proposal.no_votes {
                ProposalResult::Passed
            } else if proposal.no_votes > proposal.yes_votes {
                ProposalResult::Rejected
            } else {
                ProposalResult::Tied
            };
            
            // Update proposal status
            proposal.executed = true;
            proposal.result = Some(result.clone());
            Proposals::<T>::insert(&proposal_id, proposal.clone());
            
            // Return deposit to proposer if passed
            if matches!(result, ProposalResult::Passed) {
                T::Currency::unreserve(&proposal.proposer, proposal.deposit);
            }
            
            // In a real implementation, you would execute the proposal actions here
            // based on the proposal content and result
            
            // Emit event
            Self::deposit_event(Event::ProposalExecuted {
                proposal_id,
                result,
            });
            
            Ok(())
        }
        
        /// Associate POP identity with account
        #[pallet::call_index(6)]
        #[pallet::weight(10_000)]
        pub fn register_pop_identity(
            origin: OriginFor<T>,
            identity_id: BoundedVec<u8, ConstU32<64>>,
            valid_until: u64,
            country_code: [u8; 2],
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Validate identity data
            ensure!(identity_id.len() > 0, Error::<T>::InvalidPopIdentity);
            
            // Store identity info
            let identity_info = PopIdentityInfo {
                identity_id: identity_id.clone(),
                valid_until,
                country_code,
            };
            
            PopIdentities::<T>::insert(&who, identity_info);
            
            // Emit event
            Self::deposit_event(Event::PopIdentityRegistered {
                account: who,
                identity_id,
            });
            
            Ok(())
        }
        
        /// Register XCM location for cross-chain interactions
        #[pallet::call_index(7)]
        #[pallet::weight(10_000)]
        pub fn register_xcm_location(
            origin: OriginFor<T>,
            location: MultiLocation,
            enabled: bool,
        ) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            
            // Validate location
            ensure!(location.parents > 0 || !location.interior.is_here(), Error::<T>::InvalidXcmLocation);
            
            // Register location
            XcmRegistry::<T>::insert(&location, enabled);
            
            Ok(())
        }
        
        /// Distribute rewards to stakers
        #[pallet::call_index(8)]
        #[pallet::weight(10_000)]
        pub fn distribute_rewards(
            origin: OriginFor<T>,
            to: T::AccountId,
            amount: BalanceOf<T>,
        ) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            
            // In a real implementation, this would be restricted to authorized accounts
            // or automated based on staking duration/amount
            
            // Check if recipient is staked
            ensure!(StakingPositions::<T>::contains_key(&to), Error::<T>::NotStaked);
            
            // Add tokens to account
            Balances::<T>::try_mutate(&to, |balance| -> DispatchResult {
                *balance = balance.checked_add(&amount).ok_or(Error::<T>::ArithmeticError)?;
                Ok(())
            })?;
            
            // Update total supply
            TotalSupply::<T>::try_mutate(|total| -> DispatchResult {
                *total = total.checked_add(&amount).ok_or(Error::<T>::ArithmeticError)?;
                Ok(())
            })?;
            
            // Emit event
            Self::deposit_event(Event::RewardDistributed {
                to,
                amount,
            });
            
            Ok(())
        }
    }

    impl<T: Config> Pallet<T> {
        /// Generate a proposal ID based on account and timestamp
        fn generate_proposal_id(account: &T::AccountId) -> ProposalId {
            let mut proposal_id = [0u8; 16];
            let account_bytes = account.encode();
            
            // Mix account and timestamp
            for i in 0..8 {
                if i < account_bytes.len() {
                    proposal_id[i] = account_bytes[i];
                }
            }
            
            let now = Self::get_current_timestamp();
            let now_bytes = now.to_be_bytes();
            
            for i in 0..8 {
                proposal_id[8 + i] = now_bytes[i];
            }
            
            proposal_id
        }
        
        /// Get current timestamp
        fn get_current_timestamp() -> u64 {
            // In a real implementation, this would use the Timestamp pallet
            // For simplicity, we return a mock value
            42_000_000
        }
        
        /// Verify POP identity
        fn verify_pop_identity(_identity_id: &[u8]) -> bool {
            // In a real implementation, this would call out to POP API
            // For now, just return true
            true
        }
        
        /// Process XCM message (for internal use)
        fn process_xcm_message(_origin: MultiLocation, _message: Vec<u8>) -> bool {
            // In a real implementation, this would handle XCM messages
            // For now, just return true
            true
        }
        
        /// Apply DAO-controlled slashing
        fn apply_slash(_target: &T::AccountId, _amount: BalanceOf<T>) -> DispatchResult {
            // In a real implementation, this would reduce stake based on DAO decisions
            // For now, just return Ok
            Ok(())
        }
    }
} 