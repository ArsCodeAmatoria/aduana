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
    <section id="zkproofs" className="w-full py-20 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
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
              <div key={index} className="flex flex-col items-center text-center z-10 relative bg-white p-2 w-full md:w-[22%]">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                  className="h-16 w-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4"
                >
                  {React.createElement(step.icon, { size: 24 })}
                </motion.div>
                <h3 className="font-medium text-lg">{step.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{step.description}</p>
              </div>
            ))}
            
            {/* Connection lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 -mt-8 z-0" />
            
            {[0, 1, 2].map((index) => (
              <div key={index} className="hidden md:flex absolute items-center justify-center" style={{ left: `${(index + 1) * 25 - 12.5}%`, top: '20%' }}>
                <ArrowRight className="text-blue-400" size={20} />
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-slate-50 p-6 rounded-lg"
        >
          <h3 className="font-semibold text-xl mb-4">Key Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4">
              <h4 className="font-medium">Privacy Preservation</h4>
              <p className="text-slate-600 text-sm mt-1">
                Keep manufacturing processes and supply chain details confidential
              </p>
            </div>
            <div className="p-4">
              <h4 className="font-medium">Regulatory Compliance</h4>
              <p className="text-slate-600 text-sm mt-1">
                Meet customs requirements without excessive documentation
              </p>
            </div>
            <div className="p-4">
              <h4 className="font-medium">Fraud Reduction</h4>
              <p className="text-slate-600 text-sm mt-1">
                Cryptographic proofs prevent origin falsification
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 