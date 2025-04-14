# Aduana Pallet Benchmarking Guide

This document provides specific instructions for benchmarking the custom pallets in the Aduana project.

## Pallet Overview

The Aduana project consists of several specialized pallets that require benchmarking:

1. **Origin Verifier Pallet**: Handles zero-knowledge verification of supply chain origins
2. **Insurance Pool Pallet**: Manages risk pooling for trade participants
3. **Tariff Logic Pallet**: Calculates tariffs based on origin and certification
4. **Synthetic Market Pallet**: Facilitates derivatives trading for tariff hedging
5. **Duana Token Pallet**: Implements governance token functionality

## Benchmarking Priorities

For each pallet, different extrinsics have different priorities for benchmarking:

### Origin Verifier Pallet

Critical benchmarks:
- `verify_claim`: The most computationally intensive operation involving ZK proof verification
- `register_product`: Operation with storage scaling concerns
- `submit_claim`: Operation with complex input validation

### Insurance Pool Pallet

Critical benchmarks:
- `create_pool`: Complex setup with multiple storage operations
- `join_pool`: High-frequency operation requiring optimization
- `process_claim`: Complex operation with multiple dependencies

### Tariff Logic Pallet

Critical benchmarks:
- `calculate_tariff`: Complex computation that may impact transaction throughput
- `register_tariff_rule`: Storage-intensive operation
- `update_rules`: Operation that may require frequent amendments

### Synthetic Market Pallet

Critical benchmarks:
- `create_derivative`: Complex setup with multiple storage operations
- `create_market`: Storage-intensive initialization
- `match_orders`: High computational complexity with ordering and matching

### Duana Token Pallet

Critical benchmarks:
- `propose`: Governance proposal creation with complex validation
- `vote`: High-frequency operation with voting weight calculation
- `execute`: Complex execution of approved governance proposals

## Implementation Guidelines

When implementing benchmarks for Aduana pallets, follow these guidelines:

1. **ZK Operations**: For the Origin Verifier pallet, simulate ZK proof verification with realistic computational load.

2. **Data Scaling**: For each benchmark, include parameters that scale with:
   - Number of participants (for pool operations)
   - Size of data (for registration operations)
   - Complexity of rules (for tariff calculations)

3. **Cross-Pallet Interactions**: Some operations involve multiple pallets. Create benchmarks that simulate realistic interaction patterns.

4. **Error Cases**: Include benchmarks for common error conditions to ensure proper weight calculation for failed transactions.

## Example: Origin Verifier Benchmark Implementation

Here's a blueprint for implementing benchmarks for the Origin Verifier pallet:

```rust
#[cfg(feature = "runtime-benchmarks")]
mod benchmarking {
    use super::*;
    use frame_benchmarking::{benchmarks, whitelisted_caller, impl_benchmark_test_suite};
    use frame_system::RawOrigin;
    
    // Sample ZK proof data for benchmarking
    fn sample_zk_proof(size: usize) -> Vec<u8> {
        let mut proof = Vec::with_capacity(size);
        for i in 0..size {
            proof.push((i % 256) as u8);
        }
        proof
    }

    benchmarks! {
        verify_claim {
            let c in 1..1000;  // Vary complexity parameter
            
            let caller: T::AccountId = whitelisted_caller();
            let claim_id = T::Hash::default();
            let product_id = 1u32;
            
            // Register a product
            Pallet::<T>::register_product(
                RawOrigin::Signed(caller.clone()).into(),
                product_id,
                vec![1, 2, 3],
                b"Test Product".to_vec(),
            )?;
            
            // Submit a claim
            let proof = sample_zk_proof(c as usize);
            Pallet::<T>::submit_claim(
                RawOrigin::Signed(caller.clone()).into(),
                product_id,
                proof.clone(),
                b"Test Origin".to_vec(),
            )?;
            
        }: _(RawOrigin::Signed(caller), claim_id)
        verify {
            // Verify claim was processed
            assert!(ClaimVerifications::<T>::contains_key(claim_id));
        }
        
        // Add more benchmark definitions...
    }

    impl_benchmark_test_suite!(
        Pallet,
        crate::mock::new_test_ext(),
        crate::mock::Test,
    );
}
```

## Running Specific Benchmarks

To run benchmarks for a specific Aduana pallet:

```bash
# Origin Verifier pallet
cargo run --release --features runtime-benchmarks -- benchmark pallet \
  --chain=dev \
  --steps=50 \
  --repeat=20 \
  --pallet="pallet_origin_verifier" \
  --extrinsic="*" \
  --execution=wasm \
  --wasm-execution=compiled \
  --output=pallets/origin-verifier/src/weights.rs

# Insurance Pool pallet
cargo run --release --features runtime-benchmarks -- benchmark pallet \
  --chain=dev \
  --steps=50 \
  --repeat=20 \
  --pallet="pallet_insurance_pool" \
  --extrinsic="*" \
  --execution=wasm \
  --wasm-execution=compiled \
  --output=pallets/insurance-pool/src/weights.rs

# Add similar commands for other pallets...
```

## Analyzing Results

After running benchmarks, analyze the results to identify:

1. **Computational Bottlenecks**: Extrinsics with unusually high weights
2. **Scaling Concerns**: Operations that scale poorly with increasing input size
3. **Optimization Opportunities**: Areas where code changes could reduce weights

Document your findings and update the pallet implementation to address any issues.

## Weight Constants

Once benchmarks are complete, update the weight constants in each pallet. Here's an example for the Origin Verifier pallet:

```rust
pub trait WeightInfo {
    fn verify_claim() -> Weight;
    fn register_product() -> Weight;
    fn submit_claim() -> Weight;
    // Add more extrinsics...
}

pub struct SubstrateWeight<T>(PhantomData<T>);
impl<T: frame_system::Config> WeightInfo for SubstrateWeight<T> {
    // These values will be automatically filled when running benchmarks
    fn verify_claim() -> Weight {
        Weight::from_parts(42_000_000, 0)
            .saturating_add(T::DbWeight::get().reads(3))
            .saturating_add(T::DbWeight::get().writes(2))
    }
    
    // Add more weight implementations...
}
```

## Continuous Benchmarking

As the Aduana project evolves, regularly update benchmarks to ensure accurate weight calculations. Consider setting up a CI/CD process to run benchmarks automatically when significant changes are made to the pallets. 