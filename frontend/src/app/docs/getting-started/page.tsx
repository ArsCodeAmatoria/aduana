import Link from 'next/link';
import { CodeBlock } from '@/components/ui/code-block';

export default function GettingStartedPage() {
  return (
    <div className="prose max-w-none dark:text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Getting Started with Aduana</h1>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl mb-10 border border-blue-100 dark:border-blue-800">
        <p className="text-xl text-blue-800 dark:text-blue-200 leading-relaxed">
          Welcome to Aduana, the decentralized platform revolutionizing international trade through 
          blockchain technology, zero-knowledge proofs, and collaborative risk-sharing mechanisms.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/10 rounded-xl p-6 border border-sky-200 dark:border-sky-800">
          <h2 className="text-xl font-semibold mb-4 text-sky-800 dark:text-sky-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Start
          </h2>
          <ol className="space-y-4 mb-0">
            <li className="flex items-start">
              <span className="bg-sky-200 dark:bg-sky-700 text-sky-800 dark:text-sky-100 font-bold text-sm h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
              <div>
                <h3 className="text-base font-semibold m-0 text-sky-800 dark:text-sky-200">Create an Account</h3>
                <p className="text-sm text-sky-700 dark:text-sky-300 m-0">Sign up with a compatible digital identity to access the platform.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-sky-200 dark:bg-sky-700 text-sky-800 dark:text-sky-100 font-bold text-sm h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
              <div>
                <h3 className="text-base font-semibold m-0 text-sky-800 dark:text-sky-200">Connect Wallet</h3>
                <p className="text-sm text-sky-700 dark:text-sky-300 m-0">Link your Polkadot-compatible wallet to enable transactions.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-sky-200 dark:bg-sky-700 text-sky-800 dark:text-sky-100 font-bold text-sm h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
              <div>
                <h3 className="text-base font-semibold m-0 text-sky-800 dark:text-sky-200">Explore Platform</h3>
                <p className="text-sm text-sky-700 dark:text-sky-300 m-0">Browse origin verification, equity pools, and governance tools.</p>
              </div>
            </li>
          </ol>
        </div>
        
        <div className="flex-1 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
          <h2 className="text-xl font-semibold mb-4 text-amber-800 dark:text-amber-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            System Requirements
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold m-0 text-amber-800 dark:text-amber-200">For Development</h3>
              <ul className="list-disc list-inside text-sm text-amber-700 dark:text-amber-300 mb-0 mt-2">
                <li>Rust 1.66+ with wasm-unknown-unknown target</li>
                <li>Node.js 18+ and npm/yarn</li>
                <li>Substrate development environment</li>
                <li>Docker and Docker Compose</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold m-0 text-amber-800 dark:text-amber-200">For End Users</h3>
              <ul className="list-disc list-inside text-sm text-amber-700 dark:text-amber-300 mb-0 mt-2">
                <li>Modern web browser (Chrome, Firefox, etc.)</li>
                <li>Polkadot{".js"} extension for Substrate transactions</li>
                <li>Digital identity compatible with POP protocol</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Installation
      </h2>
      
      <div className="space-y-8">
        <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Frontend Development</h3>
          <p className="mb-4 text-slate-600 dark:text-slate-300">
            To set up the Aduana frontend for local development:
          </p>
          <CodeBlock 
            language="bash" 
            value={`# Clone the repository
git clone https://github.com/your-organization/aduana.git
cd aduana

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev`}
            showLineNumbers={true}
          />
        </div>
        
        <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Blockchain Node Setup</h3>
          <p className="mb-4 text-slate-600 dark:text-slate-300">
            To run a local Aduana blockchain node for development:
          </p>
          <CodeBlock 
            language="bash" 
            value={`# Navigate to node directory
cd node

# Build the node
cargo build --release

# Run a development chain
./target/release/aduana-node --dev

# Or use Docker
docker-compose up aduana-node`}
            showLineNumbers={true}
          />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        User Guides by Role
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="p-6 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">For Importers & Exporters</h3>
              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300">Most Common</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300 text-sm mb-6">
              <li>Setting up verified business profiles</li>
              <li>Submitting products for origin verification</li>
              <li>Joining equity pools for tariff cost sharing</li>
              <li>Managing shipment documentation</li>
            </ul>
          </div>
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/30">
            <Link 
              href="/docs/traders-guide" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
            >
              View detailed guide 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="p-6 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">For Regulatory Authorities</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300 text-sm mb-6">
              <li>Verifying product origin claims</li>
              <li>Accessing secure documentation</li>
              <li>Integrating with existing customs systems</li>
              <li>Setting up automated verification workflows</li>
            </ul>
          </div>
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/30">
            <Link 
              href="/docs/regulators-guide" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
            >
              View detailed guide 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="p-6 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">For Developers & Integrators</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300 text-sm mb-6">
              <li>API documentation and integration guides</li>
              <li>Smart contract development</li>
              <li>Building custom modules on Aduana</li>
              <li>Contributing to the core platform</li>
            </ul>
          </div>
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/30">
            <Link 
              href="/docs/developers-guide" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
            >
              View detailed guide 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Key Concepts
      </h2>
      
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Before diving deep into the platform, it's important to understand these core concepts:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-900/20 rounded-xl p-6 shadow-sm border border-blue-100 dark:border-blue-800/50 flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-300">ZK Origin Proofs</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm flex-1">
            Zero-knowledge cryptographic proofs that verify product origins without revealing sensitive business information. 
            These enable trust in trade without compromising commercial confidentiality.
          </p>
          <div className="mt-4">
            <Link 
              href="/docs/zk-origin-proofs" 
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
            >
              Learn more about ZK Origin Proofs 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-green-900/20 rounded-xl p-6 shadow-sm border border-green-100 dark:border-green-800/50 flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-green-800 dark:text-green-300">Equity Pools</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm flex-1">
            Collaborative risk-sharing mechanisms where traders with similar interests pool resources 
            to manage tariff costs and trade risks together, creating economies of scale and reducing volatility.
          </p>
          <div className="mt-4">
            <Link 
              href="/docs/equity-pools" 
              className="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 flex items-center"
            >
              Learn more about Equity Pools 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20 rounded-xl p-6 shadow-sm border border-purple-100 dark:border-purple-800/50 flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-300">DAO Governance</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm flex-1">
            Decentralized governance system that enables stakeholders to vote on platform upgrades, 
            parameter changes, and other important decisions through transparent on-chain voting.
          </p>
          <div className="mt-4">
            <Link 
              href="/docs/dao-governance" 
              className="text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 flex items-center"
            >
              Learn more about DAO Governance 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-amber-900/20 rounded-xl p-6 shadow-sm border border-amber-100 dark:border-amber-800/50 flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-amber-800 dark:text-amber-300">Smart Contracts</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm flex-1">
            Automated self-executing contracts that facilitate trade agreements, verification processes, 
            and financial operations without requiring intermediaries.
          </p>
          <div className="mt-4">
            <Link 
              href="/docs/smart-contracts" 
              className="text-sm font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300 flex items-center"
            >
              Learn more about Smart Contracts 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800 mt-12 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-800 dark:text-indigo-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Need Help?
        </h2>
        <p className="text-indigo-700 dark:text-indigo-300 mb-4">
          If you're having trouble setting up or using Aduana, there are several ways to get help:
        </p>
        <ul className="space-y-2 text-indigo-700 dark:text-indigo-300">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Join our <a href="https://discord.gg/aduana" className="text-indigo-600 hover:underline dark:text-indigo-400">Discord community</a>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email our support team at <a href="mailto:support@aduana.network" className="text-indigo-600 hover:underline dark:text-indigo-400">support@aduana.network</a>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Check out our <a href="/docs/faq" className="text-indigo-600 hover:underline dark:text-indigo-400">FAQ section</a>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Submit issues on <a href="https://github.com/aduana-network/aduana/issues" className="text-indigo-600 hover:underline dark:text-indigo-400">GitHub</a>
          </li>
        </ul>
      </div>
    </div>
  );
} 