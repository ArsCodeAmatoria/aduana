# Implementing Benchmarks in Aduana: Step-by-Step Process

This document outlines the step-by-step process for implementing benchmarks in the Aduana project. Follow these instructions to add benchmarks to any pallet.

## Prerequisites

Before starting the benchmarking implementation, ensure:

1. You have a working development environment for Substrate
2. You understand the functionality of the pallet you're benchmarking
3. You're familiar with the Substrate benchmarking framework
4. You have identified the extrinsics that require benchmarking

## Step 1: Configure Cargo.toml

Add benchmarking dependencies to the pallet's `Cargo.toml`:

```toml
[dependencies]
frame-benchmarking = { version = "4.0.0-dev", default-features = false, optional = true, git = "https://github.com/paritytech/substrate.git", branch = "polkadot-v0.9.39" }

[features]
runtime-benchmarks = [
    "frame-benchmarking/runtime-benchmarks",
    "frame-support/runtime-benchmarks",
    "frame-system/runtime-benchmarks",
]
```

## Step 2: Create Benchmarking Module

Create a new file in the pallet's `src` directory named `benchmarking.rs`:

```rust
#[cfg(feature = "runtime-benchmarks")]
use super::*;
use frame_benchmarking::{benchmarks, whitelisted_caller, impl_benchmark_test_suite};
use frame_system::RawOrigin;

#[cfg(feature = "runtime-benchmarks")]
benchmarks! {
    // Add benchmark definitions here
}

#[cfg(feature = "runtime-benchmarks")]
impl_benchmark_test_suite!(
    Pallet,
    crate::mock::new_test_ext(),
    crate::mock::Test,
);
```

## Step 3: Implement WeightInfo Trait

Create or modify the `weights.rs` file in the pallet's `src` directory:

```rust
use frame_support::weights::{Weight, constants::RocksDbWeight};
use sp_std::marker::PhantomData;

pub trait WeightInfo {
    // Add function signatures for each benchmarked extrinsic
}

pub struct SubstrateWeight<T>(PhantomData<T>);
impl<T: frame_system::Config> WeightInfo for SubstrateWeight<T> {
    // Add default weight implementations
}

// Fallback weights for when benchmarks are not enabled
impl WeightInfo for () {
    // Add default weight implementations
}
```

## Step 4: Add Benchmarking Definitions

In `benchmarking.rs`, add benchmark definitions for each extrinsic. Follow this template:

```rust
benchmarks! {
    extrinsic_name {
        // Setup code: prepare the state for the benchmark
        let s in 1..1000 => {
            // Setup that scales with parameter s
        };
        
        let caller: T::AccountId = whitelisted_caller();
        
        // More setup as needed
        
    }: _(RawOrigin::Signed(caller), param1, param2, ...)
    
    verify {
        // Verification code to ensure the extrinsic had the expected effect
        assert!(SomeStorageMap::<T>::contains_key(some_key));
    }
}
```

## Step 5: Update the Pallet's lib.rs

Modify the pallet's `lib.rs` to include the benchmarking module:

```rust
// At the top with other imports
#[cfg(feature = "runtime-benchmarks")]
mod benchmarking;
pub mod weights;

#[cfg(feature = "runtime-benchmarks")]
pub use benchmarking::*;
pub use weights::*;

// In the pallet configuration trait
#[pallet::config]
pub trait Config: frame_system::Config {
    // Other config items...
    
    /// Weight information for extrinsics in this pallet.
    type WeightInfo: WeightInfo;
}

// In each dispatchable function, use the weight info
#[pallet::weight(T::WeightInfo::extrinsic_name())]
pub fn extrinsic_name(
    origin: OriginFor<T>,
    // params...
) -> DispatchResult {
    // Implementation...
}
```

## Step 6: Add the Pallet to Runtime Benchmarks

Update the runtime's `lib.rs` to include your pallet in the benchmarking list:

```rust
// In the benchmarks module
define_benchmarks!(
    [frame_benchmarking, BaselineBench::<Runtime>]
    [frame_system, SystemBench::<Runtime>]
    [pallet_balances, Balances]
    // Add your pallet
    [pallet_your_pallet, YourPallet]
);
```

## Step 7: Benchmark-Specific Helper Functions

In `benchmarking.rs`, add helper functions for common operations:

```rust
// Example: Helper to create accounts with balance
fn create_funded_account<T: Config>(
    name: &'static str,
    index: u32,
    balance: u32,
) -> T::AccountId {
    let caller: T::AccountId = account(name, index, SEED);
    T::Currency::make_free_balance_be(&caller, balance.into());
    caller
}

// Example: Helper to generate random data of specified size
fn generate_data(size: usize) -> Vec<u8> {
    (0..size).map(|i| (i % 256) as u8).collect()
}
```

## Step 8: Run the Benchmarks

Run the benchmarks to generate weight constants:

```bash
cargo run --release --features runtime-benchmarks -- benchmark pallet \
  --chain=dev \
  --steps=50 \
  --repeat=20 \
  --pallet="pallet_your_pallet" \
  --extrinsic="*" \
  --execution=wasm \
  --wasm-execution=compiled \
  --output=pallets/your-pallet/src/weights.rs
```

## Step 9: Review and Refine

After running benchmarks:

1. Review the generated `weights.rs` file
2. Check for anomalies or unexpectedly high weights
3. Refine the benchmark implementation if needed
4. Rerun benchmarks after significant pallet changes

## Step 10: Documentation

Document the benchmarking process:

1. Update the pallet's README with benchmarking information
2. Document assumptions made in the benchmarks
3. Note any special considerations for running benchmarks
4. Add benchmarking results to performance documentation

## Common Patterns and Best Practices

### Linear Scaling Parameters

Use parameters to scale various aspects of the benchmark:

```rust
some_extrinsic {
    let i in 1..1000;    // Number of items
    let j in 1..1000;    // Size of each item
    let k in 1..100;     // Number of accounts
    
    // Setup that uses i, j, and k...
}: _(...)
```

### Complex Data Generation

For complex data types, create helper functions:

```rust
fn create_product_data(complexity: u32) -> ProductData<T> {
    // Generate product data with appropriate complexity
}

fn generate_proof(size: usize) -> Vec<u8> {
    // Generate mock proof data
}
```

### Cross-Pallet Dependencies

When benchmarking operations that depend on other pallets:

```rust
some_extrinsic {
    // Setup dependencies in other pallets
    let origin_pallet = OriginVerifier::<T>::register_product(...);
    let pool = InsurancePool::<T>::create_pool(...);
    
    // Now benchmark the extrinsic that relies on these
}: _(...)
```

### Error Path Benchmarking

Benchmark error paths to ensure proper weight calculation:

```rust
extrinsic_error_case {
    // Setup that will cause the extrinsic to fail in a specific way
}: {
    assert_noop!(
        Pallet::<T>::extrinsic_name(
            RawOrigin::Signed(caller).into(),
            invalid_params,
        ),
        Error::<T>::ExpectedError
    );
}
```

## Troubleshooting

### Common Issues and Solutions

1. **Compilation Errors**: Ensure all dependencies with the `runtime-benchmarks` feature are properly configured.

2. **Runtime Errors**: Check that your benchmark setup correctly initializes all required state.

3. **Inconsistent Results**: Increase the `--repeat` parameter to reduce variance in the results.

4. **High Variance**: Review the benchmark implementation for non-deterministic behavior.

5. **Benchmark Timing Out**: Simplify the benchmark or adjust timeout settings.

6. **Weight Calculation Errors**: Check that the generated weights file is correctly imported and used in the pallet. 