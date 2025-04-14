"use client"

import React from "react"
import { motion } from "framer-motion"
import { BarChart3, Users, ShieldCheck, DollarSign, LineChart } from "lucide-react"
import Link from "next/link"

export function TokenUtility() {
  return (
    <section id="tokenUtility" className="w-full py-24 bg-slate-900 text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">DUANA Token Utility</h2>
          <p className="text-slate-300 md:text-lg">
            The DUANA token powers the entire Aduana ecosystem, providing governance rights, staking benefits, and economic incentives.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-800 p-6 rounded-lg flex flex-col items-center text-center"
          >
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Governance</h3>
            <p className="text-sm text-slate-300">
              Propose and vote on protocol improvements, tariff models, and risk parameters.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800 p-6 rounded-lg flex flex-col items-center text-center"
          >
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Security</h3>
            <p className="text-sm text-slate-300">
              Stake tokens to secure the network and earn rewards for honest participation.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-slate-800 p-6 rounded-lg flex flex-col items-center text-center"
          >
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
              <DollarSign size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fee Payment</h3>
            <p className="text-sm text-slate-300">
              Pay for verification services, insurance premiums, and transaction fees.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800 p-6 rounded-lg flex flex-col items-center text-center"
          >
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
              <LineChart size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Market Liquidity</h3>
            <p className="text-sm text-slate-300">
              Provide liquidity for tariff derivatives markets and earn trading fees.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-slate-800 p-6 rounded-lg flex flex-col items-center text-center"
          >
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">DAO Membership</h3>
            <p className="text-sm text-slate-300">
              Access specialized services and insurance benefits for token holders.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-900 to-slate-800 rounded-xl overflow-hidden shadow-xl mb-16"
        >
          <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Tokenomics</h3>
              <p className="text-slate-300 mb-6">
                Our token distribution model is designed to incentivize long-term participation and ensure the sustainability of the ecosystem.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start">
                  <span className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                  <span><strong className="text-white">30%</strong> - Community Treasury</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                  <span><strong className="text-white">20%</strong> - Initial Development</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                  <span><strong className="text-white">15%</strong> - Early Adopters</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                  <span><strong className="text-white">15%</strong> - Ecosystem Growth</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                  <span><strong className="text-white">10%</strong> - Staking Rewards</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                  <span><strong className="text-white">10%</strong> - Insurance Reserve</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/documents/aduana_whitepaper.pdf#page=9" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center">
                  View Tokenomics Whitepaper
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-1 w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="bg-slate-700 p-4 rounded">
                <div className="h-72 md:h-80 w-full rounded-md bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="h-[30%] bg-blue-600 opacity-80"></div>
                    <div className="h-[20%] bg-blue-500 opacity-80"></div>
                    <div className="h-[15%] bg-blue-400 opacity-80"></div>
                    <div className="h-[15%] bg-blue-300 opacity-80"></div>
                    <div className="h-[10%] bg-slate-400 opacity-80"></div>
                    <div className="h-[10%] bg-slate-500 opacity-80"></div>
                  </div>
                  <div className="relative z-10 text-center px-4">
                    <div className="font-bold text-3xl mb-2">DUANA</div>
                    <div className="text-sm text-slate-300">Total Supply: 100,000,000 DUANA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 