"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Overview", href: "#overview" },
    { label: "ZK Proofs", href: "#zkproofs" },
    { label: "Insurance", href: "#insurance" },
    { label: "Derivatives", href: "#derivatives" },
    { label: "Token", href: "#token" },
    { label: "Docs", href: "/docs" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-white">Aduana</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Connect
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-slate-900 border-b border-slate-800"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4 pb-6">
              {navItems.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href}
                  className="text-slate-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-slate-800">
                <Button 
                  variant="outline" 
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full"
                >
                  Connect
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
} 