"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Apply dark mode when state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])
  
  // Group sidebar items by category
  const sidebarSections = [
    {
      title: "Getting Started",
      items: [
        { href: '/docs/getting-started', title: 'Getting Started' },
        { href: '/docs/overview', title: 'Overview' },
      ]
    },
    {
      title: "Core Concepts",
      items: [
        { href: '/docs/zk-origin-proofs', title: 'ZK Origin Proofs' },
        { href: '/docs/equity-pools', title: 'Equity Pools' },
        { href: '/docs/dao-governance', title: 'DAO Governance' },
        { href: '/docs/smart-contracts', title: 'Smart Contracts' },
        { href: '/docs/interoperability', title: 'Interoperability' },
        { href: '/docs/token-economics', title: 'Token Economics' },
      ]
    },
    {
      title: "User Guides",
      items: [
        { href: '/docs/traders-guide', title: 'Traders Guide' },
        { href: '/docs/regulators-guide', title: 'Regulators Guide' },
        { href: '/docs/developers-guide', title: 'Developers Guide' },
      ]
    },
    {
      title: "Technical Reference",
      items: [
        { href: '/docs/integration-tests', title: 'Integration Tests' },
        { href: '/docs/api-documentation', title: 'API Documentation' },
        { href: '/docs/api-reference', title: 'API Reference' },
      ]
    }
  ]
  
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Navbar />
      
      <div className="flex-1 pt-20 dark:bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Dark mode toggle */}
          <div className="flex justify-end py-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-sm transition-colors hover:bg-slate-200 dark:hover:bg-slate-600"
            >
              {isDarkMode ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                  Light Mode
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                  Dark Mode
                </>
              )}
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row py-6 gap-10">
            {/* Improved Sidebar */}
            <aside className="w-full md:w-72 shrink-0">
              <div className="sticky top-24 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 shadow-sm">
                <h3 className="font-semibold mb-6 text-lg dark:text-white">Documentation</h3>
                <nav className="space-y-6">
                  {sidebarSections.map((section, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold px-3">
                        {section.title}
                      </h4>
                      <div className="space-y-1">
                        {section.items.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            className={`block py-2 px-3 text-sm rounded-md transition-colors ${
                              pathname === item.href
                                ? 'bg-blue-50 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-100'
                                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                            }`}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
                
                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    Built by{" "}
                    <a 
                      href="https://github.com/ArsCodeAmatoria" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Ars Code Amatoria
                    </a>
                    <br/>
                    <a 
                      href="https://www.arscode.org/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      arscode.org
                    </a>
                  </p>
                </div>
              </div>
            </aside>
            
            {/* Main content with improved styling */}
            <main className="flex-1 min-w-0">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm dark:text-slate-100">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 