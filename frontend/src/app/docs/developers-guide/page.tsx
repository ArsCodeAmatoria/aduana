export default function DevelopersGuidePage() {
  return (
    <div className="prose max-w-none">
      <h1>Developers Guide</h1>
      
      <p className="lead">
        This guide provides comprehensive information for developers looking to build on or integrate with the Aduana platform. Whether you're developing custom modules, integrating with existing systems, or contributing to the core platform, you'll find the resources you need here.
      </p>
      
      <div className="bg-indigo-50 p-6 rounded-lg my-6 border border-indigo-100">
        <h2 className="text-indigo-800 font-semibold mt-0">Developer Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <a href="https://github.com/aduana-network/aduana" className="flex flex-col items-center p-4 bg-white rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
            <svg className="h-8 w-8 text-indigo-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h3 className="font-medium text-center">GitHub Repository</h3>
            <p className="text-sm text-center text-slate-600 mt-2">Clone the source code and contribute to the project</p>
          </a>
          
          <a href="/docs/api-reference" className="flex flex-col items-center p-4 bg-white rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
            <svg className="h-8 w-8 text-indigo-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="font-medium text-center">API Reference</h3>
            <p className="text-sm text-center text-slate-600 mt-2">Detailed API documentation with examples</p>
          </a>
          
          <a href="/docs/sdk" className="flex flex-col items-center p-4 bg-white rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
            <svg className="h-8 w-8 text-indigo-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
            <h3 className="font-medium text-center">SDK & Libraries</h3>
            <p className="text-sm text-center text-slate-600 mt-2">Tools for building integrations in multiple languages</p>
          </a>
        </div>
      </div>
      
      <h2>Architecture Overview</h2>
      
      <p>
        Aduana is built on a modular architecture combining Substrate framework components with custom pallets, off-chain workers, and a React-based frontend. Understanding the architecture is crucial for effective development.
      </p>
      
      <div className="my-6">
        <div className="bg-white p-5 rounded-lg border border-slate-200">
          <h3 className="font-semibold mb-4">Core Components</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="bg-slate-50">
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold">Component</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Description</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Technology</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium">Runtime</td>
                  <td className="px-3 py-4 text-sm">Core blockchain logic including state transitions and transaction processing</td>
                  <td className="px-3 py-4 text-sm">Substrate FRAME, Rust</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium">Origin Verifier</td>
                  <td className="px-3 py-4 text-sm">Pallet for product registration and origin verification using ZK proofs</td>
                  <td className="px-3 py-4 text-sm">Substrate FRAME, arkworks</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium">Equity Pool</td>
                  <td className="px-3 py-4 text-sm">Pallet for managing collaborative risk pools and fund distribution</td>
                  <td className="px-3 py-4 text-sm">Substrate FRAME, Rust</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium">API Layer</td>
                  <td className="px-3 py-4 text-sm">RESTful and GraphQL interfaces for interacting with the blockchain</td>
                  <td className="px-3 py-4 text-sm">TypeScript, Node.js</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium">Frontend</td>
                  <td className="px-3 py-4 text-sm">User interface for platform interaction</td>
                  <td className="px-3 py-4 text-sm">Next.js, React, TailwindCSS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <h2>Setting Up Your Development Environment</h2>
      
      <h3>Prerequisites</h3>
      
      <ul className="space-y-2">
        <li><strong>Rust</strong> - Version 1.66+ with wasm-unknown-unknown target</li>
        <li><strong>Node.js</strong> - Version 18+ for frontend and API development</li>
        <li><strong>Docker</strong> - For containerized development and testing</li>
        <li><strong>Git</strong> - For version control</li>
      </ul>
      
      <h3>Installation Steps</h3>
      
      <div className="my-6">
        <div className="bg-slate-800 text-slate-50 p-4 rounded-lg overflow-x-auto">
          <pre><code>{`# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup default stable
rustup update nightly
rustup target add wasm32-unknown-unknown --toolchain nightly

# Clone the repository
git clone https://github.com/aduana-network/aduana.git
cd aduana

# Build the node
cargo build --release

# Install frontend dependencies
cd frontend
npm install`}</code></pre>
        </div>
      </div>
      
      <h3>Running a Development Node</h3>
      
      <div className="my-6">
        <div className="bg-slate-800 text-slate-50 p-4 rounded-lg overflow-x-auto">
          <pre><code>{`# Run a development node
./target/release/aduana-node --dev

# In a separate terminal, start the frontend
cd frontend
npm run dev`}</code></pre>
        </div>
      </div>
      
      <h2>API Integration</h2>
      
      <p>
        Aduana provides multiple API endpoints for integrating with the platform. The APIs follow RESTful principles and support both JSON and GraphQL formats.
      </p>
      
      <h3>Authentication</h3>
      
      <div className="my-6">
        <div className="bg-slate-100 p-4 rounded-lg overflow-x-auto">
          <pre><code>{`// Example: Generate an API token
const response = await fetch('https://api.aduana.network/v1/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    apiKey: 'your_api_key',
    apiSecret: 'your_api_secret',
  }),
});

const { token } = await response.json();

// Use the token for authenticated requests
const verifyResponse = await fetch('https://api.aduana.network/v1/verify/origin', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productId: '123456789',
    proofData: '...',
  }),
});`}</code></pre>
        </div>
      </div>
      
      <h3>Key Endpoints</h3>
      
      <div className="my-6 space-y-4">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 font-medium bg-slate-50 flex justify-between items-center">
            <span className="text-slate-900">Product Registration</span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">POST</span>
          </div>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p className="mb-2"><code className="text-sm bg-slate-100 px-1 py-0.5 rounded">POST /v1/products</code></p>
            <p className="text-sm">Registers a new product on the blockchain with details including description, HS code, and manufacturing information. Returns a product ID that can be used for generating origin proofs.</p>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 font-medium bg-slate-50 flex justify-between items-center">
            <span className="text-slate-900">Origin Verification</span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">POST</span>
          </div>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p className="mb-2"><code className="text-sm bg-slate-100 px-1 py-0.5 rounded">POST /v1/verify/origin</code></p>
            <p className="text-sm">Submits a zero-knowledge proof for verification against origin criteria. Returns verification status and result hash that can be used by customs authorities.</p>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 font-medium bg-slate-50 flex justify-between items-center">
            <span className="text-slate-900">Equity Pool Management</span>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">GET</span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">POST</span>
          </div>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p className="mb-2"><code className="text-sm bg-slate-100 px-1 py-0.5 rounded">GET /v1/pools</code> <code className="text-sm bg-slate-100 px-1 py-0.5 rounded">POST /v1/pools</code></p>
            <p className="text-sm">Retrieve available equity pools or create a new pool. Additional endpoints allow for contributing to pools, processing claims, and managing pool membership.</p>
          </div>
        </div>
      </div>
      
      <h2>Smart Contract Development</h2>
      
      <p>
        Aduana supports smart contract development using ink!, a Rust-based smart contract language for Substrate chains. Developers can create custom contracts for specialized trade finance instruments, verification logic, or business workflows.
      </p>
      
      <h3>Sample Smart Contract</h3>
      
      <div className="my-6">
        <div className="bg-slate-800 text-slate-50 p-4 rounded-lg overflow-x-auto">
          <pre><code>{`#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod trade_verification {
    use ink_storage::{
        collections::HashMap,
        traits::{PackedLayout, SpreadLayout},
    };

    #[derive(Debug, scale::Encode, scale::Decode, PackedLayout, SpreadLayout)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct VerificationRecord {
        timestamp: u64,
        verifier: AccountId,
        status: VerificationStatus,
        hash: Hash,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode, PackedLayout, SpreadLayout)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum VerificationStatus {
        Pending,
        Verified,
        Rejected,
    }

    #[ink(storage)]
    pub struct TradeVerification {
        owner: AccountId,
        verifiers: HashMap<AccountId, bool>,
        records: HashMap<Hash, VerificationRecord>,
    }

    #[ink(event)]
    pub struct VerificationSubmitted {
        #[ink(topic)]
        proof_hash: Hash,
        #[ink(topic)]
        submitter: AccountId,
    }

    impl TradeVerification {
        #[ink(constructor)]
        pub fn new() -> Self {
            let owner = Self::env().caller();
            let mut verifiers = HashMap::new();
            verifiers.insert(owner, true);

            Self {
                owner,
                verifiers,
                records: HashMap::new(),
            }
        }

        #[ink(message)]
        pub fn add_verifier(&mut self, verifier: AccountId) -> bool {
            let caller = self.env().caller();
            if caller != self.owner {
                return false;
            }

            self.verifiers.insert(verifier, true);
            true
        }

        #[ink(message)]
        pub fn submit_verification(&mut self, proof_hash: Hash) -> bool {
            let caller = self.env().caller();
            
            let record = VerificationRecord {
                timestamp: self.env().block_timestamp(),
                verifier: AccountId::default(), // Will be set by verifier
                status: VerificationStatus::Pending,
                hash: proof_hash,
            };
            
            self.records.insert(proof_hash, record);
            
            self.env().emit_event(VerificationSubmitted {
                proof_hash,
                submitter: caller,
            });
            
            true
        }

        #[ink(message)]
        pub fn verify(&mut self, proof_hash: Hash, approve: bool) -> bool {
            let caller = self.env().caller();
            
            if !self.verifiers.contains_key(&caller) {
                return false;
            }
            
            if let Some(record) = self.records.get_mut(&proof_hash) {
                record.verifier = caller;
                record.status = if approve {
                    VerificationStatus::Verified
                } else {
                    VerificationStatus::Rejected
                };
                return true;
            }
            
            false
        }

        #[ink(message)]
        pub fn get_verification_status(&self, proof_hash: Hash) -> Option<VerificationStatus> {
            self.records.get(&proof_hash).map(|record| record.status.clone())
        }
    }
}`}</code></pre>
        </div>
      </div>
      
      <h2>Contributing to Aduana</h2>
      
      <p>
        We welcome contributions from developers of all skill levels. Here are some ways you can contribute to the Aduana ecosystem:
      </p>
      
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-semibold mb-3">Code Contributions</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>Fix bugs and issues in the core codebase</li>
            <li>Implement new features and enhancements</li>
            <li>Improve documentation and examples</li>
            <li>Write tests and improve test coverage</li>
          </ul>
          <div className="mt-4">
            <a href="https://github.com/aduana-network/aduana/issues" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Browse open issues <span aria-hidden="true">→</span></a>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-semibold mb-3">Build Integrations</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>Create SDK clients in additional languages</li>
            <li>Build connectors to popular trading platforms</li>
            <li>Develop customs authority integration tools</li>
            <li>Create specialized UI components for trade workflows</li>
          </ul>
          <div className="mt-4">
            <a href="/docs/integration-partners" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Integration program <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
      
      <h3>Development Process</h3>
      
      <ol className="space-y-2">
        <li><strong>Fork the repository</strong> - Create your own fork of the Aduana codebase</li>
        <li><strong>Create a feature branch</strong> - Work on your changes in a dedicated branch</li>
        <li><strong>Write tests</strong> - Ensure your code is properly tested</li>
        <li><strong>Submit a pull request</strong> - Open a PR with a clear description of your changes</li>
        <li><strong>Code review</strong> - Address feedback from maintainers</li>
        <li><strong>Merge</strong> - Once approved, your code will be merged into the main codebase</li>
      </ol>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-blue-800 font-semibold mt-0">Join the Developer Community</h2>
        <p className="text-blue-700 mb-4">
          Connect with other Aduana developers to share knowledge, get help, and collaborate on projects.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="https://discord.gg/aduana-dev" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
            </svg>
            Join Discord
          </a>
          <a href="https://forum.aduana.network" className="inline-flex items-center px-4 py-2 bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-600 rounded-md transition-colors">
            Developer Forum
          </a>
          <a href="https://github.com/aduana-network" className="inline-flex items-center px-4 py-2 bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-600 rounded-md transition-colors">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
} 