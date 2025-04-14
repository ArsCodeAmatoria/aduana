"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, GitMerge } from "lucide-react"
import Link from "next/link"

export function CallToAction() {
  return (
    <section className="w-full py-24 bg-slate-900 text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight">Join the Aduana Revolution</h2>
          <p className="mt-4 text-slate-300 md:text-lg">
            Be part of the future of international trade compliance through decentralized technology.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800 p-8 rounded-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-blue-500 flex items-center justify-center mb-6">
                <Download size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Download Whitepaper</h3>
              <p className="text-slate-300 mb-6">
                Get the comprehensive technical overview of Aduana's architecture, token economics, and roadmap.
              </p>
              <Link href="/documents/aduana_whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  Download PDF
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800 p-8 rounded-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-blue-500 flex items-center justify-center mb-6">
                <GitMerge size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Join Developer Waitlist</h3>
              <p className="text-slate-300 mb-6">
                Get early access to our developer tools, testnet, and technical support.
              </p>
              <div className="space-y-4 w-full">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  Join Waitlist
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-slate-700 text-center"
        >
          <p className="text-slate-400 mb-4">
            Connect with us across platforms
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg" 
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .175c-6.27 0-11.507 4.667-12 10.707 2.75-3.971 5.697-5.215 8.845-3.73 1.795.849 3.085 3.26 4.37 4.191 2.314 1.634 5.018 2.13 8.785-3.488.79 5.209-3.275 12.32-10 12.32-4.854 0-10-3.891-10-9.375 0-6.208 4.828-10.625 10-10.625zm-.36 2c-4.753 0-7.954 4.577-6.476 9.201 2.018-2.883 4.182-3.79 6.476-2.714 1.315.617 2.258 2.368 3.2 3.043 1.691 1.186 3.664 1.528 6.4-2.518.577 3.734-2.385 8.814-7.302 8.814-3.573 0-7.238-2.863-7.238-6.853 0-4.557 3.497-7.787 7.238-7.787-.929 0-1.782.22-2.298.603z"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 