# Origin Verifier Pallet

The Origin Verifier pallet is a core component of the Aduana platform, responsible for managing and verifying supply chain origin claims using zero-knowledge proofs.

## Features

- **Product Registration**: Allows manufacturers to register products with detailed information
- **Zero-Knowledge Claim Verification**: Processes and verifies origin claims without revealing sensitive data
- **Fee Management**: Implements a fee structure for verification services
- **Admin Controls**: Provides administrative capabilities for claim disputes and revocation
- **Integration with External Verifiers**: Supports pluggable verification mechanisms

## Storage Items

- `Products`: Maps product IDs to their registered information
- `Claims`: Stores ZK claims associated with product origins
- `Verifications`: Tracks verification statuses of claims
- `VerificationFee`: Current fee for claim verification services
- `Admins`: Set of accounts with administrative privileges

## Extrinsics (Transaction Calls)

- `register_product`: Register a new product with origin information
- `update_product`: Update an existing product's information
- `submit_claim`: Submit a ZK claim for a product's origin
- `verify_claim`: Verify a submitted ZK claim
- `revoke_verification`: Admin function to revoke a verification
- `set_verification_fee`: Admin function to update the verification fee
- `add_admin`: Add a new admin account
- `remove_admin`: Remove an admin account

## Integration Tests

The pallet includes comprehensive integration tests in `src/integration_tests.rs` that validate:

1. Verification fee charging mechanism
2. Insufficient balance handling
3. Product information update permissions
4. Admin verification revocation functions
5. Event emission for relevant actions
6. Error handling for invalid operations

Run the integration tests with:

```bash
cargo test -p pallet-origin-verifier
```

## Usage in Runtime

To include this pallet in a runtime:

```rust
parameter_types! {
    pub const VerificationFeeDefault: Balance = 100 * DOLLARS;
}

impl pallet_origin_verifier::Config for Runtime {
    type RuntimeEvent = RuntimeEvent;
    type Currency = Balances;
    type WeightInfo = pallet_origin_verifier::weights::SubstrateWeight<Runtime>;
    type DefaultVerificationFee = VerificationFeeDefault;
    type ProductId = u32;
    type ClaimId = u32;
    // Additional configuration parameters...
}
```

## Dependencies

- `frame_support`: Core FRAME libraries
- `frame_system`: System-level functions and types
- `pallet_balances`: For fee handling
- Additional cryptographic libraries for ZK proof verification 