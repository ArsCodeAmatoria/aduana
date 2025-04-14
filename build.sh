#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Building Aduana Rust components..."

# First check if we have Rust installed
if ! command -v rustc &> /dev/null; then
    echo "Rust not found, installing via rustup..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source "$HOME/.cargo/env"
fi

# Make sure we have the wasm target
rustup target add wasm32-unknown-unknown

# Build the origin verifier pallet
echo "Building origin_verifier pallet..."
cd runtime/pallets/origin_verifier
cargo check
cd ../../..

# Build the insurance pool pallet
echo "Building insurance_pool pallet..."
cd runtime/pallets/insurance_pool
cargo check
cd ../../..

# Build the tariff logic pallet
echo "Building tariff_logic pallet..."
cd runtime/pallets/tariff_logic
cargo check
cd ../../..

# Build the synthetic market pallet
echo "Building synthetic_market pallet..."
cd runtime/pallets/synthetic_market
cargo check
cd ../../..

# Build the DUANA token pallet
echo "Building duana_token pallet..."
cd runtime/pallets/duana_token
cargo check
cd ../../..

# Build the main runtime
echo "Building runtime..."
cd runtime
cargo check
cd ..

echo "Build complete!" 