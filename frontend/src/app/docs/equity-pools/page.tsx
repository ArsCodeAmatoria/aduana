export default function EquityPoolsPage() {
  return (
    <div className="prose max-w-none">
      <h1>Equity Pools</h1>
      
      <p>
        Equity Pools are a core financial mechanism within Aduana that distribute tariff costs equitably among participants, reducing the individual burden on traders and creating a more efficient international trade system.
      </p>
      
      <h2>Overview</h2>
      
      <p>
        Traditional tariff systems place the full burden of tariff costs on individual importers, creating significant financial pressure and market inefficiencies. Aduana's Equity Pools introduce a collective approach to tariff management by:
      </p>
      
      <ol>
        <li>Pooling resources from multiple traders</li>
        <li>Distributing tariff costs based on fair allocation models</li>
        <li>Providing tariff cost smoothing over time</li>
        <li>Creating economies of scale for tariff management</li>
      </ol>
      
      <h2>How Equity Pools Work</h2>
      
      <h3>Pool Formation</h3>
      
      <p>
        Traders join Equity Pools based on:
      </p>
      <ul>
        <li>Geographic region</li>
        <li>Industry sector</li>
        <li>Product categories</li>
        <li>Trading partners</li>
        <li>Risk profiles</li>
      </ul>
      
      <p>
        Each pool operates as a smart contract-managed fund that collects contributions and allocates tariff payments.
      </p>
      
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto">
        <code>
{`// Example of pool creation in Substrate
pub fn create_equity_pool(
    origin: OriginFor<T>,
    pool_params: PoolParameters,
    initial_contribution: BalanceOf<T>,
) -> DispatchResult {
    let creator = ensure_signed(origin)?;
    
    // Validate pool parameters
    ensure!(pool_params.is_valid(), Error::<T>::InvalidPoolParameters);
    
    // Generate unique pool ID
    let pool_id = Self::next_pool_id();
    <NextPoolId<T>>::mutate(|id| *id += 1);
    
    // Create the pool
    let pool = EquityPool {
        id: pool_id,
        creator,
        parameters: pool_params,
        total_value: initial_contribution,
        members: vec![creator.clone()],
        created_at: frame_system::Pallet::<T>::block_number(),
    };
    
    // Store the pool
    <EquityPools<T>>::insert(pool_id, pool);
    
    // Transfer initial contribution
    T::Currency::transfer(&creator, &Self::pool_account_id(pool_id), initial_contribution, ExistenceRequirement::KeepAlive)?;
    
    // Emit event
    Self::deposit_event(Event::EquityPoolCreated(pool_id, creator));
    
    Ok(())
}`}
        </code>
      </pre>
      
      <h3>Contribution Mechanisms</h3>
      
      <p>
        Members contribute to pools through:
      </p>
      <ul>
        <li>Regular scheduled payments</li>
        <li>Per-shipment contributions</li>
        <li>Stake-based participation</li>
        <li>Tariff rebate sharing</li>
      </ul>
      
      <h3>Tariff Payment Allocation</h3>
      
      <p>
        When tariffs are due, the pool allocates payments based on:
      </p>
      <ul>
        <li>Proportional contribution to the pool</li>
        <li>Risk-adjusted fair share models</li>
        <li>Priority shipment frameworks</li>
        <li>Historical trade volume</li>
      </ul>
      
      <h2>Key Benefits</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div className="p-6 bg-slate-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Cost Reduction</h3>
          <p className="text-slate-600">
            By pooling resources and distributing costs, members enjoy lower effective tariff rates, reduced financial volatility, optimized cash flow, and economies of scale.
          </p>
        </div>
        
        <div className="p-6 bg-slate-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Risk Distribution</h3>
          <p className="text-slate-600">
            Equity Pools spread risk across participants, providing protection against unexpected tariff increases, mitigation of regulatory risks, resilience against trade disputes, and reduced exposure to policy changes.
          </p>
        </div>
        
        <div className="p-6 bg-slate-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Market Efficiency</h3>
          <p className="text-slate-600">
            The pool system creates more predictable costs for businesses, reduced barriers to international trade, enhanced competitiveness for SMEs, and greater market stability.
          </p>
        </div>
      </div>
      
      <h2>Pool Governance</h2>
      
      <p>
        Each Equity Pool has governance mechanisms:
      </p>
      <ul>
        <li>Member voting on pool parameters</li>
        <li>Contribution adjustments</li>
        <li>Payment prioritization rules</li>
        <li>Risk management policies</li>
      </ul>
      
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto">
        <code>
{`pub fn vote_on_pool_proposal(
    origin: OriginFor<T>,
    pool_id: PoolId,
    proposal_id: ProposalId,
    vote: Vote,
) -> DispatchResult {
    let voter = ensure_signed(origin)?;
    
    // Ensure pool exists and user is a member
    ensure!(<EquityPools<T>>::contains_key(pool_id), Error::<T>::PoolNotFound);
    ensure!(Self::is_pool_member(pool_id, &voter), Error::<T>::NotPoolMember);
    
    // Record the vote
    <Votes<T>>::insert((pool_id, proposal_id, voter.clone()), vote);
    
    // Emit event
    Self::deposit_event(Event::VoteCast(pool_id, proposal_id, voter, vote));
    
    // Check if proposal can be executed
    if Self::can_execute_proposal(pool_id, proposal_id) {
        Self::execute_proposal(pool_id, proposal_id)?;
    }
    
    Ok(())
}`}
        </code>
      </pre>
      
      <h2>Integration with Other Aduana Systems</h2>
      
      <p>
        Equity Pools interact with other Aduana components:
      </p>
      <ul>
        <li><strong>ZK Origin Proofs</strong>: Verified origins determine pool eligibility</li>
        <li><strong>Insurance Pool</strong>: Risk transfer between pools and insurance</li>
        <li><strong>Synthetic Market</strong>: Pools can hedge using synthetic derivatives</li>
        <li><strong>DUANA Token</strong>: Staking influences pool governance</li>
        <li><strong>DAO Governance</strong>: Global parameters for all pools</li>
      </ul>
      
      <h2>Future Developments</h2>
      
      <p>
        The Equity Pools system will evolve to include:
      </p>
      <ol>
        <li><strong>Cross-Border Pools</strong>: Spanning multiple jurisdictions</li>
        <li><strong>AI-Driven Allocation</strong>: Advanced algorithms for cost distribution</li>
        <li><strong>Tokenized Pool Shares</strong>: Transferable stakes in equity pools</li>
        <li><strong>Automated Pool Matching</strong>: Connecting traders to optimal pools</li>
        <li><strong>Regulatory Compliance Module</strong>: Ensuring pools meet legal requirements</li>
      </ol>
    </div>
  )
} 