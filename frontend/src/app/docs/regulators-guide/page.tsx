export default function RegulatorsGuidePage() {
  return (
    <div className="prose max-w-none">
      <h1>Regulators Guide: For Customs & Regulatory Authorities</h1>
      
      <p className="lead">
        This guide is designed for customs officials, regulatory agencies, and trade compliance officers who interact with the Aduana platform. Learn how to leverage blockchain technology and zero-knowledge proofs to streamline verification and compliance processes.
      </p>
      
      <div className="bg-green-50 p-6 rounded-lg my-6 border border-green-100">
        <h2 className="text-green-800 font-semibold mt-0">Key Benefits for Regulatory Bodies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-green-800 font-medium text-lg">Efficiency Improvements</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Automated document verification</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Reduced processing times</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Streamlined tariff assessment</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-green-800 font-medium text-lg">Compliance Enhancements</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Tamper-proof audit trails</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Reduced fraud risk</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Enhanced regulatory oversight</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <h2>Verifying Product Origin Claims</h2>
      
      <p>
        The Aduana platform provides customs and regulatory authorities with verified product origin information that can be trusted without requiring access to confidential business information.
      </p>
      
      <h3>Zero-Knowledge Verification Process</h3>
      
      <div className="my-6">
        <div className="bg-slate-100 p-6 rounded-lg">
          <h4 className="font-semibold mt-0">How It Works</h4>
          <ol className="space-y-4 mt-4">
            <li>
              <strong>Access ZK Proof</strong> - A trader presents a digital certificate containing a zero-knowledge proof of origin.
            </li>
            <li>
              <strong>Verify On-chain</strong> - The regulatory authority uses the Aduana verification tool to check the validity of the proof against the blockchain record.
            </li>
            <li>
              <strong>Confirm Attributes</strong> - The system confirms that the product meets origin requirements without revealing confidential supply chain details.
            </li>
            <li>
              <strong>Apply Appropriate Treatment</strong> - Based on the verified origin, the appropriate tariff treatment can be applied automatically.
            </li>
          </ol>
        </div>
      </div>
      
      <div className="my-6">
        <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
          <h4 className="text-amber-800 font-medium">Key Security Feature</h4>
          <p className="text-amber-700 mb-0">
            The zero-knowledge architecture ensures that even regulatory officials cannot access confidential supply chain information that is not directly relevant to origin determination, protecting business intelligence while maintaining compliance.
          </p>
        </div>
      </div>
      
      <h2>Integration with Existing Customs Systems</h2>
      
      <p>
        Aduana is designed to complement and enhance existing customs and regulatory systems rather than replace them. The platform offers several integration options to fit within current workflows.
      </p>
      
      <h3>Integration Methods</h3>
      
      <div className="my-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
            <div className="px-4 py-5 sm:p-6">
              <h4 className="text-lg font-medium text-slate-900">API Integration</h4>
              <div className="mt-2 text-sm text-slate-500">
                <p>Connect your existing customs management systems directly to the Aduana API for seamless data exchange. Supports:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Real-time certificate verification</li>
                  <li>Batch processing of shipments</li>
                  <li>Secure data exchange protocols</li>
                  <li>Custom data mapping options</li>
                </ul>
              </div>
              <div className="mt-4">
                <a href="/docs/api-documentation" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">API Documentation <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
            <div className="px-4 py-5 sm:p-6">
              <h4 className="text-lg font-medium text-slate-900">Verification Portal</h4>
              <div className="mt-2 text-sm text-slate-500">
                <p>Use our web-based verification portal for manual checks when needed. Features include:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Certificate scanning (QR code support)</li>
                  <li>Document authenticity verification</li>
                  <li>Origin criteria validation</li>
                  <li>Secure authentication for officials</li>
                </ul>
              </div>
              <div className="mt-4">
                <a href="/verification-portal" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Portal Access <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h3>Technical Requirements</h3>
      
      <div className="my-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="bg-slate-100">
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold">Integration Type</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Requirements</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Implementation Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium">Basic API Integration</td>
                <td className="px-3 py-4 text-sm">HTTPS support, OAuth 2.0 capability</td>
                <td className="px-3 py-4 text-sm">1-2 weeks</td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium">Full System Integration</td>
                <td className="px-3 py-4 text-sm">Secure network connection, data mapping resources</td>
                <td className="px-3 py-4 text-sm">4-8 weeks</td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium">Portal Access Only</td>
                <td className="px-3 py-4 text-sm">Modern web browser, official credentials</td>
                <td className="px-3 py-4 text-sm">Immediate</td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium">Blockchain Node</td>
                <td className="px-3 py-4 text-sm">Server infrastructure, network capacity</td>
                <td className="px-3 py-4 text-sm">2-3 weeks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <h2>Setting Up Automated Verification Workflows</h2>
      
      <p>
        For high-volume customs operations, Aduana supports the creation of automated verification workflows that can significantly reduce processing times and resource requirements.
      </p>
      
      <div className="my-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li>
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Risk-Based Assessment Models</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Configure automated risk profiles based on verified data from the Aduana platform:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1 mt-2">
                  <li>Set criteria for automatic clearance of trusted traders</li>
                  <li>Identify high-risk shipments requiring manual inspection</li>
                  <li>Apply machine learning algorithms to improve risk detection</li>
                  <li>Maintain flexible rules that adapt to changing trade patterns</li>
                </ul>
              </div>
            </li>
            <li>
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Automated Tariff Classification</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Use verified product attributes to automate tariff classification:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1 mt-2">
                  <li>Link HS codes to verified product specifications</li>
                  <li>Apply preferential rules based on verified origin</li>
                  <li>Calculate duties and taxes automatically</li>
                  <li>Generate standardized customs declarations</li>
                </ul>
              </div>
            </li>
            <li>
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Integration with Inspection Systems</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Connect Aduana with physical inspection processes:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1 mt-2">
                  <li>Flag discrepancies between declarations and verified data</li>
                  <li>Prioritize inspection resources based on verification status</li>
                  <li>Document inspection results in relation to blockchain records</li>
                  <li>Maintain comprehensive audit trails</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <h2>Regulatory Dashboard & Analytics</h2>
      
      <p>
        The Aduana Regulatory Dashboard provides customs and trade authorities with powerful analytics and monitoring capabilities.
      </p>
      
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center mb-4">
            <svg className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="font-medium text-lg">Trade Flow Analytics</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Monitor verified trade volumes</li>
            <li>Track origin verification trends</li>
            <li>Analyze trade corridor activity</li>
            <li>Export detailed reports</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center mb-4">
            <svg className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="font-medium text-lg">Compliance Monitoring</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Identify verification anomalies</li>
            <li>Track compliance rates by sector</li>
            <li>Monitor high-risk trade patterns</li>
            <li>Set automated alerts</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center mb-4">
            <svg className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="font-medium text-lg">Regulatory Planning</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Forecast trade activity</li>
            <li>Align resource allocation</li>
            <li>Measure verification efficiency</li>
            <li>Project revenue impacts</li>
          </ul>
        </div>
      </div>
      
      <h2>Privacy and Security Considerations</h2>
      
      <p>
        The Aduana platform is designed with robust security features to protect both regulatory authorities and private enterprises.
      </p>
      
      <div className="my-6 space-y-4">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 font-medium text-slate-900 bg-slate-50">
            Data Sovereignty and Access Controls
          </div>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p>
              Regulatory authorities maintain control over access to sensitive information through dedicated access management systems. Data access is governed by role-based permissions and comprehensive audit logging ensures all data access is tracked.
            </p>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 font-medium text-slate-900 bg-slate-50">
            Cryptographic Security
          </div>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p>
              All data exchanged between systems is encrypted using industry-standard protocols. The zero-knowledge architecture ensures that even when verifying claims, sensitive business information remains protected and inaccessible.
            </p>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 font-medium text-slate-900 bg-slate-50">
            Regulatory Compliance
          </div>
          <div className="px-4 py-3 text-slate-600 border-t border-slate-200">
            <p>
              The platform is designed to comply with data protection regulations across multiple jurisdictions, including GDPR, CCPA, and industry-specific requirements. Regular security audits and compliance reviews ensure ongoing adherence to evolving regulatory standards.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-blue-800 font-semibold mt-0">Request a Regulatory Demo</h2>
        <p className="text-blue-700 mb-4">
          Our team offers personalized demonstrations for regulatory authorities interested in implementing the Aduana platform.
        </p>
        <div className="flex space-x-4">
          <a href="/contact/regulatory-demo" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            Schedule Demo
          </a>
          <a href="/docs" className="inline-flex items-center px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 rounded-md transition-colors">
            Back to Documentation
          </a>
        </div>
      </div>
    </div>
  )
} 