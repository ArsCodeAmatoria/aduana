import Link from 'next/link';

export default function IntegrationTestsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Integration Tests</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          Integration tests are crucial for validating the core functionalities of the Aduana platform. 
          These tests ensure that different components work together as expected and that changes don't 
          introduce regressions.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h2 className="text-lg font-semibold mb-2">Download Documentation</h2>
          <p className="mb-3">
            We provide comprehensive documentation on our integration tests. Download the PDF for detailed information on test cases, execution instructions, and contribution guidelines.
          </p>
          <Link 
            href="/documents/integration_tests.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF Documentation
          </Link>
        </div>
      </div>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-3">Origin Verifier Tests</h2>
          <p className="mb-3">
            The Origin Verifier pallet is a critical component of the Aduana platform. Its integration tests validate:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fee management for verification operations</li>
            <li>Product registration and ownership validation</li>
            <li>Claim verification processes</li>
            <li>Administrative control mechanisms</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-3">Running Tests Locally</h2>
          <p className="mb-3">
            To run the integration tests locally, use the following commands in your terminal:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
            <pre className="text-sm"><code>
              # Run the basic test suite<br/>
              cargo test -p pallet-origin-verifier --test integration_tests<br/><br/>
              # Run with verbose output<br/>
              RUST_LOG=debug cargo test -p pallet-origin-verifier --test integration_tests -- --nocapture
            </code></pre>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-3">Contributing New Tests</h2>
          <p className="mb-3">
            When contributing new integration tests to the Aduana platform:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Follow the existing patterns for test setup and execution</li>
            <li>Ensure your tests cover both success and failure scenarios</li>
            <li>Document the purpose and expected outcomes of your tests</li>
            <li>Consider edge cases that might occur in real-world scenarios</li>
          </ol>
          <p className="mt-3">
            For more details, refer to the downloadable PDF documentation or the source code in the repository.
          </p>
        </section>
      </div>
    </div>
  );
} 