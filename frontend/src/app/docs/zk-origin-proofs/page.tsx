export default function ZkOriginProofsPage() {
  return (
    <div className="prose max-w-none">
      <h1>ZK Origin Proofs</h1>
      
      <p>
        Zero-Knowledge (ZK) Origin Proofs are a core component of the Aduana ecosystem, enabling secure and private verification of product origins without revealing sensitive business information.
      </p>
      
      <h2>What are ZK Origin Proofs?</h2>
      
      <p>
        ZK Origin Proofs are cryptographic attestations that allow an exporter to prove that a product originates from a specific country or region without revealing the actual manufacturing details, supply chain participants, or other sensitive business information. Using zero-knowledge proofs, we can validate compliance with rules of origin requirements while maintaining commercial confidentiality.
      </p>
      
      <h2>Technical Implementation</h2>
      
      <h3>Zero-Knowledge Protocol</h3>
      
      <p>
        Aduana uses zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge) to implement origin proofs:
      </p>
      
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto">
        <code>
{`// Simplified example of ZK proof verification in our Substrate pallet
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
}`}
        </code>
      </pre>
      
      <h3>Integration with POP</h3>
      
      <p>
        The Proof of Personhood (POP) protocol integration ensures that origin claims are tied to verified entities, preventing sybil attacks and ensuring accountability:
      </p>
      
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto">
        <code>
{`// POP identity verification for exporters
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
}`}
        </code>
      </pre>
      
      <h2>Proof Generation Process</h2>
      
      <ol>
        <li><strong>Credential Collection</strong>: Exporters collect necessary certificates and documentation proving product origin</li>
        <li><strong>Data Preparation</strong>: Information is processed and formatted for ZK circuit inputs</li>
        <li><strong>Proof Generation</strong>: A ZK proof is generated using the origin data as private inputs</li>
        <li><strong>Proof Submission</strong>: The proof is submitted to the Aduana network along with public parameters</li>
        <li><strong>Verification</strong>: The network verifies the proof without seeing the underlying sensitive data</li>
        <li><strong>Recording</strong>: Verified proofs are recorded on-chain for future reference</li>
      </ol>
      
      <h2>Benefits of ZK Origin Proofs</h2>
      
      <h3>Privacy</h3>
      <ul>
        <li>Manufacturers protect proprietary processes and supply chain details</li>
        <li>Sensitive business relationships remain confidential</li>
        <li>Competitive information is secured</li>
      </ul>
      
      <h3>Compliance</h3>
      <ul>
        <li>Customs authorities can verify origin claims without extensive documentation</li>
        <li>Regulatory requirements are met without manual overhead</li>
        <li>Audit trail is maintained on-chain</li>
      </ul>
      
      <h3>Efficiency</h3>
      <ul>
        <li>Verification is instant and deterministic</li>
        <li>Reduced paperwork and administrative costs</li>
        <li>Streamlined customs clearance processes</li>
      </ul>
      
      <h2>Example Use Case: Textile Manufacturing</h2>
      
      <p>
        A textile manufacturer in Country A produces garments that qualify for preferential tariff treatment when exported to Country B. The manufacturer:
      </p>
      
      <ol>
        <li>Collects documentation on raw material sources and manufacturing processes</li>
        <li>Generates a ZK proof that the products meet origin rules (e.g., sufficient transformation occurred in Country A)</li>
        <li>Submits the proof to Aduana along with shipment details</li>
        <li>Customs in Country B verifies the proof on Aduana</li>
        <li>If valid, the shipment receives the preferential tariff rate without revealing the manufacturer's proprietary production techniques</li>
      </ol>
      
      <h2>Technical Requirements</h2>
      
      <p>To generate and verify ZK origin proofs:</p>
      
      <ul>
        <li><strong>Prover Application</strong>: Off-chain tool for exporters to generate proofs</li>
        <li><strong>Verification Circuit</strong>: On-chain component that verifies submitted proofs</li>
        <li><strong>POP Integration</strong>: Link to verified identities in the system</li>
        <li><strong>Data Schema</strong>: Standardized format for origin criteria across different product categories</li>
        <li><strong>Oracle Integration</strong>: For current regulatory requirements and tariff rates</li>
      </ul>
    </div>
  )
} 