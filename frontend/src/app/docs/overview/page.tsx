import { Card } from "@/components/ui/card"

export default function OverviewPage() {
  return (
    <div className="prose max-w-none">
      <h1>Overview</h1>
      
      <p>
        Aduana is a revolutionary blockchain project that sits at the intersection of international trade, decentralized finance, and regulatory compliance. Built on Kusama and leveraging the Proof of Personhood (POP) protocol, Aduana aims to mitigate international trade tariffs through a combination of decentralized origin verification, equity pools, insurance models, and synthetic tariff derivatives.
      </p>
      
      <h2>The Problem</h2>
      
      <p>
        International trade is burdened by complex tariff systems that:
      </p>
      <ul>
        <li>Create friction in global commerce</li>
        <li>Increase costs for businesses and consumers</li>
        <li>Lead to inefficiencies and compliance challenges</li>
        <li>Can be applied unevenly or unfairly across different regions</li>
      </ul>
      
      <p>
        These tariffs, while intended to protect domestic industries, often result in market distortions and economic inefficiencies.
      </p>
      
      <h2>The Solution</h2>
      
      <p>
        Aduana introduces a decentralized approach to trade compliance with the following key components:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">ZK Origin Proofs</h3>
          <p className="text-slate-600">
            Using zero-knowledge proofs, Aduana allows exporters to verifiably prove the origin of goods without revealing sensitive business information. This creates a trustless environment for origin verification, reducing the manual verification overhead and potential for fraud.
          </p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Equity Pools</h3>
          <p className="text-slate-600">
            Aduana implements equity pools that distribute tariff costs across participants, creating a more equitable system that reduces the individual burden on traders. This pooling mechanism leverages the collective power of the network to optimize tariff management.
          </p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Insurance Models</h3>
          <p className="text-slate-600">
            Through smart contract-based insurance, traders can protect themselves against unexpected tariff changes or regulatory actions. This provides stability and predictability in an otherwise volatile regulatory environment.
          </p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Synthetic Tariff Derivatives</h3>
          <p className="text-slate-600">
            Aduana introduces innovative financial instruments that allow traders to hedge against tariff risks, similar to how traditional derivatives help manage commodity price risk. These synthetic derivatives create a market-based approach to tariff risk management.
          </p>
        </Card>
      </div>
      
      <h2>Technical Architecture</h2>
      
      <p>
        Aduana is built on a solid technical foundation:
      </p>
      
      <ul>
        <li><strong>Substrate Framework</strong>: Provides the blockchain infrastructure for Aduana</li>
        <li><strong>Kusama Network</strong>: Serves as the canary network for deploying and testing</li>
        <li><strong>POP Integration</strong>: Leverages Proof of Personhood for identity verification</li>
        <li><strong>Custom Pallets</strong>: Specialized modules that handle specific functions within the ecosystem</li>
        <li><strong>Cross-Chain Communication</strong>: Enables interoperability with other blockchains</li>
        <li><strong>Zero-Knowledge Proofs</strong>: Ensures privacy while maintaining verifiability</li>
      </ul>
      
      <h2>DUANA Token</h2>
      
      <p>
        The native DUANA token serves multiple purposes within the ecosystem:
      </p>
      
      <ul>
        <li>Governance rights in the Aduana DAO</li>
        <li>Staking for network security</li>
        <li>Fee payments for services</li>
        <li>Collateral for synthetic derivatives</li>
        <li>Reward distribution for validators and participants</li>
      </ul>
      
      <h2>Roadmap</h2>
      
      <p>
        Aduana is being developed in phases:
      </p>
      
      <ol>
        <li><strong>Research & Design</strong>: Completed</li>
        <li><strong>MVP Development</strong>: In progress</li>
        <li><strong>Kusama Testnet</strong>: Upcoming</li>
        <li><strong>Pilot Programs</strong>: Planned</li>
        <li><strong>Mainnet Launch</strong>: Target 2024</li>
        <li><strong>Ecosystem Expansion</strong>: Ongoing</li>
      </ol>
    </div>
  )
} 