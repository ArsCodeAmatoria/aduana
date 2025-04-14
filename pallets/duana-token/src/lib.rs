//! # DUANA Token Pallet
//!
//! The DUANA Token pallet provides functionality for governance token management,
//! staking, DAO voting, and slashing mechanics.
//!
//! ## Overview
//!
//! This pallet enables:
//! - DUANA token issuance and management
//! - Staking for validators and governance
//! - DAO proposal creation and voting
//! - Slashing mechanisms for protocol violations
//! - Token vesting schedules

#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

#[frame_support::pallet]
pub mod pallet {
	use frame_support::{
		dispatch::DispatchResult,
		pallet_prelude::*,
		traits::{Currency, ExistenceRequirement, LockableCurrency, ReservableCurrency, WithdrawReasons},
	};
	use frame_system::pallet_prelude::*;
	use sp_runtime::{
		traits::{AtLeast32BitUnsigned, CheckedAdd, One, Saturating, Zero},
		Permill,
	};
	use sp_std::prelude::*;

	type BalanceOf<T> =
		<<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;
		
	/// Unique identifier for a proposal
	pub type ProposalId = u32;
	
	/// Unique identifier for a vote
	pub type VoteId = u64;

	/// Configure the pallet by specifying the parameters and types on which it depends.
	#[pallet::config]
	pub trait Config: frame_system::Config + pallet_timestamp::Config {
		/// Because this pallet emits events, it depends on the runtime's definition of an event.
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
		
		/// The currency used for token operations
		type Currency: ReservableCurrency<Self::AccountId> + LockableCurrency<Self::AccountId>;
		
		/// The period for which tokens are locked when staked
		#[pallet::constant]
		type StakingLockPeriod: Get<Self::BlockNumber>;
		
		/// The minimum amount that can be staked
		#[pallet::constant]
		type MinStakeAmount: Get<BalanceOf<Self>>;
		
		/// The period for which proposals stay open for voting
		#[pallet::constant]
		type VotingPeriod: Get<Self::BlockNumber>;
		
		/// The minimum percentage of tokens that must vote for a proposal to be valid
		#[pallet::constant]
		type MinProposalQuorum: Get<Permill>;
		
		/// The minimum amount of tokens to create a proposal
		#[pallet::constant]
		type ProposalBond: Get<BalanceOf<Self>>;
		
		/// Maximum number of proposals that can be active at once
		#[pallet::constant]
		type MaxActiveProposals: Get<u32>;
		
		/// Maximum number of votes per account per proposal
		#[pallet::constant]
		type MaxVotesPerProposal: Get<u32>;
		
		/// The identifier for this pallet
		type PalletId: Get<frame_support::PalletId>;
	}
	
	/// Status of a governance proposal
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub enum ProposalStatus {
		/// Open for voting
		Active,
		/// Approved by voters
		Approved,
		/// Rejected by voters
		Rejected,
		/// Cancelled before voting end
		Cancelled,
		/// Executed after approval
		Executed,
	}
	
	/// Vote direction
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub enum VoteDirection {
		/// Vote in favor
		Yes,
		/// Vote against
		No,
		/// Abstain from voting
		Abstain,
	}
	
	/// Governance proposal
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct Proposal<AccountId, BlockNumber, Balance> {
		/// Proposal creator
		pub proposer: AccountId,
		/// Proposal title
		pub title: BoundedVec<u8, ConstU32<64>>,
		/// Proposal description
		pub description: BoundedVec<u8, ConstU32<256>>,
		/// Proposed actions (encoded call data)
		pub proposed_calls: BoundedVec<u8, ConstU32<4096>>,
		/// Block when proposal was created
		pub created_at: BlockNumber,
		/// Block when voting ends
		pub voting_ends_at: BlockNumber,
		/// Current status
		pub status: ProposalStatus,
		/// Yes votes
		pub yes_votes: Balance,
		/// No votes
		pub no_votes: Balance,
		/// Abstain votes
		pub abstain_votes: Balance,
	}
	
	/// Vote cast on a proposal
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct Vote<AccountId, BlockNumber, Balance> {
		/// Proposal being voted on
		pub proposal_id: ProposalId,
		/// Voter account
		pub voter: AccountId,
		/// Direction of vote
		pub direction: VoteDirection,
		/// Voting power
		pub power: Balance,
		/// Block when vote was cast
		pub cast_at: BlockNumber,
	}
	
	/// Staking information
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct StakeInfo<AccountId, BlockNumber, Balance> {
		/// Staker account
		pub staker: AccountId,
		/// Amount staked
		pub amount: Balance,
		/// Block when stake was created
		pub since: BlockNumber,
		/// Block until which stake is locked
		pub locked_until: BlockNumber,
	}
	
	/// Vesting schedule
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct VestingSchedule<BlockNumber, Balance> {
		/// Total amount to vest
		pub total_amount: Balance,
		/// Amount already vested
		pub vested_amount: Balance,
		/// Block when vesting starts
		pub start_block: BlockNumber,
		/// Duration of vesting in blocks
		pub duration: BlockNumber,
	}
	
	#[pallet::pallet]
	pub struct Pallet<T>(_);
	
	/// Storage for token issuance information
	#[pallet::storage]
	#[pallet::getter(fn total_issuance)]
	pub type TotalIssuance<T: Config> = StorageValue<_, BalanceOf<T>, ValueQuery>;
	
	/// Storage for governance proposals
	#[pallet::storage]
	#[pallet::getter(fn proposals)]
	pub type Proposals<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		ProposalId,
		Proposal<T::AccountId, T::BlockNumber, BalanceOf<T>>,
		OptionQuery,
	>;
	
	/// Storage for votes
	#[pallet::storage]
	#[pallet::getter(fn votes)]
	pub type Votes<T: Config> = StorageDoubleMap<
		_,
		Blake2_128Concat,
		ProposalId,
		Blake2_128Concat,
		T::AccountId,
		Vote<T::AccountId, T::BlockNumber, BalanceOf<T>>,
		OptionQuery,
	>;
	
	/// Count of votes per proposal
	#[pallet::storage]
	#[pallet::getter(fn vote_count)]
	pub type VoteCount<T: Config> = StorageMap<_, Blake2_128Concat, ProposalId, u32, ValueQuery>;
	
	/// Storage for staking information
	#[pallet::storage]
	#[pallet::getter(fn stakes)]
	pub type Stakes<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::AccountId,
		StakeInfo<T::AccountId, T::BlockNumber, BalanceOf<T>>,
		OptionQuery,
	>;
	
	/// Total amount of tokens staked
	#[pallet::storage]
	#[pallet::getter(fn total_staked)]
	pub type TotalStaked<T: Config> = StorageValue<_, BalanceOf<T>, ValueQuery>;
	
	/// Vesting schedules by account
	#[pallet::storage]
	#[pallet::getter(fn vesting_schedules)]
	pub type VestingSchedules<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::AccountId,
		VestingSchedule<T::BlockNumber, BalanceOf<T>>,
		OptionQuery,
	>;
	
	/// Next available proposal ID
	#[pallet::storage]
	#[pallet::getter(fn next_proposal_id)]
	pub type NextProposalId<T: Config> = StorageValue<_, ProposalId, ValueQuery>;
	
	/// Count of active proposals
	#[pallet::storage]
	#[pallet::getter(fn active_proposal_count)]
	pub type ActiveProposalCount<T: Config> = StorageValue<_, u32, ValueQuery>;
	
	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// Tokens were staked
		TokensStaked {
			who: T::AccountId,
			amount: BalanceOf<T>,
			lock_period: T::BlockNumber,
		},
		/// Staked tokens were withdrawn
		StakeWithdrawn {
			who: T::AccountId,
			amount: BalanceOf<T>,
		},
		/// A governance proposal was created
		ProposalCreated {
			proposal_id: ProposalId,
			proposer: T::AccountId,
			title: BoundedVec<u8, ConstU32<64>>,
		},
		/// A proposal's status was updated
		ProposalStatusUpdated {
			proposal_id: ProposalId,
			status: ProposalStatus,
		},
		/// A vote was cast on a proposal
		VoteCast {
			proposal_id: ProposalId,
			voter: T::AccountId,
			direction: VoteDirection,
			power: BalanceOf<T>,
		},
		/// A proposal was executed
		ProposalExecuted {
			proposal_id: ProposalId,
			result: DispatchResult,
		},
		/// A vesting schedule was created
		VestingScheduleCreated {
			who: T::AccountId,
			total_amount: BalanceOf<T>,
			duration: T::BlockNumber,
		},
		/// Vested tokens were claimed
		VestedTokensClaimed {
			who: T::AccountId,
			amount: BalanceOf<T>,
		},
		/// Tokens were issued to an account
		TokensIssued {
			to: T::AccountId,
			amount: BalanceOf<T>,
		},
		/// Tokens were slashed from an account
		TokensSlashed {
			from: T::AccountId,
			amount: BalanceOf<T>,
			reason: BoundedVec<u8, ConstU32<64>>,
		},
	}
	
	#[pallet::error]
	pub enum Error<T> {
		/// Staking amount is below minimum
		StakingAmountTooLow,
		/// The account doesn't have enough free balance
		InsufficientBalance,
		/// The stake is still locked
		StakeLocked,
		/// No stake found for the account
		NoStakeFound,
		/// Maximum number of active proposals reached
		TooManyActiveProposals,
		/// Proposal bond is too low
		ProposalBondTooLow,
		/// Proposal not found
		ProposalNotFound,
		/// Vote on a proposal that isn't active
		ProposalNotActive,
		/// Proposal's voting period has ended
		VotingPeriodEnded,
		/// Already voted on this proposal
		AlreadyVoted,
		/// Maximum votes per proposal reached
		TooManyVotes,
		/// Cannot execute a proposal that isn't approved
		ProposalNotApproved,
		/// Caller is not the proposer
		NotProposer,
		/// Caller doesn't have permission to cancel the proposal
		NotAuthorizedToCancel,
		/// Cannot create vesting schedule with zero amount
		ZeroVestingAmount,
		/// Vesting duration is too short
		VestingDurationTooShort,
		/// Vesting schedule already exists
		VestingScheduleExists,
		/// No vesting schedule found
		NoVestingSchedule,
		/// No tokens available to vest
		NoTokensToVest,
		/// Slashed amount would exceed the account's balance
		SlashExceedsBalance,
	}
	
	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Stake tokens for governance participation
		#[pallet::call_index(0)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(2))]
		pub fn stake(
			origin: OriginFor<T>,
			amount: BalanceOf<T>,
			lock_period: T::BlockNumber,
		) -> DispatchResult {
			let staker = ensure_signed(origin)?;
			
			// Ensure stake amount is above minimum
			ensure!(
				amount >= T::MinStakeAmount::get(),
				Error::<T>::StakingAmountTooLow
			);
			
			// Ensure account has enough free balance
			ensure!(
				T::Currency::free_balance(&staker) >= amount,
				Error::<T>::InsufficientBalance
			);
			
			// Calculate the block number until which the stake is locked
			let now = <frame_system::Pallet<T>>::block_number();
			let minimum_lock = now.saturating_add(T::StakingLockPeriod::get());
			let custom_lock = now.saturating_add(lock_period);
			let locked_until = custom_lock.max(minimum_lock);
			
			// Update or create stake information
			if let Some(mut stake_info) = Self::stakes(&staker) {
				// Add to existing stake
				let new_amount = stake_info.amount.saturating_add(amount);
				// Extend lock period if necessary
				let new_lock = locked_until.max(stake_info.locked_until);
				
				stake_info.amount = new_amount;
				stake_info.locked_until = new_lock;
				
				Stakes::<T>::insert(&staker, stake_info);
			} else {
				// Create new stake
				let stake_info = StakeInfo {
					staker: staker.clone(),
					amount,
					since: now,
					locked_until,
				};
				
				Stakes::<T>::insert(&staker, stake_info);
			}
			
			// Lock the tokens
			T::Currency::set_lock(
				T::PalletId::get().0,
				&staker,
				amount,
				WithdrawReasons::all(),
			);
			
			// Update total staked amount
			TotalStaked::<T>::mutate(|total| *total = total.saturating_add(amount));
			
			Self::deposit_event(Event::TokensStaked {
				who: staker,
				amount,
				lock_period,
			});
			
			Ok(())
		}
		
		/// Withdraw previously staked tokens
		#[pallet::call_index(1)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(2))]
		pub fn unstake(
			origin: OriginFor<T>,
			amount: BalanceOf<T>,
		) -> DispatchResult {
			let staker = ensure_signed(origin)?;
			
			// Get stake info
			let mut stake_info = Self::stakes(&staker).ok_or(Error::<T>::NoStakeFound)?;
			
			// Ensure the lock period has passed
			let now = <frame_system::Pallet<T>>::block_number();
			ensure!(
				now >= stake_info.locked_until,
				Error::<T>::StakeLocked
			);
			
			// Ensure requested amount doesn't exceed staked amount
			ensure!(
				amount <= stake_info.amount,
				Error::<T>::InsufficientBalance
			);
			
			// Update stake info
			stake_info.amount = stake_info.amount.saturating_sub(amount);
			
			if stake_info.amount.is_zero() {
				// Remove stake if amount is zero
				Stakes::<T>::remove(&staker);
				// Remove lock
				T::Currency::remove_lock(T::PalletId::get().0, &staker);
			} else {
				// Update stake with reduced amount
				Stakes::<T>::insert(&staker, stake_info);
				// Adjust lock
				T::Currency::set_lock(
					T::PalletId::get().0,
					&staker,
					stake_info.amount,
					WithdrawReasons::all(),
				);
			}
			
			// Update total staked amount
			TotalStaked::<T>::mutate(|total| *total = total.saturating_sub(amount));
			
			Self::deposit_event(Event::StakeWithdrawn {
				who: staker,
				amount,
			});
			
			Ok(())
		}
		
		/// Create a new governance proposal
		#[pallet::call_index(2)]
		#[pallet::weight(15_000 + T::DbWeight::get().writes(2))]
		pub fn create_proposal(
			origin: OriginFor<T>,
			title: BoundedVec<u8, ConstU32<64>>,
			description: BoundedVec<u8, ConstU32<256>>,
			proposed_calls: BoundedVec<u8, ConstU32<4096>>,
		) -> DispatchResult {
			let proposer = ensure_signed(origin)?;
			
			// Ensure we haven't reached the maximum number of active proposals
			let active_count = Self::active_proposal_count();
			ensure!(
				active_count < T::MaxActiveProposals::get(),
				Error::<T>::TooManyActiveProposals
			);
			
			// Ensure proposer has enough stake
			let stake_info = Self::stakes(&proposer).ok_or(Error::<T>::NoStakeFound)?;
			ensure!(
				stake_info.amount >= T::ProposalBond::get(),
				Error::<T>::ProposalBondTooLow
			);
			
			// Get the next proposal ID
			let proposal_id = Self::next_proposal_id();
			
			// Calculate the voting period end block
			let now = <frame_system::Pallet<T>>::block_number();
			let voting_ends_at = now.saturating_add(T::VotingPeriod::get());
			
			// Create the proposal
			let proposal = Proposal {
				proposer: proposer.clone(),
				title: title.clone(),
				description,
				proposed_calls,
				created_at: now,
				voting_ends_at,
				status: ProposalStatus::Active,
				yes_votes: 0u32.into(),
				no_votes: 0u32.into(),
				abstain_votes: 0u32.into(),
			};
			
			// Store the proposal
			Proposals::<T>::insert(proposal_id, proposal);
			
			// Increment the next proposal ID
			NextProposalId::<T>::put(proposal_id + 1);
			
			// Increment active proposal count
			ActiveProposalCount::<T>::put(active_count + 1);
			
			Self::deposit_event(Event::ProposalCreated {
				proposal_id,
				proposer,
				title,
			});
			
			Ok(())
		}
		
		/// Vote on a governance proposal
		#[pallet::call_index(3)]
		#[pallet::weight(10_000 + T::DbWeight::get().reads_writes(3, 2))]
		pub fn vote(
			origin: OriginFor<T>,
			proposal_id: ProposalId,
			direction: VoteDirection,
		) -> DispatchResult {
			let voter = ensure_signed(origin)?;
			
			// Ensure the proposal exists and is active
			let mut proposal = Self::proposals(proposal_id).ok_or(Error::<T>::ProposalNotFound)?;
			ensure!(
				proposal.status == ProposalStatus::Active,
				Error::<T>::ProposalNotActive
			);
			
			// Ensure voting period hasn't ended
			let now = <frame_system::Pallet<T>>::block_number();
			ensure!(
				now <= proposal.voting_ends_at,
				Error::<T>::VotingPeriodEnded
			);
			
			// Ensure voter hasn't already voted
			ensure!(
				!Votes::<T>::contains_key(proposal_id, &voter),
				Error::<T>::AlreadyVoted
			);
			
			// Check vote count hasn't exceeded maximum
			let vote_count = Self::vote_count(proposal_id);
			ensure!(
				vote_count < T::MaxVotesPerProposal::get(),
				Error::<T>::TooManyVotes
			);
			
			// Get voter's stake (their voting power)
			let stake_info = Self::stakes(&voter).ok_or(Error::<T>::NoStakeFound)?;
			let voting_power = stake_info.amount;
			
			// Create the vote
			let vote = Vote {
				proposal_id,
				voter: voter.clone(),
				direction: direction.clone(),
				power: voting_power,
				cast_at: now,
			};
			
			// Update proposal vote tallies
			match direction {
				VoteDirection::Yes => {
					proposal.yes_votes = proposal.yes_votes.saturating_add(voting_power);
				},
				VoteDirection::No => {
					proposal.no_votes = proposal.no_votes.saturating_add(voting_power);
				},
				VoteDirection::Abstain => {
					proposal.abstain_votes = proposal.abstain_votes.saturating_add(voting_power);
				},
			}
			
			// Store the vote
			Votes::<T>::insert(proposal_id, &voter, vote);
			
			// Update vote count
			VoteCount::<T>::insert(proposal_id, vote_count + 1);
			
			// Update the proposal
			Proposals::<T>::insert(proposal_id, proposal);
			
			Self::deposit_event(Event::VoteCast {
				proposal_id,
				voter,
				direction,
				power: voting_power,
			});
			
			Ok(())
		}
		
		/// Finalize a proposal after its voting period has ended
		#[pallet::call_index(4)]
		#[pallet::weight(15_000 + T::DbWeight::get().writes(1))]
		pub fn finalize_proposal(
			origin: OriginFor<T>,
			proposal_id: ProposalId,
		) -> DispatchResult {
			let _ = ensure_signed(origin)?;
			
			// Ensure the proposal exists and is active
			let mut proposal = Self::proposals(proposal_id).ok_or(Error::<T>::ProposalNotFound)?;
			ensure!(
				proposal.status == ProposalStatus::Active,
				Error::<T>::ProposalNotActive
			);
			
			// Ensure voting period has ended
			let now = <frame_system::Pallet<T>>::block_number();
			ensure!(
				now > proposal.voting_ends_at,
				Error::<T>::VotingPeriodEnded
			);
			
			// Calculate total votes
			let total_votes = proposal.yes_votes
				.saturating_add(proposal.no_votes)
				.saturating_add(proposal.abstain_votes);
			
			// Get total staked for quorum calculation
			let total_staked = Self::total_staked();
			
			// Check if quorum was reached
			let quorum_reached = Permill::from_rational(total_votes, total_staked) >= T::MinProposalQuorum::get();
			
			// Determine if the proposal passed
			let approved = quorum_reached && proposal.yes_votes > proposal.no_votes;
			
			// Update proposal status
			proposal.status = if approved {
				ProposalStatus::Approved
			} else {
				ProposalStatus::Rejected
			};
			
			// Update proposal in storage
			Proposals::<T>::insert(proposal_id, proposal.clone());
			
			// Decrement active proposal count
			ActiveProposalCount::<T>::mutate(|count| *count = count.saturating_sub(1));
			
			Self::deposit_event(Event::ProposalStatusUpdated {
				proposal_id,
				status: proposal.status,
			});
			
			Ok(())
		}
		
		/// Execute an approved proposal
		#[pallet::call_index(5)]
		#[pallet::weight(20_000 + T::DbWeight::get().writes(1))]
		pub fn execute_proposal(
			origin: OriginFor<T>,
			proposal_id: ProposalId,
		) -> DispatchResult {
			let executor = ensure_signed(origin.clone())?;
			
			// Ensure the proposal exists and is approved
			let mut proposal = Self::proposals(proposal_id).ok_or(Error::<T>::ProposalNotFound)?;
			ensure!(
				proposal.status == ProposalStatus::Approved,
				Error::<T>::ProposalNotApproved
			);
			
			// Mark proposal as executed first to prevent reentrancy
			proposal.status = ProposalStatus::Executed;
			Proposals::<T>::insert(proposal_id, proposal.clone());
			
			// TODO: In a real implementation, we would decode and execute the call data
			// For this prototype, we'll just acknowledge the execution
			let execution_result = Ok(());
			
			Self::deposit_event(Event::ProposalExecuted {
				proposal_id,
				result: execution_result.clone(),
			});
			
			execution_result
		}
	}
} 