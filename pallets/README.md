# Aduana Substrate Pallets

This directory contains the custom Substrate pallets (FRAME modules) that implement the core functionality of the Aduana blockchain.

## Overview

The Aduana blockchain is designed to provide a decentralized infrastructure for international trade with zero-knowledge origin proofs, automated tariff handling, and decentralized risk management.

These pallets implement the core functionality described in the project requirements, including:

1. Origin verification with ZK proofs
2. Dynamic tariff rules
3. Insurance and risk management
4. Synthetic derivatives for tariff hedging
5. Governance token and DAO mechanics

## Pallet Structure

### 1. Origin Verifier (`origin-verifier`)

Handles the verification of product origins using zero-knowledge proofs:

- Registering products with verifiable origin information
- Submitting and verifying origin claims using ZK proofs
- Integration with POP (Proof of Provenance) for decentralized identity validation
- Cross-chain verification through XCM integration
- DID resolution and credential verification

**Enhanced Features**:
- Improved error handling with detailed error types
- Timeout mechanism for verification requests
- Cross-chain claim verification
- Admin functionality for verifier management
- Fee distribution system between verifiers and treasury

### 2. Tariff Logic (`tariff-logic`)

Manages tariff rules and calculations:

- Creating and managing tariff schedules for different product categories
- Applying preferential rates based on verified origin
- Calculating tariffs based on country pairs and HS codes
- Integration with ZK credentials for compliance verification
- Supporting special trade agreements and exemptions

**Enhanced Features**:
- Automatic preferential rate application based on origin verification
- Regulatory update mechanisms for tariff schedules
- Integration with synthetic market for tariff risk management
- Audit trail for tariff calculations and compliance

### 3. Insurance Pool (`insurance-pool`)

Provides risk management and shared liquidity pools:

- Creation of specialized insurance pools for different trade scenarios
- Participant contributions and stake management
- Risk assessment and premium calculations
- Automated claim verification and payouts
- Integration with external data sources for risk evaluation

### 4. Synthetic Market (`synthetic-market`)

Enables hedging of tariff risks through derivatives:

- Creation of tariff futures based on HS codes and country pairs
- Trading of regulatory risk swaps
- Market-based price discovery for tariff risks
- Automated settlement based on actual tariff rates
- Integration with oracle networks for pricing and settlement

### 5. DUANA Token (`duana-token`)

Handles the governance token and DAO mechanics:

- Token issuance and management
- Staking for validators and governance
- DAO proposal creation and voting
- Slashing mechanisms for protocol violations
- Incentive distribution for protocol participants

## Cross-Chain Integration

The pallets include cross-chain functionality through XCM (Cross-Consensus Message Format) to enable:

- Cross-chain origin verification
- Identity resolution across parachains
- Tariff handling for multi-chain supply chains
- DAO-controlled governance mechanisms across the ecosystem

### XCM Integration Architecture

The Origin Verifier pallet serves as the primary interface for cross-chain verification:

1. Product registration can include DIDs resolvable across chains
2. Verification requests can be sent to specialized verification parachains
3. Verification results are sent back via XCM messages
4. Credential revocations can be propagated across the network
5. The verification fee system accounts for cross-chain operational costs

## Integration with POP (Proof of Provenance)

The `origin-verifier` pallet integrates with the POP identity system to:

- Resolve DIDs linked to exporters and importers
- Validate zero-knowledge claims
- Fetch or revoke proofs linked to compliance documents
- Use ZK proofs to validate country of origin and tariff classification

## Building and Testing

Each pallet includes:

- Integration tests that verify the pallet's functionality in isolation and with other pallets
- Mock runtime configurations for testing
- Benchmarking for weight calculations
- Error handling and security testing

### Running Tests

To run tests for all pallets:

```bash
cargo test --package "pallet-*"
```

For a specific pallet:

```bash
cargo test -p pallet-origin-verifier
```

For integration tests:

```bash
cargo test -p pallet-origin-verifier --test integration_tests
```

## Deployment

The pallets are designed to be deployed as part of a parachain on the Polkadot network:

1. Configure the pallets in the parachain runtime
2. Set initial parameters in the genesis configuration
3. Deploy using the standard Substrate parachain deployment process
4. Configure XCM integration for cross-chain functionality

## License

All pallets are licensed under the same terms as the main repository (MIT OR Apache-2.0). 