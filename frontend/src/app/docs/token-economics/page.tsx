import { CodeBlock } from '@/components/ui/code-block';

export default function TokenEconomicsPage() {
  return (
    <div className="prose max-w-none dark:text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Token Economics</h1>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl mb-10 border border-blue-100 dark:border-blue-800">
        <p className="text-xl text-blue-800 dark:text-blue-200 leading-relaxed">
          The DUANA token is the native utility and governance token of the Aduana platform. It facilitates operations within the ecosystem while creating aligned incentives for all participants in the international trade network.
        </p>
      </div>
      
      <h2>Token Utility</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg">
          <h3 className="text-indigo-800 font-semibold">Primary Functions</h3>
          <ul className="mt-3 space-y-2">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2"><strong>Network fees</strong>: Pay for transactions and origin verification processes</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2"><strong>Governance</strong>: Vote on protocol upgrades and parameter changes</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2"><strong>Staking</strong>: Secure the network and earn rewards</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2"><strong>Equity pools</strong>: Provide liquidity to trade derivatives</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg">
          <h3 className="text-indigo-800 font-semibold">Secondary Functions</h3>
          <ul className="mt-3 space-y-2">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2"><strong>Collateral</strong>: Back financial instruments in the system</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2"><strong>Rebate distribution</strong>: Share benefits from network growth</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2"><strong>Origin verification</strong>: Incentivize honest verification</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2"><strong>Parachain security</strong>: Contribute to Kusama security</span>
            </li>
          </ul>
        </div>
      </div>
      
      <h2>Token Distribution</h2>
      
      <div className="my-8">
        <div className="overflow-hidden bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">DUANA Token Allocation</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-indigo-100 rounded-md p-4">
                <h4 className="font-semibold text-indigo-800">Total Supply</h4>
                <p className="mt-1 font-bold text-2xl text-indigo-900">100,000,000 DUANA</p>
                <p className="text-sm text-indigo-700 mt-1">Hard cap, no additional minting</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-center bg-blue-50 p-2 rounded">
                  <div>
                    <h5 className="font-medium text-blue-800">Public Sale</h5>
                    <p className="text-sm text-blue-600">20,000,000 DUANA</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-800">20%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-purple-50 p-2 rounded">
                  <div>
                    <h5 className="font-medium text-purple-800">Team & Advisors</h5>
                    <p className="text-sm text-purple-600">15,000,000 DUANA</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-purple-800">15%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                  <div>
                    <h5 className="font-medium text-green-800">Ecosystem Growth</h5>
                    <p className="text-sm text-green-600">30,000,000 DUANA</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-800">30%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-yellow-50 p-2 rounded">
                  <div>
                    <h5 className="font-medium text-yellow-800">Treasury</h5>
                    <p className="text-sm text-yellow-600">20,000,000 DUANA</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-yellow-800">20%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-red-50 p-2 rounded">
                  <div>
                    <h5 className="font-medium text-red-800">Liquidity</h5>
                    <p className="text-sm text-red-600">15,000,000 DUANA</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-800">15%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h2>Vesting Schedule</h2>
      
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Allocation</th>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Cliff</th>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Vesting Period</th>
              <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Initial Unlock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Public Sale</td>
              <td className="px-6 py-4 text-sm">None</td>
              <td className="px-6 py-4 text-sm">25% at TGE, 25% per month</td>
              <td className="px-6 py-4 text-sm">25%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Team & Advisors</td>
              <td className="px-6 py-4 text-sm">12 months</td>
              <td className="px-6 py-4 text-sm">24 months linear</td>
              <td className="px-6 py-4 text-sm">0%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Ecosystem Growth</td>
              <td className="px-6 py-4 text-sm">6 months</td>
              <td className="px-6 py-4 text-sm">36 months linear</td>
              <td className="px-6 py-4 text-sm">5%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Treasury</td>
              <td className="px-6 py-4 text-sm">None</td>
              <td className="px-6 py-4 text-sm">48 months linear</td>
              <td className="px-6 py-4 text-sm">10%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Liquidity</td>
              <td className="px-6 py-4 text-sm">None</td>
              <td className="px-6 py-4 text-sm">Immediate</td>
              <td className="px-6 py-4 text-sm">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2>Token Value Accrual</h2>
      
      <div className="my-6 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold mb-3">Value Capture Mechanisms</h3>
        
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h4 className="font-medium">Fee Sharing</h4>
            <p className="text-slate-600 text-sm mt-1">
              30% of all transaction fees and verification fees are distributed to token stakers, providing a direct revenue stream to token holders.
            </p>
          </div>
          
          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h4 className="font-medium">Buy-Back and Burn</h4>
            <p className="text-slate-600 text-sm mt-1">
              25% of platform revenues are used to buy back DUANA tokens from the market and burn them, creating deflationary pressure that can increase token value over time.
            </p>
          </div>
          
          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h4 className="font-medium">Staking Incentives</h4>
            <p className="text-slate-600 text-sm mt-1">
              Annual percentage yields for staking are structured to encourage long-term holding, with bonuses for longer lock-up periods.
            </p>
          </div>
          
          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h4 className="font-medium">Governance Rights</h4>
            <p className="text-slate-600 text-sm mt-1">
              Token holders have exclusive rights to vote on protocol upgrades, fee structures, and treasury allocations, creating utility value.
            </p>
          </div>
        </div>
      </div>
      
      <h2>Staking Mechanism</h2>
      
      <div className="my-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h3 className="text-blue-800 font-semibold mb-4">Staking Tiers</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="font-medium text-blue-700 mb-2">Basic Tier</h4>
              <p className="text-sm text-slate-600 mb-2">5,000 - 19,999 DUANA</p>
              <ul className="text-xs space-y-1 text-slate-500">
                <li>• Base APY: 8%</li>
                <li>• Fee Share: 10%</li>
                <li>• Voting Weight: 1x</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded shadow-sm border border-blue-200">
              <h4 className="font-medium text-blue-700 mb-2">Premium Tier</h4>
              <p className="text-sm text-slate-600 mb-2">20,000 - 99,999 DUANA</p>
              <ul className="text-xs space-y-1 text-slate-500">
                <li>• Base APY: 12%</li>
                <li>• Fee Share: 15%</li>
                <li>• Voting Weight: 1.5x</li>
                <li>• Early Access to New Features</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded shadow-sm border-2 border-blue-300">
              <h4 className="font-medium text-blue-700 mb-2">Validator Tier</h4>
              <p className="text-sm text-slate-600 mb-2">100,000+ DUANA</p>
              <ul className="text-xs space-y-1 text-slate-500">
                <li>• Base APY: 15%</li>
                <li>• Fee Share: 25%</li>
                <li>• Voting Weight: 2x</li>
                <li>• Validator Node Eligibility</li>
                <li>• Governance Committee Eligibility</li>
              </ul>
            </div>
          </div>
          
          <h4 className="font-medium text-blue-800 mb-3">Lock-up Bonuses</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm font-medium text-blue-700">1 Month</p>
              <p className="text-xs text-slate-600">+0% APY</p>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm font-medium text-blue-700">3 Months</p>
              <p className="text-xs text-slate-600">+2% APY</p>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm font-medium text-blue-700">6 Months</p>
              <p className="text-xs text-slate-600">+5% APY</p>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm font-medium text-blue-700">12 Months</p>
              <p className="text-xs text-slate-600">+10% APY</p>
            </div>
          </div>
        </div>
      </div>
      
      <h2>Parachain Economics</h2>
      
      <p>
        As a Kusama parachain, Aduana's token economics are integrated with the broader Kusama ecosystem:
      </p>
      
      <div className="my-6 p-5 border border-dashed border-slate-300 rounded-lg">
        <h3 className="font-semibold mb-3">Parachain Slot Auctions</h3>
        <div className="text-slate-600 space-y-3">
          <p>
            Aduana secures its parachain slot through crowdloans, where KSM holders can lock their tokens to support our parachain bid. In return, contributors receive DUANA tokens as rewards.
          </p>
          <p>
            <strong>Current Allocation:</strong> 5% of total DUANA supply is reserved for parachain slot auction rewards.
          </p>
          <p>
            <strong>Reward Structure:</strong> Base rewards + bonuses for early participants and larger contributions.
          </p>
        </div>
      </div>
      
      <h2>Treasury Management</h2>
      
      <div className="my-6">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Treasury Allocation Guidelines</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4 sm:col-span-3">
                  <div className="h-2.5 bg-green-500 rounded-full"></div>
                </div>
                <div className="col-span-8 sm:col-span-9">
                  <p className="text-sm font-medium text-gray-900">40% - Protocol Development</p>
                  <p className="text-xs text-gray-500">Core protocol features, security audits, and infrastructure</p>
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 sm:col-span-2.5">
                  <div className="h-2.5 bg-blue-500 rounded-full"></div>
                </div>
                <div className="col-span-9 sm:col-span-9.5">
                  <p className="text-sm font-medium text-gray-900">25% - Ecosystem Grants</p>
                  <p className="text-xs text-gray-500">Supporting dApps, tools, and integrations built on Aduana</p>
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 sm:col-span-2">
                  <div className="h-2.5 bg-purple-500 rounded-full"></div>
                </div>
                <div className="col-span-10 sm:col-span-10">
                  <p className="text-sm font-medium text-gray-900">20% - Marketing & Adoption</p>
                  <p className="text-xs text-gray-500">User acquisition, industry partnerships, and education</p>
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1 sm:col-span-1">
                  <div className="h-2.5 bg-yellow-500 rounded-full"></div>
                </div>
                <div className="col-span-11 sm:col-span-11">
                  <p className="text-sm font-medium text-gray-900">10% - Legal & Compliance</p>
                  <p className="text-xs text-gray-500">Regulatory compliance, legal framework, and industry standards</p>
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-0.5 sm:col-span-0.5">
                  <div className="h-2.5 bg-red-500 rounded-full"></div>
                </div>
                <div className="col-span-11.5 sm:col-span-11.5">
                  <p className="text-sm font-medium text-gray-900">5% - Emergency Fund</p>
                  <p className="text-xs text-gray-500">Reserved for unexpected challenges and opportunities</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-5 py-3 bg-gray-50">
            <p className="text-xs text-gray-500">Treasury allocations are reviewed quarterly by the DAO governance process.</p>
          </div>
        </div>
      </div>
      
      <h2>Staking Rewards Distribution</h2>
      
      <p>
        The distribution of staking rewards follows a well-defined formula to ensure fair allocation:
      </p>
      
      <CodeBlock 
        language="rust"
        value={`// Simplified reward calculation in Rust
fn calculate_staking_reward(
    staked_amount: Balance,
    staking_duration: Blocks,
    tier_multiplier: Fixed,
    network_inflation: Rate,
) -> Balance {
    let base_reward = staked_amount
        .saturating_mul(network_inflation)
        .saturating_div(BLOCKS_PER_YEAR);
        
    let duration_bonus = if staking_duration >= YEAR_LOCK {
        FixedU128::from_rational(110, 100) // 10% bonus
    } else if staking_duration >= HALF_YEAR_LOCK {
        FixedU128::from_rational(105, 100) // 5% bonus
    } else if staking_duration >= QUARTER_YEAR_LOCK {
        FixedU128::from_rational(102, 100) // 2% bonus
    } else {
        FixedU128::from_rational(100, 100) // No bonus
    };
    
    // Apply tier multiplier and duration bonus
    let adjusted_reward = base_reward
        .saturating_mul(tier_multiplier)
        .saturating_mul(duration_bonus);
        
    adjusted_reward
}`}
        showLineNumbers={true}
      />
      
      <h2>Governance Voting Power</h2>
      
      <p>
        Voting power in the Aduana DAO is calculated based on token holdings and staking duration:
      </p>
      
      <CodeBlock 
        language="typescript"
        value={`// Voting power calculation in TypeScript
function calculateVotingPower(
  tokenBalance: bigint,
  stakedAmount: bigint,
  stakingDuration: number, // in days
  delegatedAmount: bigint = 0n
): bigint {
  // Base voting power from token holdings
  const baseVotingPower = tokenBalance;
  
  // Staking multiplier based on duration
  let stakingMultiplier = 10000n; // Base multiplier (1.0)
  if (stakingDuration >= 365) {
    stakingMultiplier = 20000n; // 2.0x for 1+ year
  } else if (stakingDuration >= 180) {
    stakingMultiplier = 15000n; // 1.5x for 6+ months
  } else if (stakingDuration >= 90) {
    stakingMultiplier = 12500n; // 1.25x for 3+ months
  }
  
  // Calculate staking bonus
  const stakingBonus = (stakedAmount * stakingMultiplier) / 10000n;
  
  // Add delegated voting power (at 80% efficiency)
  const delegationBonus = (delegatedAmount * 8000n) / 10000n;
  
  // Total voting power
  return baseVotingPower + stakingBonus + delegationBonus;
}`}
        showLineNumbers={true}
      />
      
      <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Token Economics Resources</h3>
        <p className="text-blue-700">
          For more detailed information on DUANA tokenomics, please refer to our official economic whitepaper and join our community discussions on governance forums.
        </p>
      </div>
    </div>
  )
} 