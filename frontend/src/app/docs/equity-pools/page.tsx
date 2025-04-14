export default function EquityPoolsPage() {
  return (
    <div className="prose max-w-none">
      <h1>Equity Pools</h1>
      
      <p>
        Equity Pools represent a core innovation in the Aduana ecosystem, allowing traders to pool resources to collectively manage tariff risks and reduce trade costs across international borders.
      </p>
      
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg my-6">
        <h2 className="text-indigo-800 font-semibold mt-0">What are Equity Pools?</h2>
        <p className="text-indigo-700 mb-3">
          Equity Pools are smart contract-powered collectives where traders with similar interests can pool funds to spread the costs and risks associated with international trade tariffs, creating a mutual insurance system for trade finance.
        </p>
        <p className="text-indigo-700">
          By participating in an Equity Pool, traders can stabilize their tariff expenses, predict costs with greater accuracy, and potentially reduce overall tariff expenditure through collective bargaining and risk distribution.
        </p>
      </div>
      
      <h2>Key Benefits</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-white shadow overflow-hidden rounded-lg border border-slate-200">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">For Importers</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>Reduced tariff volatility and predictable costs</li>
              <li>Lower capital requirements for individual shipments</li>
              <li>Shared administrative burden for compliance</li>
              <li>Access to preferred tariff rates through collective volume</li>
              <li>Protection against unexpected tariff increases</li>
            </ul>
          </div>
        </div>
        <div className="bg-white shadow overflow-hidden rounded-lg border border-slate-200">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">For the Ecosystem</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>Enhanced liquidity for trade finance</li>
              <li>Market-driven price discovery for tariff risk</li>
              <li>Reduced trade barriers for smaller participants</li>
              <li>Incentivized compliance and transparent reporting</li>
              <li>Network effects that scale with participation</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>Equity Pool Structure</h2>
      
      <div className="my-6">
        <img src="/images/equity-pool-diagram.svg" alt="Equity Pool Structure Diagram" className="w-full rounded-lg shadow-md" />
      </div>
      
      <h3>Pool Components</h3>
      
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Component</th>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Function</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Pool Reserve</td>
              <td className="px-6 py-4 text-sm">The main treasury of the pool containing member contributions.</td>
              <td className="px-6 py-4 text-sm">Pays for tariffs and distributes benefits to members</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Membership Tokens</td>
              <td className="px-6 py-4 text-sm">NFTs representing ownership shares in the pool.</td>
              <td className="px-6 py-4 text-sm">Determines voting power and benefit distribution rights</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Governance Module</td>
              <td className="px-6 py-4 text-sm">Rules for how pool decisions are made.</td>
              <td className="px-6 py-4 text-sm">Manages parameter updates and claim approvals</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Claiming System</td>
              <td className="px-6 py-4 text-sm">Process for requesting tariff payments from the pool.</td>
              <td className="px-6 py-4 text-sm">Validates and processes tariff reimbursement requests</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Risk Model</td>
              <td className="px-6 py-4 text-sm">Algorithms for calculating contribution requirements.</td>
              <td className="px-6 py-4 text-sm">Ensures fair contribution levels based on risk exposure</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2>Pool Types and Specialization</h2>
      
      <p>
        Equity Pools can be specialized in various ways to serve different market segments:
      </p>
      
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-slate-50 rounded-lg">
          <h3 className="font-semibold mb-2">Product-Specific</h3>
          <p className="text-slate-600 text-sm mb-3">
            Pools focused on specific product categories with similar tariff classifications.
          </p>
          <div className="text-xs text-slate-500">
            <p className="font-medium mb-1">Examples:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>Electronics Equipment Pool</li>
              <li>Agricultural Products Pool</li>
              <li>Automotive Parts Pool</li>
            </ul>
          </div>
        </div>
        <div className="p-5 bg-slate-50 rounded-lg">
          <h3 className="font-semibold mb-2">Regional Focus</h3>
          <p className="text-slate-600 text-sm mb-3">
            Pools specialized in trade between specific countries or regional blocs.
          </p>
          <div className="text-xs text-slate-500">
            <p className="font-medium mb-1">Examples:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>US-EU Trade Pool</li>
              <li>ASEAN Importers Pool</li>
              <li>Pacific Rim Pool</li>
            </ul>
          </div>
        </div>
        <div className="p-5 bg-slate-50 rounded-lg">
          <h3 className="font-semibold mb-2">Business Size</h3>
          <p className="text-slate-600 text-sm mb-3">
            Pools that group businesses of similar size to address specific scale challenges.
          </p>
          <div className="text-xs text-slate-500">
            <p className="font-medium mb-1">Examples:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>SME Collaborative Pool</li>
              <li>Enterprise-Scale Pool</li>
              <li>Microenterprise Support Pool</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>Smart Contract Implementation</h2>
      
      <p>
        The Equity Pool system is implemented as a set of smart contracts on the Aduana platform:
      </p>
      
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto my-6">
        <code>
{`// Simplified representation of the Equity Pool contract

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
                filed_at: self.env().block_timestamp(),
                resolved_at: None,
            };
            
            // Store claim in member's history
            let member = self.members.get_mut(&caller).unwrap();
            member.claims_filed.push(claim_id);
            
            // Create a proposal for claim approval
            self.create_claim_proposal(claim_id, claim);
            
            Ok(claim_id)
        }
        
        // Additional methods for governance, claim approval, fund distribution, etc.
    }
}`}
        </code>
      </pre>
      
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