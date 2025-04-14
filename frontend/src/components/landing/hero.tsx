"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { GlobeIcon, PackageIcon, CreditCardIcon, GaugeIcon, ArrowDownIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-24 md:pt-28">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-slate-900/90 z-10" />
        <div className="absolute inset-0 bg-[url('/images/world-trade-bg.jpg')] bg-cover bg-center opacity-40" />
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-[1] opacity-10">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-block mb-6 px-6 py-2 border border-blue-400/30 rounded-full backdrop-blur-sm bg-blue-500/10">
            <p className="text-blue-300 font-medium">Revolutionizing International Trade</p>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight">
            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Cross-Border</span> Trade Compliance
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Aduana mitigates international trade tariffs through decentralized origin verification, equity pools, and synthetic derivatives on a secure blockchain platform.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Link href="/documents/aduana_whitepaper.pdf" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto">
              Download Whitepaper
            </Button>
          </Link>
          <Link href="/docs">
            <Button size="lg" variant="outline" className="border-blue-400/50 text-white hover:bg-blue-500/20 text-lg px-8 py-6 h-auto backdrop-blur-sm border-2">
              Explore Documentation
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center space-y-3 p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-full bg-blue-600/80">
              <GlobeIcon className="h-6 w-6" />
            </div>
            <span className="text-white font-medium">Global Trade</span>
          </div>
          <div className="flex flex-col items-center space-y-3 p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-full bg-blue-600/80">
              <PackageIcon className="h-6 w-6" />
            </div>
            <span className="text-white font-medium">Customs Verification</span>
          </div>
          <div className="flex flex-col items-center space-y-3 p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-full bg-blue-600/80">
              <CreditCardIcon className="h-6 w-6" />
            </div>
            <span className="text-white font-medium">Tariff Optimization</span>
          </div>
          <div className="flex flex-col items-center space-y-3 p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-full bg-blue-600/80">
              <GaugeIcon className="h-6 w-6" />
            </div>
            <span className="text-white font-medium">DAO Governance</span>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-blue-300 text-sm mb-2">Explore More</span>
            <ArrowDownIcon className="h-5 w-5 text-blue-300" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-1/4 right-[5%] w-64 h-64 rounded-full bg-blue-500/20 blur-3xl z-0"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-1/4 left-[10%] w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl z-0"
      />
    </section>
  )
} 