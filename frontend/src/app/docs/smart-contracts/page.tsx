export default function SmartContractsPage() {
  return (
    <div className="prose max-w-none">
      <h1>Smart Contracts</h1>
      
      <p>
        Smart contracts form the core execution environment of the Aduana platform, enabling automated, transparent, and trustless interactions between participants in the international trade ecosystem.
      </p>
      
      <div className="p-4 bg-amber-50 border-l-4 border-amber-500 my-6">
        <h3 className="text-amber-800 font-medium">Development Status</h3>
        <p className="text-amber-700 text-sm mt-1">
          The smart contract system is currently under active development. This documentation provides an overview of the architecture and planned functionality.
        </p>
      </div>
      
      <h2>Contract Architecture</h2>
      
      <p>
        Aduana implements a modular smart contract system using Substrate's FRAME pallets for on-chain logic and ink! for specialized contract functionality:
      </p>
      
      <div className="my-6">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contract Type</th>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Implementation</th>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Core Pallets</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">FRAME</td>
              <td className="px-6 py-4 text-sm">Base protocol functionality, state management</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Business Logic</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">ink!</td>
              <td className="px-6 py-4 text-sm">Trade-specific operations, custom workflows</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">ZK Verification</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">Custom Circuit + FRAME</td>
              <td className="px-6 py-4 text-sm">Origin proof verification, credential validation</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Financial Instruments</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">ink!</td>
              <td className="px-6 py-4 text-sm">Derivatives, insurance contracts, pool management</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2>Core Contract Components</h2>
      
      <h3>Origin Verifier Contracts</h3>
      
      <p>
        These contracts handle the validation of origin proofs and maintain the verification state:
      </p>
      
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto my-4">
        <code>
{`#[ink::contract]
mod origin_verifier {
    use ink_prelude::vec::Vec;
    
    #[ink(storage)]
    pub struct OriginVerifier {
        // Maps product_id to (origin, verifier, timestamp)
        verified_origins: ink_storage::collections::HashMap<ProductId, (CountryCode, AccountId, Timestamp)>,
        admin: AccountId,
        zk_verifier: AccountId,
    }
    
    impl OriginVerifier {
        #[ink(constructor)]
        pub fn new(zk_verifier: AccountId) -> Self {
            Self {
                verified_origins: ink_storage::collections::HashMap::new(),
                admin: Self::env().caller(),
                zk_verifier,
            }
        }
        
        #[ink(message)]
        pub fn register_verified_origin(&mut self, product_id: ProductId, origin: CountryCode, proof_valid: bool) -> Result<(), Error> {
            // Only the ZK verifier contract can call this
            if self.env().caller() != self.zk_verifier {
                return Err(Error::Unauthorized);
            }
            
            if !proof_valid {
                return Err(Error::InvalidProof);
            }
            
            self.verified_origins.insert(
                product_id, 
                (origin, self.env().caller(), self.env().block_timestamp())
            );
            
            Ok(())
        }
        
        #[ink(message)]
        pub fn verify_origin(&self, product_id: ProductId, expected_origin: CountryCode) -> bool {
            if let Some((actual_origin, _, _)) = self.verified_origins.get(&product_id) {
                return *actual_origin == expected_origin;
            }
            false
        }
    }
}`}
        </code>
      </pre>
      
      <h3>Equity Pool Contracts</h3>
      
      <p>
        These contracts manage the pooling and distribution of tariff costs:
      </p>
      
      <div className="my-6 p-6 border border-slate-200 rounded-lg">
        <h4 className="font-semibold text-lg mb-3">Key Functionality</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-3 mt-0.5 text-xs">✓</div>
            <div>Pool creation and membership management</div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-3 mt-0.5 text-xs">✓</div>
            <div>Contribution and stake tracking</div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-3 mt-0.5 text-xs">✓</div>
            <div>Tariff payment processing</div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-3 mt-0.5 text-xs">✓</div>
            <div>Cost allocation based on configurable models</div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-3 mt-0.5 text-xs">✓</div>
            <div>Pool governance and parameter adjustments</div>
          </li>
        </ul>
      </div>
      
      <h3>Synthetic Derivatives Contracts</h3>
      
      <p>
        These contracts enable the creation and trading of tariff risk hedging instruments:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="p-5 bg-slate-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Tariff Rate Futures</h4>
          <p className="text-slate-600 text-sm">
            Contracts that allow locking in current tariff rates to hedge against future increases, with settlement based on the difference between contracted and actual rates.
          </p>
        </div>
        <div className="p-5 bg-slate-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Regulatory Risk Swaps</h4>
          <p className="text-slate-600 text-sm">
            Contracts that enable traders to exchange exposure to regulatory changes in different jurisdictions, diversifying their regulatory risk.
          </p>
        </div>
      </div>
      
      <h2>Cross-Contract Interaction</h2>
      
      <p>
        Aduana's smart contracts interact in a structured workflow:
      </p>
      
      <ol className="list-decimal pl-5 space-y-2 my-6">
        <li><strong>Identity Verification</strong>: POP integration contracts verify the identity of traders</li>
        <li><strong>Origin Verification</strong>: ZK verifier contracts validate origin claims</li>
        <li><strong>Tariff Calculation</strong>: Oracle contracts provide current tariff rates</li>
        <li><strong>Pool Management</strong>: Equity pool contracts handle cost distribution</li>
        <li><strong>Risk Hedging</strong>: Derivative contracts manage tariff risk</li>
        <li><strong>Governance</strong>: DAO contracts enable democratic control of the system</li>
      </ol>
      
      <h2>Security Considerations</h2>
      
      <p>
        Aduana's smart contracts implement numerous security measures:
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg my-6">
        <h3 className="font-semibold text-lg mb-4">Security Features</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Access Control</h4>
            <p className="text-slate-600 text-sm mt-1">
              Role-based permissions limit function access to authorized entities only.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium">Formal Verification</h4>
            <p className="text-slate-600 text-sm mt-1">
              Critical contracts undergo formal verification to mathematically prove correctness.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium">Upgrade Mechanisms</h4>
            <p className="text-slate-600 text-sm mt-1">
              Controlled upgrade paths allow fixing vulnerabilities while preserving state.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium">Economic Incentives</h4>
            <p className="text-slate-600 text-sm mt-1">
              Staking and slashing mechanisms align incentives with honest behavior.
            </p>
          </div>
        </div>
      </div>
      
      <h2>Development and Testing</h2>
      
      <p>
        Smart contract development follows a rigorous process:
      </p>
      
      <ul className="list-disc pl-5 space-y-1">
        <li>Specification and design review</li>
        <li>Implementation with test-driven development</li>
        <li>Comprehensive unit and integration testing</li>
        <li>Formal verification of critical components</li>
        <li>Security audits by third-party experts</li>
        <li>Testnet deployment and community testing</li>
        <li>Phased mainnet rollout with monitoring</li>
      </ul>
      
      <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Get Involved</h3>
        <p className="text-blue-700">
          Developers interested in contributing to Aduana's smart contract development can join our GitHub repository and participate in our developer community.
        </p>
      </div>
    </div>
  )
} 