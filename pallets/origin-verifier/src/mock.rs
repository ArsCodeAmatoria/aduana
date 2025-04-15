use crate as pallet_origin_verifier;
use frame_support::{
    parameter_types,
    traits::{ConstU32, ConstU64, GenesisBuild},
};
use frame_system as system;
use sp_core::H256;
use sp_runtime::{
    traits::{BlakeTwo256, IdentityLookup},
    BuildStorage,
};

// Add runtime_integration module
pub mod runtime_integration {
    use codec::{Encode, Decode, MaxEncodedLen};
    use scale_info::TypeInfo;
    use frame_support::RuntimeDebug;
    use sp_std::prelude::*;
    
    // Re-export integration types for tests
    pub use crate::runtime_integration::{ClaimType, ZkClaim, VerificationResult};
    
    /// Mock API client for interacting with Proof of Personhood (POP) services
    pub struct PopApiClient;
    
    impl PopApiClient {
        /// Mock verification of a ZK claim that always succeeds if proof is not empty
        pub fn verify_zk_claim(claim: &ZkClaim) -> VerificationResult {
            if claim.proof.is_empty() {
                VerificationResult::Failure(b"Empty proof".to_vec())
            } else {
                VerificationResult::Success
            }
        }
    }
    
    // Define claim types
    #[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum ClaimType {
        OriginCountry,
        Manufacturing,
        Shipping,
        Customs,
        Certification,
        Custom(Vec<u8>),
    }
    
    // ZK Claim structure
    #[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct ZkClaim {
        pub claim_type: ClaimType,
        pub public_inputs: Vec<u8>,
        pub proof: Vec<u8>,
        pub metadata: Vec<u8>,
        pub timestamp: u64,
    }
    
    // Verification result
    #[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum VerificationResult {
        Success,
        Failure(Vec<u8>),
        Pending,
        Impossible,
    }
}

type UncheckedExtrinsic = frame_system::mocking::MockUncheckedExtrinsic<Test>;
type Block = frame_system::mocking::MockBlock<Test>;

// Define test accounts
pub const ALICE: u64 = 1;
pub const BOB: u64 = 2;
pub const CHARLIE: u64 = 3;
pub const ADMIN: u64 = 999;

// Configure a mock runtime to test the pallet
frame_support::construct_runtime!(
    pub enum Test where
        Block = Block,
        NodeBlock = Block,
        UncheckedExtrinsic = UncheckedExtrinsic,
    {
        System: system,
        Balances: pallet_balances,
        OriginVerifier: pallet_origin_verifier,
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
    type MaxConsumers = ConstU32<16>;
}

// Configure the Balances pallet for tests
impl pallet_balances::Config for Test {
    type MaxLocks = ();
    type MaxReserves = ();
    type ReserveIdentifier = [u8; 8];
    type Balance = u64;
    type RuntimeEvent = RuntimeEvent;
    type DustRemoval = ();
    type ExistentialDeposit = ConstU64<1>;
    type AccountStore = System;
    type WeightInfo = ();
    type FreezeIdentifier = ();
    type MaxFreezes = ();
    type HoldIdentifier = ();
    type MaxHolds = ();
}

parameter_types! {
    pub const AdminAccount: u64 = ADMIN;
    pub const DefaultVerificationFee: u64 = 100;
    pub const MaxClaimsPerProduct: u32 = 10;
    pub const MaxMetadataLength: u32 = 1024;
    pub const VerificationTimeout: u64 = 10; // 10 blocks
}

impl pallet_origin_verifier::Config for Test {
    type RuntimeEvent = RuntimeEvent;
    type Currency = Balances;
    type VerificationFee = DefaultVerificationFee;
    type MaxClaimsPerProduct = MaxClaimsPerProduct;
    type MaxMetadataLength = MaxMetadataLength;
    type VerificationTimeout = VerificationTimeout;
    type AdminAccount = AdminAccount;
}

// Build genesis storage according to the mock runtime
pub fn new_test_ext() -> sp_io::TestExternalities {
    let mut t = system::GenesisConfig::default().build_storage::<Test>().unwrap();
    
    // Initialize balances for testing
    pallet_balances::GenesisConfig::<Test> {
        balances: vec![
            (ALICE, 10000),
            (BOB, 10000),
            (CHARLIE, 10000),
            (ADMIN, 10000),
        ],
    }.assimilate_storage(&mut t).unwrap();
    
    // Initialize authorized verifiers
    pallet_origin_verifier::GenesisConfig::<Test> {
        authorized_verifiers: vec![
            (ADMIN, true),
            (ALICE, true),
        ],
        verification_fees: vec![
            (crate::runtime_integration::ClaimType::OriginCountry, 100),
            (crate::runtime_integration::ClaimType::Manufacturing, 150),
            (crate::runtime_integration::ClaimType::Shipping, 200),
            (crate::runtime_integration::ClaimType::Customs, 250),
            (crate::runtime_integration::ClaimType::Certification, 300),
        ],
    }.assimilate_storage(&mut t).unwrap();
    
    t.into()
}

// Helper functions for testing
pub mod test_helpers {
    use super::*;
    use crate::runtime_integration::{ClaimType, ZkClaim};
    
    // Create a basic product for testing
    pub fn create_test_product(id: &[u8], owner: u64) -> crate::Product<Test> {
        use frame_support::BoundedVec;
        
        crate::Product {
            id: id.to_vec(),
            owner,
            name: b"Test Product".to_vec(),
            description: b"A product for testing".to_vec(),
            origin_country: b"US".to_vec(),
            hs_code: b"1234.56.78".to_vec(),
            manufacture_date: 1234567890,
            origin_verified: false,
            metadata: BoundedVec::truncate_from(b"Test metadata".to_vec()),
            registered_at: 1,
            active: true,
        }
    }
    
    // Create a test claim for verification
    pub fn create_test_claim(claim_type: ClaimType, proof_prefix: u8) -> ZkClaim {
        ZkClaim {
            claim_type,
            public_inputs: b"test inputs".to_vec(),
            proof: vec![proof_prefix, 2, 3, 4], // First byte determines test verification result
            metadata: b"test metadata".to_vec(),
            timestamp: 1234567890,
        }
    }
    
    // Create a verified claim for testing
    pub fn create_verified_claim(
        claim: ZkClaim,
        submitter: u64,
        block: u64,
        status: crate::VerificationStatus,
        claim_id: &[u8],
    ) -> crate::VerifiedClaim<Test> {
        crate::VerifiedClaim {
            claim,
            submitter,
            submitted_at: block,
            status,
            verifier: None,
            verified_at: None,
            claim_id: claim_id.to_vec(),
            is_cross_chain: false,
            source_para_id: None,
        }
    }
} 