"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Lock, CheckCircle, FileCheck } from "lucide-react"

export function ZkOriginProofs() {
  const flowSteps = [
    {
      title: "Collect Credentials",
      description: "Exporters gather origin documentation",
      icon: FileCheck,
    },
    {
      title: "Generate ZK Proof",
      description: "Create proof without revealing sensitive data",
      icon: Lock,
    },
    {
      title: "Submit to Blockchain",
      description: "Record on Aduana network",
      icon: Shield,
    },
    {
      title: "Verify Origin",
      description: "Importers and customs validate",
      icon: CheckCircle,
    },
  ]

  return (
    <section id="zkproofs" className="w-full py-24 bg-slate-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <p className="text-blue-300 font-medium text-sm">Innovative Technology</p>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Zero-Knowledge Origin Proofs</h2>
          
          <p className="text-slate-300 md:text-lg max-w-3xl mx-auto">
            Our revolutionary zero-knowledge protocol enables secure verification of product origins while preserving confidentiality of critical supply chain data, creating trust in international trade without compromising competitive advantages.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
            {flowSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center z-10 relative bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-white/5 w-full md:w-[22%] hover:border-blue-500/30 transition-all duration-300">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                  className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4"
                >
                  {React.createElement(step.icon, { size: 24, className: "text-white" })}
                </motion.div>
                <h3 className="font-medium text-lg text-white">{step.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{step.description}</p>
                
                {index < flowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                    <ArrowRight className="text-blue-400" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile arrow indicators */}
          <div className="flex md:hidden flex-col items-center my-2">
            {[...Array(3)].map((_, i) => (
              <ArrowRight key={i} className="text-blue-400 my-2 rotate-90" size={20} />
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold text-center text-white mb-8">Key Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300">
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="ml-3 font-medium text-lg text-white">Privacy Preservation</h4>
                </div>
                <p className="text-slate-400">Keep manufacturing processes and supply chain details confidential</p>
              </div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300">
              <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="ml-3 font-medium text-lg text-white">Regulatory Compliance</h4>
                </div>
                <p className="text-slate-400">Meet customs requirements without excessive documentation</p>
              </div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300">
              <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 to-blue-500"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="ml-3 font-medium text-lg text-white">Fraud Reduction</h4>
                </div>
                <p className="text-slate-400">Cryptographic proofs prevent origin falsification</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 