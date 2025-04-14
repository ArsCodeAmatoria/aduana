# DAO Governance

The Aduana DAO (Decentralized Autonomous Organization) forms the backbone of the platform's governance system, enabling stakeholders to collectively manage and evolve the protocol through transparent, decentralized decision-making.

## Governance Model

Aduana implements a multi-tiered governance model that balances efficiency with decentralization:

### Key Governance Layers

1. **Token Holder Governance**: DUANA token holders have voting rights proportional to their holdings
2. **Council Oversight**: Elected representatives provide specialized oversight
3. **Technical Committee**: Expert group for technical implementations
4. **Emergency Measures**: Safeguards for critical security issues

## DUANA Token Governance Rights

The DUANA token serves as the primary governance instrument with the following rights:

- Proposal submission
- Voting on protocol changes
- Electing council members
- Setting key parameters
- Controlling treasury funds

```rust
// Example of proposal submission in Substrate
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
}
```

### Voting Mechanism

Votes are weighted by token holdings and include:

```rust
pub fn vote_on_proposal(
    origin: OriginFor<T>,
    proposal_id: ProposalId,
    vote: Vote,
) -> DispatchResult {
    let voter = ensure_signed(origin)?;
    
    // Check if proposal exists and is active
    let mut proposal = Self::proposal(proposal_id).ok_or(Error::<T>::ProposalNotFound)?;
    ensure!(proposal.status == ProposalStatus::Active, Error::<T>::ProposalNotActive);
    
    // Check if already voted
    ensure!(!<Votes<T>>::contains_key((proposal_id, voter.clone())), Error::<T>::AlreadyVoted);
    
    // Calculate vote weight based on token balance
    let voter_balance = T::Currency::free_balance(&voter);
    let vote_weight = Self::calculate_vote_weight(voter_balance);
    
    // Record the vote
    <Votes<T>>::insert((proposal_id, voter.clone()), (vote.clone(), vote_weight));
    
    // Update proposal vote tallies
    match vote {
        Vote::Yes => proposal.votes_for += vote_weight,
        Vote::No => proposal.votes_against += vote_weight,
        Vote::Abstain => {}, // No change to tallies
    }
    
    // Check if proposal can be executed or rejected
    if proposal.votes_for >= proposal.threshold as u128 * T::TotalIssuance::get() / 100 {
        proposal.status = ProposalStatus::Approved;
        Self::execute_proposal(proposal_id, proposal.proposal)?;
    } else if proposal.votes_against >= (100 - proposal.threshold) as u128 * T::TotalIssuance::get() / 100 {
        proposal.status = ProposalStatus::Rejected;
    }
    
    // Update proposal
    <Proposals<T>>::insert(proposal_id, proposal);
    
    // Emit event
    Self::deposit_event(Event::VoteCast(proposal_id, voter, vote, vote_weight));
    
    Ok(())
}
```

## Governance Domains

The DAO governs several key areas:

### Protocol Parameters

- Tariff verification thresholds
- Fee structures
- Staking rewards and slashing conditions
- Oracle data acceptance criteria

### Treasury Management

- Funding allocations
- Protocol reserve management
- Ecosystem grants
- Revenue distribution

```rust
pub fn propose_treasury_spend(
    origin: OriginFor<T>,
    recipient: T::AccountId,
    amount: BalanceOf<T>,
    purpose: Vec<u8>,
) -> DispatchResult {
    let proposer = ensure_signed(origin)?;
    
    // Verify treasury has sufficient funds
    let treasury_balance = T::Currency::free_balance(&Self::treasury_account_id());
    ensure!(treasury_balance >= amount, Error::<T>::InsufficientTreasuryFunds);
    
    // Create treasury proposal
    let proposal_id = Self::next_treasury_proposal_id();
    <NextTreasuryProposalId<T>>::mutate(|id| *id += 1);
    
    let treasury_proposal = TreasuryProposal {
        id: proposal_id,
        proposer: proposer.clone(),
        recipient: recipient.clone(),
        amount,
        purpose: purpose.clone(),
        status: ProposalStatus::Active,
        votes: BTreeMap::new(),
        expiry: frame_system::Pallet::<T>::block_number() + T::TreasuryProposalLifetime::get(),
    };
    
    <TreasuryProposals<T>>::insert(proposal_id, treasury_proposal);
    
    // Emit event
    Self::deposit_event(Event::TreasuryProposalSubmitted(proposal_id, proposer, recipient, amount));
    
    Ok(())
}
```

### System Upgrades

- Runtime upgrades
- Smart contract updates
- New pallet implementations
- Oracle integrations

### Dispute Resolution

- Resolution of trade disputes
- Verification challenges
- Slashing appeals
- Cross-chain conflict resolution

## Council Structure

The Aduana Council consists of elected representatives:

- **Election Process**: Token-weighted voting
- **Term Limits**: Defined governance periods
- **Responsibilities**: Protocol oversight and emergency handling
- **Accountability**: Performance tracking and recall mechanisms

```rust
pub fn start_council_election(
    origin: OriginFor<T>,
) -> DispatchResult {
    ensure_root(origin)?;
    
    // Ensure no active election
    ensure!(!<ElectionActive<T>>::get(), Error::<T>::ElectionAlreadyActive);
    
    // Set election as active
    <ElectionActive<T>>::put(true);
    
    // Set election end block
    let end_block = frame_system::Pallet::<T>::block_number() + T::ElectionPeriod::get();
    <ElectionEndBlock<T>>::put(end_block);
    
    // Clear candidates and votes
    <Candidates<T>>::kill();
    <CouncilVotes<T>>::kill();
    
    // Emit event
    Self::deposit_event(Event::CouncilElectionStarted(end_block));
    
    Ok(())
}
```

## Technical Committees

Specialized committees focus on specific areas:

- **Development Committee**: Core protocol development
- **Economic Committee**: Tokenomics and market dynamics
- **Compliance Committee**: Regulatory and legal matters
- **User Experience Committee**: Interface and usability

## Proposal Lifecycle

Each governance proposal follows a defined lifecycle:

1. **Submission**: Token holders submit proposals with minimum stake
2. **Discussion Period**: Community debates the proposal
3. **Voting Period**: Token holders cast weighted votes
4. **Execution or Rejection**: Successful proposals are implemented
5. **Feedback Loop**: Results and impacts are monitored

## Cross-Chain Governance

As a parachain, Aduana has unique governance considerations:

- **Kusama Integration**: Alignment with relay chain governance
- **XCM Governance**: Cross-chain message governance
- **Interoperability Decisions**: Standards for cross-chain operations
- **Shared Security Model**: Relationship with relay chain validators

## On-Chain Treasury

The DAO manages a treasury funded from:

- Protocol fees
- Network transaction fees
- Grant allocations
- Investment returns

```rust
pub fn execute_treasury_proposal(
    origin: OriginFor<T>,
    proposal_id: TreasuryProposalId,
) -> DispatchResult {
    ensure_root(origin)?;
    
    // Get the proposal
    let proposal = Self::treasury_proposal(proposal_id).ok_or(Error::<T>::TreasuryProposalNotFound)?;
    ensure!(proposal.status == ProposalStatus::Approved, Error::<T>::ProposalNotApproved);
    
    // Transfer funds from treasury to recipient
    T::Currency::transfer(
        &Self::treasury_account_id(),
        &proposal.recipient,
        proposal.amount,
        ExistenceRequirement::KeepAlive
    )?;
    
    // Update proposal status
    <TreasuryProposals<T>>::mutate(proposal_id, |p| {
        if let Some(prop) = p {
            prop.status = ProposalStatus::Executed;
        }
    });
    
    // Emit event
    Self::deposit_event(Event::TreasuryProposalExecuted(proposal_id, proposal.recipient, proposal.amount));
    
    Ok(())
}
```

## Governance Security

The governance system includes multiple security measures:

- **Timelock Mechanisms**: Delay between approval and execution
- **Quadratic Voting**: To prevent wealth concentration
- **Emergency Brake**: For critical vulnerabilities
- **Progressive Decentralization**: Gradual transfer of control

## Future Governance Roadmap

The Aduana governance system will evolve:

1. **Advanced Voting Systems**: Conviction voting, quadratic funding
2. **Delegation Markets**: Liquid democracy features
3. **Reputation Systems**: Merit-based influence
4. **Cross-DAO Collaboration**: Interoperation with other DAOs
5. **AI Governance Assistance**: Analytics for proposal impacts 