export default function TradersGuidePage() {
  return (
    <div className="prose max-w-none">
      <h1>Traders Guide: For Importers & Exporters</h1>
      
      <p className="lead">
        This comprehensive guide is designed for importers, exporters, and trading companies using the Aduana platform to streamline international trade operations through blockchain technology and zero-knowledge proofs.
      </p>
      
      <div className="bg-amber-50 p-6 rounded-lg my-6 border border-amber-100">
        <h2 className="text-amber-800 font-semibold mt-0">Getting Started Checklist</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Complete KYB (Know Your Business) verification</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Connect compatible wallet (Polkadot.js)</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Deposit DUANA tokens for transaction fees</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Set up business profile with trade credentials</span>
          </li>
        </ul>
      </div>
      
      <h2>Setting Up Your Business Profile</h2>
      
      <p>
        Your business profile serves as your digital identity within the Aduana ecosystem. It contains verified business credentials and establishes your reputation on the platform.
      </p>
      
      <h3>Business Verification Process</h3>
      
      <ol className="space-y-4">
        <li>
          <strong>Submit Documentation</strong> - Provide business registration documents, tax ID numbers, and other legally required credentials.
        </li>
        <li>
          <strong>Verification by Trusted Entities</strong> - Credentials are verified by approved third-party validators (chambers of commerce, trade associations, or government bodies).
        </li>
        <li>
          <strong>Identity Attestation</strong> - Receive verifiable credentials through the POP protocol that attest to your business identity without exposing sensitive details.
        </li>
        <li>
          <strong>Profile Activation</strong> - Once verified, your profile becomes active on the network, allowing you to engage in trade activities.
        </li>
      </ol>
      
      <div className="bg-slate-100 p-6 rounded-lg my-6">
        <h3 className="font-semibold mt-0">Privacy Protection</h3>
        <p className="mb-0">
          Aduana uses zero-knowledge proofs to verify your business credentials without exposing sensitive business information. Your actual documentation remains private while still enabling counterparties and authorities to verify your legitimacy.
        </p>
      </div>
      
      <h2>Product Registration and Origin Verification</h2>
      
      <p>
        Registering products and verifying their origins is a core function of the Aduana platform. This process creates tamper-proof documentation that can be used to prove compliance with trade agreements and regulations.
      </p>
      
      <h3>Registering Products</h3>
      
      <div className="my-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="bg-slate-100">
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold">Step</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Action</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm">1</td>
                <td className="px-3 py-4 text-sm">Create Product Entry</td>
                <td className="px-3 py-4 text-sm">Enter product details including HS codes, descriptions, and characteristics.</td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm">2</td>
                <td className="px-3 py-4 text-sm">Upload Documentation</td>
                <td className="px-3 py-4 text-sm">Provide manufacturing details, component sourcing information, and processing location data.</td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm">3</td>
                <td className="px-3 py-4 text-sm">Generate ZK Proof</td>
                <td className="px-3 py-4 text-sm">The system generates a zero-knowledge proof of origin based on the supplied information.</td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm">4</td>
                <td className="px-3 py-4 text-sm">Pay Verification Fee</td>
                <td className="px-3 py-4 text-sm">Pay the required fee in DUANA tokens to register the product on-chain.</td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm">5</td>
                <td className="px-3 py-4 text-sm">Receive Certificate</td>
                <td className="px-3 py-4 text-sm">Obtain a digital certificate of origin that can be shared with importers and customs authorities.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <h3>Using Origin Certificates</h3>
      
      <p>
        Once a product's origin has been verified, you can use the digital certificate in various trade processes:
      </p>
      
      <ul className="space-y-2">
        <li>Share with importers to enable preferential tariff treatment</li>
        <li>Present to customs authorities during clearance procedures</li>
        <li>Include in trade documentation packages</li>
        <li>Link to shipments for automated customs processing</li>
      </ul>
      
      <h2>Participating in Equity Pools</h2>
      
      <p>
        Equity pools allow traders to share risks and costs associated with international trade, particularly tariff expenses and regulatory compliance costs.
      </p>
      
      <div className="my-6 p-6 border border-slate-200 rounded-lg">
        <h3 className="font-semibold mb-4">Benefits of Equity Pool Participation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-slate-900">Financial Benefits</h4>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 mt-2">
              <li>Reduced volatility in tariff expenses</li>
              <li>Shared compliance costs</li>
              <li>Potential for lower overall expenses</li>
              <li>Improved cash flow predictability</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-slate-900">Operational Benefits</h4>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 mt-2">
              <li>Access to collective expertise</li>
              <li>Enhanced trade intelligence</li>
              <li>Streamlined documentation processes</li>
              <li>Reduced administrative burden</li>
            </ul>
          </div>
        </div>
      </div>
      
      <h3>How to Join an Equity Pool</h3>
      
      <ol className="space-y-3">
        <li>
          <strong>Browse Available Pools</strong> - View pools based on product categories, trade corridors, or specific tariff regimes.
        </li>
        <li>
          <strong>Review Pool Terms</strong> - Examine the pool's governance rules, contribution requirements, and distribution mechanics.
        </li>
        <li>
          <strong>Submit Application</strong> - Provide required business information and trade volume estimates.
        </li>
        <li>
          <strong>Make Initial Contribution</strong> - Deposit the required initial stake in the specified currency or tokens.
        </li>
        <li>
          <strong>Register Shipments</strong> - Begin registering your eligible shipments with the pool.
        </li>
      </ol>
      
      <h2>Managing Trade Documentation</h2>
      
      <p>
        Aduana provides a secure platform for managing all trade-related documentation, ensuring that sensitive information remains private while still enabling verification by relevant parties.
      </p>
      
      <h3>Document Types Supported</h3>
      
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-lg">
          <h4 className="font-medium text-slate-900">Commercial Documents</h4>
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 mt-2">
            <li>Commercial invoices</li>
            <li>Packing lists</li>
            <li>Proforma invoices</li>
            <li>Purchase orders</li>
          </ul>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <h4 className="font-medium text-slate-900">Shipping Documents</h4>
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 mt-2">
            <li>Bills of lading</li>
            <li>Air waybills</li>
            <li>Sea waybills</li>
            <li>Delivery notes</li>
          </ul>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <h4 className="font-medium text-slate-900">Regulatory Documents</h4>
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 mt-2">
            <li>Certificates of origin</li>
            <li>Phytosanitary certificates</li>
            <li>Health certificates</li>
            <li>Export/Import licenses</li>
          </ul>
        </div>
      </div>
      
      <h3>Document Security Features</h3>
      
      <p>
        All documents stored on the Aduana platform benefit from:
      </p>
      
      <ul className="space-y-2">
        <li><strong>Zero-knowledge encryption</strong> - Only authorized parties can access sensitive details</li>
        <li><strong>Immutable timestamping</strong> - Tamper-proof record of document creation and modifications</li>
        <li><strong>Selective disclosure</strong> - Control exactly what information is shared with which parties</li>
        <li><strong>Digital signatures</strong> - Verifiable proof of document authenticity and approval</li>
      </ul>
      
      <h2>Advanced Features for Experienced Users</h2>
      
      <div className="my-6 space-y-4">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 font-medium text-slate-900 bg-slate-50">
            Tariff Rate Futures
          </div>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p>
              Hedge against future tariff rate changes using blockchain-based derivative contracts. These instruments allow traders to lock in current rates or speculate on future changes in tariff regimes across different trade corridors.
            </p>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 font-medium text-slate-900 bg-slate-50">
            Supply Chain Financing
          </div>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p>
              Access working capital based on verified trade documentation and on-chain trade history. The platform connects qualified traders with liquidity providers offering competitive rates for trade financing.
            </p>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 font-medium text-slate-900 bg-slate-50">
            Automated Customs Integration
          </div>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p>
              For high-volume traders, Aduana offers direct integration with participating customs authorities, enabling automated processing of shipments with pre-verified documentation and origin proofs.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-blue-800 font-semibold mt-0">Need Additional Support?</h2>
        <p className="text-blue-700 mb-4">
          Our dedicated trade support team is available to help with specific use cases and integration questions.
        </p>
        <div className="flex space-x-4">
          <a href="/contact" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            Contact Support
          </a>
          <a href="/docs" className="inline-flex items-center px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 rounded-md transition-colors">
            Back to Documentation
          </a>
        </div>
      </div>
    </div>
  )
} 