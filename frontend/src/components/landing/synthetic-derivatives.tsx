"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, ShieldAlert, Repeat, Scale } from "lucide-react"

export function SyntheticDerivatives() {
  const derivativeTypes = [
    {
      title: "Tariff Rate Futures",
      description: "Hedge against future tariff rate increases by locking in current rates",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Regulatory Risk Swaps",
      description: "Exchange exposure to regulatory changes with other traders across regions",
      icon: ShieldAlert,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Origin Verification Insurance",
      description: "Protection against origin certificate disputes or verification failures",
      icon: Repeat,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Trade Dispute Coverage",
      description: "Financial protection against trade disputes and resolution costs",
      icon: Scale,
      color: "bg-orange-100 text-orange-700",
    },
  ]

  return (
    <section id="derivatives" className="w-full py-20 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight">Synthetic Derivatives</h2>
          <p className="mt-4 text-slate-600 md:text-lg max-w-3xl mx-auto">
            Financial instruments that allow traders to hedge against tariff risks and regulatory changes, similar to traditional derivatives markets.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {derivativeTypes.map((derivative, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="overflow-hidden border-0 shadow-md">
                <div className={`h-2 w-full ${derivative.color.split(" ")[0]}`} />
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${derivative.color}`}>
                      {React.createElement(derivative.icon, { size: 20 })}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{derivative.title}</h3>
                      <p className="text-slate-600">{derivative.description}</p>
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
          className="bg-slate-50 p-8 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Tariff Hedging Logic</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded shadow-sm">
              <h4 className="font-medium mb-2">Identify Risk</h4>
              <p className="text-sm text-slate-600">Traders identify specific tariff or regulatory risks that impact their business</p>
            </div>
            <div className="bg-white p-5 rounded shadow-sm">
              <h4 className="font-medium mb-2">Select Instrument</h4>
              <p className="text-sm text-slate-600">Choose the appropriate synthetic derivative to hedge against the identified risk</p>
            </div>
            <div className="bg-white p-5 rounded shadow-sm">
              <h4 className="font-medium mb-2">Execution & Settlement</h4>
              <p className="text-sm text-slate-600">Smart contracts automate execution and settlement based on predefined conditions</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-md">
            <p className="text-sm text-blue-700">
              <strong>Example:</strong> An importer facing a potential 15% tariff increase on electronics from Country X can purchase a tariff rate future that locks in the current 5% rate, protecting against the financial impact of the increase.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 