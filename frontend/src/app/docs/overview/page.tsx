import { Card } from "@/components/ui/card"

export default function OverviewPage() {
  return (
    <div className="prose max-w-none dark:text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Overview</h1>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl mb-10 border border-blue-100 dark:border-blue-800">
        <p className="text-xl text-blue-800 dark:text-blue-200 leading-relaxed">
          Aduana is a revolutionary blockchain project that sits at the intersection of international trade, decentralized finance, and regulatory compliance. Built on Kusama and leveraging the Proof of Personhood (POP) protocol, Aduana aims to mitigate international trade tariffs through a combination of decentralized origin verification, equity pools, insurance models, and synthetic tariff derivatives.
        </p>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        The Problem
      </h2>
      
      <p className="text-slate-600 dark:text-slate-300">
        International trade is burdened by complex tariff systems that:
      </p>
      <ul className="space-y-2 my-4 text-slate-600 dark:text-slate-300">
        <li className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Create friction in global commerce
        </li>
        <li className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Increase costs for businesses and consumers
        </li>
        <li className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Lead to inefficiencies and compliance challenges
        </li>
        <li className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Can be applied unevenly or unfairly across different regions
        </li>
      </ul>
      
      <p className="text-slate-600 dark:text-slate-300 mb-8">
        These tariffs, while intended to protect domestic industries, often result in market distortions and economic inefficiencies.
      </p>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        The Solution
      </h2>
      
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Aduana introduces a decentralized approach to trade compliance with the following key components:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card className="p-6 bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">ZK Origin Proofs</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Using zero-knowledge proofs, Aduana allows exporters to verifiably prove the origin of goods without revealing sensitive business information. This creates a trustless environment for origin verification, reducing the manual verification overhead and potential for fraud.
          </p>
        </Card>
        
        <Card className="p-6 bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-400">Equity Pools</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Aduana implements equity pools that distribute tariff costs across participants, creating a more equitable system that reduces the individual burden on traders. This pooling mechanism leverages the collective power of the network to optimize tariff management.
          </p>
        </Card>
        
        <Card className="p-6 bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-amber-700 dark:text-amber-400">Insurance Models</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Through smart contract-based insurance, traders can protect themselves against unexpected tariff changes or regulatory actions. This provides stability and predictability in an otherwise volatile regulatory environment.
          </p>
        </Card>
        
        <Card className="p-6 bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-400">Synthetic Tariff Derivatives</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Aduana introduces innovative financial instruments that allow traders to hedge against tariff risks, similar to how traditional derivatives help manage commodity price risk. These synthetic derivatives create a market-based approach to tariff risk management.
          </p>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        Technical Architecture
      </h2>
      
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Aduana is built on a solid technical foundation:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white dark:bg-slate-800/50 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="font-semibold">Substrate Framework</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Provides the blockchain infrastructure for Aduana with modular design and customizable runtime
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800/50 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="font-semibold">Kusama Network</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Serves as the canary network for deploying and testing before migrating to production
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800/50 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-semibold">POP Integration</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Leverages Proof of Personhood for identity verification and prevention of Sybil attacks
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800/50 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 className="font-semibold">Custom Pallets</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Specialized modules that handle specific functions within the ecosystem
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800/50 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="font-semibold">Cross-Chain Communication</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Enables interoperability with other blockchains through XCM protocol
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800/50 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h3 className="font-semibold">Zero-Knowledge Proofs</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Ensures privacy while maintaining verifiability for origin claims
          </p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        DUANA Token
      </h2>
      
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        The native DUANA token serves multiple purposes within the ecosystem:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <div className="flex items-start bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/50">
          <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-300">Governance Rights</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Vote on protocol upgrades and parameter changes in the Aduana DAO
            </p>
          </div>
        </div>
        
        <div className="flex items-start bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/50">
          <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-300">Network Security</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Stake tokens to participate in consensus and secure the network
            </p>
          </div>
        </div>
        
        <div className="flex items-start bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/50">
          <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-300">Fee Payments</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Pay for verification services, equity pool participation, and transactions
            </p>
          </div>
        </div>
        
        <div className="flex items-start bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/50">
          <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-300">Collateral</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Use as collateral for synthetic derivatives and insurance models
            </p>
          </div>
        </div>
        
        <div className="flex items-start bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/50">
          <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-300">Rewards</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Distributed to validators and active participants in the ecosystem
            </p>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Roadmap
      </h2>
      
      <div className="space-y-6 mb-10">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
          
          <div className="relative flex items-center mb-6">
            <div className="flex-shrink-0 bg-green-500 dark:bg-green-600 h-16 w-16 rounded-full flex items-center justify-center z-10 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">Research & Design</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
              <div className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
                Protocol architecture, economic model, and governance structure
              </div>
            </div>
          </div>
          
          <div className="relative flex items-center mb-6">
            <div className="flex-shrink-0 bg-blue-500 dark:bg-blue-600 h-16 w-16 rounded-full flex items-center justify-center z-10 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">MVP Development</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">In progress</p>
              <div className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
                Core pallets, ZK circuits, and basic frontend implementation
              </div>
            </div>
          </div>
          
          <div className="relative flex items-center mb-6">
            <div className="flex-shrink-0 bg-slate-400 dark:bg-slate-600 h-16 w-16 rounded-full flex items-center justify-center z-10 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">Kusama Testnet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Upcoming</p>
              <div className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
                Deployment to Kusama for public testing and refinement
              </div>
            </div>
          </div>
          
          <div className="relative flex items-center mb-6">
            <div className="flex-shrink-0 bg-slate-300 dark:bg-slate-700 h-16 w-16 rounded-full flex items-center justify-center z-10 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">Pilot Programs</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Planned</p>
              <div className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
                Partnership with select trade organizations and customs authorities
              </div>
            </div>
          </div>
          
          <div className="relative flex items-center mb-6">
            <div className="flex-shrink-0 bg-slate-300 dark:bg-slate-700 h-16 w-16 rounded-full flex items-center justify-center z-10 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">Mainnet Launch</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Target 2024</p>
              <div className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
                Full production release with complete feature set
              </div>
            </div>
          </div>
          
          <div className="relative flex items-center">
            <div className="flex-shrink-0 bg-slate-300 dark:bg-slate-700 h-16 w-16 rounded-full flex items-center justify-center z-10 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">Ecosystem Expansion</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Ongoing</p>
              <div className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
                Continuous improvement and expansion of the platform's capabilities
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 