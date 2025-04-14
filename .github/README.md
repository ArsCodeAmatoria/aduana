# Aduana

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Aduana** is a hybrid Kusama + POP-based parachain project that mitigates international trade tariffs through decentralized origin verification, equity pools, insurance models, and synthetic tariff derivatives.

## Project Overview

Aduana creates a bridge between traditional international trade and blockchain technology, enabling:

- **Decentralized Origin Verification**: Using Zero-Knowledge proofs to validate origin claims without revealing sensitive business information
- **Equity Pools**: Distribute tariff costs across traders to reduce individual burden
- **Insurance Models**: Protect against unexpected tariff changes and regulatory actions
- **Synthetic Derivatives**: Allow hedging against tariff risk using blockchain-based financial instruments
- **DAO Governance**: Community-driven decision making for protocol development

## Repository Structure

This monorepo contains three main components:

```
aduana/
├── frontend/       # Next.js application with UI components
│   └── src/app/docs/  # Integrated documentation 
└── runtime/        # Substrate-based blockchain implementation
```

## Technology Stack

- **Frontend**: Next.js, Tailwind CSS, Shadcn UI, Framer Motion, Chart.js
- **Documentation**: Integrated in Next.js app with custom components
- **Blockchain**: Substrate, Kusama, POP integration

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Rust and Cargo for runtime development

### Frontend Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

### Documentation

The documentation is integrated in the frontend application and will be available at [http://localhost:3000/docs](http://localhost:3000/docs) when running the frontend development server.

### Runtime Development

```bash
# Execute the build script
./build.sh

# Or for individual components
cd runtime/pallets/[pallet_name]
cargo check
```

## Contributing

We welcome contributions to Aduana! Please see our [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions and support, please open an issue on GitHub. 