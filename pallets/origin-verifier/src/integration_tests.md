# Origin Verifier Integration Tests

This document provides an overview of the integration tests for the Origin Verifier pallet.

## Overview

The integration tests in `integration_tests.rs` validate the core functionality of the Origin Verifier pallet in a simulated runtime environment. These tests ensure that the pallet correctly handles origin verification claims, fee charging, and administrative actions.

## Test Cases

### Fee Management

- **verify_claim_charges_verification_fee**: Confirms that the correct verification fee is charged when a claim is verified. This test sets up initial balances, registers a product, submits a claim, verifies it, and checks that the balances have been properly updated.

- **verify_claim_fails_with_insufficient_balance**: Validates that a claim verification fails with the appropriate error when the user has insufficient balance to pay the verification fee.

### Product Management

- **product_owner_can_update_product_info**: Ensures that only the registered owner of a product can update its information. The test verifies that:
  - The owner can successfully update product details
  - Non-owners receive an appropriate error when attempting to update a product
  - Events are correctly emitted upon successful updates

### Administrative Controls

- **admin_can_revoke_verification**: Tests the administrative revocation functionality:
  - Confirms that admin accounts can revoke verifications
  - Verifies that non-admin accounts cannot revoke verifications
  - Checks that the product's verification status is properly updated
  - Validates that the appropriate events are emitted

### Additional Tests

The test suite also includes validations for:
- Claim submission and tracking
- Event emission for various operations
- Error handling for edge cases and invalid inputs
- Proper storage updates across various operations

## Running the Tests

Execute the integration tests with:

```bash
cargo test -p pallet-origin-verifier --test integration_tests
```

For more verbose output:

```bash
RUST_LOG=debug cargo test -p pallet-origin-verifier --test integration_tests -- --nocapture
```

## Test Environment

The tests use a mock runtime that includes:
- The Origin Verifier pallet
- The Balances pallet for fee handling
- Test accounts with predefined balances
- Mock ZK verification logic

## Adding New Tests

When adding new integration tests:
1. Follow the existing pattern of setting up test state
2. Use the `run_to_block` function to advance the blockchain state
3. Assert on expected outcomes using the provided helper functions
4. Document the purpose of the test clearly in comments
5. Consider edge cases and error conditions 