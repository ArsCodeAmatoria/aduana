"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Lock, CheckCircle, FileCheck, Code, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

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

  const benefits = [
    {
      title: "Privacy Preservation",
      description: "Keep manufacturing processes and supply chain details confidential",
      icon: EyeOff,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Regulatory Compliance",
      description: "Meet customs requirements without excessive documentation",
      icon: CheckCircle,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Fraud Reduction",
      description: "Cryptographic proofs prevent origin falsification",
      icon: Shield,
      color: "from-teal-500 to-blue-500"
    }
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
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm rounded-2xl -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-white mb-4">How Zero-Knowledge Works</h3>
              <p className="text-slate-300 mb-6">
                Zero-knowledge proofs allow one party to prove to another that a statement is true, without revealing any information beyond the validity of the statement itself.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 mt-1 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Code size={14} className="text-blue-400" />
                  </div>
                  <p className="ml-3 text-slate-300">
                    <span className="text-white font-medium">Cryptographic verification</span> without revealing sensitive manufacturing data
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 mt-1 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Lock size={14} className="text-blue-400" />
                  </div>
                  <p className="ml-3 text-slate-300">
                    <span className="text-white font-medium">Mathematically proven</span> to be secure against tampering
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 mt-1 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <CheckCircle size={14} className="text-blue-400" />
                  </div>
                  <p className="ml-3 text-slate-300">
                    <span className="text-white font-medium">Regulatory compliant</span> while protecting trade secrets
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 overflow-hidden">
                <div className="bg-slate-900 rounded-xl p-6 relative">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {/* Clear, step-by-step ZK Proof Visualization */}
                      <div className="text-center w-full h-full flex flex-col">
                        {/* Step 1 */}
                        <div className="flex items-center mb-4 bg-slate-800/70 rounded-lg p-2">
                          <div className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mr-3">1</div>
                          <div className="text-left">
                            <p className="text-white text-xs font-medium">Exporter has sensitive origin data</p>
                            <div className="mt-1 bg-slate-700 p-1 rounded text-xs font-mono flex">
                              <span className="text-blue-300">Country</span>
                              <span className="text-slate-300 px-1">=</span>
                              <span className="text-green-300">"Japan"</span>
                              <span className="text-orange-300 ml-1">+ supply chain details</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Step 2 */}
                        <div className="flex items-center mb-4 bg-slate-800/70 rounded-lg p-2">
                          <div className="bg-indigo-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mr-3">2</div>
                          <div className="text-left">
                            <p className="text-white text-xs font-medium">Generate cryptographic proof</p>
                            <div className="bg-slate-700 p-1 rounded text-xs font-mono mt-1 relative overflow-hidden">
                              <motion.div
                                animate={{ x: [-20, 140] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-500/30 to-transparent"
                              />
                              <span className="text-purple-300">hash(data + salt) → zkp92fd...</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Step 3 */}
                        <div className="flex items-center bg-slate-800/70 rounded-lg p-2">
                          <div className="bg-teal-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mr-3">3</div>
                          <div className="text-left flex-1">
                            <p className="text-white text-xs font-medium">Share only verifiable proof</p>
                            <div className="bg-slate-900 p-1.5 rounded text-xs font-mono mt-1 border border-slate-700 flex justify-between items-center">
                              <span className="text-slate-300 flex items-center">
                                <span className="bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded mr-2 text-[10px]">VERIFIED</span>
                                <span>Origin: Japan</span>
                              </span>
                              <span className="text-slate-500 text-[10px]">
                                <Lock size={10} className="inline mr-1" /> Details hidden
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Result */}
                        <div className="mt-auto pt-4 flex items-center justify-center">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-0.5 rounded-lg">
                            <div className="bg-slate-800 rounded px-3 py-1.5 flex items-center">
                              <CheckCircle size={14} className="text-green-400 mr-2" />
                              <span className="text-white text-xs font-medium">Importer verifies origin without seeing sensitive data</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
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
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.8 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${benefit.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${benefit.color} flex items-center justify-center`}>
                      <benefit.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="ml-3 font-medium text-lg text-white">{benefit.title}</h4>
                  </div>
                  <p className="text-slate-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 