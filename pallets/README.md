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

### 2. Tariff Logic (`tariff-logic`)

Manages tariff rules and calculations:

- Creating and managing tariff schedules for different product categories
- Applying preferential rates based on origin verification
- Calculating tariffs based on country pairs and HS codes
- Integration with ZK credentials for compliance verification

### 3. Insurance Pool (`insurance-pool`)

Provides risk management and shared liquidity pools:

- Creation of specialized insurance pools for different trade scenarios
- Participant contributions and stake management
- Risk assessment and premium calculations
- Automated claim verification and payouts

### 4. Synthetic Market (`synthetic-market`)

Enables hedging of tariff risks through derivatives:

- Creation of tariff futures based on HS codes and country pairs
- Trading of regulatory risk swaps
- Market-based price discovery for tariff risks
- Automated settlement based on actual tariff rates

### 5. DUANA Token (`duana-token`)

Handles the governance token and DAO mechanics:

- Token issuance and management
- Staking for validators and governance
- DAO proposal creation and voting
- Slashing mechanisms for protocol violations

## Integration with POP (Proof of Provenance)

The `origin-verifier` pallet integrates with the POP identity system to:

- Resolve DIDs linked to exporters and importers
- Validate zero-knowledge claims
- Fetch or revoke proofs linked to compliance documents
- Use ZK proofs to validate country of origin and tariff classification

## Cross-Chain Functionality

The system includes hooks for XCM (Cross-Consensus Message Format) to enable:

- Cross-chain tariff handling
- Identity resolution across parachains
- DAO-controlled slashing mechanics

## Building and Testing

Each pallet includes:

- Integration tests that verify the pallet's functionality in isolation and in concert with other pallets
- Mock runtime configurations for testing
- Benchmarking for weight calculations

## License

All pallets are licensed under the same terms as the main repository (MIT OR Apache-2.0). 