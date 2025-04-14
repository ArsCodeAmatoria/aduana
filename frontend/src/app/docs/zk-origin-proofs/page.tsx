export default function ZkOriginProofsPage() {
  return (
    <div className="prose max-w-none">
      <h1>ZK Origin Proofs</h1>
      
      <p>
        Zero-Knowledge Origin Proofs are at the core of Aduana's capability to verify product origins without revealing sensitive supply chain data, enabling trust in international trade while preserving business confidentiality.
      </p>
      
      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h2 className="text-blue-800 font-semibold mt-0">What are ZK Origin Proofs?</h2>
        <p className="text-blue-700">
          ZK Origin Proofs are cryptographic protocols that allow one party (the producer or exporter) to prove to another party (the customs authority or importer) that a product originated in a specific country or region, without revealing any additional information about the production process, suppliers, or other sensitive commercial details.
        </p>
      </div>
      
      <h2>Key Benefits</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="p-5 bg-slate-50 rounded-lg">
          <h3 className="font-semibold mb-2">Privacy Preservation</h3>
          <p className="text-slate-600 text-sm">
            Businesses can prove regulatory compliance without exposing proprietary information about their supply chain, manufacturing processes, or business relationships.
          </p>
        </div>
        <div className="p-5 bg-slate-50 rounded-lg">
          <h3 className="font-semibold mb-2">Tamper-Proof Verification</h3>
          <p className="text-slate-600 text-sm">
            Cryptographic guarantees ensure that origin claims cannot be falsified, reducing fraud and improving trust in origin declarations.
          </p>
        </div>
        <div className="p-5 bg-slate-50 rounded-lg">
          <h3 className="font-semibold mb-2">Regulatory Compliance</h3>
          <p className="text-slate-600 text-sm">
            Authorities can verify that products meet origin requirements for preferential tariff treatment without manual inspection of sensitive documents.
          </p>
        </div>
      </div>
      
      <h2>Technical Architecture</h2>
      
      <div className="my-6">
        <img src="/images/zk-proof-flow.svg" alt="ZK Proof Flow Diagram" className="w-full rounded-lg shadow-md" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div>
          <h3>ZK Circuit Components</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Input Preparation</strong>: Raw supply chain data and origin criteria</li>
            <li><strong>Witness Generation</strong>: Creation of private inputs (witness) and public inputs</li>
            <li><strong>Proving System</strong>: Generation of cryptographic proof using zkSNARKs</li>
            <li><strong>Verification</strong>: On-chain verification of proof validity</li>
          </ol>
        </div>
        <div>
          <h3>Proof Generation Flow</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Exporter collects supply chain data</li>
            <li>Data is processed through rules engine to confirm eligibility</li>
            <li>zkSNARK circuit generates a proof of origin compliance</li>
            <li>Proof is submitted to Aduana's verification pallet</li>
            <li>Verification result is recorded on-chain</li>
          </ol>
        </div>
      </div>
      
      <h2>Origin Rules Implementation</h2>
      
      <p>
        Aduana implements various product origin determination methods according to international trade agreements:
      </p>
      
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Origin Rule Type</th>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ZK Implementation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Wholly Obtained</td>
              <td className="px-6 py-4 text-sm">Products entirely grown, harvested, or extracted in a single country</td>
              <td className="px-6 py-4 text-sm">Simple verification with location proofs</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Substantial Transformation</td>
              <td className="px-6 py-4 text-sm">Products that underwent sufficient processing to change tariff classification</td>
              <td className="px-6 py-4 text-sm">Comparison of input/output HS codes with privacy preservation</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Value Content</td>
              <td className="px-6 py-4 text-sm">Products meeting minimum regional value content thresholds</td>
              <td className="px-6 py-4 text-sm">Range proofs for value percentages without revealing actual values</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Processing Operations</td>
              <td className="px-6 py-4 text-sm">Products that underwent specific manufacturing operations</td>
              <td className="px-6 py-4 text-sm">Process verification with manufacturing step attestations</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2>ZK Circuit Implementation</h2>
      
      <p>
        Aduana's ZK circuits are built using cutting-edge cryptographic primitives:
      </p>
      
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto my-6">
        <code>
{`// Simplified representation of the Origin Verification Circuit

function buildOriginVerificationCircuit(inputs) {
  // Private inputs (not revealed)
  const privateInputs = {
    supplyChainData: inputs.supplyChainData,
    manufacturingSteps: inputs.manufacturingSteps,
    componentOrigins: inputs.componentOrigins,
    valueAddedByCountry: inputs.valueAddedByCountry,
  };
  
  // Public inputs (visible to verifier)
  const publicInputs = {
    productId: inputs.productId,
    claimedOriginCountry: inputs.claimedOriginCountry,
    ruleType: inputs.ruleType,
    timestamp: inputs.timestamp,
  };
  
  // Circuit logic
  let originVerified = false;
  
  if (inputs.ruleType === "WHOLLY_OBTAINED") {
    originVerified = verifyWhollyObtained(privateInputs, publicInputs.claimedOriginCountry);
  } else if (inputs.ruleType === "SUBSTANTIAL_TRANSFORMATION") {
    originVerified = verifyTariffShift(privateInputs, publicInputs.claimedOriginCountry);
  } else if (inputs.ruleType === "VALUE_CONTENT") {
    originVerified = verifyValueContent(privateInputs, publicInputs.claimedOriginCountry);
  } else if (inputs.ruleType === "PROCESSING_OPERATIONS") {
    originVerified = verifyProcessingOperations(privateInputs, publicInputs.claimedOriginCountry);
  }
  
  // Return the public output: whether the origin is verified
  return {
    verified: originVerified
  };
}`}
        </code>
      </pre>
      
      <div className="my-6 p-6 border border-slate-200 rounded-lg">
        <h3 className="font-semibold mb-4">ZK Libraries and Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium">Circuit Development</h4>
            <ul className="text-sm space-y-1 pl-5 list-disc">
              <li>Circom for circuit design</li>
              <li>Arkworks for Rust-based constraints</li>
              <li>SnarkJS for JavaScript integration</li>
              <li>Custom DSLs for origin rule modeling</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Proving Systems</h4>
            <ul className="text-sm space-y-1 pl-5 list-disc">
              <li>Groth16 for efficient verification</li>
              <li>PLONK for universal setup</li>
              <li>Bulletproofs for range proofs</li>
              <li>Recursive SNARKs for complex rules</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>Integration with Supply Chains</h2>
      
      <p>
        Aduana's ZK Origin Proofs integrate with existing supply chain systems:
      </p>
      
      <div className="my-6 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
        <h3 className="text-indigo-800 font-semibold mb-3">Data Sources</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="h-6 w-6 bg-indigo-100 rounded-full text-indigo-600 flex items-center justify-center flex-shrink-0 mr-3">1</div>
            <div>
              <h4 className="font-medium text-indigo-700">ERP Systems</h4>
              <p className="text-sm text-indigo-600">
                Enterprise Resource Planning systems provide bill of materials, supplier data, and manufacturing records.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 bg-indigo-100 rounded-full text-indigo-600 flex items-center justify-center flex-shrink-0 mr-3">2</div>
            <div>
              <h4 className="font-medium text-indigo-700">Supply Chain Traceability</h4>
              <p className="text-sm text-indigo-600">
                Blockchain-based traceability systems capture immutable records of product journey and transformations.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 bg-indigo-100 rounded-full text-indigo-600 flex items-center justify-center flex-shrink-0 mr-3">3</div>
            <div>
              <h4 className="font-medium text-indigo-700">IoT Devices</h4>
              <p className="text-sm text-indigo-600">
                Internet of Things sensors provide verifiable location data and environmental records for raw materials.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 bg-indigo-100 rounded-full text-indigo-600 flex items-center justify-center flex-shrink-0 mr-3">4</div>
            <div>
              <h4 className="font-medium text-indigo-700">Certification Authorities</h4>
              <p className="text-sm text-indigo-600">
                Third-party certification bodies provide digitally signed attestations that feed into the ZK proofs.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <h2>User Experience</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <div className="p-5 bg-slate-50 rounded-lg">
          <h3 className="font-semibold mb-3">For Exporters</h3>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>Connect supply chain management systems to Aduana's API</li>
            <li>Select applicable origin rule for product</li>
            <li>Submit required data to the proof generation service</li>
            <li>Receive ZK proof of origin compliance</li>
            <li>Attach proof to shipment documentation</li>
          </ol>
          <div className="mt-4 p-3 bg-blue-50 rounded-md text-xs text-blue-700">
            <strong>Privacy Benefit:</strong> Supply chain details, supplier identities, pricing information, and manufacturing processes remain confidential.
          </div>
        </div>
        <div className="p-5 bg-slate-50 rounded-lg">
          <h3 className="font-semibold mb-3">For Importers & Customs</h3>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>Scan product shipment QR code or access digital documentation</li>
            <li>Retrieve ZK proof from Aduana's platform</li>
            <li>Verify proof validity using Aduana's verification interface</li>
            <li>Confirm origin status for tariff assessment</li>
            <li>Record verification outcome in customs systems</li>
          </ol>
          <div className="mt-4 p-3 bg-green-50 rounded-md text-xs text-green-700">
            <strong>Efficiency Benefit:</strong> Automated verification reduces manual document inspection, physical inspections, and administrative burden.
          </div>
        </div>
      </div>
      
      <h2>Security Considerations</h2>
      
      <div className="my-6">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Threat Model and Mitigations</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <h4 className="font-medium">Trusted Setup Vulnerabilities</h4>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Risk:</strong> If the initial parameters are compromised, false proofs could be generated.
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Mitigation:</strong> Multi-party computation ceremony for parameter generation with transparent participation.
                </p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <h4 className="font-medium">Data Input Manipulation</h4>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Risk:</strong> Falsified input data could lead to incorrect origin determinations.
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Mitigation:</strong> Integration with trusted data sources, cryptographic attestations, and staking-based accountability.
                </p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <h4 className="font-medium">Circuit Design Flaws</h4>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Risk:</strong> Incorrect implementations of origin rules could allow incorrect origin claims.
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Mitigation:</strong> Formal verification of circuits, comprehensive testing, and periodic audits by cryptography experts.
                </p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <h4 className="font-medium">Quantum Computing Threats</h4>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Risk:</strong> Future quantum computers might break current cryptographic assumptions.
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Mitigation:</strong> Research into post-quantum secure ZK systems and upgrade paths for cryptographic primitives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h2>Future Research and Development</h2>
      
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Enhanced ZK Systems</h3>
          <ul className="text-sm space-y-2 pl-5 list-disc text-slate-600">
            <li>Development of more efficient proving systems</li>
            <li>Reduction of proof generation computational requirements</li>
            <li>Mobile-friendly proof generation for field use</li>
            <li>Post-quantum secure ZK proof systems</li>
          </ul>
        </div>
        <div className="p-4 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Advanced Rule Processing</h3>
          <ul className="text-sm space-y-2 pl-5 list-disc text-slate-600">
            <li>Processing of complex cumulative rules with multiple criteria</li>
            <li>Dynamic rule adaptations based on trade agreement changes</li>
            <li>AI-assisted rule interpretation for ambiguous cases</li>
            <li>Multi-jurisdictional overlapping rule compliance</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Get Involved</h3>
        <p className="text-blue-700">
          Researchers, cryptographers, and trade compliance experts interested in contributing to Aduana's ZK Origin Proofs can join our research community and participate in our open development process.
        </p>
      </div>
    </div>
  )
} 