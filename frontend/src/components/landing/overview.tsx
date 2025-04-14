"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Overview() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
      }
    })
  }

  return (
    <section id="overview" className="w-full py-20 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={fadeIn} 
            custom={0} 
            className="text-3xl font-bold tracking-tight"
          >
            Overview
          </motion.h2>
          <motion.p 
            variants={fadeIn} 
            custom={1} 
            className="mt-4 text-slate-600 md:text-lg max-w-3xl mx-auto"
          >
            Aduana creates a decentralized ecosystem for international trade compliance, leveraging Kusama, Proof of Personhood (POP), and Substrate technology.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            variants={fadeIn} 
            custom={2} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Kusama Parachain</CardTitle>
                <CardDescription>Built on Kusama's secure network</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Aduana utilizes Kusama's infrastructure for fast finality, interoperability, and shared security, enabling efficient cross-border trade verification.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            variants={fadeIn} 
            custom={3} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card>
              <CardHeader>
                <CardTitle>POP Integration</CardTitle>
                <CardDescription>Proof of Personhood for identity</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Aduana integrates with the Proof of Personhood protocol to validate trader identities while maintaining privacy through zero-knowledge proofs.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            variants={fadeIn} 
            custom={4} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Substrate Framework</CardTitle>
                <CardDescription>Flexible blockchain architecture</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our custom Substrate pallets provide specialized functionality for origin verification, tariff logic, insurance pools, and synthetic market derivatives.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 