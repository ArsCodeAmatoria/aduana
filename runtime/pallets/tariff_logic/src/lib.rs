#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::{
        pallet_prelude::*,
        traits::Get,
    };
    use frame_system::pallet_prelude::*;
    use sp_std::prelude::*;
    use pallet_origin_verifier::{CountryCode, ProductId};

    #[pallet::pallet]
    #[pallet::generate_store(pub(super) trait Store)]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config + pallet_origin_verifier::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
        
        /// The minimum tariff rate
        #[pallet::constant]
        type MinimumTariffRate: Get<u32>;
        
        /// The maximum tariff rate
        #[pallet::constant]
        type MaximumTariffRate: Get<u32>;
    }

    /// Tariff rates by country and HS code
    #[pallet::storage]
    #[pallet::getter(fn tariff_rates)]
    pub type TariffRates<T: Config> = StorageDoubleMap<
        _,
        Blake2_128Concat, CountryCode,
        Blake2_128Concat, HsCode,
        u32,
        ValueQuery,
    >;

    /// Trade agreements between countries
    #[pallet::storage]
    #[pallet::getter(fn trade_agreements)]
    pub type TradeAgreements<T: Config> = StorageDoubleMap<
        _,
        Blake2_128Concat, CountryCode,
        Blake2_128Concat, CountryCode,
        AgreementInfo,
        OptionQuery,
    >;

    /// Product categorizations by HS code
    #[pallet::storage]
    #[pallet::getter(fn product_categorizations)]
    pub type ProductCategorizations<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        ProductId,
        HsCode,
        OptionQuery,
    >;

    /// Tariff calculation history
    #[pallet::storage]
    #[pallet::getter(fn tariff_calculations)]
    pub type TariffCalculations<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        CalculationId,
        CalculationInfo<T::AccountId, T::BlockNumber>,
        OptionQuery,
    >;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// Tariff rate set
        TariffRateSet {
            country: CountryCode,
            hs_code: HsCode,
            rate: u32,
        },
        /// Trade agreement created
        TradeAgreementCreated {
            country1: CountryCode,
            country2: CountryCode,
            rate_reduction: u32,
        },
        /// Product categorized
        ProductCategorized {
            product_id: ProductId,
            hs_code: HsCode,
        },
        /// Tariff calculated
        TariffCalculated {
            calculation_id: CalculationId,
            origin_country: CountryCode,
            destination_country: CountryCode,
            product_id: ProductId,
            tariff_rate: u32,
            final_amount: u64,
        },
    }

    #[pallet::error]
    pub enum Error<T> {
        /// Invalid tariff rate
        InvalidTariffRate,
        /// Invalid country code
        InvalidCountryCode,
        /// Product not categorized
        ProductNotCategorized,
        /// Product origin not verified
        ProductOriginNotVerified,
        /// Trade agreement already exists
        TradeAgreementAlreadyExists,
        /// Rate reduction too high
        RateReductionTooHigh,
        /// Not authorized
        NotAuthorized,
    }

    /// Type for HS codes (Harmonized System commodity codes)
    pub type HsCode = [u8; 6];
    /// Type for calculation IDs
    pub type CalculationId = [u8; 16];

    /// Trade agreement information
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct AgreementInfo {
        /// Percentage reduction in tariff rates (0-100)
        pub rate_reduction: u32,
        /// Agreement name or description
        pub name: BoundedVec<u8, ConstU32<128>>,
        /// Whether the agreement is active
        pub active: bool,
    }

    /// Tariff calculation information
    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo)]
    pub struct CalculationInfo<AccountId, BlockNumber> {
        /// ID of the calculation
        pub id: CalculationId,
        /// Origin country of the product
        pub origin_country: CountryCode,
        /// Destination country for the product
        pub destination_country: CountryCode,
        /// Product ID
        pub product_id: ProductId,
        /// HS code of the product
        pub hs_code: HsCode,
        /// Base tariff rate
        pub base_rate: u32,
        /// Final tariff rate after applying agreements
        pub final_rate: u32,
        /// Value of the goods
        pub goods_value: u64,
        /// Final tariff amount
        pub final_amount: u64,
        /// Account that requested the calculation
        pub requester: AccountId,
        /// When the calculation was performed
        pub calculated_at: BlockNumber,
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// Set a tariff rate for a country and HS code
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn set_tariff_rate(
            origin: OriginFor<T>,
            country: CountryCode,
            hs_code: HsCode,
            rate: u32,
        ) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            
            // Ensure rate is within allowed range
            ensure!(rate >= T::MinimumTariffRate::get(), Error::<T>::InvalidTariffRate);
            ensure!(rate <= T::MaximumTariffRate::get(), Error::<T>::InvalidTariffRate);
            
            // Store the tariff rate
            TariffRates::<T>::insert(country, hs_code, rate);
            
            // Emit event
            Self::deposit_event(Event::TariffRateSet {
                country,
                hs_code,
                rate,
            });
            
            Ok(())
        }
        
        /// Create a trade agreement between two countries
        #[pallet::call_index(1)]
        #[pallet::weight(10_000)]
        pub fn create_trade_agreement(
            origin: OriginFor<T>,
            country1: CountryCode,
            country2: CountryCode,
            rate_reduction: u32,
            name: BoundedVec<u8, ConstU32<128>>,
        ) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            
            // Ensure rate reduction is valid (0-100%)
            ensure!(rate_reduction <= 100, Error::<T>::RateReductionTooHigh);
            
            // Ensure agreement doesn't already exist
            ensure!(!TradeAgreements::<T>::contains_key(&country1, &country2), Error::<T>::TradeAgreementAlreadyExists);
            
            // Create agreement info
            let agreement = AgreementInfo {
                rate_reduction,
                name: name.clone(),
                active: true,
            };
            
            // Store agreements in both directions
            TradeAgreements::<T>::insert(&country1, &country2, agreement.clone());
            TradeAgreements::<T>::insert(&country2, &country1, agreement);
            
            // Emit event
            Self::deposit_event(Event::TradeAgreementCreated {
                country1,
                country2,
                rate_reduction,
            });
            
            Ok(())
        }
        
        /// Categorize a product with an HS code
        #[pallet::call_index(2)]
        #[pallet::weight(10_000)]
        pub fn categorize_product(
            origin: OriginFor<T>,
            product_id: ProductId,
            hs_code: HsCode,
        ) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            
            // Store product categorization
            ProductCategorizations::<T>::insert(&product_id, hs_code);
            
            // Emit event
            Self::deposit_event(Event::ProductCategorized {
                product_id,
                hs_code,
            });
            
            Ok(())
        }
        
        /// Calculate tariff for a product
        #[pallet::call_index(3)]
        #[pallet::weight(10_000)]
        pub fn calculate_tariff(
            origin: OriginFor<T>,
            product_id: ProductId,
            destination_country: CountryCode,
            goods_value: u64,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Get product origin
            let origin_data = <pallet_origin_verifier::Pallet<T>>::product_origins(&product_id)
                .ok_or(Error::<T>::ProductOriginNotVerified)?;
            
            let origin_country = origin_data.country_code;
            
            // Get product HS code
            let hs_code = Self::product_categorizations(&product_id)
                .ok_or(Error::<T>::ProductNotCategorized)?;
            
            // Get base tariff rate
            let base_rate = Self::tariff_rates(destination_country, hs_code);
            
            // Apply trade agreement if exists
            let final_rate = Self::apply_trade_agreement(origin_country, destination_country, base_rate);
            
            // Calculate final amount
            let final_amount = Self::calculate_tariff_amount(goods_value, final_rate);
            
            // Generate calculation ID
            let calculation_id = Self::generate_calculation_id(&product_id, &who);
            
            // Store calculation info
            let calculation_info = CalculationInfo {
                id: calculation_id,
                origin_country,
                destination_country,
                product_id,
                hs_code,
                base_rate,
                final_rate,
                goods_value,
                final_amount,
                requester: who.clone(),
                calculated_at: <frame_system::Pallet<T>>::block_number(),
            };
            
            TariffCalculations::<T>::insert(&calculation_id, calculation_info);
            
            // Emit event
            Self::deposit_event(Event::TariffCalculated {
                calculation_id,
                origin_country,
                destination_country,
                product_id,
                tariff_rate: final_rate,
                final_amount,
            });
            
            Ok(())
        }
    }

    impl<T: Config> Pallet<T> {
        /// Apply trade agreement to tariff rate
        fn apply_trade_agreement(origin: CountryCode, destination: CountryCode, base_rate: u32) -> u32 {
            // Check if there's a trade agreement
            if let Some(agreement) = TradeAgreements::<T>::get(&origin, &destination) {
                if agreement.active {
                    // Apply rate reduction
                    let reduction = base_rate.saturating_mul(agreement.rate_reduction) / 100;
                    return base_rate.saturating_sub(reduction);
                }
            }
            
            // No agreement or not active
            base_rate
        }
        
        /// Calculate tariff amount from goods value and rate
        fn calculate_tariff_amount(goods_value: u64, rate: u32) -> u64 {
            // rate is in percentage, e.g. 5 = 5%
            goods_value.saturating_mul(rate as u64) / 100
        }
        
        /// Generate a calculation ID
        fn generate_calculation_id(product_id: &ProductId, requester: &T::AccountId) -> CalculationId {
            let mut calculation_id = [0u8; 16];
            let requester_bytes = requester.encode();
            
            // Mix product ID and requester
            for i in 0..8 {
                if i < product_id.len() {
                    calculation_id[i] = product_id[i];
                }
            }
            
            let now = Self::get_current_timestamp();
            let now_bytes = now.to_be_bytes();
            
            for i in 0..8 {
                calculation_id[8 + i] = now_bytes[i];
            }
            
            for i in 0..requester_bytes.len().min(16) {
                calculation_id[i] = calculation_id[i].wrapping_add(requester_bytes[i]);
            }
            
            calculation_id
        }
        
        /// Get current timestamp (mock implementation)
        fn get_current_timestamp() -> u64 {
            // In a real implementation, this would use the Timestamp pallet
            // For simplicity, we return a mock value
            42_000_000
        }
    }
} 