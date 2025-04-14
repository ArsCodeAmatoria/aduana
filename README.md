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
- `origin_verifier`: Integrates with POP and verifies shipment proof-of-origin
- `tariff_logic`: Applies dynamic tariff rules using ZK credentials
- `insurance_pool`: Tracks contributions and automated payouts
- `synthetic_market`: Allows users to mint tariff hedging positions
- `duana_token`: Handles governance, staking, DAO voting

### Hybrid Integration with POP
- Integration with POP identity API
- ZK proofs for validating country of origin and tariff classification

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

Each pallet includes unit tests that can be run with:

```bash
cd runtime/pallets/[pallet_name]
cargo test
```

## Deployment

- Frontend: Vercel
- Runtime: Kusama testnet 