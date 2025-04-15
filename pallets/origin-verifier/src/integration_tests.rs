#![cfg(test)]

use frame_support::{
    assert_ok, assert_noop,
    traits::{Hooks, Currency, OnFinalize, OnInitialize},
    weights::Weight,
    dispatch::DispatchResult,
};
use frame_system::RawOrigin;
use sp_core::H256;
use sp_runtime::{traits::{BlakeTwo256, IdentityLookup}, BuildStorage};
use codec::{Encode, Decode, MaxEncodedLen};
use scale_info::TypeInfo;

// Define mock accounts for testing
pub const ALICE: u64 = 1;
pub const BOB: u64 = 2;
pub const CHARLIE: u64 = 3;
pub const ADMIN: u64 = 999;

// A mock ZK claim for testing
#[derive(Clone, Encode, Decode, PartialEq, Debug)]
pub struct ZkClaim {
    pub claim_type: ClaimType,
    pub product_id: Vec<u8>,
    pub proof_data: Vec<u8>,
    pub metadata: Vec<u8>,
}

// Types of claims
#[derive(Clone, Encode, Decode, PartialEq, Debug)]
pub enum ClaimType {
    OriginCountry,
    Manufacturing,
    Shipping,
    Customs,
    Certification,
    Custom(Vec<u8>),
}

// Verification result
#[derive(Clone, Encode, Decode, PartialEq, Debug)]
pub enum VerificationResult {
    Success,
    Failure(Vec<u8>),
    Pending,
}

// A mock verifier that will simulate ZK proof verification
pub struct ZkVerifier;

impl ZkVerifier {
    // Mock verification function that succeeds if proof is not empty
    pub fn verify_claim(claim: &ZkClaim) -> VerificationResult {
        if claim.proof_data.is_empty() {
            return VerificationResult::Failure(b"Empty proof data".to_vec());
        }
        
        // Mock successful verification
        VerificationResult::Success
    }
}

// Define a mock runtime for testing
pub mod mock {
    use super::*;
    use frame_support::{parameter_types, traits::ConstU64};
    use frame_system as system;
    
    type UncheckedExtrinsic = frame_system::mocking::MockUncheckedExtrinsic<Test>;
    type Block = frame_system::mocking::MockBlock<Test>;
    
    // Configure a mock runtime for testing
    frame_support::construct_runtime!(
        pub enum Test where
            Block = Block,
            NodeBlock = Block,
            UncheckedExtrinsic = UncheckedExtrinsic,
        {
            System: system,
            Balances: pallet_balances,
            OriginVerifier: origin_verifier,
        }
    );
    
    impl system::Config for Test {
        type BaseCallFilter = frame_support::traits::Everything;
        type BlockWeights = ();
        type BlockLength = ();
        type DbWeight = ();
        type RuntimeOrigin = RuntimeOrigin;
        type RuntimeCall = RuntimeCall;
        type Index = u64;
        type BlockNumber = u64;
        type Hash = H256;
        type Hashing = BlakeTwo256;
        type AccountId = u64;
        type Lookup = IdentityLookup<Self::AccountId>;
        type Header = sp_runtime::generic::Header<u64, BlakeTwo256>;
        type RuntimeEvent = RuntimeEvent;
        type BlockHashCount = ConstU64<250>;
        type Version = ();
        type PalletInfo = PalletInfo;
        type AccountData = pallet_balances::AccountData<u64>;
        type OnNewAccount = ();
        type OnKilledAccount = ();
        type SystemWeightInfo = ();
        type SS58Prefix = ();
        type OnSetCode = ();
        type MaxConsumers = frame_support::traits::ConstU32<16>;
    }
    
    parameter_types! {
        pub const ExistentialDeposit: u64 = 1;
    }
    
    impl pallet_balances::Config for Test {
        type MaxLocks = ();
        type MaxReserves = ();
        type ReserveIdentifier = [u8; 8];
        type Balance = u64;
        type RuntimeEvent = RuntimeEvent;
        type DustRemoval = ();
        type ExistentialDeposit = ExistentialDeposit;
        type AccountStore = System;
        type WeightInfo = ();
        type FreezeIdentifier = ();
        type MaxFreezes = ();
        type HoldIdentifier = ();
        type MaxHolds = ();
    }
    
    parameter_types! {
        pub const VerificationFee: u64 = 100;
        pub const AdminAccount: u64 = ADMIN;
    }
    
    // Simple Origin Verifier pallet for integration testing
    pub mod origin_verifier {
        use super::*;
        use frame_support::{decl_module, decl_storage, decl_event, decl_error, dispatch::DispatchResult};
        use frame_system::ensure_signed;
        
        pub trait Config: frame_system::Config + pallet_balances::Config {
            type RuntimeEvent: From<Event<Self>> + Into<<Self as frame_system::Config>::RuntimeEvent>;
            type VerificationFee: frame_support::traits::Get<u64>;
            type AdminAccount: frame_support::traits::Get<Self::AccountId>;
        }
        
        decl_storage! {
            trait Store for Module<T: Config> as OriginVerifier {
                // Product storage
                Products get(fn products): map hasher(blake2_128_concat) Vec<u8> => Option<ProductInfo<T::AccountId>>;
                
                // Verification status for products
                VerificationStatus get(fn verification_status): map hasher(blake2_128_concat) Vec<u8> => bool;
                
                // Pending verifications
                PendingVerifications get(fn pending_verifications): map hasher(blake2_128_concat) Vec<u8> => Option<ZkClaim>;
                
                // Verification fees 
                VerificationFee get(fn verification_fee): u64 = T::VerificationFee::get();
            }
        }
        
        decl_event! {
            pub enum Event<T> where
                AccountId = <T as frame_system::Config>::AccountId,
            {
                ProductRegistered(Vec<u8>, AccountId),
                ClaimSubmitted(Vec<u8>, AccountId),
                ClaimVerified(Vec<u8>, bool),
                FeePaid(AccountId, AccountId, u64),
            }
        }
        
        decl_error! {
            pub enum Error for Module<T: Config> {
                ProductNotFound,
                ProductAlreadyExists,
                NotAuthorized,
                InsufficientBalance,
                InvalidClaimData,
            }
        }
        
        decl_module! {
            pub struct Module<T: Config> for enum Call where origin: T::RuntimeOrigin {
                // Register a new product
                #[weight = 10_000]
                pub fn register_product(origin, product_id: Vec<u8>, name: Vec<u8>, description: Vec<u8>) -> DispatchResult {
                    let who = ensure_signed(origin)?;
                    
                    // Ensure product doesn't already exist
                    ensure!(!Products::<T>::contains_key(&product_id), Error::<T>::ProductAlreadyExists);
                    
                    // Store product info
                    Products::<T>::insert(&product_id, ProductInfo {
                        owner: who.clone(),
                        name,
                        description,
                        verified: false,
                    });
                    
                    // Default verification status to false
                    VerificationStatus::insert(&product_id, false);
                    
                    // Emit event
                    Self::deposit_event(RawEvent::ProductRegistered(product_id, who));
                    
                    Ok(())
                }
                
                // Submit a claim for verification
                #[weight = 10_000]
                pub fn submit_claim_for_verification(
                    origin, 
                    claim_id: Vec<u8>, 
                    product_id: Vec<u8>, 
                    proof_data: Vec<u8>
                ) -> DispatchResult {
                    let who = ensure_signed(origin)?;
                    
                    // Ensure product exists
                    ensure!(Products::<T>::contains_key(&product_id), Error::<T>::ProductNotFound);
                    
                    // Create and store claim
                    let claim = ZkClaim {
                        claim_type: ClaimType::OriginCountry,
                        product_id: product_id.clone(),
                        proof_data,
                        metadata: Vec::new(),
                    };
                    
                    // Store as pending verification
                    PendingVerifications::insert(&claim_id, claim);
                    
                    // Emit event
                    Self::deposit_event(RawEvent::ClaimSubmitted(product_id, who));
                    
                    Ok(())
                }
                
                // Verify a claim (can be called by product owner or admin)
                #[weight = 10_000]
                pub fn verify_claim(origin, claim_id: Vec<u8>) -> DispatchResult {
                    let who = ensure_signed(origin)?;
                    
                    // Get the claim
                    let claim = PendingVerifications::get(&claim_id).ok_or(Error::<T>::InvalidClaimData)?;
                    
                    // Get the product
                    let product = Products::<T>::get(&claim.product_id).ok_or(Error::<T>::ProductNotFound)?;
                    
                    // Ensure caller is product owner or admin
                    ensure!(
                        product.owner == who || T::AdminAccount::get() == who,
                        Error::<T>::NotAuthorized
                    );
                    
                    // Require fee from the product owner
                    let fee = T::VerificationFee::get();
                    
                    // Check if product owner has enough balance
                    let owner_balance = pallet_balances::Pallet::<T>::free_balance(&product.owner);
                    ensure!(owner_balance >= fee.into(), Error::<T>::InsufficientBalance);
                    
                    // Transfer fee from product owner to admin
                    let _ = pallet_balances::Pallet::<T>::transfer(
                        frame_system::RawOrigin::Signed(product.owner.clone()).into(),
                        T::AdminAccount::get(),
                        fee.into(),
                    );
                    
                    // Emit fee paid event
                    Self::deposit_event(RawEvent::FeePaid(product.owner.clone(), T::AdminAccount::get(), fee));
                    
                    // Verify the claim
                    let result = ZkVerifier::verify_claim(&claim);
                    
                    let success = match result {
                        VerificationResult::Success => true,
                        _ => false,
                    };
                    
                    // If verified, update product verification status
                    if success {
                        VerificationStatus::insert(&claim.product_id, true);
                        
                        // Update product
                        let mut updated_product = product.clone();
                        updated_product.verified = true;
                        Products::<T>::insert(&claim.product_id, updated_product);
                    }
                    
                    // Remove from pending
                    PendingVerifications::remove(&claim_id);
                    
                    // Emit event
                    Self::deposit_event(RawEvent::ClaimVerified(claim.product_id, success));
                    
                    Ok(())
                }
                
                // Update verification fee (admin only)
                #[weight = 10_000]
                pub fn update_verification_fee(origin, new_fee: u64) -> DispatchResult {
                    let who = ensure_signed(origin)?;
                    
                    // Ensure caller is admin
                    ensure!(T::AdminAccount::get() == who, Error::<T>::NotAuthorized);
                    
                    // Update fee
                    VerificationFee::put(new_fee);
                    
                    Ok(())
                }
                
                // Implement the hooks to perform automatic verification
                fn on_initialize(_block_number: T::BlockNumber) -> Weight {
                    // In a real implementation, we would process pending verifications here
                    Weight::from_parts(0, 0)
                }
            }
        }
        
        // Product information
        #[derive(Clone, Encode, Decode, PartialEq, Debug)]
        pub struct ProductInfo<AccountId> {
            pub owner: AccountId,
            pub name: Vec<u8>,
            pub description: Vec<u8>,
            pub verified: bool,
        }
    }
    
    impl origin_verifier::Config for Test {
        type RuntimeEvent = RuntimeEvent;
        type VerificationFee = VerificationFee;
        type AdminAccount = AdminAccount;
    }
    
    // Build genesis storage
    pub fn new_test_ext() -> sp_io::TestExternalities {
        let mut t = frame_system::GenesisConfig::default().build_storage::<Test>().unwrap();
        
        pallet_balances::GenesisConfig::<Test> {
            balances: vec![
                (ALICE, 10000),
                (BOB, 10000),
                (CHARLIE, 10000),
                (ADMIN, 10000),
            ],
        }.assimilate_storage(&mut t).unwrap();
        
        let ext = sp_io::TestExternalities::new(t);
        ext
    }
}

// Actual integration tests
#[test]
fn verify_claim_charges_verification_fee() {
    mock::new_test_ext().execute_with(|| {
        use crate::mock::{Test, System, Balances, OriginVerifier, RuntimeOrigin};
        
        // Register a product as ALICE
        let product_id = b"PROD001".to_vec();
        assert_ok!(OriginVerifier::register_product(
            RuntimeOrigin::signed(ALICE),
            product_id.clone(),
            b"Test Product".to_vec(),
            b"Test Description".to_vec(),
        ));
        
        // Initial balances
        let alice_initial = Balances::free_balance(ALICE);
        let admin_initial = Balances::free_balance(ADMIN);
        
        // BOB submits a claim
        let claim_id = b"CLAIM001".to_vec();
        assert_ok!(OriginVerifier::submit_claim_for_verification(
            RuntimeOrigin::signed(BOB),
            claim_id.clone(),
            product_id.clone(),
            b"valid proof data".to_vec(),
        ));
        
        // ALICE verifies the claim
        assert_ok!(OriginVerifier::verify_claim(
            RuntimeOrigin::signed(ALICE),
            claim_id.clone(),
        ));
        
        // Check fee was charged
        let verification_fee = mock::VerificationFee::get();
        assert_eq!(Balances::free_balance(ALICE), alice_initial - verification_fee);
        assert_eq!(Balances::free_balance(ADMIN), admin_initial + verification_fee);
        
        // Check product is now verified
        let product = OriginVerifier::products(&product_id).unwrap();
        assert!(product.verified);
    });
}

#[test]
fn verify_claim_fails_with_insufficient_balance() {
    mock::new_test_ext().execute_with(|| {
        use crate::mock::{Test, System, Balances, OriginVerifier, RuntimeOrigin, VerificationFee};
        
        // Register a product as CHARLIE (who has low balance)
        let poor_account = 100u64;
        
        // Set a low balance for poor_account
        let low_balance = VerificationFee::get() - 1; // Just below the verification fee
        Balances::make_free_balance_be(&poor_account, low_balance);
        
        let product_id = b"PROD002".to_vec();
        assert_ok!(OriginVerifier::register_product(
            RuntimeOrigin::signed(poor_account),
            product_id.clone(),
            b"Poor Product".to_vec(),
            b"Product with poor owner".to_vec(),
        ));
        
        // BOB submits a claim
        let claim_id = b"CLAIM002".to_vec();
        assert_ok!(OriginVerifier::submit_claim_for_verification(
            RuntimeOrigin::signed(BOB),
            claim_id.clone(),
            product_id.clone(),
            b"valid proof data".to_vec(),
        ));
        
        // Verification should fail due to insufficient balance
        assert_noop!(
            OriginVerifier::verify_claim(
                RuntimeOrigin::signed(poor_account),
                claim_id.clone(),
            ),
            mock::origin_verifier::Error::<Test>::InsufficientBalance
        );
        
        // Product should remain unverified
        let product = OriginVerifier::products(&product_id).unwrap();
        assert!(!product.verified);
    });
}

#[test]
fn admin_can_update_verification_fee() {
    mock::new_test_ext().execute_with(|| {
        use crate::mock::{Test, System, OriginVerifier, RuntimeOrigin};
        
        // Initial fee
        let initial_fee = OriginVerifier::verification_fee();
        
        // Admin updates fee
        let new_fee = initial_fee * 2;
        assert_ok!(
            OriginVerifier::update_verification_fee(
                RuntimeOrigin::signed(ADMIN),
                new_fee,
            )
        );
        
        // Check fee was updated
        assert_eq!(OriginVerifier::verification_fee(), new_fee);
        
        // Non-admin cannot update fee
        assert_noop!(
            OriginVerifier::update_verification_fee(
                RuntimeOrigin::signed(ALICE),
                new_fee + 1,
            ),
            mock::origin_verifier::Error::<Test>::NotAuthorized
        );
    });
}

#[test]
fn invalid_proof_fails_verification() {
    mock::new_test_ext().execute_with(|| {
        use crate::mock::{Test, System, OriginVerifier, RuntimeOrigin};
        
        // Register a product as ALICE
        let product_id = b"PROD003".to_vec();
        assert_ok!(OriginVerifier::register_product(
            RuntimeOrigin::signed(ALICE),
            product_id.clone(),
            b"Test Product".to_vec(),
            b"Test Description".to_vec(),
        ));
        
        // BOB submits a claim with empty proof (which will fail verification)
        let claim_id = b"CLAIM003".to_vec();
        assert_ok!(OriginVerifier::submit_claim_for_verification(
            RuntimeOrigin::signed(BOB),
            claim_id.clone(),
            product_id.clone(),
            vec![], // Empty proof
        ));
        
        // ALICE verifies the claim, which should succeed as an extrinsic but not verify the product
        assert_ok!(OriginVerifier::verify_claim(
            RuntimeOrigin::signed(ALICE),
            claim_id.clone(),
        ));
        
        // Product should not be verified due to invalid proof
        let product = OriginVerifier::products(&product_id).unwrap();
        assert!(!product.verified);
    });
}

#[test]
fn only_owner_or_admin_can_verify_claims() {
    mock::new_test_ext().execute_with(|| {
        use crate::mock::{Test, System, OriginVerifier, RuntimeOrigin};
        
        // Register a product as ALICE
        let product_id = b"PROD004".to_vec();
        assert_ok!(OriginVerifier::register_product(
            RuntimeOrigin::signed(ALICE),
            product_id.clone(),
            b"Test Product".to_vec(),
            b"Test Description".to_vec(),
        ));
        
        // BOB submits a claim
        let claim_id = b"CLAIM004".to_vec();
        assert_ok!(OriginVerifier::submit_claim_for_verification(
            RuntimeOrigin::signed(BOB),
            claim_id.clone(),
            product_id.clone(),
            b"valid proof data".to_vec(),
        ));
        
        // CHARLIE (neither owner nor admin) tries to verify the claim
        assert_noop!(
            OriginVerifier::verify_claim(
                RuntimeOrigin::signed(CHARLIE),
                claim_id.clone(),
            ),
            mock::origin_verifier::Error::<Test>::NotAuthorized
        );
        
        // ADMIN can verify the claim
        assert_ok!(
            OriginVerifier::verify_claim(
                RuntimeOrigin::signed(ADMIN),
                claim_id.clone(),
            )
        );
        
        // Product should now be verified
        let product = OriginVerifier::products(&product_id).unwrap();
        assert!(product.verified);
    });
}

#[test]
fn test_cross_chain_verification_flow() {
    use frame_support::{assert_ok, assert_noop};
    use crate::{mock::*, runtime_integration::*, Error, VerificationStatus, PendingVerifications, CrossChainVerifications};
    use frame_system::pallet_prelude::*;
    use frame_support::traits::{OnInitialize, OnFinalize};
    
    new_test_ext().execute_with(|| {
        // Setup: Register a product
        let product_id = b"product123".to_vec();
        let claim_id = b"claim123".to_vec();
        
        assert_ok!(
            OriginVerifier::register_product(
                RuntimeOrigin::signed(ALICE),
                product_id.clone(),
                b"Test Product".to_vec(),
                b"A product for testing".to_vec(),
                b"US".to_vec(),
                b"1234.56.78".to_vec(),
                1234567890,
                b"Test metadata".to_vec(),
                Some(b"did:pop:alice".to_vec()),
            )
        );
        
        // Setup: Create a valid claim for cross-chain verification
        let claim = ZkClaim {
            claim_type: ClaimType::OriginCountry,
            public_inputs: b"test inputs".to_vec(),
            proof: vec![0x01, 2, 3, 4], // Valid proof
            metadata: b"test metadata".to_vec(),
            timestamp: 1234567890,
        };
        
        // Test: Submit a cross-chain verification request
        assert_ok!(
            OriginVerifier::submit_cross_chain_verification(
                RuntimeOrigin::signed(ALICE),
                200, // Para ID 200
                product_id.clone(),
                claim.clone(),
                claim_id.clone(),
            )
        );
        
        // Verify cross-chain verification is pending
        let claims = OriginVerifier::product_claims(&product_id);
        assert_eq!(claims.len(), 1);
        assert!(matches!(claims[0].status, VerificationStatus::Pending));
        assert!(claims[0].is_cross_chain);
        assert_eq!(claims[0].source_para_id, Some(200));
        
        // Verify the CrossChainVerifications storage contains our request
        assert!(CrossChainVerifications::<Test>::contains_key(&claim_id));
        
        // Test: Simulate receiving a cross-chain verification response
        let message = CrossChainMessage::VerificationResponse {
            claim_id: claim_id.clone(),
            result: VerificationResult::Success,
        };
        
        assert_ok!(OriginVerifier::handle_cross_chain_message(200, message));
        
        // Verify the claim is now approved
        let claims = OriginVerifier::product_claims(&product_id);
        assert_eq!(claims.len(), 1);
        assert!(matches!(claims[0].status, VerificationStatus::Approved));
        
        // Verify the CrossChainVerifications storage no longer contains our request
        assert!(!CrossChainVerifications::<Test>::contains_key(&claim_id));
        
        // Verify the product's origin is now verified
        let product = OriginVerifier::products(&product_id).unwrap();
        assert!(product.origin_verified);
        
        // Test error: Submit a cross-chain verification for a non-existent product
        let bad_product_id = b"doesnotexist".to_vec();
        let bad_claim_id = b"badclaim".to_vec();
        
        assert_noop!(
            OriginVerifier::submit_cross_chain_verification(
                RuntimeOrigin::signed(ALICE),
                200,
                bad_product_id,
                claim.clone(),
                bad_claim_id,
            ),
            Error::<Test>::ProductNotFound
        );
        
        // Test: Test timeout handling
        let timeout_product_id = b"timeout_product".to_vec();
        let timeout_claim_id = b"timeout_claim".to_vec();
        
        // Register the product
        assert_ok!(
            OriginVerifier::register_product(
                RuntimeOrigin::signed(ALICE),
                timeout_product_id.clone(),
                b"Timeout Product".to_vec(),
                b"A product for testing timeouts".to_vec(),
                b"JP".to_vec(),
                b"9876.54.32".to_vec(),
                1234567890,
                b"Test metadata".to_vec(),
                None,
            )
        );
        
        // Create a claim that will timeout
        let timeout_claim = ZkClaim {
            claim_type: ClaimType::OriginCountry,
            public_inputs: b"test inputs".to_vec(),
            proof: vec![0x02, 2, 3, 4], // Pending proof
            metadata: b"test metadata".to_vec(),
            timestamp: 1234567890,
        };
        
        // Submit the claim
        assert_ok!(
            OriginVerifier::submit_claim(
                RuntimeOrigin::signed(ALICE),
                timeout_product_id.clone(),
                timeout_claim,
                timeout_claim_id.clone(),
            )
        );
        
        // Verify the claim is pending
        let claims = OriginVerifier::product_claims(&timeout_product_id);
        assert_eq!(claims.len(), 1);
        assert!(matches!(claims[0].status, VerificationStatus::Pending));
        
        // Advance blocks past the timeout period
        let timeout = VerificationTimeout::get();
        for _ in 0..timeout + 1 {
            System::set_block_number(System::block_number() + 1);
            OriginVerifier::on_initialize(System::block_number());
            OriginVerifier::on_finalize(System::block_number());
        }
        
        // Verify the claim is now timed out
        let claims = OriginVerifier::product_claims(&timeout_product_id);
        assert_eq!(claims.len(), 1);
        assert!(matches!(claims[0].status, VerificationStatus::TimedOut));
        
        // Verify the pending verification has been removed
        assert!(!PendingVerifications::<Test>::contains_key(&timeout_claim_id));
    });
}

#[test]
fn test_admin_privileges() {
    use frame_support::{assert_ok, assert_noop};
    use crate::{mock::*, runtime_integration::*, Error, VerificationStatus, AuthorizedVerifiers};
    
    new_test_ext().execute_with(|| {
        // Test: Add a new authorized verifier
        assert_ok!(
            OriginVerifier::set_verifier_authorization(
                RuntimeOrigin::signed(ADMIN),
                BOB,
                true,
            )
        );
        
        // Verify BOB is now an authorized verifier
        assert!(AuthorizedVerifiers::<Test>::get(&BOB));
        
        // Test: Non-admin cannot add verifiers
        assert_noop!(
            OriginVerifier::set_verifier_authorization(
                RuntimeOrigin::signed(ALICE),
                CHARLIE,
                true,
            ),
            Error::<Test>::RequiresAdminPrivileges
        );
        
        // Test: Update verification fee
        let new_fee: u64 = 200;
        assert_ok!(
            OriginVerifier::update_verification_fee(
                RuntimeOrigin::signed(ADMIN),
                ClaimType::OriginCountry,
                new_fee,
            )
        );
        
        // Test: Non-admin cannot update verification fee
        assert_noop!(
            OriginVerifier::update_verification_fee(
                RuntimeOrigin::signed(ALICE),
                ClaimType::OriginCountry,
                300,
            ),
            Error::<Test>::RequiresAdminPrivileges
        );
        
        // Setup: Register a product and submit a claim
        let product_id = b"admin_test_product".to_vec();
        let claim_id = b"admin_test_claim".to_vec();
        
        assert_ok!(
            OriginVerifier::register_product(
                RuntimeOrigin::signed(ALICE),
                product_id.clone(),
                b"Admin Test Product".to_vec(),
                b"A product for testing admin privileges".to_vec(),
                b"UK".to_vec(),
                b"1234.56.78".to_vec(),
                1234567890,
                b"Test metadata".to_vec(),
                None,
            )
        );
        
        let claim = ZkClaim {
            claim_type: ClaimType::OriginCountry,
            public_inputs: b"test inputs".to_vec(),
            proof: vec![0x01, 2, 3, 4], // Valid proof
            metadata: b"test metadata".to_vec(),
            timestamp: 1234567890,
        };
        
        assert_ok!(
            OriginVerifier::submit_claim(
                RuntimeOrigin::signed(ALICE),
                product_id.clone(),
                claim,
                claim_id.clone(),
            )
        );
        
        // Test: Admin can verify claims
        assert_ok!(
            OriginVerifier::verify_claim(
                RuntimeOrigin::signed(ADMIN),
                product_id.clone(),
                claim_id.clone(),
                true,
                None,
            )
        );
        
        // Verify the claim is approved
        let claims = OriginVerifier::product_claims(&product_id);
        assert_eq!(claims.len(), 1);
        assert!(matches!(claims[0].status, VerificationStatus::Approved));
        
        // Test: Admin can revoke approvals
        let revocation_reason = b"Fraudulent claim".to_vec();
        assert_ok!(
            OriginVerifier::revoke_claim(
                RuntimeOrigin::signed(ADMIN),
                product_id.clone(),
                claim_id.clone(),
                revocation_reason.clone(),
            )
        );
        
        // Verify the claim is now revoked
        let claims = OriginVerifier::product_claims(&product_id);
        assert_eq!(claims.len(), 1);
        if let VerificationStatus::Revoked(reason) = &claims[0].status {
            assert_eq!(reason, &revocation_reason);
        } else {
            panic!("Claim should be in Revoked state");
        }
        
        // Test: Only admin can revoke claims
        let another_product_id = b"another_product".to_vec();
        let another_claim_id = b"another_claim".to_vec();
        
        assert_ok!(
            OriginVerifier::register_product(
                RuntimeOrigin::signed(BOB),
                another_product_id.clone(),
                b"Another Product".to_vec(),
                b"Another test product".to_vec(),
                b"DE".to_vec(),
                b"4321.87.65".to_vec(),
                1234567890,
                b"Test metadata".to_vec(),
                None,
            )
        );
        
        let another_claim = ZkClaim {
            claim_type: ClaimType::OriginCountry,
            public_inputs: b"test inputs".to_vec(),
            proof: vec![0x01, 2, 3, 4], // Valid proof
            metadata: b"test metadata".to_vec(),
            timestamp: 1234567890,
        };
        
        assert_ok!(
            OriginVerifier::submit_claim(
                RuntimeOrigin::signed(BOB),
                another_product_id.clone(),
                another_claim,
                another_claim_id.clone(),
            )
        );
        
        // Have BOB (authorized verifier) approve the claim
        assert_ok!(
            OriginVerifier::verify_claim(
                RuntimeOrigin::signed(BOB),
                another_product_id.clone(),
                another_claim_id.clone(),
                true,
                None,
            )
        );
        
        // BOB attempts to revoke his own verified claim
        assert_noop!(
            OriginVerifier::revoke_claim(
                RuntimeOrigin::signed(BOB),
                another_product_id.clone(),
                another_claim_id.clone(),
                b"I changed my mind".to_vec(),
            ),
            Error::<Test>::RequiresAdminPrivileges
        );
        
        // The claim should still be approved
        let claims = OriginVerifier::product_claims(&another_product_id);
        assert_eq!(claims.len(), 1);
        assert!(matches!(claims[0].status, VerificationStatus::Approved));
    });
} 