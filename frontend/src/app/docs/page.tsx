"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DocsPage() {
  // In a production environment, this would redirect to a deployed docs site
  // For development, we'll show a message with instructions instead
  
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-6">Aduana Documentation</h1>
            
            <div className="space-y-6">
              <p>
                The documentation site is available in the <code className="px-1 py-0.5 bg-slate-100 rounded text-slate-800">docs/</code> folder of this project.
              </p>
              
              <h2 className="text-xl font-semibold mt-6">To run the documentation site locally:</h2>
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto">
                <code>
                  cd docs<br />
                  npm install<br />
                  npm run dev
                </code>
              </pre>
              
              <p className="mt-6">
                The docs site will be available at <span className="font-semibold">http://localhost:3001</span> (or another port if 3001 is in use).
              </p>
              
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Available Documentation:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Overview</li>
                  <li>ZK Origin Proofs</li>
                  <li>Equity Pools</li>
                  <li>DAO Governance</li>
                  <li>Smart Contracts</li>
                  <li>Interoperability</li>
                </ul>
              </div>
              
              <div className="border-t border-slate-200 pt-6 mt-6">
                <Button asChild>
                  <Link href="/docs/overview">View Documentation</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 