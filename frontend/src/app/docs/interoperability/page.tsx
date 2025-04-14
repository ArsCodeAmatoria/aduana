export default function InteroperabilityPage() {
  return (
    <div className="prose max-w-none">
      <h1>Interoperability</h1>
      
      <p>
        Aduana is designed as a highly interoperable system that connects with various blockchain networks, trade systems, and identity frameworks. This interoperability is essential to facilitate seamless international trade operations across disparate systems and jurisdictions.
      </p>
      
      <h2>Cross-Chain Communication</h2>
      
      <p>
        As a Kusama parachain, Aduana leverages the ecosystem's cross-chain messaging capabilities:
      </p>
      
      <div className="bg-indigo-50 p-6 rounded-lg my-6">
        <h3 className="text-indigo-800 font-semibold mb-3">XCM Integration</h3>
        <p className="text-indigo-700 mb-4">
          Aduana uses Cross-Consensus Message Format (XCM) to enable secure communication with other parachains and the Kusama relay chain.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <h4 className="font-medium text-indigo-700 mb-2">Message Types</h4>
            <ul className="text-sm space-y-1 text-slate-600">
              <li>Origin verification requests</li>
              <li>Tariff rate queries</li>
              <li>Cross-chain settlements</li>
              <li>Governance proposals</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <h4 className="font-medium text-indigo-700 mb-2">Security Features</h4>
            <ul className="text-sm space-y-1 text-slate-600">
              <li>XCMP message validation</li>
              <li>Origin tracking and verification</li>
              <li>Rate limiting and fee mechanisms</li>
              <li>Consensus-backed message delivery</li>
            </ul>
          </div>
        </div>
      </div>
      
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto my-6">
        <code>
{`// Example of XCM message handling in a Substrate pallet
#[pallet::call]
impl<T: Config> Pallet<T> {
    #[pallet::weight(T::WeightInfo::receive_origin_verification())]
    pub fn receive_origin_verification(
        origin: OriginFor<T>,
        product_id: ProductId,
        origin_country: CountryCode,
        verification_result: bool,
        source_chain: ParaId,
    ) -> DispatchResultWithPostInfo {
        // Ensure the call comes from a trusted parachain via XCMP
        let source = ensure_xcm(origin)?;
        ensure!(
            T::TrustedSources::contains(&source_chain.into()),
            Error::<T>::UntrustedSourceChain
        );
        
        // Process the verification result
        if verification_result {
            Self::process_verified_origin(product_id, origin_country)?;
        } else {
            Self::process_failed_verification(product_id)?;
        }
        
        Self::deposit_event(Event::OriginVerificationReceived(product_id, origin_country, verification_result));
        
        Ok(().into())
    }
}`}
        </code>
      </pre>
      
      <h2>Integration with POP (Proof of Personhood)</h2>
      
      <p>
        Aduana integrates with the POP protocol to establish verifiable identities for traders and regulators:
      </p>
      
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-slate-50 rounded-lg">
          <h4 className="font-semibold mb-2">Identity Resolution</h4>
          <p className="text-slate-600 text-sm">
            Aduana uses POP's DID (Decentralized Identifier) system to uniquely identify participants in the trade ecosystem.
          </p>
        </div>
        <div className="p-5 bg-slate-50 rounded-lg">
          <h4 className="font-semibold mb-2">Credential Verification</h4>
          <p className="text-slate-600 text-sm">
            POP credentials establish the authority of regulators, customs officers, and trade officials interacting with the system.
          </p>
        </div>
        <div className="p-5 bg-slate-50 rounded-lg">
          <h4 className="font-semibold mb-2">Sybil Resistance</h4>
          <p className="text-slate-600 text-sm">
            POP's uniqueness guarantees prevent entities from creating multiple identities to game the system.
          </p>
        </div>
      </div>
      
      <div className="p-5 border border-dashed border-slate-300 rounded-lg my-8">
        <h3 className="font-semibold mb-3">POP Integration API</h3>
        <div className="text-sm space-y-3">
          <div>
            <code className="px-2 py-1 bg-slate-100 rounded text-slate-700">resolveIdentity(did: string): Promise&lt;IdentityResult&gt;</code>
            <p className="mt-1 text-slate-600">Resolves a DID to a verified identity with associated credentials.</p>
          </div>
          <div>
            <code className="px-2 py-1 bg-slate-100 rounded text-slate-700">verifyCredential(credential: VerifiableCredential): Promise&lt;boolean&gt;</code>
            <p className="mt-1 text-slate-600">Verifies that a credential is valid and has not been revoked.</p>
          </div>
          <div>
            <code className="px-2 py-1 bg-slate-100 rounded text-slate-700">generateProof(claim: Claim, did: string): Promise&lt;ZkProof&gt;</code>
            <p className="mt-1 text-slate-600">Generates a zero-knowledge proof for a specific claim without revealing sensitive data.</p>
          </div>
        </div>
      </div>
      
      <h2>Oracle Integrations</h2>
      
      <p>
        Aduana uses oracles to access real-world data that is essential for its operations:
      </p>
      
      <div className="my-6">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Oracle Type</th>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Purpose</th>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Data Sources</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Tariff Oracles</td>
              <td className="px-6 py-4 text-sm">Provide current tariff rates by country and product category</td>
              <td className="px-6 py-4 text-sm">Government customs APIs, WTO databases</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Currency Oracles</td>
              <td className="px-6 py-4 text-sm">Supply exchange rates for multi-currency settlements</td>
              <td className="px-6 py-4 text-sm">Forex APIs, central bank rates</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Regulatory Oracles</td>
              <td className="px-6 py-4 text-sm">Track changes in trade regulations and compliance requirements</td>
              <td className="px-6 py-4 text-sm">Legal databases, regulatory feeds</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Shipping Oracles</td>
              <td className="px-6 py-4 text-sm">Provide logistics data for shipment verification</td>
              <td className="px-6 py-4 text-sm">Shipping company APIs, port authorities</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2>External API Integrations</h2>
      
      <p>
        Aduana offers APIs to allow external systems to interact with the platform:
      </p>
      
      <div className="my-6 p-5 bg-slate-50 rounded-lg">
        <h3 className="font-semibold mb-4">REST API</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Authentication</h4>
            <pre className="bg-slate-100 text-slate-800 p-2 rounded text-xs mt-1">
              <code>POST /api/auth
{`{
  "did": "did:pop:abc123...",
  "signature": "0x123..."
}`}
              </code>
            </pre>
          </div>
          <div>
            <h4 className="font-medium">Origin Verification</h4>
            <pre className="bg-slate-100 text-slate-800 p-2 rounded text-xs mt-1">
              <code>POST /api/verify/origin
{`{
  "product_id": "prod_123",
  "origin_country": "JP",
  "proof": { ... }
}`}
              </code>
            </pre>
          </div>
          <div>
            <h4 className="font-medium">Tariff Calculation</h4>
            <pre className="bg-slate-100 text-slate-800 p-2 rounded text-xs mt-1">
              <code>GET /api/tariff?product=HS8415.10&origin=JP&destination=US</code>
            </pre>
          </div>
        </div>
      </div>
      
      <h2>Enterprise System Integration</h2>
      
      <p>
        Aduana provides connectors for integration with existing enterprise systems:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="p-4 border border-slate-200 rounded-lg text-center">
          <h4 className="font-medium mb-2">ERP Systems</h4>
          <p className="text-sm text-slate-600">SAP, Oracle, Microsoft Dynamics</p>
        </div>
        <div className="p-4 border border-slate-200 rounded-lg text-center">
          <h4 className="font-medium mb-2">Supply Chain Systems</h4>
          <p className="text-sm text-slate-600">IBM Supply Chain, BlueYonder</p>
        </div>
        <div className="p-4 border border-slate-200 rounded-lg text-center">
          <h4 className="font-medium mb-2">Trade Management</h4>
          <p className="text-sm text-slate-600">Amber Road, Descartes</p>
        </div>
        <div className="p-4 border border-slate-200 rounded-lg text-center">
          <h4 className="font-medium mb-2">Customs Systems</h4>
          <p className="text-sm text-slate-600">ACS, CHIEF, ICS</p>
        </div>
      </div>
      
      <h2>Future Interoperability Plans</h2>
      
      <p>
        Aduana's interoperability roadmap includes:
      </p>
      
      <ol className="list-decimal pl-5 space-y-2 my-6">
        <li><strong>CBDC Integration</strong>: Connections to central bank digital currency systems for settlement</li>
        <li><strong>DeFi Protocol Bridges</strong>: Integrations with DeFi protocols for liquidity and financial services</li>
        <li><strong>IoT Device Connectivity</strong>: Direct connections to IoT devices for automated shipment verification</li>
        <li><strong>Global Trade Single Window</strong>: Integration with government trade single window systems</li>
        <li><strong>Carbon Credit Markets</strong>: Connections to carbon markets for sustainable trade incentives</li>
      </ol>
      
      <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Developer Resources</h3>
        <p className="text-blue-700">
          Developers interested in integrating with Aduana can access our SDK, API documentation, and sample code in our developer portal.
        </p>
      </div>
    </div>
  )
} 