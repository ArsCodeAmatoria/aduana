import { CodeBlock } from '@/components/ui/code-block';

export default function InteroperabilityPage() {
  return (
    <div className="prose max-w-none dark:text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Interoperability</h1>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl mb-10 border border-blue-100 dark:border-blue-800">
        <p className="text-xl text-blue-800 dark:text-blue-200 leading-relaxed">
          Aduana is designed to seamlessly integrate with various blockchain networks and external systems, 
          enabling efficient cross-chain communication and data exchange to create a comprehensive 
          international trade ecosystem.
        </p>
      </div>
      
      <h2>Cross-Chain Communication</h2>
      
      <p>
        Aduana implements robust cross-chain communication using multiple approaches:
      </p>
      
      <h3>XCM Integration</h3>
      
      <p>
        As a Polkadot/Kusama parachain, Aduana leverages the Cross-Consensus Message Format (XCM) for secure 
        and standardized cross-chain communication:
      </p>
      
      <div className="my-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-4 border-b border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 m-0">Message Types</h4>
            </div>
            <div className="p-4">
              <ul className="mt-2 space-y-2 text-slate-700 dark:text-slate-300">
                <li><strong>Transact</strong>: Execute calls on remote chains</li>
                <li><strong>Transfer</strong>: Move assets between chains</li>
                <li><strong>Query</strong>: Request data from remote chains</li>
                <li><strong>Notify</strong>: Send information to remote chains</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 border-b border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 m-0">Security Features</h4>
            </div>
            <div className="p-4">
              <ul className="mt-2 space-y-2 text-slate-700 dark:text-slate-300">
                <li><strong>Message Validation</strong>: Ensures authenticity</li>
                <li><strong>Rate Limiting</strong>: Prevents DoS attacks</li>
                <li><strong>Error Handling</strong>: Graceful failure recovery</li>
                <li><strong>Asset Tracking</strong>: Prevents double-spending</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <p>
        Example of XCM message handling in a Substrate pallet:
      </p>
      
      <CodeBlock 
        language="rust"
        value={`#[pallet::call]
impl<T: Config> Pallet<T> {
    #[pallet::weight(T::WeightInfo::process_xcm_message())]
    pub fn process_xcm_message(
        origin: OriginFor<T>,
        message: Xcm<T::Call>,
    ) -> DispatchResultWithPostInfo {
        ensure_root(origin)?;
        
        // Process the incoming XCM message
        match message {
            Xcm::Transact { origin_type, require_weight_at_most, call } => {
                // Execute the call with appropriate checks
                let _ = call.dispatch(origin_type.into());
                Self::deposit_event(Event::XcmMessageProcessed(true));
                Ok(().into())
            },
            Xcm::ReserveAssetDeposited { assets } => {
                // Handle incoming assets
                Self::deposit_event(Event::AssetsReceived(assets));
                Ok(().into())
            },
            // Handle other XCM message types
            _ => Err(Error::<T>::UnsupportedXcmMessage.into()),
        }
    }
}`}
        showLineNumbers={true}
      />
      
      <h2>POP Protocol Integration</h2>
      
      <p>
        Aduana integrates with the Proof-of-Personhood (POP) protocol for robust identity verification:
      </p>
      
      <div className="my-6">
        <div className="bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Identity Services</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4 py-2">
                <h4 className="font-medium">Identity Resolution</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Maps on-chain identifiers to real-world entities with appropriate privacy preservation.
                </p>
              </div>
              
              <div className="border-l-4 border-indigo-500 pl-4 py-2">
                <h4 className="font-medium">Credential Verification</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Validates claims about entities, including business registrations and certifications.
                </p>
              </div>
              
              <div className="border-l-4 border-indigo-500 pl-4 py-2">
                <h4 className="font-medium">Sybil Resistance</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Prevents single entities from creating multiple identities to manipulate the system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h2>Oracle Integrations</h2>
      
      <p>
        Aduana relies on oracles to provide external data for various functions:
      </p>
      
      <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm my-6">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Oracle Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Purpose</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Implementation</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">Price Oracles</td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Provide current market prices for assets and commodities</td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Chainlink, Band Protocol</td>
            </tr>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">Tariff Oracles</td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Supply up-to-date tariff rates for different jurisdictions</td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Custom Aduana Oracles</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">Weather Oracles</td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Provide weather data for agricultural products</td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Weather Network</td>
            </tr>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">Transport Oracles</td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Track shipment locations and conditions</td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">IoT Data Providers</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2>External API Integrations</h2>
      
      <p>
        Aduana provides REST APIs for integration with external systems:
      </p>
      
      <div className="my-6 space-y-6">
        <div className="bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200">Authentication API</h4>
          </div>
          <div className="p-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Used for secure authentication of external services:
            </p>
            <CodeBlock 
              language="bash"
              value={`# Request JWT token
curl -X POST https://api.aduana.network/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey": "YOUR_API_KEY", "secret": "YOUR_SECRET"}' \\
  -v`}
            />
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200">Origin Verification API</h4>
          </div>
          <div className="p-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Allows external systems to submit origin verification requests:
            </p>
            <CodeBlock 
              language="bash"
              value={`# Submit origin verification request
curl -X POST https://api.aduana.network/v1/verify-origin \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "productId": "PROD123456",
    "manufacturer": "0x1234...5678",
    "originCountry": "JP",
    "components": [
      {"name": "Component A", "originCountry": "KR", "percentage": 30},
      {"name": "Component B", "originCountry": "JP", "percentage": 70}
    ],
    "proofHash": "0xabcd...ef01"
  }' \\
  -v`}
            />
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200">Tariff Calculation API</h4>
          </div>
          <div className="p-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Provides tariff calculations for given products and trade routes:
            </p>
            <CodeBlock 
              language="bash"
              value={`# Calculate tariff
curl -X GET "https://api.aduana.network/v1/calculate-tariff?\\
product=8517.12.00&origin=KR&destination=US&value=500" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -v`}
            />
          </div>
        </div>
      </div>
      
      <h2>Cross-Chain Asset Management</h2>
      
      <p>
        Aduana enables the management of assets across multiple blockchains:
      </p>
      
      <div className="my-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
        <ul className="space-y-3">
          <li><strong>Asset Bridging</strong>: Transfer assets between Aduana and external chains</li>
          <li><strong>Wrapped Assets</strong>: Use wrapped versions of external assets within Aduana</li>
          <li><strong>XCM Transactors</strong>: Execute transactions on remote chains</li>
          <li><strong>Cross-Chain Collateral</strong>: Use assets on one chain as collateral for operations on another</li>
        </ul>
      </div>
      
      <h2>Future Interoperability Plans</h2>
      
      <div className="my-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800">
          <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300 mb-4">Upcoming Integrations</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 mt-1 text-purple-600 dark:text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-base font-medium text-purple-800 dark:text-purple-300">IBC Protocol Support</h4>
                <p className="mt-1 text-sm text-purple-700 dark:text-purple-400">
                  Integration with Inter-Blockchain Communication protocol to connect with Cosmos ecosystem chains.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 mt-1 text-purple-600 dark:text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-base font-medium text-purple-800 dark:text-purple-300">Layer 2 Solutions</h4>
                <p className="mt-1 text-sm text-purple-700 dark:text-purple-400">
                  Connect with Ethereum Layer 2 scaling solutions like Arbitrum and Optimism for lower cost operations.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 mt-1 text-purple-600 dark:text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-base font-medium text-purple-800 dark:text-purple-300">Government Systems</h4>
                <p className="mt-1 text-sm text-purple-700 dark:text-purple-400">
                  Direct integration with government customs and trade systems via secure API endpoints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Developer Resources</h3>
        <p className="text-blue-700 dark:text-blue-400 mb-4">
          To integrate with Aduana's interoperability features, explore our developer resources:
        </p>
        <ul className="text-blue-700 dark:text-blue-400 space-y-2">
          <li>• <strong>API Documentation:</strong> Comprehensive guides for all API endpoints</li>
          <li>• <strong>SDK Libraries:</strong> Client libraries in multiple programming languages</li>
          <li>• <strong>Example Projects:</strong> Sample applications demonstrating integration patterns</li>
          <li>• <strong>Developer Forum:</strong> Community support for integration questions</li>
        </ul>
      </div>
    </div>
  );
} 