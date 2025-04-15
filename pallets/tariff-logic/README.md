# Tariff Logic Pallet

A Substrate pallet for managing and applying international trade tariffs based on product classification and verified origin information.

## Overview

The Tariff Logic pallet is responsible for:

- Defining and managing tariff schedules based on country pairs and HS codes
- Calculating applicable tariffs for products with verified origins
- Supporting preferential trade agreements and special tariff rules
- Integrating with the Origin Verifier pallet for origin verification

## Key Features

### Tariff Schedule Management

The pallet allows administrators to define and update tariff schedules, which specify the duties and taxes applicable to products based on:

- Product classification (HS code)
- Country of origin
- Destination country
- Special trade agreements or preferences

### Tariff Calculation

When a product with verified origin information is processed, the pallet calculates the applicable tariff by:

1. Looking up the appropriate tariff schedule
2. Applying preferential rates based on verified origin
3. Calculating any special duties or taxes
4. Providing the final tariff amount for customs processing

### Integration with Origin Verification

The pallet relies on the Origin Verifier pallet to ensure that product origins are properly verified before applying preferential tariff rates. This integration includes:

- Checking the verification status of products
- Validating origin claims through zero-knowledge proofs
- Handling verification revocations and updates

### Regulatory Compliance

The pallet supports regulatory compliance features such as:

- Automatic updates for regulatory changes
- Audit trails for tariff calculations
- Special handling for restricted or controlled goods

## Getting Started

### Configuration

The pallet can be configured with the following parameters:

```rust
#[pallet::config]
pub trait Config: frame_system::Config + pallet_origin_verifier::Config {
    type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
    type Currency: ReservableCurrency<Self::AccountId>;
    type TariffId: Member + Parameter + MaxEncodedLen + Copy + From<u32>;
    type AdminAccount: Get<Self::AccountId>;
    type MaxTariffRules: Get<u32>;
    type MaxPreferentialRates: Get<u32>;
}
```

### Basic Usage

#### Add a Tariff Schedule

```rust
// Add a new tariff schedule
TariffLogic::add_tariff_schedule(
    origin,
    hs_code_prefix,
    default_rate,
    description,
)
```

#### Add a Preferential Rate

```rust
// Add a preferential rate for a specific country pair
TariffLogic::add_preferential_rate(
    origin,
    tariff_id,
    origin_country,
    destination_country,
    rate,
    requires_verification,
)
```

#### Calculate Tariff

```rust
// Calculate tariff for a product
TariffLogic::calculate_tariff(
    origin,
    product_id,
    destination_country,
    value,
)
```

## Integration with Other Pallets

### Origin Verifier

The Tariff Logic pallet is designed to work closely with the Origin Verifier pallet:

- It accesses product information and origin verification status
- It applies preferential rates only when origin is properly verified
- It reacts to verification updates and revocations

### Synthetic Market

The pallet provides tariff calculation logic for the Synthetic Market pallet, enabling:

- Tariff futures and derivatives
- Risk hedging for tariff changes
- Market-based price discovery for tariff risks

## Testing

The pallet includes comprehensive unit and integration tests covering:

- Tariff schedule management
- Preferential rate calculation
- Integration with origin verification
- Error cases and edge conditions

Run tests with:

```bash
cargo test -p pallet-tariff-logic
```

## License

Licensed under the terms of the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Note

This pallet is part of the Aduana project for decentralized international trade facilitation. 