# Runtime Integration Tests

This document provides an overview of the runtime integration tests for the Aduana parachain.

## Overview

The runtime integration tests validate cross-module functionality and complex interactions between different components of the Aduana runtime. Unlike unit tests that focus on individual pallets, these integration tests ensure that the combined system works correctly under realistic conditions.

## Test Structure

The integration tests are organized into the following files:

- **mod.rs**: Contains the main module declarations and common test utilities
- **xcm.rs**: Tests for Cross-Consensus Message (XCM) functionality
- **pop.rs**: Tests for Proof of Production (PoP) functionality

## Test Cases

### XCM Integration Tests

The XCM tests validate the cross-chain message handling capabilities of the Aduana parachain:

- **Asset Transfer**: Tests for sending and receiving assets between Aduana and other chains
- **Message Routing**: Ensures that XCM messages are correctly routed to their destination pallets
- **Error Handling**: Validates that malformed or unauthorized XCM messages are properly rejected
- **Fee Payment**: Tests that XCM fees are correctly calculated and charged

### Proof of Production (PoP) Tests

The PoP tests validate the integration between the origin verification system and the production tracking functionality:

- **Verification Flow**: Tests the complete flow from claim submission to verification and production tracking
- **Cross-pallet Interactions**: Validates interactions between Origin Verifier, Equity Pools, and related pallets
- **Economic Incentives**: Tests that rewards and penalties are correctly applied based on verification outcomes
- **Governance Actions**: Ensures that governance decisions correctly affect the PoP system

## Running the Tests

Execute all runtime integration tests with:

```bash
cargo test -p aduana-runtime --test integration
```

Run specific test modules with:

```bash
# For XCM tests
cargo test -p aduana-runtime --test integration -- xcm::

# For PoP tests
cargo test -p aduana-runtime --test integration -- pop::
```

## Test Environment

The tests run in a simulated environment that includes:

- A mock relay chain configuration
- Parachain setup with relevant pallets
- Simulated external chain connections
- Predefined accounts with various roles and balances

## Adding New Tests

When adding new runtime integration tests:

1. Determine if the test fits into an existing module or requires a new one
2. Use the helper functions in `mod.rs` for common setup tasks
3. When testing cross-pallet interactions, clearly document the expected flow
4. Ensure test cases validate both successful operations and error conditions
5. Consider edge cases related to governance, economic models, and cross-chain communication 