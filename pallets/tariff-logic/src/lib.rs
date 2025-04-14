//! # Tariff Logic Pallet
//!
//! The Tariff Logic pallet provides functionality for applying dynamic tariff rules
//! using zero-knowledge credentials for cross-border trade.
//!
//! ## Overview
//!
//! This pallet enables:
//! - Management of tariff schedules based on product categories and country pairs
//! - Application of preferential rates using ZK proofs
//! - Dynamic updates to tariff rates based on governance decisions
//! - Integration with the origin-verifier pallet to apply correct tariffs based on verified origin
//!
//! The pallet uses the PolkadotJS extension, ZK credential validation, and XCM for cross-chain
//! tariff handling.

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
		traits::{Currency, ReservableCurrency},
	};
	use frame_system::pallet_prelude::*;
	use sp_std::prelude::*;

	type BalanceOf<T> =
		<<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

	/// Configure the pallet by specifying the parameters and types on which it depends.
	#[pallet::config]
	pub trait Config: frame_system::Config {
		/// Because this pallet emits events, it depends on the runtime's definition of an event.
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
		
		/// The currency type for handling tariff payments
		type Currency: ReservableCurrency<Self::AccountId>;
		
		/// Origin allowed to manage tariff rates
		type TariffAdminOrigin: EnsureOrigin<Self::RuntimeOrigin>;
		
		/// Period for tariff rate updates (in blocks)
		#[pallet::constant]
		type TariffUpdatePeriod: Get<Self::BlockNumber>;
		
		/// Maximum number of country pairs in a tariff schedule
		#[pallet::constant]
		type MaxCountryPairs: Get<u32>;
		
		/// Maximum number of product categories
		#[pallet::constant]
		type MaxProductCategories: Get<u32>;
	}

	/// Country code, ISO-3166-1 alpha-2 format
	pub type CountryCode = [u8; 2];
	
	/// Harmonized System (HS) code for product classification
	pub type HsCode = [u8; 6];
	
	/// Unique identifier for a tariff schedule
	pub type TariffScheduleId = u32;

	/// Country pair for tariff application
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct CountryPair {
		/// Exporting country
		pub origin: CountryCode,
		/// Importing country
		pub destination: CountryCode,
	}

	/// Tariff rate information
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct TariffRate {
		/// Base rate (in basis points, e.g., 1000 = 10%)
		pub base_rate: u32,
		/// Preferential rate (in basis points)
		pub preferential_rate: u32,
		/// Additional ZK proof required for preferential rate
		pub requires_zk_proof: bool,
	}

	/// Tariff schedule for a specific product category
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct TariffSchedule<BlockNumber> {
		/// HS code for the product category
		pub hs_code: HsCode,
		/// Tariff schedule name
		pub name: BoundedVec<u8, ConstU32<64>>,
		/// Description of the schedule
		pub description: BoundedVec<u8, ConstU32<256>>,
		/// Last updated block number
		pub last_updated: BlockNumber,
		/// Active status
		pub active: bool,
	}
	
	/// ZK proof verification result
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct ZkVerificationResult {
		/// Verification successful
		pub verified: bool,
		/// Verification timestamp
		pub timestamp: u64,
		/// Credential issuer
		pub issuer: BoundedVec<u8, ConstU32<64>>,
	}

	#[pallet::pallet]
	pub struct Pallet<T>(_);

	/// Storage for all tariff schedules
	#[pallet::storage]
	#[pallet::getter(fn tariff_schedules)]
	pub type TariffSchedules<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		TariffScheduleId,
		TariffSchedule<T::BlockNumber>,
		OptionQuery,
	>;

	/// Storage for tariff rates by schedule ID and country pair
	#[pallet::storage]
	#[pallet::getter(fn tariff_rates)]
	pub type TariffRates<T: Config> = StorageDoubleMap<
		_,
		Blake2_128Concat,
		TariffScheduleId,
		Blake2_128Concat,
		CountryPair,
		TariffRate,
		OptionQuery,
	>;
	
	/// Storage for ZK verification results
	#[pallet::storage]
	#[pallet::getter(fn zk_verifications)]
	pub type ZkVerifications<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		(T::AccountId, TariffScheduleId, CountryPair),
		ZkVerificationResult,
		OptionQuery,
	>;
	
	/// Next available tariff schedule ID
	#[pallet::storage]
	#[pallet::getter(fn next_schedule_id)]
	pub type NextScheduleId<T: Config> = StorageValue<_, TariffScheduleId, ValueQuery>;

	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// A new tariff schedule was created
		TariffScheduleCreated {
			schedule_id: TariffScheduleId,
			hs_code: HsCode,
		},
		/// A tariff rate was set or updated
		TariffRateSet {
			schedule_id: TariffScheduleId,
			country_pair: CountryPair,
			rate: TariffRate,
		},
		/// A tariff was applied to a shipment
		TariffApplied {
			who: T::AccountId,
			schedule_id: TariffScheduleId,
			country_pair: CountryPair,
			amount: BalanceOf<T>,
			preferential: bool,
		},
		/// ZK proof was verified for preferential tariff
		ZkProofVerified {
			who: T::AccountId,
			schedule_id: TariffScheduleId,
			country_pair: CountryPair,
		},
	}

	#[pallet::error]
	pub enum Error<T> {
		/// Tariff schedule not found
		TariffScheduleNotFound,
		/// Tariff rate not found for the country pair
		TariffRateNotFound,
		/// Invalid country code format
		InvalidCountryCode,
		/// Invalid HS code format
		InvalidHsCode,
		/// Tariff schedule already exists
		TariffScheduleAlreadyExists,
		/// ZK proof required but not provided
		ZkProofRequired,
		/// ZK proof verification failed
		ZkProofVerificationFailed,
		/// Insufficient balance to pay tariff
		InsufficientBalance,
		/// Tariff schedule is inactive
		TariffScheduleInactive,
		/// Maximum country pairs exceeded
		MaxCountryPairsExceeded,
		/// Maximum product categories exceeded
		MaxProductCategoriesExceeded,
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Create a new tariff schedule
		#[pallet::call_index(0)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
		pub fn create_tariff_schedule(
			origin: OriginFor<T>,
			hs_code: HsCode,
			name: BoundedVec<u8, ConstU32<64>>,
			description: BoundedVec<u8, ConstU32<256>>,
		) -> DispatchResult {
			T::TariffAdminOrigin::ensure_origin(origin)?;
			
			ensure!(
				NextScheduleId::<T>::get() < T::MaxProductCategories::get() as u32,
				Error::<T>::MaxProductCategoriesExceeded
			);
			
			let schedule_id = NextScheduleId::<T>::get();
			let schedule = TariffSchedule {
				hs_code,
				name,
				description,
				last_updated: <frame_system::Pallet<T>>::block_number(),
				active: true,
			};
			
			TariffSchedules::<T>::insert(schedule_id, schedule);
			NextScheduleId::<T>::put(schedule_id + 1);
			
			Self::deposit_event(Event::TariffScheduleCreated {
				schedule_id,
				hs_code,
			});
			
			Ok(())
		}
		
		/// Set a tariff rate for a country pair in a schedule
		#[pallet::call_index(1)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
		pub fn set_tariff_rate(
			origin: OriginFor<T>,
			schedule_id: TariffScheduleId,
			country_pair: CountryPair,
			base_rate: u32,
			preferential_rate: u32,
			requires_zk_proof: bool,
		) -> DispatchResult {
			T::TariffAdminOrigin::ensure_origin(origin)?;
			
			ensure!(
				TariffSchedules::<T>::contains_key(schedule_id),
				Error::<T>::TariffScheduleNotFound
			);
			
			// Ensure we don't exceed the maximum number of country pairs
			let count = TariffRates::<T>::iter_prefix(schedule_id).count() as u32;
			if !TariffRates::<T>::contains_key(schedule_id, &country_pair) {
				ensure!(
					count < T::MaxCountryPairs::get(),
					Error::<T>::MaxCountryPairsExceeded
				);
			}
			
			let rate = TariffRate {
				base_rate,
				preferential_rate,
				requires_zk_proof,
			};
			
			TariffRates::<T>::insert(schedule_id, &country_pair, rate.clone());
			
			// Update the last_updated timestamp in the schedule
			TariffSchedules::<T>::mutate(schedule_id, |maybe_schedule| {
				if let Some(schedule) = maybe_schedule {
					schedule.last_updated = <frame_system::Pallet<T>>::block_number();
				}
			});
			
			Self::deposit_event(Event::TariffRateSet {
				schedule_id,
				country_pair,
				rate,
			});
			
			Ok(())
		}
		
		/// Apply a tariff to a shipment
		#[pallet::call_index(2)]
		#[pallet::weight(10_000 + T::DbWeight::get().reads_writes(3, 1))]
		pub fn apply_tariff(
			origin: OriginFor<T>,
			schedule_id: TariffScheduleId,
			country_pair: CountryPair,
			value: BalanceOf<T>,
			use_preferential: bool,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			
			// Check that the tariff schedule exists and is active
			let schedule = TariffSchedules::<T>::get(schedule_id)
				.ok_or(Error::<T>::TariffScheduleNotFound)?;
				
			ensure!(schedule.active, Error::<T>::TariffScheduleInactive);
			
			// Get the tariff rate for this country pair
			let rate = TariffRates::<T>::get(schedule_id, &country_pair)
				.ok_or(Error::<T>::TariffRateNotFound)?;
			
			// If using preferential rate, verify ZK proof if required
			let mut applied_rate = rate.base_rate;
			let mut preferential = false;
			
			if use_preferential {
				if rate.requires_zk_proof {
					// Check if the user has a verified ZK proof
					let verification = ZkVerifications::<T>::get((who.clone(), schedule_id, country_pair.clone()));
					ensure!(
						verification.is_some() && verification.unwrap().verified,
						Error::<T>::ZkProofRequired
					);
				}
				
				applied_rate = rate.preferential_rate;
				preferential = true;
			}
			
			// Calculate tariff amount (rate is in basis points)
			let tariff_amount = value.saturating_mul(applied_rate.into()) / 10_000u32.into();
			
			// Ensure the user has enough balance
			ensure!(
				T::Currency::free_balance(&who) >= tariff_amount,
				Error::<T>::InsufficientBalance
			);
			
			// Reserve the tariff amount
			T::Currency::reserve(&who, tariff_amount)?;
			
			Self::deposit_event(Event::TariffApplied {
				who: who.clone(),
				schedule_id,
				country_pair,
				amount: tariff_amount,
				preferential,
			});
			
			Ok(())
		}
		
		/// Verify a ZK proof for preferential tariff
		#[pallet::call_index(3)]
		#[pallet::weight(15_000 + T::DbWeight::get().writes(1))]
		pub fn verify_zk_proof(
			origin: OriginFor<T>,
			user: T::AccountId,
			schedule_id: TariffScheduleId,
			country_pair: CountryPair,
			proof_data: BoundedVec<u8, ConstU32<1024>>,
			issuer: BoundedVec<u8, ConstU32<64>>,
		) -> DispatchResult {
			T::TariffAdminOrigin::ensure_origin(origin)?;
			
			// In a real implementation, this would verify the ZK proof with an off-chain worker
			// For this prototype, we simply record that verification happened
			
			// Check that the schedule exists
			ensure!(
				TariffSchedules::<T>::contains_key(schedule_id),
				Error::<T>::TariffScheduleNotFound
			);
			
			// Check that a tariff rate exists for this country pair
			ensure!(
				TariffRates::<T>::contains_key(schedule_id, &country_pair),
				Error::<T>::TariffRateNotFound
			);
			
			// Record the verification
			let result = ZkVerificationResult {
				verified: true,
				timestamp: sp_io::offchain::timestamp().unix_millis() as u64,
				issuer,
			};
			
			ZkVerifications::<T>::insert(
				(user.clone(), schedule_id, country_pair.clone()),
				result
			);
			
			Self::deposit_event(Event::ZkProofVerified {
				who: user,
				schedule_id,
				country_pair,
			});
			
			Ok(())
		}
		
		/// Activate or deactivate a tariff schedule
		#[pallet::call_index(4)]
		#[pallet::weight(5_000 + T::DbWeight::get().writes(1))]
		pub fn set_schedule_status(
			origin: OriginFor<T>,
			schedule_id: TariffScheduleId,
			active: bool,
		) -> DispatchResult {
			T::TariffAdminOrigin::ensure_origin(origin)?;
			
			TariffSchedules::<T>::try_mutate(schedule_id, |maybe_schedule| -> DispatchResult {
				let schedule = maybe_schedule.as_mut().ok_or(Error::<T>::TariffScheduleNotFound)?;
				schedule.active = active;
				schedule.last_updated = <frame_system::Pallet<T>>::block_number();
				Ok(())
			})?;
			
			Ok(())
		}
	}
}

/// Helper functions for the pallet
impl<T: Config> Pallet<T> {
	/// Calculate tariff for a given shipment
	pub fn calculate_tariff(
		schedule_id: TariffScheduleId,
		country_pair: CountryPair,
		value: BalanceOf<T>,
		preferential: bool,
	) -> Result<BalanceOf<T>, DispatchError> {
		// Check that the tariff schedule exists and is active
		let schedule = TariffSchedules::<T>::get(schedule_id)
			.ok_or(Error::<T>::TariffScheduleNotFound)?;
			
		ensure!(schedule.active, Error::<T>::TariffScheduleInactive);
		
		// Get the tariff rate for this country pair
		let rate = TariffRates::<T>::get(schedule_id, &country_pair)
			.ok_or(Error::<T>::TariffRateNotFound)?;
		
		// Select which rate to apply
		let applied_rate = if preferential {
			rate.preferential_rate
		} else {
			rate.base_rate
		};
		
		// Calculate tariff amount (rate is in basis points)
		let tariff_amount = value.saturating_mul(applied_rate.into()) / 10_000u32.into();
		
		Ok(tariff_amount)
	}
	
	/// Verify if an account has a valid ZK proof for a tariff
	pub fn has_valid_zk_proof(
		who: &T::AccountId,
		schedule_id: TariffScheduleId,
		country_pair: &CountryPair,
	) -> bool {
		if let Some(verification) = ZkVerifications::<T>::get((who.clone(), schedule_id, country_pair.clone())) {
			verification.verified
		} else {
			false
		}
	}
} 