# Origin Verifier Pallet

A Substrate pallet for verifying product origins using zero-knowledge proofs and decentralized identity.

## Overview

The Origin Verifier pallet enables the registration and verification of products with their origin information, essential for international trade tariff calculations. It supports:

- Registering products with verifiable origin information
- Submitting zero-knowledge proofs for origin verification
- Cross-chain verification for multi-chain ecosystems
- Integration with Proof of Provenance (POP) for decentralized identity

## Key Features

### Zero-Knowledge Proof Verification
Products can be registered with claims that are verified using zero-knowledge proofs, allowing the verification of origin information without revealing sensitive supply chain data.

### Cross-Chain Integration
The pallet supports XCM (Cross-Consensus Message Format) for verifying claims across different parachains, enabling a decentralized verification network.

### Decentralized Identity Integration
Integration with POP allows for resolving DIDs (Decentralized Identifiers) linked to importers, exporters, and other supply chain participants.

### Admin Privileges
Certain actions, like updating verification fees and revoking previously verified claims, require admin privileges for security.

### Verification Fee System
Verification requires a fee that is reserved when submitting a claim and is distributed between the verifier and treasury upon successful verification.

## Getting Started

### Configuration

The pallet can be configured with the following parameters:

```rust
#[pallet::config]
pub trait Config: frame_system::Config {
    type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
    type Currency: ReservableCurrency<Self::AccountId>;
    type VerificationFee: Get<BalanceOf<Self>>;
    type MaxClaimsPerProduct: Get<u32>;
    type MaxMetadataLength: Get<u32>;
    type VerificationTimeout: Get<Self::BlockNumber>;
    type AdminAccount: Get<Self::AccountId>;
}
```

### Basic Usage

#### Register a Product

```rust
// Register a new product with origin information
OriginVerifier::register_product(
    origin,
    product_id,
    name,
    description,
    origin_country,
    hs_code,
    manufacture_date,
    metadata,
    owner_did,
)
```

#### Submit a Claim for Verification

```rust
// Submit a claim with a zero-knowledge proof
OriginVerifier::submit_claim(
    origin,
    product_id,
    claim,
    claim_id,
)
```

#### Verify a Claim

```rust
// Manually verify a claim (requires authorized verifier)
OriginVerifier::verify_claim(
    origin,
    product_id,
    claim_id,
    approved,
    reason,
)
```

### Advanced Usage

#### Cross-Chain Verification

```rust
// Submit a verification request to another parachain
OriginVerifier::submit_cross_chain_verification(
    origin,
    para_id,
    product_id,
    claim,
    claim_id,
)
```

#### Revoke a Verification

```rust
// Revoke a previously approved claim (admin only)
OriginVerifier::revoke_claim(
    origin,
    product_id,
    claim_id,
    reason,
)
```

## Runtime Integration

The pallet includes a runtime integration module that provides:

- Zero-knowledge proof verification with external verifiers
- DID resolution for identity verification
- XCM integration for cross-chain verification

## Testing

The pallet includes comprehensive unit and integration tests covering:

- Basic product registration and claim verification
- Cross-chain verification flows
- Admin privilege controls
- Verification timeout handling
- Error cases and security constraints

Run tests with:

```bash
cargo test -p pallet-origin-verifier
```

For integration tests specifically:

```bash
cargo test -p pallet-origin-verifier --test integration_tests
```

## License

Licensed under the terms of the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Note

This pallet is part of the Aduana project for decentralized international trade facilitation. 