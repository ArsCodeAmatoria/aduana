"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const sidebarItems = [
    { href: '/docs/getting-started', title: 'Getting Started' },
    { href: '/docs/overview', title: 'Overview' },
    { href: '/docs/zk-origin-proofs', title: 'ZK Origin Proofs' },
    { href: '/docs/equity-pools', title: 'Equity Pools' },
    { href: '/docs/dao-governance', title: 'DAO Governance' },
    { href: '/docs/smart-contracts', title: 'Smart Contracts' },
    { href: '/docs/interoperability', title: 'Interoperability' },
    { href: '/docs/token-economics', title: 'Token Economics' },
  ]
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row py-6 gap-10">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
              <div className="sticky top-24">
                <h3 className="font-semibold mb-4 text-lg">Documentation</h3>
                <nav className="space-y-1">
                  {sidebarItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className={`block py-2 px-3 text-sm rounded-md transition-colors ${
                        pathname === item.href
                          ? 'bg-slate-100 text-slate-900 font-medium'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>
            
            {/* Main content */}
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 