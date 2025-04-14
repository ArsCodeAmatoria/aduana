//! # Synthetic Market Pallet
//!
//! The Synthetic Market pallet provides functionality for creating and trading
//! synthetic derivatives related to tariff rates and regulatory risks.
//!
//! ## Overview
//!
//! This pallet enables:
//! - Creation of tariff futures based on HS codes and country pairs
//! - Trading of regulatory risk swaps
//! - Market-based price discovery for tariff risks
//! - Automated settlement based on actual tariff rates
//!
//! The pallet integrates with the tariff-logic pallet for settlement.

#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

use pallet_tariff_logic::{CountryCode, HsCode, TariffScheduleId};

#[frame_support::pallet]
pub mod pallet {
	use frame_support::{
		dispatch::DispatchResult,
		pallet_prelude::*,
		traits::{Currency, ExistenceRequirement, ReservableCurrency},
	};
	use frame_system::pallet_prelude::*;
	use pallet_tariff_logic::{CountryCode, HsCode, TariffScheduleId};
	use sp_std::prelude::*;

	type BalanceOf<T> =
		<<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;
		
	/// Unique identifier for a synthetic derivative
	pub type DerivativeId = u32;
	
	/// Unique identifier for a market
	pub type MarketId = u32;
	
	/// Type for prices (in smallest currency unit)
	pub type Price = u128;
	
	/// Type of synthetic derivative
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub enum DerivativeType {
		/// Future on tariff rates
		TariffFuture,
		/// Swap on regulatory risks
		RegulatorySwap,
	}
	
	/// Order type in a market
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub enum OrderType {
		/// Buy order
		Buy,
		/// Sell order
		Sell,
	}
	
	/// Status of a derivative
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub enum DerivativeStatus {
		/// Active and tradeable
		Active,
		/// Waiting for settlement
		PendingSettlement,
		/// Settled and no longer tradeable
		Settled,
		/// Expired without settlement
		Expired,
	}
	
	/// Settlement method
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub enum SettlementMethod {
		/// Settle based on a tariff schedule
		TariffRate {
			schedule_id: TariffScheduleId,
			origin: CountryCode,
			destination: CountryCode,
		},
		/// Settle based on a manual oracle input
		Oracle,
		/// Automatic upon expiry
		Automatic,
	}
	
	/// Synthetic derivative
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct Derivative<BlockNumber> {
		/// Type of derivative
		pub derivative_type: DerivativeType,
		/// Name of the derivative
		pub name: BoundedVec<u8, ConstU32<64>>,
		/// Description
		pub description: BoundedVec<u8, ConstU32<256>>,
		/// HS code (for tariff futures)
		pub hs_code: Option<HsCode>,
		/// Status
		pub status: DerivativeStatus,
		/// Creation block
		pub created_at: BlockNumber,
		/// Expiry block
		pub expires_at: BlockNumber,
		/// Settlement price (if settled)
		pub settlement_price: Option<Price>,
		/// Settlement method
		pub settlement_method: SettlementMethod,
	}
	
	/// Market for trading derivatives
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct Market<AccountId, BlockNumber> {
		/// Associated derivative
		pub derivative_id: DerivativeId,
		/// Market name
		pub name: BoundedVec<u8, ConstU32<64>>,
		/// Market creator/admin
		pub admin: AccountId,
		/// Creation block
		pub created_at: BlockNumber,
		/// Is market active
		pub active: bool,
		/// Minimum order size
		pub min_order_size: Price,
	}
	
	/// Order in a market
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct Order<AccountId, BlockNumber, Balance> {
		/// Market ID
		pub market_id: MarketId,
		/// Order creator
		pub creator: AccountId,
		/// Order type (buy/sell)
		pub order_type: OrderType,
		/// Price per unit
		pub price: Price,
		/// Order quantity
		pub quantity: Balance,
		/// Filled quantity
		pub filled: Balance,
		/// Creation block
		pub created_at: BlockNumber,
		/// Expiry block
		pub expires_at: Option<BlockNumber>,
		/// Is order cancelled
		pub cancelled: bool,
	}
	
	/// Position in a derivative
	#[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, MaxEncodedLen, TypeInfo)]
	pub struct Position<AccountId, Balance> {
		/// Derivative ID
		pub derivative_id: DerivativeId,
		/// Position holder
		pub holder: AccountId,
		/// Position size
		pub size: Balance,
		/// Average entry price
		pub entry_price: Price,
		/// Is position long (true) or short (false)
		pub is_long: bool,
	}

	/// Configure the pallet by specifying the parameters and types on which it depends.
	#[pallet::config]
	pub trait Config: frame_system::Config + pallet_tariff_logic::Config {
		/// Because this pallet emits events, it depends on the runtime's definition of an event.
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
		
		/// The currency type for handling market transactions
		type Currency: ReservableCurrency<Self::AccountId>;
		
		/// Origin allowed to administer markets
		type MarketAdminOrigin: EnsureOrigin<Self::RuntimeOrigin>;
		
		/// Maximum number of synthetic derivatives
		#[pallet::constant]
		type MaxDerivatives: Get<u32>;
		
		/// Maximum number of markets
		#[pallet::constant]
		type MaxMarkets: Get<u32>;
		
		/// Fee percentage for transactions (in basis points, e.g. 25 = 0.25%)
		#[pallet::constant]
		type TransactionFee: Get<u32>;
		
		/// The identifier for this pallet
		type PalletId: Get<frame_support::PalletId>;
	}
	
	#[pallet::pallet]
	pub struct Pallet<T>(_);
	
	/// Storage for synthetic derivatives
	#[pallet::storage]
	#[pallet::getter(fn derivatives)]
	pub type Derivatives<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		DerivativeId,
		Derivative<T::BlockNumber>,
		OptionQuery,
	>;
	
	/// Storage for markets
	#[pallet::storage]
	#[pallet::getter(fn markets)]
	pub type Markets<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		MarketId,
		Market<T::AccountId, T::BlockNumber>,
		OptionQuery,
	>;
	
	/// Storage for orders
	#[pallet::storage]
	#[pallet::getter(fn orders)]
	pub type Orders<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		(MarketId, T::AccountId, T::BlockNumber),
		Order<T::AccountId, T::BlockNumber, BalanceOf<T>>,
		OptionQuery,
	>;
	
	/// Storage for positions
	#[pallet::storage]
	#[pallet::getter(fn positions)]
	pub type Positions<T: Config> = StorageDoubleMap<
		_,
		Blake2_128Concat,
		DerivativeId,
		Blake2_128Concat,
		T::AccountId,
		Position<T::AccountId, BalanceOf<T>>,
		OptionQuery,
	>;
	
	/// Buy orders by market and price (for order matching)
	#[pallet::storage]
	#[pallet::getter(fn buy_orders)]
	pub type BuyOrders<T: Config> = StorageDoubleMap<
		_,
		Blake2_128Concat,
		MarketId,
		Blake2_128Concat,
		(Price, T::AccountId, T::BlockNumber),
		bool,
		ValueQuery,
	>;
	
	/// Sell orders by market and price (for order matching)
	#[pallet::storage]
	#[pallet::getter(fn sell_orders)]
	pub type SellOrders<T: Config> = StorageDoubleMap<
		_,
		Blake2_128Concat,
		MarketId,
		Blake2_128Concat,
		(Price, T::AccountId, T::BlockNumber),
		bool,
		ValueQuery,
	>;
	
	/// Next available derivative ID
	#[pallet::storage]
	#[pallet::getter(fn next_derivative_id)]
	pub type NextDerivativeId<T: Config> = StorageValue<_, DerivativeId, ValueQuery>;
	
	/// Next available market ID
	#[pallet::storage]
	#[pallet::getter(fn next_market_id)]
	pub type NextMarketId<T: Config> = StorageValue<_, MarketId, ValueQuery>;
	
	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// A new derivative was created
		DerivativeCreated {
			derivative_id: DerivativeId,
			creator: T::AccountId,
			derivative_type: DerivativeType,
		},
		/// A derivative was settled
		DerivativeSettled {
			derivative_id: DerivativeId,
			settlement_price: Price,
		},
		/// A new market was created
		MarketCreated {
			market_id: MarketId,
			derivative_id: DerivativeId,
			admin: T::AccountId,
		},
		/// A market's status was updated
		MarketStatusUpdated {
			market_id: MarketId,
			active: bool,
		},
		/// A new order was placed
		OrderPlaced {
			market_id: MarketId,
			who: T::AccountId,
			order_type: OrderType,
			price: Price,
			quantity: BalanceOf<T>,
			timestamp: T::BlockNumber,
		},
		/// An order was matched and a trade executed
		TradeExecuted {
			market_id: MarketId,
			buyer: T::AccountId,
			seller: T::AccountId,
			price: Price,
			quantity: BalanceOf<T>,
		},
		/// An order was cancelled
		OrderCancelled {
			market_id: MarketId,
			who: T::AccountId,
			timestamp: T::BlockNumber,
		},
		/// A position was updated
		PositionUpdated {
			derivative_id: DerivativeId,
			who: T::AccountId,
			size: BalanceOf<T>,
			is_long: bool,
		},
		/// A position was settled
		PositionSettled {
			derivative_id: DerivativeId,
			who: T::AccountId,
			payout: BalanceOf<T>,
		},
	}
	
	#[pallet::error]
	pub enum Error<T> {
		/// Market not found
		MarketNotFound,
		/// Derivative not found
		DerivativeNotFound,
		/// Order not found
		OrderNotFound,
		/// Market is not active
		MarketNotActive,
		/// Derivative is not active
		DerivativeNotActive,
		/// Only the market admin can perform this action
		NotMarketAdmin,
		/// Price must be greater than zero
		InvalidPrice,
		/// Quantity must be greater than zero
		InvalidQuantity,
		/// Order below minimum size
		OrderTooSmall,
		/// Insufficient funds for order
		InsufficientFunds,
		/// Cannot cancel another user's order
		NotOrderCreator,
		/// Order is already cancelled
		OrderAlreadyCancelled,
		/// Order has expired
		OrderExpired,
		/// Derivative already settled
		AlreadySettled,
		/// Maximum number of derivatives reached
		MaxDerivativesReached,
		/// Maximum number of markets reached
		MaxMarketsReached,
		/// Cannot settle derivative before expiry
		DerivativeNotExpired,
		/// Settlement price must be provided
		SettlementPriceRequired,
		/// Order would match with own orders
		SelfMatching,
	}
	
	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Create a new synthetic derivative
		#[pallet::call_index(0)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
		pub fn create_derivative(
			origin: OriginFor<T>,
			derivative_type: DerivativeType,
			name: BoundedVec<u8, ConstU32<64>>,
			description: BoundedVec<u8, ConstU32<256>>,
			hs_code: Option<HsCode>,
			expires_at: T::BlockNumber,
			settlement_method: SettlementMethod,
		) -> DispatchResult {
			T::MarketAdminOrigin::ensure_origin(origin.clone())?;
			let creator = ensure_signed(origin)?;
			
			// Ensure we haven't reached the maximum number of derivatives
			ensure!(
				NextDerivativeId::<T>::get() < T::MaxDerivatives::get(),
				Error::<T>::MaxDerivativesReached
			);
			
			// Ensure expiry is in the future
			let now = <frame_system::Pallet<T>>::block_number();
			ensure!(expires_at > now, Error::<T>::DerivativeNotExpired);
			
			let derivative_id = NextDerivativeId::<T>::get();
			
			let derivative = Derivative {
				derivative_type: derivative_type.clone(),
				name,
				description,
				hs_code,
				status: DerivativeStatus::Active,
				created_at: now,
				expires_at,
				settlement_price: None,
				settlement_method,
			};
			
			Derivatives::<T>::insert(derivative_id, derivative);
			NextDerivativeId::<T>::put(derivative_id + 1);
			
			Self::deposit_event(Event::DerivativeCreated {
				derivative_id,
				creator,
				derivative_type,
			});
			
			Ok(())
		}
		
		/// Create a new market for a derivative
		#[pallet::call_index(1)]
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
		pub fn create_market(
			origin: OriginFor<T>,
			derivative_id: DerivativeId,
			name: BoundedVec<u8, ConstU32<64>>,
			min_order_size: Price,
		) -> DispatchResult {
			T::MarketAdminOrigin::ensure_origin(origin.clone())?;
			let admin = ensure_signed(origin)?;
			
			// Ensure we haven't reached the maximum number of markets
			ensure!(
				NextMarketId::<T>::get() < T::MaxMarkets::get(),
				Error::<T>::MaxMarketsReached
			);
			
			// Ensure the derivative exists and is active
			let derivative = Derivatives::<T>::get(derivative_id)
				.ok_or(Error::<T>::DerivativeNotFound)?;
				
			ensure!(
				derivative.status == DerivativeStatus::Active,
				Error::<T>::DerivativeNotActive
			);
			
			let market_id = NextMarketId::<T>::get();
			
			let market = Market {
				derivative_id,
				name,
				admin: admin.clone(),
				created_at: <frame_system::Pallet<T>>::block_number(),
				active: true,
				min_order_size,
			};
			
			Markets::<T>::insert(market_id, market);
			NextMarketId::<T>::put(market_id + 1);
			
			Self::deposit_event(Event::MarketCreated {
				market_id,
				derivative_id,
				admin,
			});
			
			Ok(())
		}
		
		/// Update a market's status (active/inactive)
		#[pallet::call_index(2)]
		#[pallet::weight(5_000 + T::DbWeight::get().writes(1))]
		pub fn update_market_status(
			origin: OriginFor<T>,
			market_id: MarketId,
			active: bool,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;
			
			// Get the market and ensure the caller is the admin
			Markets::<T>::try_mutate(market_id, |maybe_market| -> DispatchResult {
				let market = maybe_market.as_mut().ok_or(Error::<T>::MarketNotFound)?;
				ensure!(market.admin == who, Error::<T>::NotMarketAdmin);
				
				market.active = active;
				
				Ok(())
			})?;
			
			Self::deposit_event(Event::MarketStatusUpdated {
				market_id,
				active,
			});
			
			Ok(())
		}
		
		/// Settle a derivative manually (for Oracle settlement)
		#[pallet::call_index(3)]
		#[pallet::weight(15_000 + T::DbWeight::get().writes(1))]
		pub fn settle_derivative(
			origin: OriginFor<T>,
			derivative_id: DerivativeId,
			settlement_price: Price,
		) -> DispatchResult {
			T::MarketAdminOrigin::ensure_origin(origin)?;
			
			// Get the derivative
			Derivatives::<T>::try_mutate(derivative_id, |maybe_derivative| -> DispatchResult {
				let derivative = maybe_derivative.as_mut().ok_or(Error::<T>::DerivativeNotFound)?;
				
				// Ensure it's not already settled
				ensure!(
					derivative.status != DerivativeStatus::Settled,
					Error::<T>::AlreadySettled
				);
				
				// Update the derivative status and settlement price
				derivative.status = DerivativeStatus::Settled;
				derivative.settlement_price = Some(settlement_price);
				
				Ok(())
			})?;
			
			Self::deposit_event(Event::DerivativeSettled {
				derivative_id,
				settlement_price,
			});
			
			// Process settlement for all positions
			Self::process_settlement(derivative_id, settlement_price)?;
			
			Ok(())
		}
	}
}

impl<T: Config> Pallet<T> {
	/// Process settlement for all positions in a derivative
	fn process_settlement(derivative_id: DerivativeId, settlement_price: Price) -> DispatchResult {
		// Iterate through all positions for this derivative
		for (who, position) in Positions::<T>::iter_prefix(derivative_id) {
			let payout = if position.is_long {
				// For long positions, payout if settlement price > entry price
				if settlement_price > position.entry_price {
					// Calculate profit: (settlement_price - entry_price) * size
					let price_diff = settlement_price.saturating_sub(position.entry_price);
					position.size.saturating_mul(price_diff.into()) / 1u128.into()
				} else {
					0u32.into()
				}
			} else {
				// For short positions, payout if settlement price < entry price
				if settlement_price < position.entry_price {
					// Calculate profit: (entry_price - settlement_price) * size
					let price_diff = position.entry_price.saturating_sub(settlement_price);
					position.size.saturating_mul(price_diff.into()) / 1u128.into()
				} else {
					0u32.into()
				}
			};
			
			// If there's a payout, transfer funds
			if !payout.is_zero() {
				T::Currency::transfer(
					&Self::account_id(),
					&who,
					payout,
					ExistenceRequirement::KeepAlive,
				)?;
				
				Self::deposit_event(Event::PositionSettled {
					derivative_id,
					who: who.clone(),
					payout,
				});
			}
			
			// Remove the position now that it's settled
			Positions::<T>::remove(derivative_id, &who);
		}
		
		Ok(())
	}
	
	/// The account ID that holds market funds
	pub fn account_id() -> T::AccountId {
		T::PalletId::get().into_account_truncating()
	}
} 