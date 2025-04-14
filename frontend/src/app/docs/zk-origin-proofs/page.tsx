import { CodeBlock } from '@/components/ui/code-block';

export default function ZkOriginProofsPage() {
  return (
    <div className="prose max-w-none dark:text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight mb-6">ZK Origin Proofs</h1>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl mb-10 border border-blue-100 dark:border-blue-800">
        <p className="text-xl text-blue-800 dark:text-blue-200 leading-relaxed">
          Zero-Knowledge Origin Proofs are at the core of Aduana's capability to verify product origins without revealing sensitive supply chain data, enabling trust in international trade while preserving business confidentiality.
        </p>
      </div>
      
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl mb-10 border border-indigo-100 dark:border-indigo-800">
        <h2 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-300 mt-0 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          What are ZK Origin Proofs?
        </h2>
        <p className="text-indigo-700 dark:text-indigo-300 mb-0">
          ZK Origin Proofs are cryptographic protocols that allow one party (the producer or exporter) to prove to another party (the customs authority or importer) that a product originated in a specific country or region, without revealing any additional information about the production process, suppliers, or other sensitive commercial details.
        </p>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Key Benefits
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="p-5 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-0">Privacy Preservation</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-0">
            Businesses can prove regulatory compliance without exposing proprietary information about their supply chain, manufacturing processes, or business relationships.
          </p>
        </div>
        <div className="p-5 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-0">Tamper-Proof Verification</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-0">
            Cryptographic guarantees ensure that origin claims cannot be falsified, reducing fraud and improving trust in origin declarations.
          </p>
        </div>
        <div className="p-5 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-semibold mb-0">Regulatory Compliance</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-0">
            Authorities can verify that products meet origin requirements for preferential tariff treatment without manual inspection of sensitive documents.
          </p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        Technical Architecture
      </h2>
      
      <div className="my-6 p-1 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <img src="/images/zk-proof-flow.svg" alt="ZK Proof Flow Diagram" className="w-full rounded-lg" />
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
      
      <CodeBlock
        language="javascript"
        value={`// Simplified representation of the Origin Verification Circuit

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
        showLineNumbers={true}
      />
      
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