// Aduana Integration Components
// This module provides integration with external systems like POP, Polkadot/Kusama

pub mod pop;
pub mod xcm;

// Re-export key types for convenience
pub use pop::{PopApiClient, ZkClaim, PopIdentityInfo, ClaimType, VerificationResult};
pub use xcm::{XcmExecutor, AduanaXcmMessage, TariffVerificationMessage, OriginProofMessage}; 