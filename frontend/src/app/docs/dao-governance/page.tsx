export default function DaoGovernancePage() {
  return (
    <div className="prose max-w-none">
      <h1>DAO Governance</h1>
      
      <p>
        The Aduana DAO (Decentralized Autonomous Organization) forms the backbone of the platform's governance system, enabling stakeholders to collectively manage and evolve the protocol through transparent, decentralized decision-making.
      </p>
      
      <h2>Governance Model</h2>
      
      <p>
        Aduana implements a multi-tiered governance model that balances efficiency with decentralization:
      </p>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Key Governance Layers</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>Token Holder Governance</strong>: DUANA token holders have voting rights proportional to their holdings</li>
          <li><strong>Council Oversight</strong>: Elected representatives provide specialized oversight</li>
          <li><strong>Technical Committee</strong>: Expert group for technical implementations</li>
          <li><strong>Emergency Measures</strong>: Safeguards for critical security issues</li>
        </ol>
      </div>
      
      <h2>DUANA Token Governance Rights</h2>
      
      <p>
        The DUANA token serves as the primary governance instrument with the following rights:
      </p>
      
      <ul className="list-disc pl-5 space-y-1">
        <li>Proposal submission</li>
        <li>Voting on protocol changes</li>
        <li>Electing council members</li>
        <li>Setting key parameters</li>
        <li>Controlling treasury funds</li>
      </ul>
      
      <div className="my-8">
        <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto">
          <code>
{`// Example of proposal submission in Substrate
pub fn submit_proposal(
    origin: OriginFor<T>,
    proposal: Box<T::Proposal>,
    threshold: u32,
) -> DispatchResult {
    let proposer = ensure_signed(origin)?;
    
    // Check minimum token balance for proposal submission
    let balance = T::Currency::free_balance(&proposer);
    ensure!(balance >= T::MinProposalBalance::get(), Error::<T>::InsufficientProposerBalance);
    
    // Create a unique proposal ID
    let proposal_id = Self::next_proposal_id();
    <NextProposalId<T>>::mutate(|id| *id += 1);
    
    // Verify threshold is valid
    ensure!(threshold > 0 && threshold <= 100, Error::<T>::InvalidThreshold);
    
    // Store the proposal
    let new_proposal = Proposal {
        id: proposal_id,
        proposer: proposer.clone(),
        proposal: *proposal,
        threshold,
        votes_for: 0,
        votes_against: 0,
        status: ProposalStatus::Active,
        expiry: frame_system::Pallet::<T>::block_number() + T::ProposalLifetime::get(),
    };
    
    <Proposals<T>>::insert(proposal_id, new_proposal);
    
    // Lock proposal bond
    T::Currency::reserve(&proposer, T::ProposalBond::get())?;
    
    // Emit event
    Self::deposit_event(Event::ProposalSubmitted(proposal_id, proposer));
    
    Ok(())
}`}
          </code>
        </pre>
      </div>
      
      <h3>Voting Mechanism</h3>
      
      <p>
        Votes are weighted by token holdings and include:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-semibold text-lg mb-2">Yes Votes</h4>
          <p className="text-slate-600 text-sm">Support for the proposed changes to be implemented.</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-semibold text-lg mb-2">No Votes</h4>
          <p className="text-slate-600 text-sm">Opposition to the proposed changes, preventing implementation.</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-semibold text-lg mb-2">Abstain</h4>
          <p className="text-slate-600 text-sm">Neutral position that counts toward quorum but not for or against.</p>
        </div>
      </div>
      
      <h2>Governance Domains</h2>
      
      <p>
        The DAO governs several key areas:
      </p>
      
      <h3>Protocol Parameters</h3>
      
      <ul>
        <li>Tariff verification thresholds</li>
        <li>Fee structures</li>
        <li>Staking rewards and slashing conditions</li>
        <li>Oracle data acceptance criteria</li>
      </ul>
      
      <h3>Treasury Management</h3>
      
      <ul>
        <li>Funding allocations</li>
        <li>Protocol reserve management</li>
        <li>Ecosystem grants</li>
        <li>Revenue distribution</li>
      </ul>
      
      <h3>System Upgrades</h3>
      
      <ul>
        <li>Runtime upgrades</li>
        <li>Smart contract updates</li>
        <li>New pallet implementations</li>
        <li>Oracle integrations</li>
      </ul>
      
      <h3>Dispute Resolution</h3>
      
      <ul>
        <li>Resolution of trade disputes</li>
        <li>Verification challenges</li>
        <li>Slashing appeals</li>
        <li>Cross-chain conflict resolution</li>
      </ul>
      
      <h2>Cross-Chain Governance</h2>
      
      <p>
        As a parachain, Aduana has unique governance considerations:
      </p>
      
      <div className="my-6 p-6 border border-slate-200 rounded-lg">
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3 mt-0.5">1</div>
            <div>
              <strong>Kusama Integration:</strong> Alignment with relay chain governance
            </div>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3 mt-0.5">2</div>
            <div>
              <strong>XCM Governance:</strong> Cross-chain message governance
            </div>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3 mt-0.5">3</div>
            <div>
              <strong>Interoperability Decisions:</strong> Standards for cross-chain operations
            </div>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3 mt-0.5">4</div>
            <div>
              <strong>Shared Security Model:</strong> Relationship with relay chain validators
            </div>
          </li>
        </ul>
      </div>
      
      <h2>Future Governance Roadmap</h2>
      
      <p>
        The Aduana governance system will evolve:
      </p>
      
      <ol>
        <li><strong>Advanced Voting Systems:</strong> Conviction voting, quadratic funding</li>
        <li><strong>Delegation Markets:</strong> Liquid democracy features</li>
        <li><strong>Reputation Systems:</strong> Merit-based influence</li>
        <li><strong>Cross-DAO Collaboration:</strong> Interoperation with other DAOs</li>
        <li><strong>AI Governance Assistance:</strong> Analytics for proposal impacts</li>
      </ol>
    </div>
  )
} 