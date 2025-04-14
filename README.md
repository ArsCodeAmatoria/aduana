# Aduana

Aduana is a hybrid Kusama + POP-based parachain project that mitigates international trade tariffs through decentralized origin verification, equity pools, insurance models, and synthetic tariff derivatives.

## Project Structure

- **frontend/**: Next.js application with Tailwind CSS, Shadcn UI, Framer Motion, and Chart.js
  - **src/app/docs/**: Integrated documentation section with custom components
  - **src/components/**: UI components for the platform
  - **public/**: Static assets including images and diagrams
- **runtime/**: Substrate-based blockchain implementation with custom pallets
  - **pallets/**: Core blockchain functionality implemented as Substrate pallets
  - **src/**: Main runtime configuration and integration
  - **integration/**: XCM and cross-chain integration tests
- **benchmarking/**: Documentation and implementation guides for Substrate benchmarking

## Features

### Purpose
Aduana mitigates international trade tariffs through decentralized origin verification, equity pools, insurance models, and synthetic tariff derivatives.

### Landing Page / Whitepaper UI
- Built with Next.js + Tailwind CSS + Shadcn UI + Framer Motion
- Features interactive components and animated section entrances
- Comprehensive sections explaining the project's purpose and components

### Economic Models Visualization
- Chart.js integration for visualizing tariff mitigation models
- Insurance pool allocations, tariff savings, and DAO dispute resolution metrics

### Documentation
- Comprehensive documentation integrated directly in the Next.js application
- Detailed information on ZK origin proofs, equity pools, DAO governance, and more
- Custom documentation layout with sidebar navigation

### Rust Backend Modules (Substrate Pallets)
- `origin-verifier`: Integrates with POP and verifies shipment proof-of-origin
- `tariff-logic`: Applies dynamic tariff rules using ZK credentials
- `insurance-pool`: Tracks contributions and automated payouts
- `synthetic-market`: Allows users to mint tariff hedging positions
- `duana-token`: Handles governance, staking, DAO voting

### Substrate Runtime Implementation

The blockchain runtime is built using Substrate's FRAME framework with custom pallets designed specifically for international trade applications:

#### Origin Verification System
- Zero-knowledge proofs for confidential origin verification
- Integration with Proof of Provenance (POP) for DID resolution
- Verification fee mechanism to prevent spam
- Admin-controlled verification revocation for governance

#### Tariff Management
- Dynamic tariff rule application based on HS codes and country pairs
- Preferential rate application for verified origins
- Automated calculation with predefined tariff schedules
- Updates through governance proposals

#### Risk Management
- Insurance pools with specialized risk profiles
- Stake-weighted participation and premium calculations
- Automated claim verification and payout distribution
- Risk assessment algorithms with DAO oversight

#### Financial Instruments
- Tariff futures contracts for hedging tariff rate risks
- Regulatory risk swaps for bilateral risk exposure management
- Oracle-fed settlement based on actual tariff applications
- Market-based price discovery for regulatory uncertainty

#### Governance and DAO
- DUANA token for governance participation
- Staking mechanisms with time-weighted voting power
- Proposal creation, voting, and execution
- Slashing for protocol violations

### Hybrid Integration with POP
- Integration with POP identity API
- ZK proofs for validating country of origin and tariff classification
- Cross-chain identity resolution

## Development Roadmap

### Completed
- **Project Initialization and Setup**
  - Initial repository structure
  - Frontend scaffolding with Next.js
  - Substrate runtime base configuration

- **Frontend UI Development**
  - Landing page and whitepaper UI components
  - Economic model visualizations
  - Responsive design implementation
  - Animation and interaction implementation

- **Documentation System**
  - Custom documentation layout with sidebar navigation
  - Implementation of comprehensive documentation pages
  - Integration of diagrams and technical specifications

- **Substrate Pallet Prototypes**
  - Core pallet functionality implementation
  - Storage structures and extrinsics definition
  - Unit and integration testing
  - Documentation for pallets

- **Integration Tests**
  - Comprehensive integration test framework
  - Cross-pallet interaction testing
  - Documentation for test methodology

- **Benchmarking Framework**
  - Development of benchmarking documentation and guidelines
  - Implementation patterns for pallet benchmarks

### In Progress
- **Pallet Refinement**
  - Optimization of pallet implementations
  - Extended test coverage
  - Error handling enhancement

- **Runtime Integration**
  - Integration of pallets into main runtime
  - Configuration for parachain deployment
  - XCM integration for cross-chain messaging

- **Frontend-Backend Integration**
  - Development of API endpoints
  - Integration of frontend with Substrate backend
  - Transaction flow implementation

### Upcoming
- **Q4 2023: Performance Benchmarking**
  - Implementation of benchmarking for all pallets
  - Weight optimization
  - Performance testing under load

- **Q1 2024: Security Audits**
  - Comprehensive security review
  - Penetration testing
  - Bug bounty program

- **Q1 2024: Testnet Deployment**
  - Deployment to Kusama testnet
  - Initial user testing
  - Performance monitoring

- **Q2 2024: POP Integration**
  - Integration with Proof of Provenance system
  - ZK proof verification implementation
  - Cross-chain identity resolution

- **Q3 2024: Mainnet Preparation**
  - Final optimizations
  - Economic parameter calibration
  - Governance framework finalization

- **Q4 2024: Mainnet Launch**
  - Kusama parachain auction
  - Public launch
  - Community onboarding

## Getting Started

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Substrate Runtime Development
```bash
./build.sh
```

Or for individual components:

```bash
cd runtime/pallets/[pallet_name]
cargo check
```

## Testing

Each pallet includes unit tests and integration tests that can be run with:

```bash
cd runtime/pallets/[pallet_name]
cargo test
```

For cross-chain integration tests:

```bash
cd runtime
cargo test --package aduana-runtime --test integration
```

## Deployment

- Frontend: Vercel
- Runtime: Kusama testnet

## Architecture Diagram

The Aduana platform connects importers, exporters, and regulators through a decentralized infrastructure that includes:

1. Zero-knowledge origin verification
2. Dynamic tariff application
3. Risk pooling through insurance models
4. Derivatives for tariff hedging
5. DAO governance for dispute resolution and protocol updates

See the documentation section for detailed architectural diagrams. 