export default function GettingStartedPage() {
  return (
    <div className="prose max-w-none">
      <h1>Getting Started with Aduana</h1>
      
      <p>
        Welcome to Aduana, the decentralized platform revolutionizing international trade through blockchain technology, zero-knowledge proofs, and collaborative risk-sharing mechanisms. This guide will help you get started with the platform.
      </p>
      
      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h2 className="text-blue-800 font-semibold mt-0">System Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-700">
          <div>
            <h3 className="text-blue-800 font-medium text-lg">For Development</h3>
            <ul className="mt-2 space-y-1">
              <li>Rust 1.66+ with wasm-unknown-unknown target</li>
              <li>Node.js 18+ and npm/yarn</li>
              <li>Substrate development environment</li>
              <li>Docker and Docker Compose</li>
            </ul>
          </div>
          <div>
            <h3 className="text-blue-800 font-medium text-lg">For End Users</h3>
            <ul className="mt-2 space-y-1">
              <li>Modern web browser (Chrome, Firefox, etc.)</li>
              <li>Polkadot{".js"} extension for Substrate transactions</li>
              <li>Digital identity compatible with POP protocol</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>Quick Start</h2>
      
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg text-center">
          <div className="bg-blue-100 text-blue-700 font-bold text-lg h-12 w-12 rounded-full flex items-center justify-center mb-4">1</div>
          <h3 className="font-semibold mb-2">Create an Account</h3>
          <p className="text-sm text-slate-600">
            Sign up with a compatible digital identity to access the platform and establish your profile.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg text-center">
          <div className="bg-blue-100 text-blue-700 font-bold text-lg h-12 w-12 rounded-full flex items-center justify-center mb-4">2</div>
          <h3 className="font-semibold mb-2">Connect Wallet</h3>
          <p className="text-sm text-slate-600">
            Link your Polkadot-compatible wallet to enable transaction signing and platform interactions.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg text-center">
          <div className="bg-blue-100 text-blue-700 font-bold text-lg h-12 w-12 rounded-full flex items-center justify-center mb-4">3</div>
          <h3 className="font-semibold mb-2">Explore Services</h3>
          <p className="text-sm text-slate-600">
            Browse available features including origin verification, equity pools, and governance tools.
          </p>
        </div>
      </div>
      
      <h2>Installation</h2>
      
      <h3>Frontend Development</h3>
      
      <p>
        To set up the Aduana frontend for local development:
      </p>
      
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto my-6">
        <code>
{`# Clone the repository
git clone https://github.com/your-organization/aduana.git
cd aduana

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev`}
        </code>
      </pre>
      
      <h3>Blockchain Node Setup</h3>
      
      <p>
        To run a local Aduana blockchain node for development:
      </p>
      
      <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto my-6">
        <code>
{`# Navigate to node directory
cd node

# Build the node
cargo build --release

# Run a development chain
./target/release/aduana-node --dev

# Or use Docker
docker-compose up aduana-node`}
        </code>
      </pre>
      
      <h2>User Guides by Role</h2>
      
      <div className="my-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">For Importers & Exporters</h3>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Most Common</span>
                </div>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Setting up verified business profiles</li>
                    <li>Submitting products for origin verification</li>
                    <li>Joining equity pools for tariff cost sharing</li>
                    <li>Managing shipment documentation</li>
                  </ul>
                </div>
                <div className="mt-3">
                  <a href="/docs/traders-guide" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View detailed guide <span aria-hidden="true">→</span></a>
                </div>
              </div>
            </li>
            <li>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">For Customs & Regulatory Authorities</h3>
                </div>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Verifying product origin claims</li>
                    <li>Accessing secure documentation</li>
                    <li>Integrating with existing customs systems</li>
                    <li>Setting up automated verification workflows</li>
                  </ul>
                </div>
                <div className="mt-3">
                  <a href="/docs/regulators-guide" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View detailed guide <span aria-hidden="true">→</span></a>
                </div>
              </div>
            </li>
            <li>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">For Developers & Integrators</h3>
                </div>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>API documentation and integration guides</li>
                    <li>Smart contract development</li>
                    <li>Building custom modules on Aduana</li>
                    <li>Contributing to the core platform</li>
                  </ul>
                </div>
                <div className="mt-3">
                  <a href="/docs/developers-guide" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View detailed guide <span aria-hidden="true">→</span></a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <h2>Key Concepts</h2>
      
      <p>
        Before diving deep into the platform, it's important to understand these core concepts:
      </p>
      
      <div className="my-6">
        <dl className="space-y-6">
          <div className="bg-slate-50 p-5 rounded-lg">
            <dt className="text-lg font-semibold text-slate-900">ZK Origin Proofs</dt>
            <dd className="mt-2 text-slate-600">
              <p>
                Zero-knowledge cryptographic proofs that verify product origins without revealing sensitive business information. These enable trust in trade without compromising commercial confidentiality.
              </p>
              <p className="mt-2">
                <a href="/docs/zk-origin-proofs" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Learn more about ZK Origin Proofs <span aria-hidden="true">→</span></a>
              </p>
            </dd>
          </div>
          
          <div className="bg-slate-50 p-5 rounded-lg">
            <dt className="text-lg font-semibold text-slate-900">Equity Pools</dt>
            <dd className="mt-2 text-slate-600">
              <p>
                Collaborative risk-sharing mechanisms where traders with similar interests pool resources to manage tariff costs and trade risks together, creating economies of scale and reducing volatility.
              </p>
              <p className="mt-2">
                <a href="/docs/equity-pools" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Learn more about Equity Pools <span aria-hidden="true">→</span></a>
              </p>
            </dd>
          </div>
          
          <div className="bg-slate-50 p-5 rounded-lg">
            <dt className="text-lg font-semibold text-slate-900">DAO Governance</dt>
            <dd className="mt-2 text-slate-600">
              <p>
                Decentralized governance system that allows stakeholders to collectively manage the platform through transparent, on-chain voting mechanisms and proposal systems.
              </p>
              <p className="mt-2">
                <a href="/docs/dao-governance" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Learn more about DAO Governance <span aria-hidden="true">→</span></a>
              </p>
            </dd>
          </div>
        </dl>
      </div>
      
      <h2>Demo and Testing</h2>
      
      <p>
        Try out the platform features in our sandbox environment:
      </p>
      
      <div className="my-6 p-6 border border-slate-200 rounded-lg">
        <h3 className="font-semibold mb-4">Sandbox Environment</h3>
        <p className="text-slate-600 mb-4">
          Our testing environment allows you to explore Aduana's features with simulated data and test transactions without using real assets.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium">Features Available in Sandbox</h4>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 mt-2">
              <li>Create test business profiles</li>
              <li>Generate and verify sample ZK proofs</li>
              <li>Participate in test equity pools</li>
              <li>Submit governance proposals</li>
              <li>Simulate cross-border transactions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Accessing the Sandbox</h4>
            <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-1 mt-2">
              <li>Visit <a href="https://sandbox.aduana.network" className="text-indigo-600 hover:text-indigo-500">sandbox.aduana.network</a></li>
              <li>Create a test account using the "Sandbox" option</li>
              <li>Receive test tokens from the faucet</li>
              <li>Explore platform features in a risk-free environment</li>
            </ol>
          </div>
        </div>
      </div>
      
      <h2>Frequently Asked Questions</h2>
      
      <div className="my-6 space-y-4">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button className="w-full px-4 py-3 text-left font-medium text-slate-900 bg-slate-50">
            How secure are the zero-knowledge proofs used in Aduana?
          </button>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p>
              Aduana uses industry-standard zkSNARK implementations that have undergone rigorous security auditing. The platform employs trusted setup ceremonies with multiple participants to prevent any single entity from compromising the system. All cryptographic protocols are regularly reviewed by independent security researchers.
            </p>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button className="w-full px-4 py-3 text-left font-medium text-slate-900 bg-slate-50">
            What types of businesses can benefit from using Aduana?
          </button>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p>
              Aduana is designed for businesses involved in international trade, including manufacturers, exporters, importers, trading companies, freight forwarders, and customs brokers. The platform is particularly valuable for businesses dealing with complex supply chains, high-tariff products, or trading across multiple jurisdictions.
            </p>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button className="w-full px-4 py-3 text-left font-medium text-slate-900 bg-slate-50">
            How does Aduana integrate with existing enterprise systems?
          </button>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p>
              Aduana provides a comprehensive API for integration with popular ERP systems, supply chain management software, and customs declaration platforms. The platform also offers middleware connectors for major systems like SAP, Oracle, and Microsoft Dynamics. Custom integrations can be developed using our SDK and developer tools.
            </p>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button className="w-full px-4 py-3 text-left font-medium text-slate-900 bg-slate-50">
            What is the current development status of the platform?
          </button>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p>
              Aduana is currently in active development with core components in beta testing. The ZK Origin Proofs and basic Equity Pool functionality are operational on our testnet. We are working closely with early adopters to refine the platform before a full production launch. Check our roadmap for the latest development updates and milestone projections.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg">
        <h3 className="font-semibold text-indigo-800 mb-2">Need Help?</h3>
        <p className="text-indigo-700 mb-4">
          Our support team is available to help you get started with Aduana. Reach out through any of these channels:
        </p>
        <ul className="text-indigo-700 space-y-2">
          <li>Email: <a href="mailto:support@aduana.network" className="underline">support@aduana.network</a></li>
          <li>Discord: <a href="https://discord.gg/aduana" className="underline">discord.gg/aduana</a></li>
          <li>Telegram: <a href="https://t.me/aduananetwork" className="underline">t.me/aduananetwork</a></li>
          <li>Developer Forum: <a href="https://forum.aduana.network" className="underline">forum.aduana.network</a></li>
        </ul>
      </div>
    </div>
  )
} 