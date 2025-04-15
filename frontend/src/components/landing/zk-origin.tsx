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
                      <div className="w-full h-full flex flex-col">
                        <div className="flex flex-col space-y-5 h-full">
                          {/* Modern ZK Proof Process Visualization */}
                          <div className="flex items-center space-x-3 mb-1">
                            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-lg">
                              <FileCheck className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="text-white text-sm font-medium">ZK Origin Verification Flow</h4>
                          </div>
                          
                          {/* Interactive connection lines using gradient */}
                          <div className="relative flex-1 grid grid-cols-2 gap-3">
                            {/* Left side - Source Data */}
                            <div className="bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg border border-slate-700/50 flex flex-col relative">
                              <h5 className="text-xs font-medium text-blue-300 mb-2">Exporter's Private Data</h5>
                              
                              <div className="space-y-2 text-left flex-1">
                                <div className="bg-slate-700/80 p-2 rounded text-[11px] font-mono flex justify-between">
                                  <span className="text-indigo-300">Country:</span>
                                  <span className="text-emerald-300">Japan</span>
                                </div>
                                <div className="bg-slate-700/80 p-2 rounded text-[11px] font-mono flex justify-between">
                                  <span className="text-indigo-300">Manufacturer:</span>
                                  <span className="text-emerald-300">Kyoto Tech Ltd</span>
                                </div>
                                <div className="bg-slate-700/80 p-2 rounded text-[11px] font-mono flex justify-between">
                                  <span className="text-indigo-300">Materials:</span>
                                  <span className="text-emerald-300">[Complex Data]</span>
                                </div>
                              </div>
                              
                              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                                <div className="h-7 w-7 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg">
                                  <Lock className="h-3 w-3 text-white" />
                                </div>
                              </div>
                              
                              {/* Animated connection line */}
                              <motion.div 
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 h-0.5 w-6 bg-gradient-to-r from-indigo-500 to-transparent"
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                              />
                            </div>
                            
                            {/* Right side - Public Verification */}
                            <div className="bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg border border-slate-700/50 flex flex-col">
                              <h5 className="text-xs font-medium text-teal-300 mb-2">Public Verification</h5>
                              
                              <div className="relative bg-slate-900 border border-slate-700 rounded p-3 flex-1 flex flex-col justify-between">
                                <div className="flex items-center text-[11px] font-mono">
                                  <span className="mr-1 text-slate-500">ZK-Proof:</span>
                                  <span className="text-purple-300 animate-pulse">vk28f3..</span>
                                </div>
                                
                                <div className="flex justify-between items-center mt-auto">
                                  <div className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-[10px] flex items-center">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    VERIFIED
                                  </div>
                                  <div className="text-[10px] text-slate-400">
                                    Origin: Japan
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Animated cryptographic processing indicator */}
                            <motion.div 
                              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-70"
                              animate={{ 
                                opacity: [0.4, 0.8, 0.4],
                                scale: [0.8, 1.1, 0.8],
                                rotate: [0, 180, 360]
                              }}
                              transition={{ 
                                duration: 4, 
                                repeat: Infinity,
                                repeatType: "loop" 
                              }}
                            >
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                            </motion.div>
                          </div>
                          
                          <div className="text-xs text-center text-slate-400 mt-auto">
                            <span className="text-blue-300 font-medium">Zero-knowledge cryptography</span> ensures only verification results are shared
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