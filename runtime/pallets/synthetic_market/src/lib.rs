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
    use pallet_origin_verifier::CountryCode;
    use pallet_tariff_logic::HsCode;

    type BalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

    #[pallet::pallet]
    #[pallet::generate_store(pub(super) trait Store)]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config + pallet_origin_verifier::Config + pallet_tariff_logic::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
        
        /// The currency used for trading
        type Currency: ReservableCurrency<Self::AccountId>;
        
        /// The minimum collateral required to create a derivative contract
        #[pallet::constant]
        type MinimumCollateral: Get<BalanceOf<Self>>;
    }

    /// Synthetic derivative contracts
    #[pallet::storage]
    #[pallet::getter(fn derivative_contracts)]
    pub type DerivativeContracts<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        ContractId,
        DerivativeContract<T::AccountId, BalanceOf<T>, T::BlockNumber>,
        OptionQuery,
    >;

    /// Trade positions by account
    #[pallet::storage]
    #[pallet::getter(fn trade_positions)]
    pub type TradePositions<T: Config> = StorageDoubleMap<
        _,
        Blake2_128Concat, T::AccountId,
        Blake2_128Concat, ContractId,
        Position<BalanceOf<T>, T::BlockNumber>,
        OptionQuery,
    >;

    /// Market for contract types
    #[pallet::storage]
    #[pallet::getter(fn contract_markets)]
    pub type ContractMarkets<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        DerivativeType,
        MarketData,
        OptionQuery,
    >;

    /// Order book for each contract
    #[pallet::storage]
    #[pallet::getter(fn order_books)]
    pub type OrderBooks<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        ContractId,
        OrderBook<T::AccountId, BalanceOf<T>, T::BlockNumber>,
        OptionQuery,
    >;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// A new derivative contract was created
        ContractCreated {
            contract_id: ContractId,
            creator: T::AccountId,
            derivative_type: DerivativeType,
            collateral: BalanceOf<T>,
        },
        /// A new position was opened
        PositionOpened {
            account: T::AccountId,
            contract_id: ContractId,
            direction: PositionDirection,
            size: BalanceOf<T>,
            price: BalanceOf<T>,
        },
        /// An existing position was closed
        PositionClosed {
            account: T::AccountId,
            contract_id: ContractId,
            profit_loss: BalanceOf<T>,
        },
        /// A new order was placed
        OrderPlaced {
            order_id: OrderId,
            account: T::AccountId,
            contract_id: ContractId,
            order_type: OrderType,
            direction: PositionDirection,
            size: BalanceOf<T>,
            price: BalanceOf<T>,
        },
        /// An order was filled
        OrderFilled {
            order_id: OrderId,
            filled_by: T::AccountId,
        },
        /// The price was settled for a contract
        PriceSettled {
            contract_id: ContractId,
            settlement_price: BalanceOf<T>,
        },
    }

    #[pallet::error]
    pub enum Error<T> {
        /// Insufficient collateral
        InsufficientCollateral,
        /// Contract not found
        ContractNotFound,
        /// Position not found
        PositionNotFound,
        /// Order not found
        OrderNotFound,
        /// Not the contract creator
        NotContractCreator,
        /// Not authorized
        NotAuthorized,
        /// Invalid price
        InvalidPrice,
        /// Invalid size
        InvalidSize,
        /// Contract already exists
        ContractAlreadyExists,
        /// Position already exists
        PositionAlreadyExists,
        /// Contract not active
        ContractNotActive,
        /// Insufficient funds
        InsufficientFunds,
        /// Order already filled
        OrderAlreadyFilled,
    }

    /// Type for contract IDs
    pub type ContractId = [u8; 16];
    /// Type for order IDs
    pub type OrderId = [u8; 16];

    /// Derivative contract structure
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub struct DerivativeContract<AccountId, Balance, BlockNumber> {
        /// ID of the contract
        pub id: ContractId,
        /// Type of the derivative
        pub derivative_type: DerivativeType,
        /// Creator of the contract
        pub creator: AccountId,
        /// Total collateral in the contract
        pub collateral: Balance,
        /// When the contract was created
        pub created_at: BlockNumber,
        /// When the contract expires
        pub expires_at: BlockNumber,
        /// Contract parameters specific to the type
        pub parameters: DerivativeParameters,
        /// Current status of the contract
        pub status: ContractStatus,
        /// Settlement price (if settled)
        pub settlement_price: Option<Balance>,
    }

    /// Derivative types
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum DerivativeType {
        /// Tariff rate futures
        TariffFuture,
        /// Regulatory risk swaps
        RegulatorySwap,
    }

    /// Derivative parameters
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub enum DerivativeParameters {
        /// Parameters for tariff futures
        TariffFuture {
            origin_country: CountryCode,
            destination_country: CountryCode,
            hs_code: HsCode,
            notional_value: u64,
        },
        /// Parameters for regulatory swaps
        RegulatorySwap {
            country: CountryCode,
            regulation_index: u32,
            notional_value: u64,
        },
    }

    /// Contract status
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum ContractStatus {
        /// Contract is active for trading
        Active,
        /// Contract is settled
        Settled,
        /// Contract is expired
        Expired,
    }

    /// Position direction
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum PositionDirection {
        /// Long position (betting on increase)
        Long,
        /// Short position (betting on decrease)
        Short,
    }

    /// Position structure
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub struct Position<Balance, BlockNumber> {
        /// Position direction
        pub direction: PositionDirection,
        /// Size of the position
        pub size: Balance,
        /// Entry price
        pub entry_price: Balance,
        /// Margin reserved for the position
        pub margin: Balance,
        /// When the position was opened
        pub opened_at: BlockNumber,
    }

    /// Order type
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum OrderType {
        /// Limit order (execute at specific price or better)
        Limit,
        /// Market order (execute at current market price)
        Market,
    }

    /// Order structure
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub struct Order<AccountId, Balance, BlockNumber> {
        /// Order ID
        pub id: OrderId,
        /// Contract ID
        pub contract_id: ContractId,
        /// Account placing the order
        pub account: AccountId,
        /// Type of order
        pub order_type: OrderType,
        /// Direction of the position
        pub direction: PositionDirection,
        /// Size of the order
        pub size: Balance,
        /// Price for limit orders
        pub price: Balance,
        /// Reserved margin
        pub margin: Balance,
        /// When the order was placed
        pub placed_at: BlockNumber,
        /// Current order status
        pub status: OrderStatus,
    }

    /// Order status
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum OrderStatus {
        /// Order is active
        Active,
        /// Order is filled
        Filled,
        /// Order is cancelled
        Cancelled,
    }

    /// Order book structure
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub struct OrderBook<AccountId, Balance, BlockNumber> {
        /// Contract ID
        pub contract_id: ContractId,
        /// Buy orders
        pub buy_orders: Vec<OrderId>,
        /// Sell orders
        pub sell_orders: Vec<OrderId>,
        /// Last traded price
        pub last_price: Option<Balance>,
        /// Last update block
        pub last_update: BlockNumber,
    }

    /// Market data
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct MarketData {
        /// Open contracts
        pub open_contracts: u32,
        /// Total volume
        pub total_volume: u64,
        /// Market description
        pub description: BoundedVec<u8, ConstU32<256>>,
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// Create a new derivative contract
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn create_contract(
            origin: OriginFor<T>,
            derivative_type: DerivativeType,
            parameters: DerivativeParameters,
            collateral: BalanceOf<T>,
            duration: T::BlockNumber,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Ensure sufficient collateral
            ensure!(collateral >= T::MinimumCollateral::get(), Error::<T>::InsufficientCollateral);
            
            // Reserve collateral
            T::Currency::reserve(&who, collateral)?;
            
            // Generate contract ID
            let contract_id = Self::generate_contract_id(&derivative_type, &who);
            
            // Ensure contract doesn't already exist
            ensure!(!DerivativeContracts::<T>::contains_key(&contract_id), Error::<T>::ContractAlreadyExists);
            
            // Create contract
            let current_block = <frame_system::Pallet<T>>::block_number();
            let expires_at = current_block.saturating_add(duration);
            
            let contract = DerivativeContract {
                id: contract_id,
                derivative_type: derivative_type.clone(),
                creator: who.clone(),
                collateral,
                created_at: current_block,
                expires_at,
                parameters,
                status: ContractStatus::Active,
                settlement_price: None,
            };
            
            // Store contract
            DerivativeContracts::<T>::insert(&contract_id, contract);
            
            // Create order book
            let order_book = OrderBook {
                contract_id,
                buy_orders: Vec::new(),
                sell_orders: Vec::new(),
                last_price: None,
                last_update: current_block,
            };
            
            OrderBooks::<T>::insert(&contract_id, order_book);
            
            // Update market data
            Self::update_market_data(&derivative_type);
            
            // Emit event
            Self::deposit_event(Event::ContractCreated {
                contract_id,
                creator: who,
                derivative_type,
                collateral,
            });
            
            Ok(())
        }
        
        /// Place an order
        #[pallet::call_index(1)]
        #[pallet::weight(10_000)]
        pub fn place_order(
            origin: OriginFor<T>,
            contract_id: ContractId,
            order_type: OrderType,
            direction: PositionDirection,
            size: BalanceOf<T>,
            price: BalanceOf<T>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Get contract
            let contract = Self::get_contract(&contract_id)?;
            
            // Ensure contract is active
            ensure!(matches!(contract.status, ContractStatus::Active), Error::<T>::ContractNotActive);
            
            // Ensure valid size and price
            ensure!(size > 0.into(), Error::<T>::InvalidSize);
            ensure!(price > 0.into(), Error::<T>::InvalidPrice);
            
            // Calculate required margin
            let margin = Self::calculate_margin(size, price);
            
            // Reserve margin
            T::Currency::reserve(&who, margin)?;
            
            // Generate order ID
            let order_id = Self::generate_order_id(&contract_id, &who);
            
            // Create order
            let current_block = <frame_system::Pallet<T>>::block_number();
            let order = Order {
                id: order_id,
                contract_id,
                account: who.clone(),
                order_type,
                direction: direction.clone(),
                size,
                price,
                margin,
                placed_at: current_block,
                status: OrderStatus::Active,
            };
            
            // Add to order book
            Self::add_to_order_book(&contract_id, &order_id, &direction)?;
            
            // Try to match orders
            Self::match_orders(&contract_id)?;
            
            // Emit event
            Self::deposit_event(Event::OrderPlaced {
                order_id,
                account: who,
                contract_id,
                order_type,
                direction,
                size,
                price,
            });
            
            Ok(())
        }
        
        /// Settle contract price (for oracle/admin)
        #[pallet::call_index(2)]
        #[pallet::weight(10_000)]
        pub fn settle_contract(
            origin: OriginFor<T>,
            contract_id: ContractId,
            settlement_price: BalanceOf<T>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Get contract
            let mut contract = Self::get_contract(&contract_id)?;
            
            // Ensure caller is contract creator
            ensure!(contract.creator == who, Error::<T>::NotContractCreator);
            
            // Ensure contract is active
            ensure!(matches!(contract.status, ContractStatus::Active), Error::<T>::ContractNotActive);
            
            // Update contract status and settlement price
            contract.status = ContractStatus::Settled;
            contract.settlement_price = Some(settlement_price);
            
            // Save updated contract
            DerivativeContracts::<T>::insert(&contract_id, contract);
            
            // Process settlements for all positions
            Self::process_settlements(&contract_id, settlement_price)?;
            
            // Emit event
            Self::deposit_event(Event::PriceSettled {
                contract_id,
                settlement_price,
            });
            
            Ok(())
        }
        
        /// Close a position manually
        #[pallet::call_index(3)]
        #[pallet::weight(10_000)]
        pub fn close_position(
            origin: OriginFor<T>,
            contract_id: ContractId,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Ensure position exists
            let position = TradePositions::<T>::get(&who, &contract_id)
                .ok_or(Error::<T>::PositionNotFound)?;
            
            // Get contract
            let contract = Self::get_contract(&contract_id)?;
            
            // Calculate PnL based on current price
            let current_price = Self::get_current_price(&contract_id)?;
            let profit_loss = Self::calculate_pnl(&position, current_price);
            
            // Handle position closing
            Self::close_position_internal(&who, &contract_id, profit_loss)?;
            
            Ok(())
        }
    }

    impl<T: Config> Pallet<T> {
        /// Get a contract by ID
        fn get_contract(contract_id: &ContractId) -> Result<DerivativeContract<T::AccountId, BalanceOf<T>, T::BlockNumber>, Error<T>> {
            DerivativeContracts::<T>::get(contract_id).ok_or(Error::<T>::ContractNotFound)
        }
        
        /// Generate a contract ID
        fn generate_contract_id(derivative_type: &DerivativeType, creator: &T::AccountId) -> ContractId {
            let mut contract_id = [0u8; 16];
            let creator_bytes = creator.encode();
            let type_bytes = derivative_type.encode();
            
            // Mix creator and type
            for i in 0..8 {
                if i < type_bytes.len() {
                    contract_id[i] = type_bytes[i];
                }
            }
            
            let now = Self::get_current_timestamp();
            let now_bytes = now.to_be_bytes();
            
            for i in 0..8 {
                contract_id[8 + i] = now_bytes[i];
            }
            
            for i in 0..creator_bytes.len().min(16) {
                contract_id[i] = contract_id[i].wrapping_add(creator_bytes[i]);
            }
            
            contract_id
        }
        
        /// Generate an order ID
        fn generate_order_id(contract_id: &ContractId, account: &T::AccountId) -> OrderId {
            let mut order_id = [0u8; 16];
            let account_bytes = account.encode();
            
            // Mix contract ID and account
            for i in 0..8 {
                order_id[i] = contract_id[i];
            }
            
            let now = Self::get_current_timestamp();
            let now_bytes = now.to_be_bytes();
            
            for i in 0..8 {
                order_id[8 + i] = now_bytes[i];
            }
            
            for i in 0..account_bytes.len().min(16) {
                order_id[i] = order_id[i].wrapping_add(account_bytes[i]);
            }
            
            order_id
        }
        
        /// Calculate margin required for an order
        fn calculate_margin(size: BalanceOf<T>, price: BalanceOf<T>) -> BalanceOf<T> {
            // Simple margin calculation (10% of position value)
            size.saturating_mul(price) / 10.into()
        }
        
        /// Add an order to the order book
        fn add_to_order_book(contract_id: &ContractId, order_id: &OrderId, direction: &PositionDirection) -> DispatchResult {
            OrderBooks::<T>::try_mutate(contract_id, |order_book_option| -> DispatchResult {
                let order_book = order_book_option.as_mut().ok_or(Error::<T>::ContractNotFound)?;
                
                match direction {
                    PositionDirection::Long => {
                        order_book.buy_orders.push(*order_id);
                    },
                    PositionDirection::Short => {
                        order_book.sell_orders.push(*order_id);
                    },
                }
                
                order_book.last_update = <frame_system::Pallet<T>>::block_number();
                
                Ok(())
            })
        }
        
        /// Match orders in the order book
        fn match_orders(_contract_id: &ContractId) -> DispatchResult {
            // This is a simplified version - in a real implementation, this would match buy and sell orders
            // Implement order matching logic here
            Ok(())
        }
        
        /// Update market data for a derivative type
        fn update_market_data(derivative_type: &DerivativeType) {
            ContractMarkets::<T>::mutate_exists(derivative_type, |market_data_option| {
                if let Some(market_data) = market_data_option {
                    // Update existing market data
                    market_data.open_contracts = market_data.open_contracts.saturating_add(1);
                } else {
                    // Create new market data
                    let description = match derivative_type {
                        DerivativeType::TariffFuture => b"Tariff Rate Futures Market".to_vec(),
                        DerivativeType::RegulatorySwap => b"Regulatory Risk Swaps Market".to_vec(),
                    };
                    
                    *market_data_option = Some(MarketData {
                        open_contracts: 1,
                        total_volume: 0,
                        description: BoundedVec::try_from(description).unwrap_or_default(),
                    });
                }
            });
        }
        
        /// Get current price for a contract
        fn get_current_price(contract_id: &ContractId) -> Result<BalanceOf<T>, Error<T>> {
            let order_book = OrderBooks::<T>::get(contract_id).ok_or(Error::<T>::ContractNotFound)?;
            
            if let Some(price) = order_book.last_price {
                Ok(price)
            } else {
                // If no last price, return a default value
                Ok(1.into())
            }
        }
        
        /// Calculate PnL for a position
        fn calculate_pnl(position: &Position<BalanceOf<T>, T::BlockNumber>, current_price: BalanceOf<T>) -> BalanceOf<T> {
            match position.direction {
                PositionDirection::Long => {
                    // For long positions, profit if price increases
                    if current_price > position.entry_price {
                        position.size.saturating_mul(current_price - position.entry_price) / position.entry_price
                    } else {
                        0.into()
                    }
                },
                PositionDirection::Short => {
                    // For short positions, profit if price decreases
                    if position.entry_price > current_price {
                        position.size.saturating_mul(position.entry_price - current_price) / position.entry_price
                    } else {
                        0.into()
                    }
                },
            }
        }
        
        /// Process settlements for all positions
        fn process_settlements(_contract_id: &ContractId, _settlement_price: BalanceOf<T>) -> DispatchResult {
            // This would process all positions for the contract at settlement
            // Implement position settlement logic here
            Ok(())
        }
        
        /// Close a position and handle PnL
        fn close_position_internal(account: &T::AccountId, contract_id: &ContractId, profit_loss: BalanceOf<T>) -> DispatchResult {
            // Get position
            let position = TradePositions::<T>::get(account, contract_id)
                .ok_or(Error::<T>::PositionNotFound)?;
            
            // Unreserve margin
            T::Currency::unreserve(account, position.margin);
            
            // Transfer profit if any
            if profit_loss > 0.into() {
                // This would transfer from the contract collateral
                // In a real implementation, this would need to handle the source of the profit
            }
            
            // Remove position
            TradePositions::<T>::remove(account, contract_id);
            
            // Emit event
            Self::deposit_event(Event::PositionClosed {
                account: account.clone(),
                contract_id: *contract_id,
                profit_loss,
            });
            
            Ok(())
        }
        
        /// Get current timestamp (mock implementation)
        fn get_current_timestamp() -> u64 {
            // In a real implementation, this would use the Timestamp pallet
            // For simplicity, we return a mock value
            42_000_000
        }
    }
} 