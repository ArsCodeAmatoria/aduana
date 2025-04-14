"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, ShieldAlert, Repeat, Scale, CandlestickChart, LineChart } from "lucide-react"

export function SyntheticDerivatives() {
  const derivativeTypes = [
    {
      title: "Tariff Rate Futures",
      description: "Hedge against future tariff rate increases by locking in current rates",
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-600",
      delay: 0.1,
    },
    {
      title: "Regulatory Risk Swaps",
      description: "Exchange exposure to regulatory changes with other traders across regions",
      icon: ShieldAlert,
      color: "from-indigo-500 to-purple-600",
      delay: 0.2,
    },
    {
      title: "Origin Verification Insurance",
      description: "Protection against origin certificate disputes or verification failures",
      icon: Repeat,
      color: "from-blue-500 to-sky-500",
      delay: 0.3,
    },
    {
      title: "Trade Dispute Coverage",
      description: "Financial protection against trade disputes and resolution costs",
      icon: Scale,
      color: "from-purple-500 to-pink-600",
      delay: 0.4,
    },
  ]

  return (
    <section id="derivatives" className="w-full py-24 bg-slate-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-600 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full blur-3xl" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <p className="text-blue-300 font-medium text-sm">Financial Instruments</p>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Synthetic Derivatives</h2>
          
          <p className="text-slate-300 md:text-lg max-w-3xl mx-auto">
            Financial instruments that allow traders to hedge against tariff risks and regulatory changes, creating a more stable and predictable trading environment.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {derivativeTypes.map((derivative, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: derivative.delay }}
              whileHover={{ y: -5 }}
              className="transition-transform duration-300"
            >
              <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm overflow-hidden h-full">
                <div className={`h-1.5 w-full bg-gradient-to-r ${derivative.color}`} />
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${derivative.color} flex items-center justify-center`}>
                      {React.createElement(derivative.icon, { size: 20, className: "text-white" })}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-white">{derivative.title}</h3>
                      <p className="text-slate-300">{derivative.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Tariff Hedging Logic</h3>
              <p className="text-slate-300 mb-6">
                Our derivatives platform uses smart contracts to provide automated execution and settlement based on real-world events and market conditions.
              </p>
            </div>
            <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <CandlestickChart size={40} className="text-white" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 border border-white/5 p-5 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <span className="text-indigo-400 font-semibold">1</span>
                </div>
                <h4 className="font-medium text-white">Identify Risk</h4>
              </div>
              <p className="text-sm text-slate-300">Traders identify specific tariff or regulatory risks that impact their business operations</p>
            </div>
            
            <div className="bg-slate-800/50 border border-white/5 p-5 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <span className="text-indigo-400 font-semibold">2</span>
                </div>
                <h4 className="font-medium text-white">Select Instrument</h4>
              </div>
              <p className="text-sm text-slate-300">Choose the appropriate synthetic derivative to hedge against the identified risk exposure</p>
            </div>
            
            <div className="bg-slate-800/50 border border-white/5 p-5 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <span className="text-indigo-400 font-semibold">3</span>
                </div>
                <h4 className="font-medium text-white">Execution & Settlement</h4>
              </div>
              <p className="text-sm text-slate-300">Smart contracts automate execution and settlement based on predefined conditions and oracle data</p>
            </div>
          </div>
          
          <div className="mt-8 p-5 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-400/20 rounded-lg backdrop-blur-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <LineChart size={20} className="text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-blue-200">
                  <strong>Example:</strong> An importer facing a potential 15% tariff increase on electronics from Country X can purchase a tariff rate future that locks in the current 5% rate, protecting against the financial impact of the increase.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 