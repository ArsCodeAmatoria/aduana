"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Fingerprint, BoxIcon, GlobeIcon } from "lucide-react"

export function Overview() {
  const features = [
    {
      title: "Kusama Parachain",
      description: "Built on Kusama's secure network for fast finality, interoperability, and shared security",
      icon: GlobeIcon,
      color: "bg-indigo-500"
    },
    {
      title: "POP Integration",
      description: "Integrates with Proof of Personhood protocol to validate trader identities while maintaining privacy",
      icon: Fingerprint,
      color: "bg-blue-500"
    },
    {
      title: "Substrate Framework",
      description: "Custom pallets for origin verification, tariff logic, insurance pools, and market derivatives",
      icon: BoxIcon,
      color: "bg-teal-500"
    }
  ]

  return (
    <section id="overview" className="w-full py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-3xl" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="inline-block mb-3 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <span className="text-blue-300 font-medium text-sm">Platform Overview</span>
          </motion.div>
          
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
            }}
            className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
          >
            The Aduana Ecosystem
          </motion.h2>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
            className="text-slate-300 md:text-lg max-w-3xl mx-auto"
          >
            Aduana creates a decentralized ecosystem for international trade compliance, leveraging blockchain technology, cryptographic proofs, and financial instruments.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.5, delay: 0.1 * index + 0.3 } 
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-colors duration-300 h-full">
                <div className={`h-1.5 w-full ${feature.color}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center`}>
                      {<feature.icon className="h-5 w-5 text-white" />}
                    </div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    {feature.description}
                  </p>
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
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors">
            <Shield className="h-5 w-5 text-blue-300 mr-2" />
            <span className="text-blue-200">Built with security and scalability in mind</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 