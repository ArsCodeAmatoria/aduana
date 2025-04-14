# Aduana Runtime Components

This directory contains the Substrate-based blockchain runtime components for the Aduana project.

## Overview

Aduana is a decentralized platform for international trade verification, tariff calculation, and risk management using blockchain technology. The runtime is built using Substrate's FRAME framework and consists of several custom pallets that implement the core functionality.

## Pallets

### Origin Verifier (`pallets/origin_verifier`)
- Responsible for verifying and storing product origin information
- Handles certificates and product origin verification requests
- Provides APIs for querying product origins

### Insurance Pool (`pallets/insurance_pool`)
- Manages insurance pools for trade risk coverage
- Handles policy issuance and claim processing
- Provides mechanisms for pool funding and management

### Tariff Logic (`pallets/tariff_logic`)
- Calculates tariffs based on product origin and destination
- Manages tariff rates and trade agreements between countries
- Provides storage for HS code categorization and tariff calculations

### Synthetic Market (`pallets/synthetic_market`)
- Implements a market for tariff-rate derivatives and regulatory risk swaps
- Provides order book and position management
- Handles contract settlement and profit/loss calculations

## Building

To build all pallets, run:

```bash
./build.sh
```

## Testing

Each pallet includes unit tests that can be run with:

```bash
cd runtime/pallets/[pallet_name]
cargo test
```

## Integration

These pallets are integrated into the Aduana runtime to provide a complete blockchain solution for international trade. The runtime can be deployed as a parachain connected to the Polkadot network.

## Future Work

- Integration with zkSNARKS for private origin verification
- Cross-chain message passing for interoperability with other chains
- Governance mechanisms for tariff rate adjustments
- Oracle integration for real-world tariff and regulatory data

## License

MIT 