import Link from 'next/link';
import { CodeBlock } from '@/components/ui/code-block';

export default function IntegrationTestsPage() {
  return (
    <div className="prose max-w-none">
      <h1>Integration Tests</h1>
      
      <p className="lead text-xl text-slate-700 mb-8">
        Integration tests are crucial for validating the core functionalities of the Aduana platform. 
        These tests ensure that different components work together as expected and that changes don't 
        introduce regressions.
      </p>
      
      <h2>Origin Verifier Tests</h2>
      
      <p>
        The Origin Verifier pallet is a critical component of the Aduana platform. Its integration tests validate:
      </p>
      
      <ul className="space-y-3 my-6">
        <li><strong>Fee management</strong> - Tests verify that verification fees are properly charged and handled</li>
        <li><strong>Product registration</strong> - Validates ownership verification and product information management</li>
        <li><strong>Claim verification</strong> - Ensures the verification process works as expected across various scenarios</li>
        <li><strong>Administrative control</strong> - Tests admin-only operations like verification revocation</li>
      </ul>
      
      <h3>Key Test Cases</h3>
      
      <div className="my-6 space-y-6">
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h4 className="text-lg font-medium text-slate-900 mt-0">verify_claim_charges_verification_fee</h4>
          <p className="text-slate-700">
            Verifies that the correct verification fee is charged when a claim is verified. The test:
          </p>
          <ul className="text-slate-700 mt-2">
            <li>Sets up initial balances for accounts</li>
            <li>Registers a product with the specified owner</li>
            <li>Submits a claim for the product</li>
            <li>Verifies the claim and checks that the fee was correctly charged</li>
            <li>Confirms final balances reflect the fee payment</li>
          </ul>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h4 className="text-lg font-medium text-slate-900 mt-0">verify_claim_fails_with_insufficient_balance</h4>
          <p className="text-slate-700">
            Tests failure scenarios when users have insufficient balance to pay verification fees:
          </p>
          <ul className="text-slate-700 mt-2">
            <li>Sets up an account with balance below the required verification fee</li>
            <li>Attempts to verify a claim</li>
            <li>Confirms that the verification fails with the appropriate error</li>
            <li>Ensures no balance changes occur</li>
          </ul>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h4 className="text-lg font-medium text-slate-900 mt-0">product_owner_can_update_product_info</h4>
          <p className="text-slate-700">
            Validates product ownership permissions:
          </p>
          <ul className="text-slate-700 mt-2">
            <li>Confirms product owners can update their product information</li>
            <li>Verifies that non-owners cannot modify product details</li>
            <li>Tests that appropriate events are emitted when products are updated</li>
          </ul>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h4 className="text-lg font-medium text-slate-900 mt-0">admin_can_revoke_verification</h4>
          <p className="text-slate-700">
            Tests administrative control mechanisms:
          </p>
          <ul className="text-slate-700 mt-2">
            <li>Verifies that admin accounts can revoke verifications</li>
            <li>Confirms non-admin accounts cannot revoke verifications</li>
            <li>Checks that product verification status is properly updated</li>
            <li>Validates that appropriate events are emitted</li>
          </ul>
        </div>
      </div>
      
      <h2>Running Tests Locally</h2>
      
      <p>
        To run the integration tests locally, use the following commands in your terminal:
      </p>
      
      <CodeBlock 
        language="bash"
        value={`# Run the basic test suite
cargo test -p pallet-origin-verifier --test integration_tests

# Run with verbose output
RUST_LOG=debug cargo test -p pallet-origin-verifier --test integration_tests -- --nocapture`}
      />
      
      <p className="mt-4">
        The integration tests are designed to run in an isolated environment that simulates the blockchain's behavior without requiring a full node. This makes them fast and reliable for continuous integration purposes.
      </p>
      
      <h2>Test Environment Setup</h2>
      
      <p>
        The integration tests use a mock runtime environment that includes:
      </p>
      
      <ul className="space-y-2 my-4">
        <li><strong>Origin Verifier Pallet</strong> - The main module being tested</li>
        <li><strong>Balances Pallet</strong> - For testing fee-related functionality</li>
        <li><strong>System Pallet</strong> - For basic runtime functionality</li>
        <li><strong>Test Accounts</strong> - Predefined accounts with different roles (admin, user, product owner)</li>
      </ul>
      
      <div className="my-8">
        <CodeBlock 
          language="rust"
          value={`// Example of the mock environment setup
#[frame_support::pallet]
pub mod mock {
    // Import necessary components
    use super::*;
    use frame_support::{construct_runtime, parameter_types};
    use sp_runtime::{traits::IdentityLookup, BuildStorage};
    
    // Configure the mock runtime
    construct_runtime!(
        pub enum Runtime where
            Block = Block,
            NodeBlock = Block,
            UncheckedExtrinsic = UncheckedExtrinsic,
        {
            System: frame_system,
            Balances: pallet_balances,
            OriginVerifier: pallet_origin_verifier,
        }
    );
    
    // Rest of the mock runtime configuration...
}`}
          showLineNumbers={true}
        />
      </div>
      
      <h2>Contributing New Tests</h2>
      
      <p>
        When contributing new integration tests to the Aduana platform:
      </p>
      
      <ol className="space-y-3 my-6">
        <li><strong>Follow existing patterns</strong> - Maintain consistency with the current test structure</li>
        <li><strong>Test both success and failure cases</strong> - Ensure your tests cover positive and negative scenarios</li>
        <li><strong>Document test purpose</strong> - Include clear comments explaining what each test verifies</li>
        <li><strong>Consider edge cases</strong> - Test boundary conditions and uncommon scenarios</li>
        <li><strong>Keep tests independent</strong> - Each test should be self-contained and not depend on other tests</li>
      </ol>
      
      <div className="my-8">
        <div className="bg-slate-100 p-6 rounded-lg">
          <h3 className="font-semibold mt-0">Test Structure Best Practices</h3>
          <ul className="space-y-3 mt-4">
            <li><strong>Isolation</strong> - Each test should be independent and not rely on the state from other tests</li>
            <li><strong>Clear Purpose</strong> - Name tests descriptively to indicate what they verify</li>
            <li><strong>Complete Setup</strong> - Include all necessary steps to prepare the test environment</li>
            <li><strong>Explicit Assertions</strong> - Be clear about what conditions must be met for the test to pass</li>
            <li><strong>Error Messages</strong> - Include descriptive messages in assertions to make failures easier to understand</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-blue-800 font-semibold mt-0">Testing Resources</h2>
        <p className="text-blue-700 mb-4">
          For more detailed information about Aduana's testing approach, explore these resources:
        </p>
        <ul className="text-blue-700 space-y-2">
          <li><strong>Source code:</strong> <a href="https://github.com/aduana-network/aduana/tree/main/pallets/origin-verifier/src" className="text-blue-600 hover:text-blue-800 underline">View Source</a></li>
          <li><strong>Developer documentation:</strong> <a href="/docs/developers-guide" className="text-blue-600 hover:text-blue-800 underline">Developers Guide</a></li>
          <li><strong>Developer community:</strong> <a href="https://discord.gg/aduana-dev" className="text-blue-600 hover:text-blue-800 underline">Discord</a></li>
          <li><strong>API Documentation:</strong> <a href="/docs/api-documentation" className="text-blue-600 hover:text-blue-800 underline">API Docs</a> for testing the system through API calls</li>
        </ul>
      </div>
    </div>
  );
} 