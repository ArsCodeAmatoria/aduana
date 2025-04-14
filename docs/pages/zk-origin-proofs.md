# ZK Origin Proofs

Zero-Knowledge (ZK) Origin Proofs are a core component of the Aduana ecosystem, enabling secure and private verification of product origins without revealing sensitive business information.

## What are ZK Origin Proofs?

ZK Origin Proofs are cryptographic attestations that allow an exporter to prove that a product originates from a specific country or region without revealing the actual manufacturing details, supply chain participants, or other sensitive business information. Using zero-knowledge proofs, we can validate compliance with rules of origin requirements while maintaining commercial confidentiality.

## Technical Implementation

### Zero-Knowledge Protocol

Aduana uses zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge) to implement origin proofs:

```rust
// Simplified example of ZK proof verification in our Substrate pallet
pub fn verify_origin_proof(
    origin: OriginFor<T>,
    proof: ZkProof,
    product_id: ProductId,
    claimed_origin: CountryCode,
) -> DispatchResult {
    let sender = ensure_signed(origin)?;
    
    // Verify the ZK proof against public inputs
    ensure!(
        Self::validate_zk_proof(&proof, &product_id, &claimed_origin),
        Error::<T>::InvalidProof
    );
    
    // Record the verified origin claim
    <VerifiedOrigins<T>>::insert(product_id, (claimed_origin, sender, frame_system::Pallet::<T>::block_number()));
    
    // Emit event for tracking
    Self::deposit_event(Event::OriginVerified(product_id, claimed_origin));
    
    Ok(())
}
```

### Integration with POP

The Proof of Personhood (POP) protocol integration ensures that origin claims are tied to verified entities, preventing sybil attacks and ensuring accountability:

```rust
// POP identity verification for exporters
pub fn verify_exporter_identity(
    origin: OriginFor<T>,
    pop_credential: PopCredential,
) -> DispatchResult {
    let sender = ensure_signed(origin)?;
    
    // Call to POP API to verify the credential
    let is_valid = T::PopApi::verify_credential(&pop_credential);
    ensure!(is_valid, Error::<T>::InvalidPopCredential);
    
    // Store the verified exporter credential
    <VerifiedExporters<T>>::insert(sender, pop_credential);
    
    Self::deposit_event(Event::ExporterVerified(sender));
    
    Ok(())
}
```

## Proof Generation Process

1. **Credential Collection**: Exporters collect necessary certificates and documentation proving product origin
2. **Data Preparation**: Information is processed and formatted for ZK circuit inputs
3. **Proof Generation**: A ZK proof is generated using the origin data as private inputs
4. **Proof Submission**: The proof is submitted to the Aduana network along with public parameters
5. **Verification**: The network verifies the proof without seeing the underlying sensitive data
6. **Recording**: Verified proofs are recorded on-chain for future reference

## Benefits of ZK Origin Proofs

### Privacy
- Manufacturers protect proprietary processes and supply chain details
- Sensitive business relationships remain confidential
- Competitive information is secured

### Compliance
- Customs authorities can verify origin claims without extensive documentation
- Regulatory requirements are met without manual overhead
- Audit trail is maintained on-chain

### Efficiency
- Verification is instant and deterministic
- Reduced paperwork and administrative costs
- Streamlined customs clearance processes

## Example Use Case: Textile Manufacturing

A textile manufacturer in Country A produces garments that qualify for preferential tariff treatment when exported to Country B. The manufacturer:

1. Collects documentation on raw material sources and manufacturing processes
2. Generates a ZK proof that the products meet origin rules (e.g., sufficient transformation occurred in Country A)
3. Submits the proof to Aduana along with shipment details
4. Customs in Country B verifies the proof on Aduana
5. If valid, the shipment receives the preferential tariff rate without revealing the manufacturer's proprietary production techniques

## Technical Requirements

To generate and verify ZK origin proofs:

- **Prover Application**: Off-chain tool for exporters to generate proofs
- **Verification Circuit**: On-chain component that verifies submitted proofs
- **POP Integration**: Link to verified identities in the system
- **Data Schema**: Standardized format for origin criteria across different product categories
- **Oracle Integration**: For current regulatory requirements and tariff rates

## Implementation Roadmap

1. **Circuit Design**: Development of ZK circuits for different types of origin rules
2. **Prover SDK**: Tools for exporters to generate proofs
3. **Verification Pallet**: Substrate module for on-chain verification
4. **POP Integration**: Connection to identity system
5. **UI Components**: User interface for proof generation and verification
6. **Standards Development**: Working with trade regulatory bodies on accepted proof formats 