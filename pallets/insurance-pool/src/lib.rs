//! # Insurance Pool Pallet
//!
//! The Insurance Pool pallet provides functionality for creating, contributing to,
//! and managing payouts from insurance pools for international trade.
//!
//! ## Overview
//!
//! This pallet enables:
//! - Creation of specialized insurance pools for different trade scenarios
//! - Participant contributions and stake management
//! - Risk assessment and premium calculations
//! - Automated claim verification and payouts
//! - DAO-controlled governance of pool parameters
//!
//! The pallet handles insurance for shipping, regulatory, and tariff changes.

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
		traits::{Currency, ExistenceRequirement, ReservableCurrency, WithdrawReasons},
	};
	use frame_system::pallet_prelude::*;
	use sp_std::prelude::*;

	type BalanceOf<T> =
		<<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

	/// Unique identifier for an insurance pool
	pub type PoolId = u32;
	
	/// Unique identifier for a claim
	pub type ClaimId = u64;

	/// Configure the pallet by specifying the parameters and types on which it depends.
	#[pallet::config]
	pub trait Config: frame_system::Config {
		/// Because this pallet emits events, it depends on the runtime's definition of an event.
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
		
		/// The currency type for handling pool funds
		type Currency: ReservableCurrency<Self::AccountId>;
		
		/// Origin allowed to administer insurance pools
		type InsuranceAdminOrigin: EnsureOrigin<Self::RuntimeOrigin>;
		
		/// Maximum number of pools
		#[pallet::constant]
		type MaxPools: Get<u32>;
		
		/// Maximum percentage for a payout (in basis points, e.g. 10000 = 100%)
		#[pallet::constant]
		type MaxPayoutPercentage: Get<u32>;
		
		/// Maximum number of participants in a pool
		#[pallet::constant]
		type MaxPoolParticipants: Get<u32>;
		
		/// Minimum contribution to join a pool
		#[pallet::constant]
		type MinContribution: Get<BalanceOf<Self>>;
	}

	/// Risk category for insurance coverage
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub enum RiskCategory {
		/// Shipping and logistics risks
		Shipping,
		/// Regulatory compliance risks
		Regulatory,
		/// Tariff and customs risks
		Tariff,
		/// Political risks
		Political,
		/// Composite (multiple categories)
		Composite,
	}

	/// Status of an insurance pool
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub enum PoolStatus {
		/// Pool is active and accepting contributions
		Active,
		/// Pool is closed to new contributions
		Closed,
		/// Pool is being liquidated
		Liquidating,
	}

	/// Status of a claim
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub enum ClaimStatus {
		/// Claim is pending review
		Pending,
		/// Claim is approved for payout
		Approved,
		/// Claim is denied
		Denied,
		/// Claim has been paid out
		Paid,
	}

	/// Insurance pool configuration
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct InsurancePool<AccountId, BlockNumber, Balance> {
		/// Name of the pool
		pub name: BoundedVec<u8, ConstU32<64>>,
		/// Description of the pool
		pub description: BoundedVec<u8, ConstU32<256>>,
		/// Risk category covered by this pool
		pub risk_category: RiskCategory,
		/// Pool status
		pub status: PoolStatus,
		/// Pool creator/admin
		pub admin: AccountId,
		/// Creation block number
		pub created_at: BlockNumber,
		/// Total amount of funds in the pool
		pub total_funds: Balance,
		/// Premium rate in basis points (e.g. 500 = 5%)
		pub premium_rate: u32,
		/// Minimum coverage period in blocks
		pub min_coverage_period: BlockNumber,
		/// Maximum coverage amount per participant
		pub max_coverage: Balance,
		/// Maximum payout percentage in basis points (e.g. 8000 = 80%)
		pub max_payout_percentage: u32,
	}

	/// Participant in an insurance pool
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct PoolParticipant<AccountId, Balance, BlockNumber> {
		/// Participant account
		pub account: AccountId,
		/// Amount contributed to the pool
		pub contribution: Balance,
		/// Block number when joined
		pub joined_at: BlockNumber,
		/// Staking period end block
		pub lock_until: BlockNumber,
		/// Is the participant currently insured
		pub is_insured: bool,
		/// Coverage amount
		pub coverage_amount: Balance,
	}

	/// Insurance claim
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct Claim<AccountId, Balance, BlockNumber> {
		/// Pool ID this claim is against
		pub pool_id: PoolId,
		/// Claimant account
		pub claimant: AccountId,
		/// Claim amount
		pub amount: Balance,
		/// Claim evidence (e.g. IPFS hash to documentation)
		pub evidence: BoundedVec<u8, ConstU32<64>>,
		/// Claim filing block number
		pub filed_at: BlockNumber,
		/// Last updated block number
		pub updated_at: BlockNumber,
		/// Claim status
		pub status: ClaimStatus,
		/// Reviewer who approved/denied the claim
		pub reviewer: Option<AccountId>,
		/// Reason for approval/denial
		pub resolution_reason: Option<BoundedVec<u8, ConstU32<256>>>,
	}

	#[pallet::pallet]
	pub struct Pallet<T>(_);

	/// Storage for insurance pools
	#[pallet::storage]
	#[pallet::getter(fn insurance_pools)]
	pub type InsurancePools<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		PoolId,
		InsurancePool<T::AccountId, T::BlockNumber, BalanceOf<T>>,
		OptionQuery,
	>;

	/// Storage for pool participants
	#[pallet::storage]
	#[pallet::getter(fn pool_participants)]
	pub type PoolParticipants<T: Config> = StorageDoubleMap<
		_,
		Blake2_128Concat,
		PoolId,
		Blake2_128Concat,
		T::AccountId,
		PoolParticipant<T::AccountId, BalanceOf<T>, T::BlockNumber>,
		OptionQuery,
	>;

	/// Number of participants in each pool
	#[pallet::storage]
	#[pallet::getter(fn participant_count)]
	pub type ParticipantCount<T: Config> = StorageMap<_, Blake2_128Concat, PoolId, u32, ValueQuery>;

	/// Insurance claims
	#[pallet::storage]
	#[pallet::getter(fn claims)]
	pub type Claims<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		ClaimId,
		Claim<T::AccountId, BalanceOf<T>, T::BlockNumber>,
		OptionQuery,
	>;

	/// Next available pool ID
	#[pallet::storage]
	#[pallet::getter(fn next_pool_id)]
	pub type NextPoolId<T: Config> = StorageValue<_, PoolId, ValueQuery>;

	/// Next available claim ID
	#[pallet::storage]
	#[pallet::getter(fn next_claim_id)]
	pub type NextClaimId<T: Config> = StorageValue<_, ClaimId, ValueQuery>;

	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// A new insurance pool was created
		PoolCreated {
			pool_id: PoolId,
			admin: T::AccountId,
			risk_category: RiskCategory,
		},
		/// An account contributed to an insurance pool
		ContributionMade {
			pool_id: PoolId,
			account: T::AccountId,
			amount: BalanceOf<T>,
		},
		/// Coverage was activated for an account
		CoverageActivated {
			pool_id: PoolId,
			account: T::AccountId,
			coverage_amount: BalanceOf<T>,
		},
		/// A claim was filed
		ClaimFiled {
			claim_id: ClaimId,
			pool_id: PoolId,
			claimant: T::AccountId,
			amount: BalanceOf<T>,
		},
		/// A claim was approved
		ClaimApproved {
			claim_id: ClaimId,
			reviewer: T::AccountId,
		},
		/// A claim was denied
		ClaimDenied {
			claim_id: ClaimId,
			reviewer: T::AccountId,
		},
		/// A claim payout was made
		ClaimPaid {
			claim_id: ClaimId,
			claimant: T::AccountId,
			amount: BalanceOf<T>,
		},
		/// An insurance pool's status was updated
		PoolStatusUpdated {
			pool_id: PoolId,
			status: PoolStatus,
		},
		/// Funds were withdrawn from a pool
		FundsWithdrawn {
			pool_id: PoolId,
			account: T::AccountId,
			amount: BalanceOf<T>,
		},
	}

	#[pallet::error]
	pub enum Error<T> {
		/// Insurance pool not found
		PoolNotFound,
		/// Insurance pool is not active
		PoolNotActive,
		/// Account is already a participant in this pool
		AlreadyParticipant,
		/// Pool has reached maximum number of participants
		MaxParticipantsReached,
		/// Contribution amount is below minimum
		ContributionTooLow,
		/// Account is not a participant in this pool
		NotParticipant,
		/// Maximum coverage exceeded
		MaxCoverageExceeded,
		/// Insufficient contribution for requested coverage
		InsufficientContribution,
		/// Lock period not yet ended
		FundsLocked,
		/// Maximum number of pools reached
		MaxPoolsReached,
		/// Claim not found
		ClaimNotFound,
		/// Claim already reviewed
		ClaimAlreadyReviewed,
		/// Claimant is not insured
		ClaimantNotInsured,
		/// Claim amount exceeds coverage
		ClaimExceedsCoverage,
		/// Insufficient funds in pool
		InsufficientPoolFunds,
		/// Only the pool admin can perform this action
		NotPoolAdmin,
		/// Maximum payout percentage exceeded
		MaxPayoutPercentageExceeded,
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Create a new insurance pool
		#[pallet::call_index(0)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
		pub fn create_pool(
			origin: OriginFor<T>,
			name: BoundedVec<u8, ConstU32<64>>,
			description: BoundedVec<u8, ConstU32<256>>,
			risk_category: RiskCategory,
			premium_rate: u32,
			min_coverage_period: T::BlockNumber,
			max_coverage: BalanceOf<T>,
			max_payout_percentage: u32,
		) -> DispatchResult {
			let admin = ensure_signed(origin)?;
			
			// Ensure we haven't reached the maximum number of pools
			ensure!(
				NextPoolId::<T>::get() < T::MaxPools::get(),
				Error::<T>::MaxPoolsReached
			);
			
			// Ensure max payout percentage is within limits
			ensure!(
				max_payout_percentage <= T::MaxPayoutPercentage::get(),
				Error::<T>::MaxPayoutPercentageExceeded
			);
			
			let pool_id = NextPoolId::<T>::get();
			let pool = InsurancePool {
				name,
				description,
				risk_category: risk_category.clone(),
				status: PoolStatus::Active,
				admin: admin.clone(),
				created_at: <frame_system::Pallet<T>>::block_number(),
				total_funds: 0u32.into(),
				premium_rate,
				min_coverage_period,
				max_coverage,
				max_payout_percentage,
			};
			
			InsurancePools::<T>::insert(pool_id, pool);
			NextPoolId::<T>::put(pool_id + 1);
			
			Self::deposit_event(Event::PoolCreated {
				pool_id,
				admin,
				risk_category,
			});
			
			Ok(())
		}
		
		/// Contribute to an insurance pool
		#[pallet::call_index(1)]
		#[pallet::weight(10_000 + T::DbWeight::get().reads_writes(3, 2))]
		pub fn contribute(
			origin: OriginFor<T>,
			pool_id: PoolId,
			amount: BalanceOf<T>,
			lock_period: T::BlockNumber,
		) -> DispatchResult {
			let contributor = ensure_signed(origin)?;
			
			// Ensure the pool exists and is active
			let mut pool = Self::insurance_pools(pool_id).ok_or(Error::<T>::PoolNotFound)?;
			ensure!(pool.status == PoolStatus::Active, Error::<T>::PoolNotActive);
			
			// Ensure the contribution meets the minimum
			ensure!(amount >= T::MinContribution::get(), Error::<T>::ContributionTooLow);
			
			// Check if already a participant
			let is_new_participant = !PoolParticipants::<T>::contains_key(pool_id, &contributor);
			
			if is_new_participant {
				// Ensure we haven't reached max participants
				let count = ParticipantCount::<T>::get(pool_id);
				ensure!(
					count < T::MaxPoolParticipants::get(),
					Error::<T>::MaxParticipantsReached
				);
				
				// Create new participant
				let participant = PoolParticipant {
					account: contributor.clone(),
					contribution: amount,
					joined_at: <frame_system::Pallet<T>>::block_number(),
					lock_until: <frame_system::Pallet<T>>::block_number() + lock_period,
					is_insured: false,
					coverage_amount: 0u32.into(),
				};
				
				PoolParticipants::<T>::insert(pool_id, &contributor, participant);
				ParticipantCount::<T>::insert(pool_id, count + 1);
			} else {
				// Update existing participant
				PoolParticipants::<T>::try_mutate(pool_id, &contributor, |maybe_participant| -> DispatchResult {
					let participant = maybe_participant.as_mut().ok_or(Error::<T>::NotParticipant)?;
					participant.contribution = participant.contribution.saturating_add(amount);
					participant.lock_until = <frame_system::Pallet<T>>::block_number() + lock_period;
					Ok(())
				})?;
			}
			
			// Transfer the contribution to the pool
			T::Currency::transfer(
				&contributor,
				&Self::account_id(),
				amount,
				ExistenceRequirement::KeepAlive,
			)?;
			
			// Update the pool's total funds
			pool.total_funds = pool.total_funds.saturating_add(amount);
			InsurancePools::<T>::insert(pool_id, pool);
			
			Self::deposit_event(Event::ContributionMade {
				pool_id,
				account: contributor,
				amount,
			});
			
			Ok(())
		}
		
		/// Activate insurance coverage
		#[pallet::call_index(2)]
		#[pallet::weight(10_000 + T::DbWeight::get().reads_writes(2, 1))]
		pub fn activate_coverage(
			origin: OriginFor<T>,
			pool_id: PoolId,
			coverage_amount: BalanceOf<T>,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			
			// Ensure the pool exists and is active
			let pool = Self::insurance_pools(pool_id).ok_or(Error::<T>::PoolNotFound)?;
			ensure!(pool.status == PoolStatus::Active, Error::<T>::PoolNotActive);
			
			// Ensure the coverage amount doesn't exceed the maximum
			ensure!(
				coverage_amount <= pool.max_coverage,
				Error::<T>::MaxCoverageExceeded
			);
			
			// Update participant information
			PoolParticipants::<T>::try_mutate(pool_id, &who, |maybe_participant| -> DispatchResult {
				let participant = maybe_participant.as_mut().ok_or(Error::<T>::NotParticipant)?;
				
				// Calculate required contribution for coverage (premium)
				let required_contribution = Self::calculate_premium(coverage_amount, pool.premium_rate)?;
				
				// Ensure they have contributed enough
				ensure!(
					participant.contribution >= required_contribution,
					Error::<T>::InsufficientContribution
				);
				
				participant.is_insured = true;
				participant.coverage_amount = coverage_amount;
				
				Ok(())
			})?;
			
			Self::deposit_event(Event::CoverageActivated {
				pool_id,
				account: who,
				coverage_amount,
			});
			
			Ok(())
		}
		
		/// File an insurance claim
		#[pallet::call_index(3)]
		#[pallet::weight(15_000 + T::DbWeight::get().reads_writes(2, 1))]
		pub fn file_claim(
			origin: OriginFor<T>,
			pool_id: PoolId,
			amount: BalanceOf<T>,
			evidence: BoundedVec<u8, ConstU32<64>>,
		) -> DispatchResult {
			let claimant = ensure_signed(origin)?;
			
			// Ensure the pool exists
			ensure!(
				InsurancePools::<T>::contains_key(pool_id),
				Error::<T>::PoolNotFound
			);
			
			// Check that the claimant is insured by this pool
			let participant = PoolParticipants::<T>::get(pool_id, &claimant)
				.ok_or(Error::<T>::NotParticipant)?;
				
			ensure!(participant.is_insured, Error::<T>::ClaimantNotInsured);
			
			// Ensure the claim amount doesn't exceed their coverage
			ensure!(
				amount <= participant.coverage_amount,
				Error::<T>::ClaimExceedsCoverage
			);
			
			// Create the claim
			let claim_id = NextClaimId::<T>::get();
			let now = <frame_system::Pallet<T>>::block_number();
			
			let claim = Claim {
				pool_id,
				claimant: claimant.clone(),
				amount,
				evidence,
				filed_at: now,
				updated_at: now,
				status: ClaimStatus::Pending,
				reviewer: None,
				resolution_reason: None,
			};
			
			Claims::<T>::insert(claim_id, claim);
			NextClaimId::<T>::put(claim_id + 1);
			
			Self::deposit_event(Event::ClaimFiled {
				claim_id,
				pool_id,
				claimant,
				amount,
			});
			
			Ok(())
		}
		
		/// Review a claim (approve or deny)
		#[pallet::call_index(4)]
		#[pallet::weight(15_000 + T::DbWeight::get().reads_writes(3, 1))]
		pub fn review_claim(
			origin: OriginFor<T>,
			claim_id: ClaimId,
			approve: bool,
			reason: BoundedVec<u8, ConstU32<256>>,
		) -> DispatchResult {
			let reviewer = ensure_signed(origin)?;
			
			// Ensure the claim exists
			let mut claim = Self::claims(claim_id).ok_or(Error::<T>::ClaimNotFound)?;
			
			// Ensure the pool exists
			let pool = Self::insurance_pools(claim.pool_id).ok_or(Error::<T>::PoolNotFound)?;
			
			// Ensure the reviewer is the pool admin
			ensure!(pool.admin == reviewer, Error::<T>::NotPoolAdmin);
			
			// Ensure the claim is still pending
			ensure!(claim.status == ClaimStatus::Pending, Error::<T>::ClaimAlreadyReviewed);
			
			// Update claim status
			claim.status = if approve { ClaimStatus::Approved } else { ClaimStatus::Denied };
			claim.reviewer = Some(reviewer.clone());
			claim.resolution_reason = Some(reason);
			claim.updated_at = <frame_system::Pallet<T>>::block_number();
			
			// Save the updated claim
			Claims::<T>::insert(claim_id, claim.clone());
			
			// Emit event based on the decision
			if approve {
				Self::deposit_event(Event::ClaimApproved {
					claim_id,
					reviewer: reviewer.clone(),
				});
			} else {
				Self::deposit_event(Event::ClaimDenied {
					claim_id,
					reviewer,
				});
			}
			
			// If approved, process the payout
			if approve {
				Self::process_claim_payout(claim_id, claim)?;
			}
			
			Ok(())
		}
		
		/// Update an insurance pool's status
		#[pallet::call_index(5)]
		#[pallet::weight(5_000 + T::DbWeight::get().writes(1))]
		pub fn update_pool_status(
			origin: OriginFor<T>,
			pool_id: PoolId,
			status: PoolStatus,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			
			// Get the pool and ensure the caller is the admin
			InsurancePools::<T>::try_mutate(pool_id, |maybe_pool| -> DispatchResult {
				let pool = maybe_pool.as_mut().ok_or(Error::<T>::PoolNotFound)?;
				ensure!(pool.admin == who, Error::<T>::NotPoolAdmin);
				
				pool.status = status.clone();
				
				Ok(())
			})?;
			
			Self::deposit_event(Event::PoolStatusUpdated {
				pool_id,
				status,
			});
			
			Ok(())
		}
		
		/// Withdraw funds from an insurance pool (for participants after lock period)
		#[pallet::call_index(6)]
		#[pallet::weight(10_000 + T::DbWeight::get().reads_writes(3, 2))]
		pub fn withdraw_funds(
			origin: OriginFor<T>,
			pool_id: PoolId,
			amount: BalanceOf<T>,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			
			// Ensure the pool exists
			let mut pool = Self::insurance_pools(pool_id).ok_or(Error::<T>::PoolNotFound)?;
			
			// Check participant status and lock period
			PoolParticipants::<T>::try_mutate(pool_id, &who, |maybe_participant| -> DispatchResult {
				let participant = maybe_participant.as_mut().ok_or(Error::<T>::NotParticipant)?;
				
				// Check if the lock period has ended
				ensure!(
					<frame_system::Pallet<T>>::block_number() >= participant.lock_until,
					Error::<T>::FundsLocked
				);
				
				// Ensure they have enough contribution to withdraw
				ensure!(
					participant.contribution >= amount,
					Error::<T>::InsufficientContribution
				);
				
				// Update their contribution
				participant.contribution = participant.contribution.saturating_sub(amount);
				
				// If they have no coverage and no contribution left, remove them
				if participant.contribution.is_zero() && !participant.is_insured {
					*maybe_participant = None;
					
					// Update participant count
					ParticipantCount::<T>::mutate(pool_id, |count| {
						*count = count.saturating_sub(1);
					});
				}
				
				Ok(())
			})?;
			
			// Transfer the funds from the pool to the participant
			T::Currency::transfer(
				&Self::account_id(),
				&who,
				amount,
				ExistenceRequirement::KeepAlive,
			)?;
			
			// Update the pool's total funds
			pool.total_funds = pool.total_funds.saturating_sub(amount);
			InsurancePools::<T>::insert(pool_id, pool);
			
			Self::deposit_event(Event::FundsWithdrawn {
				pool_id,
				account: who,
				amount,
			});
			
			Ok(())
		}
	}
}

impl<T: Config> Pallet<T> {
	/// Calculate required premium for coverage amount
	fn calculate_premium(coverage_amount: BalanceOf<T>, premium_rate: u32) -> Result<BalanceOf<T>, DispatchError> {
		// Premium rate is in basis points (e.g. 500 = 5%)
		let premium = coverage_amount.saturating_mul(premium_rate.into()) / 10_000u32.into();
		Ok(premium)
	}
	
	/// Process a claim payout
	fn process_claim_payout(claim_id: ClaimId, mut claim: Claim<T::AccountId, BalanceOf<T>, T::BlockNumber>) -> DispatchResult {
		// Get the pool
		let mut pool = Self::insurance_pools(claim.pool_id).ok_or(Error::<T>::PoolNotFound)?;
		
		// Ensure there are sufficient funds
		ensure!(
			pool.total_funds >= claim.amount,
			Error::<T>::InsufficientPoolFunds
		);
		
		// Transfer the claim amount to the claimant
		T::Currency::transfer(
			&Self::account_id(),
			&claim.claimant,
			claim.amount,
			ExistenceRequirement::KeepAlive,
		)?;
		
		// Update the pool's total funds
		pool.total_funds = pool.total_funds.saturating_sub(claim.amount);
		InsurancePools::<T>::insert(claim.pool_id, pool);
		
		// Update the claim status to paid
		claim.status = ClaimStatus::Paid;
		claim.updated_at = <frame_system::Pallet<T>>::block_number();
		Claims::<T>::insert(claim_id, claim.clone());
		
		// Update the participant's coverage to reflect the claim
		PoolParticipants::<T>::try_mutate(claim.pool_id, &claim.claimant, |maybe_participant| -> DispatchResult {
			let participant = maybe_participant.as_mut().ok_or(Error::<T>::NotParticipant)?;
			
			// Reduce coverage amount by the claim amount
			participant.coverage_amount = participant.coverage_amount.saturating_sub(claim.amount);
			
			// If coverage is now zero, they're no longer insured
			if participant.coverage_amount.is_zero() {
				participant.is_insured = false;
			}
			
			Ok(())
		})?;
		
		Self::deposit_event(Event::ClaimPaid {
			claim_id,
			claimant: claim.claimant,
			amount: claim.amount,
		});
		
		Ok(())
	}
	
	/// The account ID that holds the insurance pool funds
	pub fn account_id() -> T::AccountId {
		T::PalletId::get().into_account_truncating()
	}
}

/// The pallet's host type, which will be used to derive the pool account ID
#[pallet::config]
pub trait Config: frame_system::Config {
	/// The identifier for this pallet
	type PalletId: Get<frame_support::PalletId>;
} 