"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full py-12 bg-slate-950 text-slate-300">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Aduana</h3>
            <p className="text-sm text-slate-400">
              Revolutionizing international trade compliance through decentralized technology.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">ZK Origin Proofs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Equity Pools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">DAO Insurance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Synthetic Derivatives</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><Link href="/documents/aduana_whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Whitepaper</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Developer Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 mb-4 md:mb-0">
            © 2025 Aduana. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>

        <div className="flex items-center justify-center mt-6 pt-6 border-t border-slate-800">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Aduana Protocol. All rights reserved. 
            Built by <a href="https://github.com/arscodex" className="text-gray-400 hover:text-white transition-colors">Ars Code Amatoria</a> | <a href="https://arscodex.dev" className="text-gray-400 hover:text-white transition-colors">arscodex.dev</a>
          </p>
        </div>
      </div>
    </footer>
  )
} 