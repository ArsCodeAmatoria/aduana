import React from 'react';
import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'API Documentation | Aduana',
  description: 'Comprehensive guide to the Aduana API with detailed examples and usage information',
};

export default function ApiDocumentationPage() {
  return (
    <div className="prose max-w-none dark:text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight mb-6">API Documentation</h1>

      {/* Table of Contents */}
      <Card className="p-6 mb-8 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Table of Contents
        </h2>
        <nav>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-0 list-none">
            <li>
              <a href="#introduction" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Introduction
              </a>
            </li>
            <li>
              <a href="#authentication" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Authentication
              </a>
            </li>
            <li>
              <a href="#products" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Working with Products
              </a>
            </li>
            <li>
              <a href="#equity-pools" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Equity Pools
              </a>
            </li>
            <li>
              <a href="#advanced" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Advanced Usage
              </a>
            </li>
            <li>
              <a href="#webhooks" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Webhooks
              </a>
            </li>
            <li>
              <a href="#rate-limits" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Rate Limits
              </a>
            </li>
            <li>
              <a href="#api-reference" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Full API Reference
              </a>
            </li>
          </ul>
        </nav>
      </Card>

      <section id="introduction" className="mb-12">
        <div className="flex items-start">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full mr-4 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                The Aduana API provides a comprehensive interface for interacting with the Aduana platform programmatically. 
                This documentation provides detailed examples and usage patterns to help you integrate with our system.
              </p>
              <p>
                For a quick reference of all endpoints, parameters, and return values, see the 
                <Link href="/docs/api-reference" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">
                  API Reference
                </Link>.
              </p>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800/50 flex items-start mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-amber-800 dark:text-amber-200 text-sm m-0">
                  The API is currently in beta. While we strive for stability, endpoints and parameters may change. 
                  Subscribe to our <Link href="/docs/api-changelog" className="text-amber-700 dark:text-amber-300 underline">changelog</Link> to stay updated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="authentication" className="mb-12">
        <div className="flex items-start">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                All API requests require authentication using JWT tokens. To obtain a token, you need to authenticate 
                using your credentials through the authentication endpoint.
              </p>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
                <h3 className="text-xl font-medium mb-3">Authentication Example</h3>
                <CodeBlock
                  language="javascript"
                  value={`// Request a JWT token
fetch('https://api.aduana.network/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'your-email@example.com',
    password: 'your-password'
  })
})
.then(response => response.json())
.then(data => {
  // Store the token for future requests
  const token = data.token;
  console.log('Authentication successful, token:', token);
})
.catch(error => console.error('Authentication error:', error));`}
                  showLineNumbers={true}
                />
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-medium mb-3">Making Authenticated Requests</h3>
                <p className="mb-4">
                  Once you have your JWT token, include it in the Authorization header for all subsequent requests.
                </p>
                <CodeBlock
                  language="javascript"
                  value={`// Example of making an authenticated request
fetch('https://api.aduana.network/products', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log('Products:', data))
.catch(error => console.error('Error fetching products:', error));`}
                  showLineNumbers={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="mb-12">
        <div className="flex items-start">
          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Working with Products</h2>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
              <h3 className="text-xl font-medium mb-3">Creating a Product with Origin Data</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                This example demonstrates how to register a new product with its complete origin data.
              </p>
              <CodeBlock
                language="javascript"
                value={`// Register a new product with origin data
const productData = {
  name: "Organic Coffee Beans",
  description: "Premium arabica coffee beans from Colombia",
  originLocation: {
    country: "Colombia",
    region: "Huila",
    coordinates: {
      latitude: 2.5359,
      longitude: -75.5277
    }
  },
  productionDate: "2023-03-15",
  certifications: [
    {
      type: "Organic",
      issuerId: "org-123",
      issueDate: "2023-01-10",
      expiryDate: "2024-01-10"
    },
    {
      type: "Fair Trade",
      issuerId: "ft-456",
      issueDate: "2023-02-05",
      expiryDate: "2024-02-05"
    }
  ],
  components: [
    {
      name: "Coffee Beans",
      percentage: 100,
      originData: {
        country: "Colombia",
        region: "Huila",
        farm: "El Paraíso"
      }
    }
  ]
};

fetch('https://api.aduana.network/products', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(productData)
})
.then(response => response.json())
.then(data => {
  console.log('Product created:', data);
  const productId = data.id;
  console.log('New product ID:', productId);
})
.catch(error => console.error('Error creating product:', error));`}
                showLineNumbers={true}
              />
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-medium mb-3">Submitting Verification Evidence</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                After creating a product, you can submit evidence for verification.
              </p>
              <CodeBlock
                language="javascript"
                value={`// Submit verification evidence for a product
const verificationData = {
  productId: "prod-789",
  evidenceType: "documents",
  documents: [
    {
      type: "certificate",
      name: "Organic Certification",
      contentType: "application/pdf",
      content: "base64EncodedFileContent..." // Base64 encoded file
    },
    {
      type: "invoice",
      name: "Purchase Invoice",
      contentType: "application/pdf",
      content: "base64EncodedFileContent..." // Base64 encoded file
    }
  ],
  zkProofs: [
    {
      proofType: "origin",
      proofData: "0x123abc..." // ZK proof data
    }
  ],
  notes: "All certificates and invoices from original producer included."
};

fetch('https://api.aduana.network/verifications', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(verificationData)
})
.then(response => response.json())
.then(data => {
  console.log('Verification submitted:', data);
  const verificationId = data.id;
  console.log('Verification ID:', verificationId);
})
.catch(error => console.error('Error submitting verification:', error));`}
                showLineNumbers={true}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="equity-pools" className="mb-12">
        <div className="flex items-start">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-4 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Working with Equity Pools</h2>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
              <h3 className="text-xl font-medium mb-3">Creating an Equity Pool</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                This example shows how to create a new equity pool for collaborative financing.
              </p>
              <CodeBlock
                language="javascript"
                value={`// Create a new equity pool
const poolData = {
  name: "Colombian Coffee Producers Pool",
  description: "Equity pool for small-scale coffee producers in Colombia",
  targetAmount: 100000,
  currency: "USD",
  riskProfile: "moderate",
  minInvestment: 1000,
  maxInvestment: 10000,
  terms: {
    duration: 12, // months
    interestRate: 5.5,
    paymentSchedule: "quarterly"
  },
  eligibilityCriteria: {
    location: ["Colombia", "Huila"],
    productTypes: ["coffee"],
    certifications: ["organic", "fair-trade"]
  }
};

fetch('https://api.aduana.network/equity-pools', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(poolData)
})
.then(response => response.json())
.then(data => {
  console.log('Equity pool created:', data);
  const poolId = data.id;
  console.log('New pool ID:', poolId);
})
.catch(error => console.error('Error creating equity pool:', error));`}
                showLineNumbers={true}
              />
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-medium mb-3">Joining an Equity Pool</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                Participants can join an equity pool by submitting an investment request.
              </p>
              <CodeBlock
                language="javascript"
                value={`// Join an equity pool as an investor
const investmentData = {
  poolId: "pool-456",
  amount: 5000,
  currency: "USD",
  investorDetails: {
    name: "Example Investor LLC",
    type: "institutional",
    jurisdiction: "United States"
  },
  acceptedTerms: true
};

fetch('https://api.aduana.network/equity-pools/pool-456/investments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(investmentData)
})
.then(response => response.json())
.then(data => {
  console.log('Investment submitted:', data);
  const investmentId = data.id;
  console.log('Investment ID:', investmentId);
})
.catch(error => console.error('Error submitting investment:', error));`}
                showLineNumbers={true}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="advanced" className="mb-12">
        <div className="flex items-start">
          <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full mr-4 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Advanced Usage</h2>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
              <h3 className="text-xl font-medium mb-3">Paginating Results</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                For endpoints that return large collections, you can use pagination parameters.
              </p>
              <CodeBlock
                language="javascript"
                value={`// Get paginated list of products
fetch('https://api.aduana.network/products?page=2&limit=20', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log('Products (page 2):', data.items);
  console.log('Total products:', data.total);
  console.log('Current page:', data.page);
  console.log('Total pages:', data.totalPages);
})
.catch(error => console.error('Error fetching paginated products:', error));`}
                showLineNumbers={true}
              />
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-medium mb-3">Filtering and Sorting</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                Many endpoints support filtering and sorting to customize results.
              </p>
              <CodeBlock
                language="javascript"
                value={`// Get filtered and sorted list of products
fetch('https://api.aduana.network/products?country=Colombia&sortBy=creationDate&sortOrder=desc', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log('Filtered products:', data))
.catch(error => console.error('Error fetching filtered products:', error));`}
                showLineNumbers={true}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="webhooks" className="mb-12">
        <div className="flex items-start">
          <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full mr-4 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Webhooks</h2>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
              <h3 className="text-xl font-medium mb-3">Registering a Webhook</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                Aduana supports webhooks to notify your application of events in real-time.
              </p>
              <CodeBlock
                language="javascript"
                value={`// Register a webhook
const webhookData = {
  url: "https://your-app.com/webhooks/aduana",
  events: [
    "product.created",
    "verification.submitted",
    "verification.approved",
    "equity-pool.funded"
  ],
  secret: "your-webhook-secret" // Used to verify webhook authenticity
};

fetch('https://api.aduana.network/webhooks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(webhookData)
})
.then(response => response.json())
.then(data => {
  console.log('Webhook registered:', data);
  const webhookId = data.id;
  console.log('Webhook ID:', webhookId);
})
.catch(error => console.error('Error registering webhook:', error));`}
                showLineNumbers={true}
              />
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-medium mb-3">Processing Webhook Events</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                When an event occurs, Aduana will send a POST request to your registered webhook URL.
                Here's an example of how to handle these webhook events:
              </p>
              <CodeBlock
                language="javascript"
                value={`// Example Express.js webhook handler
const express = require('express');
const crypto = require('crypto');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Webhook handler
app.post('/webhooks/aduana', (req, res) => {
  const signature = req.headers['x-aduana-signature'];
  const event = req.body;
  
  // Verify webhook signature
  const payload = JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac('sha256', 'your-webhook-secret')
    .update(payload)
    .digest('hex');
    
  if (signature !== expectedSignature) {
    console.error('Invalid webhook signature');
    return res.status(401).send('Invalid signature');
  }
  
  // Process different event types
  switch (event.type) {
    case 'product.created':
      console.log('New product created:', event.data.product);
      // Process new product...
      break;
      
    case 'verification.approved':
      console.log('Verification approved:', event.data.verification);
      // Update product status...
      break;
      
    case 'equity-pool.funded':
      console.log('Equity pool funded:', event.data.pool);
      // Notify stakeholders...
      break;
      
    default:
      console.log('Unhandled event type:', event.type);
  }
  
  // Acknowledge receipt of the webhook
  res.status(200).send('Webhook received');
});

app.listen(3000, () => {
  console.log('Webhook server listening on port 3000');
});`}
                showLineNumbers={true}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="rate-limits" className="mb-12">
        <div className="flex items-start">
          <div className="bg-gray-100 dark:bg-gray-900/30 p-2 rounded-full mr-4 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Rate Limits</h2>
            <p className="mb-4 text-slate-600 dark:text-slate-300">
              The Aduana API implements rate limiting to ensure fair usage and system stability. Limits vary by API endpoint and account tier.
            </p>
            <table className="min-w-full border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Account Tier</th>
                  <th className="py-2 px-4 border-b">Rate Limit</th>
                  <th className="py-2 px-4 border-b">Burst Limit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Developer</td>
                  <td className="py-2 px-4 border-b">100 requests/minute</td>
                  <td className="py-2 px-4 border-b">150 requests/minute</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Business</td>
                  <td className="py-2 px-4 border-b">300 requests/minute</td>
                  <td className="py-2 px-4 border-b">450 requests/minute</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Enterprise</td>
                  <td className="py-2 px-4 border-b">1000 requests/minute</td>
                  <td className="py-2 px-4 border-b">1500 requests/minute</td>
                </tr>
              </tbody>
            </table>
            <p className="text-slate-600 dark:text-slate-300">
              When rate limits are exceeded, the API will return a 429 Too Many Requests response with a Retry-After header.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mt-16">
        <h2 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Need Help?
        </h2>
        <p className="text-blue-700 dark:text-blue-300 mb-4">
          If you have any questions or need assistance with the Aduana API, our developer support team is here to help.
        </p>
        <ul className="space-y-2 text-blue-700 dark:text-blue-300 pl-0 list-none">
          <li className="flex items-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email: <a href="mailto:api-support@aduana.network" className="text-blue-600 hover:underline dark:text-blue-400">api-support@aduana.network</a>
          </li>
          <li className="flex items-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            Developer Forum: <a href="https://forum.aduana.network" className="text-blue-600 hover:underline dark:text-blue-400">forum.aduana.network</a>
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            API Status: <a href="https://status.aduana.network" className="text-blue-600 hover:underline dark:text-blue-400">status.aduana.network</a>
          </li>
        </ul>
      </div>
    </div>
  );
} 