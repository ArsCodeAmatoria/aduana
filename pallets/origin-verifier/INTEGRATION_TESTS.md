# Origin Verifier Pallet Integration Tests Documentation

This document outlines the integration tests designed for the Origin Verifier pallet with a focus on ZkClaim verification. Due to some implementation challenges with the current pallet structure, we've created a detailed test plan rather than implemented tests directly in the codebase.

## Test Plan Overview

The integration tests are designed to verify the following key aspects of the Origin Verifier pallet:

1. Verification fee handling
2. Interaction with the Balances pallet
3. ZK claim verification process
4. Proper permission handling
5. Fee management

## Test Cases

### 1. Verify Claim Charges Verification Fee

**Objective:** Ensure that when a claim is verified, the appropriate verification fee is charged from the product owner and transferred to the admin account.

**Test Steps:**
1. Register a product as ALICE
2. Note initial balances of ALICE and ADMIN
3. Have BOB submit a claim for verification
4. ALICE verifies the claim
5. Check that ALICE's balance is decreased by the verification fee amount
6. Check that ADMIN's balance is increased by the verification fee amount
7. Verify that the product is now marked as verified

**Expected Outcome:**
- Fee transfer is successful
- Product verification status is updated

### 2. Verify Claim Fails with Insufficient Balance

**Objective:** Ensure that verification fails if the product owner does not have enough balance to pay the verification fee.

**Test Steps:**
1. Create a "poor account" with balance just below the verification fee
2. Register a product as this poor account
3. Have BOB submit a claim for verification
4. Attempt to verify the claim
5. Check that verification fails with InsufficientBalance error
6. Confirm that the product remains unverified

**Expected Outcome:**
- Verification transaction fails with appropriate error
- Product verification status remains unchanged

### 3. Admin Can Update Verification Fee

**Objective:** Confirm that only the admin account can update the verification fee.

**Test Steps:**
1. Note the initial verification fee
2. Have ADMIN update the fee to a new value
3. Check that the fee is updated correctly
4. Have a non-admin account (ALICE) attempt to update the fee
5. Verify this attempt fails with NotAuthorized error

**Expected Outcome:**
- Admin can update the fee
- Non-admin accounts cannot update the fee

### 4. Invalid Proof Fails Verification

**Objective:** Ensure that claims with invalid proof data are not verified even if the verification transaction succeeds.

**Test Steps:**
1. Register a product as ALICE
2. Have BOB submit a claim with empty proof data (which will fail verification)
3. ALICE verifies the claim (transaction succeeds)
4. Check that the product is not marked as verified due to the invalid proof

**Expected Outcome:**
- Transaction succeeds but verification fails
- Product remains unverified

### 5. Only Owner or Admin Can Verify Claims

**Objective:** Ensure that only the product owner or admin can verify claims.

**Test Steps:**
1. Register a product as ALICE
2. Have BOB submit a claim for verification
3. Have CHARLIE (neither owner nor admin) attempt to verify the claim
4. Check that this fails with NotAuthorized error
5. Have ADMIN verify the claim
6. Check that the product is now verified

**Expected Outcome:**
- Unauthorized accounts cannot verify claims
- Product owner and admin can verify claims

## ZkClaim Structure

For integration testing purposes, we use a simplified ZkClaim structure:

```rust
pub struct ZkClaim {
    pub claim_type: ClaimType,
    pub product_id: Vec<u8>,
    pub proof_data: Vec<u8>,
    pub metadata: Vec<u8>,
}

pub enum ClaimType {
    OriginCountry,
    Manufacturing,
    Shipping,
    Customs,
    Certification,
    Custom(Vec<u8>),
}
```

## Verification Process

The verification process follows these steps:

1. A claim is submitted by any account
2. The claim is stored as pending verification
3. The product owner or admin initiates verification
4. The system checks if the product owner has sufficient balance to pay the verification fee
5. The verification fee is transferred from product owner to admin
6. The ZK proof is verified (in our mock, this succeeds if proof_data is not empty)
7. If verification succeeds, the product is marked as verified
8. The claim is removed from pending verifications

## Mock Implementation

The ideal implementation would use a mock that includes:

1. A mock runtime with System, Balances, and OriginVerifier pallets
2. A mock ZkVerifier that can deterministically verify claims
3. Storage for products, verification status, and pending claims
4. Proper event emission for tracking actions

## Implementation Notes

When implementing these tests in the future, consider:

1. Using BoundedVec instead of Vec where possible to comply with MaxEncodedLen requirements
2. Properly defining the Weight for extrinsics
3. Implementing the integration with the runtime more carefully
4. Adding proper balances integration for fee handling

## Conclusion

These integration tests provide a comprehensive verification of the Origin Verifier pallet's functionality, particularly around ZkClaim verification and fee handling. When implemented, they will ensure that the pallet operates correctly and integrates properly with other pallets in the Substrate runtime. 