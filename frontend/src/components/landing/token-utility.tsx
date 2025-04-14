"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Coins, Vote, Shield, BarChart3, Building } from "lucide-react"

export function TokenUtility() {
  const tokenUses = [
    {
      title: "Governance",
      description: "Vote on protocol changes, parameter updates, and treasury allocations",
      icon: Vote,
    },
    {
      title: "Staking",
      description: "Secure the network and earn rewards by staking DUANA tokens",
      icon: Shield,
    },
    {
      title: "Fee Payment",
      description: "Pay for transaction fees and service costs within the ecosystem",
      icon: Coins,
    },
    {
      title: "Liquidity Provision",
      description: "Provide liquidity for synthetic derivative markets",
      icon: BarChart3,
    },
    {
      title: "DAO Membership",
      description: "Hold tokens to participate in dispute resolution and ecosystem governance",
      icon: Building,
    },
  ]

  return (
    <section id="token" className="w-full py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight">DUANA Tokenomics</h2>
          <p className="mt-4 text-slate-600 md:text-lg max-w-3xl mx-auto">
            The DUANA token powers the Aduana ecosystem, providing utility across governance, staking, and economic activities.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="bg-blue-600 text-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">Total Supply</h3>
            <p className="text-4xl font-bold mb-4">100,000,000</p>
            <p className="text-sm opacity-80">Fixed supply with no inflation</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-700 text-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">Initial Distribution</h3>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span>Community</span>
                <span className="font-semibold">40%</span>
              </div>
              <div className="flex justify-between">
                <span>Development</span>
                <span className="font-semibold">25%</span>
              </div>
              <div className="flex justify-between">
                <span>Treasury</span>
                <span className="font-semibold">20%</span>
              </div>
              <div className="flex justify-between">
                <span>Team & Advisors</span>
                <span className="font-semibold">15%</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-blue-800 text-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">Token Mechanisms</h3>
            <div className="space-y-3 mt-4">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-blue-300 mr-2"></div>
                <span>Staking rewards</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-blue-300 mr-2"></div>
                <span>Fee burning</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-blue-300 mr-2"></div>
                <span>Governance weight</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-blue-300 mr-2"></div>
                <span>Liquidity incentives</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <h3 className="text-2xl font-bold text-center mb-10">Token Utility</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokenUses.map((use, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                      {React.createElement(use.icon, { size: 24 })}
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{use.title}</h4>
                    <p className="text-slate-600 text-sm">{use.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View Tokenomics Whitepaper
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 