"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-24 md:pt-28">
      {/* Gradient background instead of images */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-slate-900 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Content with higher z-index */}
      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Transforming International Trade Through Blockchain
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Our decentralized platform mitigates trade tariffs through verifiable origin proofs, equity pools, and innovative financial instruments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/documents/aduana_whitepaper.pdf" target="_blank">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto">
                Download Whitepaper
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="bg-slate-700/80 border-blue-400 text-blue-300 hover:bg-slate-600/80 hover:text-blue-200 text-lg px-8 py-6 h-auto backdrop-blur-sm">
                Explore Documentation
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Animated down arrow */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-8 h-8 border-b-2 border-r-2 border-blue-400 transform rotate-45"></div>
        </motion.div>
      </div>
      
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>
    </section>
  )
} 