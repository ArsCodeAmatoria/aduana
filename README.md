# Aduana

Aduana is a hybrid Kusama + POP-based parachain project that mitigates international trade tariffs through decentralized origin verification, equity pools, insurance models, and synthetic tariff derivatives.

## Project Structure

- **frontend/**: Next.js application with Tailwind CSS, Shadcn UI, Framer Motion, and Chart.js
- **docs/**: Documentation site built with Fumadocs
- **runtime/**: Substrate-based blockchain implementation with custom pallets

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
- Comprehensive documentation built with Fumadocs
- Detailed information on ZK origin proofs, equity pools, DAO governance, and more

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

### Documentation Development
```bash
cd docs
npm install
npm run dev
```

### Substrate Runtime Development
```bash
cd runtime
# Setup instructions for Substrate development
```

## Deployment

- Frontend: Vercel
- Runtime: Kusama testnet 