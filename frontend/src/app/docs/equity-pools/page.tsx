import { CodeBlock } from '@/components/ui/code-block';

export default function EquityPoolsPage() {
  return (
    <div className="prose max-w-none dark:text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Equity Pools</h1>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl mb-10 border border-blue-100 dark:border-blue-800">
        <p className="text-xl text-blue-800 dark:text-blue-200 leading-relaxed">
          Equity Pools represent a core innovation in the Aduana ecosystem, allowing traders to pool resources to collectively manage tariff risks and reduce trade costs across international borders.
        </p>
      </div>
      
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl mb-10 border border-indigo-100 dark:border-indigo-800">
        <h2 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-300 mt-0 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          What are Equity Pools?
        </h2>
        <p className="text-indigo-700 dark:text-indigo-300 mb-3">
          Equity Pools are smart contract-powered collectives where traders with similar interests can pool funds to spread the costs and risks associated with international trade tariffs, creating a mutual insurance system for trade finance.
        </p>
        <p className="text-indigo-700 dark:text-indigo-300 mb-0">
          By participating in an Equity Pool, traders can stabilize their tariff expenses, predict costs with greater accuracy, and potentially reduce overall tariff expenditure through collective bargaining and risk distribution.
        </p>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Key Benefits
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-white dark:bg-slate-800/50 shadow overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              For Importers
            </h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>Reduced tariff volatility and predictable costs</li>
              <li>Lower capital requirements for individual shipments</li>
              <li>Shared administrative burden for compliance</li>
              <li>Access to preferred tariff rates through collective volume</li>
              <li>Protection against unexpected tariff increases</li>
            </ul>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800/50 shadow overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              For the Ecosystem
            </h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>Enhanced liquidity for trade finance</li>
              <li>Market-driven price discovery for tariff risk</li>
              <li>Reduced trade barriers for smaller participants</li>
              <li>Incentivized compliance and transparent reporting</li>
              <li>Network effects that scale with participation</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        Equity Pool Structure
      </h2>
      
      <div className="my-6 p-1 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <img src="/images/equity-pool-diagram.svg" alt="Equity Pool Structure Diagram" className="w-full rounded-lg" />
      </div>
      
      <h3 className="text-xl font-bold mt-8 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
        Pool Components
      </h3>
      
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-slate-50 dark:bg-slate-800 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Component</th>
              <th className="px-6 py-3 bg-slate-50 dark:bg-slate-800 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 bg-slate-50 dark:bg-slate-800 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Function</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800/50 divide-y divide-slate-200 dark:divide-slate-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">Pool Reserve</td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">The main treasury of the pool containing member contributions.</td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Pays for tariffs and distributes benefits to members</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">Membership Tokens</td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">NFTs representing ownership shares in the pool.</td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Determines voting power and benefit distribution rights</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">Governance Module</td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Rules for how pool decisions are made.</td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Manages parameter updates and claim approvals</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">Claiming System</td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Process for requesting tariff payments from the pool.</td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Validates and processes tariff reimbursement requests</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">Risk Model</td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Algorithms for calculating contribution requirements.</td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Ensures fair contribution levels based on risk exposure</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Pool Types and Specialization
      </h2>
      
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Equity Pools can be specialized in various ways to serve different market segments:
      </p>
      
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-0">Product-Specific</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
            Pools focused on specific product categories with similar tariff classifications.
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-md">
            <p className="font-medium mb-1">Examples:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>Electronics Equipment Pool</li>
              <li>Agricultural Products Pool</li>
              <li>Automotive Parts Pool</li>
            </ul>
          </div>
        </div>
        <div className="p-5 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-0">Regional Focus</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
            Pools specialized in trade between specific countries or regional blocs.
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-md">
            <p className="font-medium mb-1">Examples:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>US-EU Trade Pool</li>
              <li>ASEAN Importers Pool</li>
              <li>Pacific Rim Pool</li>
            </ul>
          </div>
        </div>
        <div className="p-5 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-0">Business Size</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
            Pools that group businesses of similar size to address specific scale challenges.
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-md">
            <p className="font-medium mb-1">Examples:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>SME Collaborative Pool</li>
              <li>Enterprise-Scale Pool</li>
              <li>Microenterprise Support Pool</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        Smart Contract Implementation
      </h2>
      
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        The Equity Pool system is implemented as a set of smart contracts on the Aduana platform:
      </p>
      
      <CodeBlock
        language="rust"
        value={`// Simplified representation of the Equity Pool contract

#[ink::contract]
mod equity_pool {
    use ink_prelude::vec::Vec;
    
    #[ink(storage)]
    pub struct EquityPool {
        // Pool configuration
        name: String,
        description: String,
        pool_type: PoolType,
        
        // Financial state
        reserve: Balance,
        total_shares: u128,
        
        // Membership
        members: ink_storage::collections::HashMap<AccountId, Member>,
        
        // Governance
        admin: AccountId,
        proposal_count: u64,
        proposals: ink_storage::collections::HashMap<u64, Proposal>,
        
        // Risk model parameters
        risk_model: RiskModel,
    }
    
    impl EquityPool {
        #[ink(constructor)]
        pub fn new(name: String, description: String, pool_type: PoolType, risk_model: RiskModel) -> Self {
            Self {
                name,
                description,
                pool_type,
                reserve: 0,
                total_shares: 0,
                members: ink_storage::collections::HashMap::new(),
                admin: Self::env().caller(),
                proposal_count: 0,
                proposals: ink_storage::collections::HashMap::new(),
                risk_model,
            }
        }
        
        #[ink(message)]
        pub fn join_pool(&mut self, commitment: Balance) -> Result<(), Error> {
            let caller = self.env().caller();
            
            // Check if already a member
            if self.members.contains_key(&caller) {
                return Err(Error::AlreadyMember);
            }
            
            // Calculate shares based on commitment
            let shares = self.calculate_shares(commitment);
            
            // Transfer funds to pool
            if self.env().transfer(self.env().account_id(), commitment).is_err() {
                return Err(Error::TransferFailed);
            }
            
            // Register membership
            self.members.insert(caller, Member {
                account_id: caller,
                shares,
                contribution: commitment,
                claims_filed: Vec::new(),
                joined_at: self.env().block_timestamp(),
            });
            
            self.total_shares += shares;
            self.reserve += commitment;
            
            Ok(())
        }
        
        #[ink(message)]
        pub fn file_tariff_claim(&mut self, shipment_id: ShipmentId, tariff_amount: Balance, evidence: Hash) -> Result<ClaimId, Error> {
            let caller = self.env().caller();
            
            // Ensure caller is a member
            if !self.members.contains_key(&caller) {
                return Err(Error::NotAMember);
            }
            
            // Create a new claim
            let claim_id = self.generate_claim_id();
            let claim = Claim {
                id: claim_id,
                claimant: caller,
                shipment_id,
                tariff_amount,
                evidence,
                status: ClaimStatus::Pending,
            };
            
            // Store the claim
            self.claims.insert(claim_id, claim);
            
            // Update member record
            if let Some(member) = self.members.get_mut(&caller) {
                member.claims_filed.push(claim_id);
            }
            
            Ok(claim_id)
        }
        
        // Additional methods...
    }
}`}
        showLineNumbers={true}
      />
      
      <h2>Equity Pool Lifecycle</h2>
      
      <div className="my-6">
        <ol className="relative border-l border-slate-300 ml-6">
          <li className="mb-10 ml-10">
            <div className="absolute w-8 h-8 bg-blue-100 rounded-full -left-4 flex items-center justify-center ring-4 ring-white text-blue-600 font-bold">1</div>
            <h3 className="text-lg font-semibold text-slate-900">Pool Creation</h3>
            <p className="mb-2 text-sm text-slate-600">An initiator defines pool parameters, including:</p>
            <ul className="list-disc pl-5 text-sm text-slate-600">
              <li>Pool name and purpose</li>
              <li>Membership requirements</li>
              <li>Initial capitalization requirements</li>
              <li>Governance structure</li>
              <li>Risk models and tariff scope</li>
            </ul>
          </li>
          
          <li className="mb-10 ml-10">
            <div className="absolute w-8 h-8 bg-blue-100 rounded-full -left-4 flex items-center justify-center ring-4 ring-white text-blue-600 font-bold">2</div>
            <h3 className="text-lg font-semibold text-slate-900">Member Acquisition</h3>
            <p className="mb-2 text-sm text-slate-600">Traders join the pool by:</p>
            <ul className="list-disc pl-5 text-sm text-slate-600">
              <li>Submitting KYC/business verification</li>
              <li>Contributing capital to the pool</li>
              <li>Receiving membership tokens representing their share</li>
              <li>Agreeing to pool terms and conditions</li>
            </ul>
          </li>
          
          <li className="mb-10 ml-10">
            <div className="absolute w-8 h-8 bg-blue-100 rounded-full -left-4 flex items-center justify-center ring-4 ring-white text-blue-600 font-bold">3</div>
            <h3 className="text-lg font-semibold text-slate-900">Active Operations</h3>
            <p className="mb-2 text-sm text-slate-600">During normal operations:</p>
            <ul className="list-disc pl-5 text-sm text-slate-600">
              <li>Members submit tariff payment claims</li>
              <li>Pool governance verifies and approves claims</li>
              <li>Approved claims are paid from the pool reserve</li>
              <li>Risk model parameters are adjusted based on actual expenses</li>
              <li>Members contribute additional capital as needed</li>
            </ul>
          </li>
          
          <li className="mb-10 ml-10">
            <div className="absolute w-8 h-8 bg-blue-100 rounded-full -left-4 flex items-center justify-center ring-4 ring-white text-blue-600 font-bold">4</div>
            <h3 className="text-lg font-semibold text-slate-900">Distribution & Adjustment</h3>
            <p className="mb-2 text-sm text-slate-600">Periodically, the pool:</p>
            <ul className="list-disc pl-5 text-sm text-slate-600">
              <li>Distributes surplus funds to members</li>
              <li>Adjusts contribution requirements</li>
              <li>Updates risk models based on claim history</li>
              <li>Implements governance-approved improvements</li>
            </ul>
          </li>
          
          <li className="ml-10">
            <div className="absolute w-8 h-8 bg-blue-100 rounded-full -left-4 flex items-center justify-center ring-4 ring-white text-blue-600 font-bold">5</div>
            <h3 className="text-lg font-semibold text-slate-900">Exit Mechanisms</h3>
            <p className="mb-2 text-sm text-slate-600">Members can exit the pool through:</p>
            <ul className="list-disc pl-5 text-sm text-slate-600">
              <li>Scheduled withdrawal periods</li>
              <li>Share transfer to other participants</li>
              <li>Pool dissolution (if approved by governance)</li>
              <li>Token redemption for proportional reserve assets</li>
            </ul>
          </li>
        </ol>
      </div>
      
      <h2>Risk Modeling and Pricing</h2>
      
      <p>
        Equity Pools use sophisticated risk models to ensure fair contribution requirements and sustainable operations:
      </p>
      
      <div className="my-6 p-6 border border-slate-200 rounded-lg">
        <h3 className="font-semibold mb-4">Risk Factors Considered</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">Historical Tariff Volatility</h4>
              <p className="text-sm text-slate-600">
                Analysis of past tariff rate changes for relevant product categories and trade corridors to predict future volatility.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Geopolitical Risk</h4>
              <p className="text-sm text-slate-600">
                Assessment of political relationships between trading partners that might affect future tariff policies.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Member Trade Volume</h4>
              <p className="text-sm text-slate-600">
                Analysis of historical and projected trade volumes for each member to determine fair share of pool costs.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">Product Classification Risk</h4>
              <p className="text-sm text-slate-600">
                Evaluation of the risk of tariff classification disputes that could lead to unexpected tariff increases.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Seasonal Factors</h4>
              <p className="text-sm text-slate-600">
                Consideration of seasonal variations in trade volumes and tariff enforcement patterns.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Market Concentration</h4>
              <p className="text-sm text-slate-600">
                Assessment of the diversity of trade partners to avoid overexposure to specific trade corridors or product types.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <h2>Governance and Decision Making</h2>
      
      <p>
        Equity Pool governance is managed through on-chain voting mechanisms:
      </p>
      
      <div className="my-6 p-5 bg-slate-50 rounded-lg">
        <h3 className="font-semibold mb-4 text-slate-800">Decision Types</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
            <div className="ml-3">
              <h4 className="font-medium text-slate-800">Claim Approval</h4>
              <p className="text-sm text-slate-600">
                Decisions on whether to approve member claims for tariff reimbursement, typically requiring a simple majority vote.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center text-xs font-bold">2</div>
            <div className="ml-3">
              <h4 className="font-medium text-slate-800">Parameter Updates</h4>
              <p className="text-sm text-slate-600">
                Changes to pool parameters such as contribution requirements, claim limits, or risk models, typically requiring a supermajority.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center text-xs font-bold">3</div>
            <div className="ml-3">
              <h4 className="font-medium text-slate-800">Membership Decisions</h4>
              <p className="text-sm text-slate-600">
                Approving new members or sanctioning existing members for rule violations, often requiring a qualified majority.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center text-xs font-bold">4</div>
            <div className="ml-3">
              <h4 className="font-medium text-slate-800">Strategic Decisions</h4>
              <p className="text-sm text-slate-600">
                Major changes like pool mergers, splits, dissolution, or expansion into new trade areas, typically requiring a high supermajority.
              </p>
            </div>
          </li>
        </ul>
      </div>
      
      <h2>Case Study: Electronics Component Pool</h2>
      
      <div className="my-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <h3 className="text-blue-800 font-semibold mb-3">Electronic Components Equity Pool Example</h3>
        <div className="space-y-4 text-blue-700">
          <p>
            A group of 15 electronics manufacturers importing components from Asia to North America formed an Equity Pool to manage tariff costs amid trade tensions and rapidly changing tariff schedules.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-white p-4 rounded shadow-sm">
              <h4 className="font-medium text-blue-800 mb-2">Initial Setup</h4>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>Pool capitalized with $2.5M initial reserve</li>
                <li>Membership shares based on annual import volume</li>
                <li>Specialized in HS codes 8540-8542 (integrated circuits)</li>
                <li>Governed by 7-member elected committee</li>
              </ul>
            </div>
            <div className="flex-1 bg-white p-4 rounded shadow-sm">
              <h4 className="font-medium text-blue-800 mb-2">Results After 1 Year</h4>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>Processed 128 tariff claims totaling $1.8M</li>
                <li>Reduced member tariff volatility by 76%</li>
                <li>Negotiated 8% bulk processing discount with customs</li>
                <li>Expanded to 23 members with $4.2M reserve</li>
              </ul>
            </div>
          </div>
          
          <p>
            By pooling resources, members were able to weather an unexpected 25% tariff increase on certain components while maintaining stable pricing for their customers.
          </p>
        </div>
      </div>
      
      <h2>Future Developments</h2>
      
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border border-indigo-200 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-800 mb-2">Enhanced Risk Management</h3>
          <ul className="text-sm space-y-2 pl-5 list-disc text-slate-600">
            <li>Integration with predictive tariff analytics</li>
            <li>AI-driven risk modeling for contribution requirements</li>
            <li>Cross-pool reinsurance mechanisms</li>
            <li>Parametric coverage for tariff surge events</li>
          </ul>
        </div>
        <div className="p-4 border border-indigo-200 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-800 mb-2">Expanded Financial Products</h3>
          <ul className="text-sm space-y-2 pl-5 list-disc text-slate-600">
            <li>Tariff futures and options integrated with pools</li>
            <li>Trade finance lending backed by pool reserves</li>
            <li>Cross-border payment solutions for pool members</li>
            <li>Tokenized pool shares with secondary market trading</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Get Started</h3>
        <p className="text-blue-700">
          Businesses interested in joining or creating an Equity Pool can connect with the Aduana platform to explore options, run risk simulations, and find compatible pools aligned with their trade profiles.
        </p>
      </div>
    </div>
  )
} 