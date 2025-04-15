export default function ApiReferencePage() {
  return (
    <div className="prose max-w-none">
      <h1>API Reference</h1>
      
      <p className="lead">
        This comprehensive API reference provides detailed information about all available endpoints, request parameters, and response formats for the Aduana API. 
      </p>
      
      <div className="bg-blue-50 p-6 rounded-lg my-6 border border-blue-100">
        <h2 className="text-blue-800 font-semibold mt-0">API Base URL</h2>
        <p className="text-blue-700 mb-0">
          All API requests should be made to the following base URL:<br />
          <code className="bg-white px-2 py-1 rounded">https://api.aduana.network/v1</code>
        </p>
      </div>
      
      <h2>Authentication</h2>
      
      <p>
        See the <a href="/docs/api-documentation" className="text-indigo-600 hover:text-indigo-500">API Documentation</a> for detailed information on authentication flows and obtaining API credentials.
      </p>
      
      <div className="bg-slate-100 p-3 rounded-md overflow-x-auto text-sm my-6">
        <pre><code>Authorization: Bearer &lt;access_token&gt;</code></pre>
      </div>
      
      <h2>Products API</h2>
      
      <h3>List Products</h3>
      
      <div className="my-6 space-y-2">
        <div className="flex items-center justify-between bg-slate-50 px-4 py-2 rounded-t-lg border border-slate-200">
          <span className="font-medium">GET /products</span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">GET</span>
        </div>
        <div className="border border-slate-200 border-t-0 px-4 py-3 rounded-b-lg">
          <p className="mb-3">Retrieves a paginated list of products registered by the authenticated user.</p>
          
          <h4 className="text-sm font-semibold mb-2">Query Parameters</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="bg-slate-50">
                  <th scope="col" className="py-2 pl-4 pr-3 text-left text-xs font-semibold text-slate-900">Parameter</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-slate-900">Type</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-slate-900">Default</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-slate-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="py-2 pl-4 pr-3 text-xs font-medium text-slate-900">page</td>
                  <td className="px-3 py-2 text-xs text-slate-700">integer</td>
                  <td className="px-3 py-2 text-xs text-slate-700">1</td>
                  <td className="px-3 py-2 text-xs text-slate-700">Page number</td>
                </tr>
                <tr>
                  <td className="py-2 pl-4 pr-3 text-xs font-medium text-slate-900">limit</td>
                  <td className="px-3 py-2 text-xs text-slate-700">integer</td>
                  <td className="px-3 py-2 text-xs text-slate-700">20</td>
                  <td className="px-3 py-2 text-xs text-slate-700">Number of results per page (max 100)</td>
                </tr>
                <tr>
                  <td className="py-2 pl-4 pr-3 text-xs font-medium text-slate-900">status</td>
                  <td className="px-3 py-2 text-xs text-slate-700">string</td>
                  <td className="px-3 py-2 text-xs text-slate-700">all</td>
                  <td className="px-3 py-2 text-xs text-slate-700">Filter by status (registered, verified, rejected)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h4 className="text-sm font-semibold mt-4 mb-2">Response Format</h4>
          <div className="bg-slate-100 p-3 rounded-md overflow-x-auto text-xs">
            <pre><code>{`{
  "data": [
    {
      "id": "prod_01H8X9JMQT2R3Z4Y5W6V7U8T9",
      "name": "Organic Cotton T-Shirt",
      "hs_code": "6109.10",
      "status": "verified",
      "created_at": "2023-08-15T10:30:45Z"
    },
    // More products...
  ],
  "meta": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}`}</code></pre>
          </div>
        </div>
      </div>
      
      <h3>Create Product</h3>
      
      <div className="my-6 space-y-2">
        <div className="flex items-center justify-between bg-slate-50 px-4 py-2 rounded-t-lg border border-slate-200">
          <span className="font-medium">POST /products</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">POST</span>
        </div>
        <div className="border border-slate-200 border-t-0 px-4 py-3 rounded-b-lg">
          <p className="mb-3">Creates a new product registration.</p>
          
          <h4 className="text-sm font-semibold mb-2">Request Body</h4>
          <div className="bg-slate-100 p-3 rounded-md overflow-x-auto text-xs">
            <pre><code>{`{
  "name": "Organic Cotton T-Shirt",
  "description": "100% organic cotton t-shirt, medium weight, round neck",
  "hs_code": "6109.10",
  "manufacturing_details": {
    "country": "IN",
    "facility": "Sustainable Textiles Ltd.",
    "processes": ["spinning", "weaving", "dyeing", "cutting", "sewing"]
  },
  "components": [
    {
      "name": "Cotton Fabric",
      "origin_country": "IN",
      "percentage": 95
    },
    {
      "name": "Thread",
      "origin_country": "IN",
      "percentage": 3
    },
    {
      "name": "Labels",
      "origin_country": "VN",
      "percentage": 2
    }
  ]
}`}</code></pre>
          </div>
          
          <h4 className="text-sm font-semibold mt-4 mb-2">Response Format</h4>
          <div className="bg-slate-100 p-3 rounded-md overflow-x-auto text-xs">
            <pre><code>{`{
  "id": "prod_01H8X9JMQT2R3Z4Y5W6V7U8T9",
  "name": "Organic Cotton T-Shirt",
  "description": "100% organic cotton t-shirt, medium weight, round neck",
  "hs_code": "6109.10",
  "status": "registered",
  "registration_date": "2023-08-15T10:30:45Z",
  "verification_status": "pending",
  "owner": "0x7a9D53B2c538469c8E4E9Fc8e7343722114C5131",
  "manufacturing_details": {
    "country": "IN",
    "facility": "Sustainable Textiles Ltd.",
    "processes": ["spinning", "weaving", "dyeing", "cutting", "sewing"]
  },
  "components": [
    {
      "name": "Cotton Fabric",
      "origin_country": "IN",
      "percentage": 95
    },
    {
      "name": "Thread",
      "origin_country": "IN",
      "percentage": 3
    },
    {
      "name": "Labels",
      "origin_country": "VN",
      "percentage": 2
    }
  ]
}`}</code></pre>
          </div>
        </div>
      </div>
      
      <h3>Get Product</h3>
      
      <div className="my-6 space-y-2">
        <div className="flex items-center justify-between bg-slate-50 px-4 py-2 rounded-t-lg border border-slate-200">
          <span className="font-medium">GET /products/:id</span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">GET</span>
        </div>
        <div className="border border-slate-200 border-t-0 px-4 py-3 rounded-b-lg">
          <p className="mb-3">Retrieves detailed information about a specific product.</p>
          
          <h4 className="text-sm font-semibold mb-2">Path Parameters</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="bg-slate-50">
                  <th scope="col" className="py-2 pl-4 pr-3 text-left text-xs font-semibold text-slate-900">Parameter</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-slate-900">Type</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-slate-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="py-2 pl-4 pr-3 text-xs font-medium text-slate-900">id</td>
                  <td className="px-3 py-2 text-xs text-slate-700">string</td>
                  <td className="px-3 py-2 text-xs text-slate-700">Product ID</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h4 className="text-sm font-semibold mt-4 mb-2">Response Format</h4>
          <div className="bg-slate-100 p-3 rounded-md overflow-x-auto text-xs">
            <pre><code>{`{
  "id": "prod_01H8X9JMQT2R3Z4Y5W6V7U8T9",
  "name": "Organic Cotton T-Shirt",
  "description": "100% organic cotton t-shirt, medium weight, round neck",
  "hs_code": "6109.10",
  "status": "verified",
  "registration_date": "2023-08-15T10:30:45Z",
  "verification_date": "2023-08-16T14:22:10Z",
  "verification_status": "verified",
  "verification_hash": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
  "owner": "0x7a9D53B2c538469c8E4E9Fc8e7343722114C5131",
  "manufacturing_details": {
    "country": "IN",
    "facility": "Sustainable Textiles Ltd.",
    "processes": ["spinning", "weaving", "dyeing", "cutting", "sewing"]
  },
  "components": [
    {
      "name": "Cotton Fabric",
      "origin_country": "IN",
      "percentage": 95
    },
    {
      "name": "Thread",
      "origin_country": "IN",
      "percentage": 3
    },
    {
      "name": "Labels",
      "origin_country": "VN",
      "percentage": 2
    }
  ]
}`}</code></pre>
          </div>
        </div>
      </div>
      
      <h2>Verification API</h2>
      
      <h3>Verify Origin</h3>
      
      <div className="my-6 space-y-2">
        <div className="flex items-center justify-between bg-slate-50 px-4 py-2 rounded-t-lg border border-slate-200">
          <span className="font-medium">POST /verify/origin</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">POST</span>
        </div>
        <div className="border border-slate-200 border-t-0 px-4 py-3 rounded-b-lg">
          <p className="mb-3">Submits a zero-knowledge proof for origin verification.</p>
          
          <h4 className="text-sm font-semibold mb-2">Request Body</h4>
          <div className="bg-slate-100 p-3 rounded-md overflow-x-auto text-xs">
            <pre><code>{`{
  "product_id": "prod_01H8X9JMQT2R3Z4Y5W6V7U8T9",
  "proof_data": {
    "proof": "0x1f4b3...",
    "public_inputs": ["0x2a3b...", "0x9c8d..."],
    "context": {
      "origin_country": "IN",
      "manufacturing_details": {
        "facility_coordinates": [12.9716, 77.5946],
        "process_verification": true
      }
    }
  },
  "target_rules": ["ASEAN_FTA", "GSP_INDIA"]
}`}</code></pre>
          </div>
          
          <h4 className="text-sm font-semibold mt-4 mb-2">Response Format</h4>
          <div className="bg-slate-100 p-3 rounded-md overflow-x-auto text-xs">
            <pre><code>{`{
  "verification_id": "ver_01H8X9KPQ2S3T4U5V6W7X8Y9Z",
  "product_id": "prod_01H8X9JMQT2R3Z4Y5W6V7U8T9",
  "status": "verified",
  "verification_date": "2023-08-16T14:22:10Z",
  "verification_hash": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
  "rule_results": [
    {
      "rule": "ASEAN_FTA",
      "compliant": true,
      "details": "Product meets ASEAN FTA origin requirements"
    },
    {
      "rule": "GSP_INDIA",
      "compliant": true,
      "details": "Product eligible for GSP preferential treatment"
    }
  ],
  "certificate_url": "https://api.aduana.network/certificates/ver_01H8X9KPQ2S3T4U5V6W7X8Y9Z"
}`}</code></pre>
          </div>
        </div>
      </div>
      
      <h2>Equity Pools API</h2>
      
      <h3>List Pools</h3>
      
      <div className="my-6 space-y-2">
        <div className="flex items-center justify-between bg-slate-50 px-4 py-2 rounded-t-lg border border-slate-200">
          <span className="font-medium">GET /pools</span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">GET</span>
        </div>
        <div className="border border-slate-200 border-t-0 px-4 py-3 rounded-b-lg">
          <p className="mb-3">Retrieves a list of available equity pools.</p>
          
          <h4 className="text-sm font-semibold mb-2">Query Parameters</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="bg-slate-50">
                  <th scope="col" className="py-2 pl-4 pr-3 text-left text-xs font-semibold text-slate-900">Parameter</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-slate-900">Type</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-slate-900">Default</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-slate-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="py-2 pl-4 pr-3 text-xs font-medium text-slate-900">page</td>
                  <td className="px-3 py-2 text-xs text-slate-700">integer</td>
                  <td className="px-3 py-2 text-xs text-slate-700">1</td>
                  <td className="px-3 py-2 text-xs text-slate-700">Page number</td>
                </tr>
                <tr>
                  <td className="py-2 pl-4 pr-3 text-xs font-medium text-slate-900">limit</td>
                  <td className="px-3 py-2 text-xs text-slate-700">integer</td>
                  <td className="px-3 py-2 text-xs text-slate-700">20</td>
                  <td className="px-3 py-2 text-xs text-slate-700">Number of results per page (max 100)</td>
                </tr>
                <tr>
                  <td className="py-2 pl-4 pr-3 text-xs font-medium text-slate-900">category</td>
                  <td className="px-3 py-2 text-xs text-slate-700">string</td>
                  <td className="px-3 py-2 text-xs text-slate-700">all</td>
                  <td className="px-3 py-2 text-xs text-slate-700">Filter by product category</td>
                </tr>
                <tr>
                  <td className="py-2 pl-4 pr-3 text-xs font-medium text-slate-900">trade_corridor</td>
                  <td className="px-3 py-2 text-xs text-slate-700">string</td>
                  <td className="px-3 py-2 text-xs text-slate-700">all</td>
                  <td className="px-3 py-2 text-xs text-slate-700">Filter by trade corridor (e.g., ASIA_EU)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h4 className="text-sm font-semibold mt-4 mb-2">Response Format</h4>
          <div className="bg-slate-100 p-3 rounded-md overflow-x-auto text-xs">
            <pre><code>{`{
  "data": [
    {
      "id": "pool_01H9X8W7V6U5T4S3R2Q1P0O9",
      "name": "ASEAN Textiles Risk Pool",
      "category": "Textiles",
      "trade_corridor": "ASIA_EU",
      "members": 42,
      "total_value": 5800000,
      "currency": "USDC",
      "risk_profile": "Medium",
      "created_at": "2023-06-10T08:15:30Z"
    },
    // More pools...
  ],
  "meta": {
    "total": 28,
    "page": 1,
    "limit": 20,
    "pages": 2
  }
}`}</code></pre>
          </div>
        </div>
      </div>
      
      <h2>Error Handling</h2>
      
      <p>
        The API returns standard HTTP status codes to indicate the success or failure of a request.
        In case of an error, a JSON response with error details is returned.
      </p>
      
      <div className="bg-slate-100 p-3 rounded-md overflow-x-auto text-xs my-6">
        <pre><code>{`{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": [
      {
        "field": "hs_code",
        "issue": "invalid_format",
        "description": "HS code must be in format XXXX.XX"
      }
    ]
  }
}`}</code></pre>
      </div>
      
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr className="bg-slate-50">
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900">Status Code</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-900">200 OK</td>
              <td className="px-3 py-4 text-sm text-slate-700">Request succeeded</td>
            </tr>
            <tr>
              <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-900">201 Created</td>
              <td className="px-3 py-4 text-sm text-slate-700">Resource created successfully</td>
            </tr>
            <tr>
              <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-900">400 Bad Request</td>
              <td className="px-3 py-4 text-sm text-slate-700">Invalid request parameters</td>
            </tr>
            <tr>
              <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-900">401 Unauthorized</td>
              <td className="px-3 py-4 text-sm text-slate-700">Authentication required or failed</td>
            </tr>
            <tr>
              <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-900">403 Forbidden</td>
              <td className="px-3 py-4 text-sm text-slate-700">Insufficient permissions</td>
            </tr>
            <tr>
              <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-900">404 Not Found</td>
              <td className="px-3 py-4 text-sm text-slate-700">Resource not found</td>
            </tr>
            <tr>
              <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-900">429 Too Many Requests</td>
              <td className="px-3 py-4 text-sm text-slate-700">Rate limit exceeded</td>
            </tr>
            <tr>
              <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-900">500 Internal Server Error</td>
              <td className="px-3 py-4 text-sm text-slate-700">Server error</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-blue-800 font-semibold mt-0">Need More Help?</h2>
        <p className="text-blue-700 mb-4">
          This API reference provides details on available endpoints. For information on authentication, rate limits, and best practices, refer to our:
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/docs/api-documentation" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            API Documentation
          </a>
          <a href="/docs/developers-guide" className="inline-flex items-center px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 rounded-md transition-colors">
            Developer Guide
          </a>
        </div>
      </div>
    </div>
  );
} 