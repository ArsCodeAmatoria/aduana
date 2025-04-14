"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { GlobeIcon, PackageIcon, CreditCardIcon, GaugeIcon } from "lucide-react"

export function Hero() {
  return (
    <section className="w-full pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Revolutionizing Trade Compliance with Web3
          </h1>
          <p className="max-w-[800px] text-slate-300 md:text-xl/relaxed lg:text-2xl/relaxed mx-auto">
            Mitigating international trade tariffs through decentralized origin verification, equity pools, insurance models, and synthetic tariff derivatives.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Download Whitepaper
          </Button>
          <Button size="lg" variant="outline" className="border-slate-400 text-white hover:bg-slate-700">
            Join Developer Waitlist
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-blue-600">
              <GlobeIcon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">Global Trade</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-blue-600">
              <PackageIcon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">Customs Verification</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-blue-600">
              <CreditCardIcon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">Tariff Optimization</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-blue-600">
              <GaugeIcon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">DAO Governance</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 