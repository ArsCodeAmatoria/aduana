#![cfg(test)]

use crate::{mock::*, Error, Event, ProductInfo, ProductVerificationStatus};
use frame_support::{assert_noop, assert_ok};
use sp_runtime::BuildStorage;

#[test]
fn register_product_works() {
    new_test_ext().execute_with(|| {
        // Arrange
        let product_id = 1u32;
        let product_info = ProductInfo {
            owner: ALICE,
            name: b"Organic Coffee".to_vec(),
            description: b"Premium coffee from high altitude farms".to_vec(),
            verification_status: ProductVerificationStatus::Unverified,
        };

        // Act & Assert
        // Register a product as ALICE
        assert_ok!(OriginVerifier::register_product(
            RuntimeOrigin::signed(ALICE),
            product_id,
            b"Organic Coffee".to_vec(),
            b"Premium coffee from high altitude farms".to_vec(),
        ));

        // Check that the product was registered correctly
        assert_eq!(OriginVerifier::products(product_id), Some(product_info));

        // Check that the event was emitted
        System::assert_last_event(Event::ProductRegistered { 
            product_id, 
            owner: ALICE 
        }.into());

        // Try to register the same product ID again (should fail)
        assert_noop!(
            OriginVerifier::register_product(
                RuntimeOrigin::signed(BOB),
                product_id,
                b"Another product".to_vec(),
                b"Another description".to_vec(),
            ),
            Error::<Test>::ProductAlreadyExists
        );
    });
}

#[test]
fn submit_claim_for_verification_works() {
    new_test_ext().execute_with(|| {
        // Arrange - Register a product first
        let product_id = 1u32;
        assert_ok!(OriginVerifier::register_product(
            RuntimeOrigin::signed(ALICE),
            product_id,
            b"Organic Coffee".to_vec(),
            b"Premium coffee from high altitude farms".to_vec(),
        ));

        // Act & Assert
        let claim_id = 1u32;
        let proof_data = b"ZK proof for origin verification".to_vec();
        
        // Submit a claim for verification
        assert_ok!(OriginVerifier::submit_claim_for_verification(
            RuntimeOrigin::signed(BOB),
            claim_id,
            product_id,
            proof_data.clone(),
        ));

        // Check that the verification is pending
        assert!(OriginVerifier::pending_verifications(claim_id).is_some());
        
        // Check that the event was emitted
        System::assert_last_event(Event::ClaimSubmitted { 
            claim_id, 
            product_id, 
            submitter: BOB 
        }.into());

        // Try to submit a claim for a non-existent product
        assert_noop!(
            OriginVerifier::submit_claim_for_verification(
                RuntimeOrigin::signed(BOB),
                2u32,
                999u32, // Non-existent product ID
                proof_data.clone(),
            ),
            Error::<Test>::ProductNotFound
        );

        // Try to submit a claim with an existing claim ID
        assert_noop!(
            OriginVerifier::submit_claim_for_verification(
                RuntimeOrigin::signed(BOB),
                claim_id, // Already used
                product_id,
                proof_data,
            ),
            Error::<Test>::ClaimAlreadyExists
        );
    });
}

#[test]
fn verify_claim_works() {
    new_test_ext().execute_with(|| {
        // Arrange - Register a product and submit a claim
        let product_id = 1u32;
        let claim_id = 1u32;
        
        assert_ok!(OriginVerifier::register_product(
            RuntimeOrigin::signed(ALICE),
            product_id,
            b"Organic Coffee".to_vec(),
            b"Premium coffee from high altitude farms".to_vec(),
        ));
        
        assert_ok!(OriginVerifier::submit_claim_for_verification(
            RuntimeOrigin::signed(BOB),
            claim_id,
            product_id,
            b"ZK proof for origin verification".to_vec(),
        ));

        // Act & Assert
        // Verify the claim as the product owner
        assert_ok!(OriginVerifier::verify_claim(
            RuntimeOrigin::signed(ALICE),
            claim_id,
            true, // Approve the claim
        ));

        // Check that the claim is no longer pending
        assert!(OriginVerifier::pending_verifications(claim_id).is_none());
        
        // Check that the claim is now verified
        assert!(OriginVerifier::verified_claims(claim_id).is_some());
        
        // Check that the product's verification status is updated
        let product = OriginVerifier::products(product_id).unwrap();
        assert_eq!(product.verification_status, ProductVerificationStatus::Verified);
        
        // Check that the event was emitted
        System::assert_last_event(Event::ClaimVerified { 
            claim_id, 
            product_id, 
            verifier: ALICE 
        }.into());

        // Try to verify a non-existent claim
        assert_noop!(
            OriginVerifier::verify_claim(
                RuntimeOrigin::signed(ALICE),
                999u32, // Non-existent claim ID
                true,
            ),
            Error::<Test>::ClaimNotFound
        );

        // Try to verify as a non-owner
        let claim_id_2 = 2u32;
        assert_ok!(OriginVerifier::submit_claim_for_verification(
            RuntimeOrigin::signed(BOB),
            claim_id_2,
            product_id,
            b"Another ZK proof".to_vec(),
        ));
        
        assert_noop!(
            OriginVerifier::verify_claim(
                RuntimeOrigin::signed(BOB), // Not the product owner
                claim_id_2,
                true,
            ),
            Error::<Test>::NotAuthorized
        );
    });
}

#[test]
fn reject_claim_works() {
    new_test_ext().execute_with(|| {
        // Arrange - Register a product and submit a claim
        let product_id = 1u32;
        let claim_id = 1u32;
        
        assert_ok!(OriginVerifier::register_product(
            RuntimeOrigin::signed(ALICE),
            product_id,
            b"Organic Coffee".to_vec(),
            b"Premium coffee from high altitude farms".to_vec(),
        ));
        
        assert_ok!(OriginVerifier::submit_claim_for_verification(
            RuntimeOrigin::signed(BOB),
            claim_id,
            product_id,
            b"ZK proof for origin verification".to_vec(),
        ));

        // Act & Assert
        // Reject the claim as the product owner
        assert_ok!(OriginVerifier::verify_claim(
            RuntimeOrigin::signed(ALICE),
            claim_id,
            false, // Reject the claim
        ));

        // Check that the claim is no longer pending
        assert!(OriginVerifier::pending_verifications(claim_id).is_none());
        
        // Check that the product's verification status remains unchanged
        let product = OriginVerifier::products(product_id).unwrap();
        assert_eq!(product.verification_status, ProductVerificationStatus::Unverified);
        
        // Check that the event was emitted
        System::assert_last_event(Event::ClaimRejected { 
            claim_id, 
            product_id, 
            verifier: ALICE 
        }.into());
    });
}

#[test]
fn update_verification_fee_works() {
    new_test_ext().execute_with(|| {
        // Arrange
        let new_fee = 200u64;

        // Act & Assert
        // Update the verification fee as the admin
        assert_ok!(OriginVerifier::update_verification_fee(
            RuntimeOrigin::signed(ADMIN),
            new_fee,
        ));

        // Check that the fee was updated
        assert_eq!(OriginVerifier::verification_fee(), new_fee);
        
        // Check that the event was emitted
        System::assert_last_event(Event::VerificationFeeUpdated { 
            new_fee 
        }.into());

        // Try to update as a non-admin
        assert_noop!(
            OriginVerifier::update_verification_fee(
                RuntimeOrigin::signed(ALICE), // Not the admin
                300u64,
            ),
            Error::<Test>::NotAuthorized
        );
    });
} 