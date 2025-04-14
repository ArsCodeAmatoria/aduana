"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CoinsIcon, LineChart, BarChart3, PieChart } from "lucide-react"
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Pie, Line, Bar } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export function DaoInsurance() {
  // Pie chart data for insurance pool allocations
  const pieData = {
    labels: ["Trade Disputes", "Tariff Volatility", "Regulatory Changes", "Emergency Reserve"],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",  // blue-500
          "rgba(99, 102, 241, 0.8)",  // indigo-500
          "rgba(139, 92, 246, 0.8)",  // purple-500
          "rgba(14, 165, 233, 0.8)",  // sky-500
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(99, 102, 241, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(14, 165, 233, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  // Line chart data for tariff savings over time
  const lineData = {
    labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
    datasets: [
      {
        label: "Traditional Tariffs",
        data: [10, 12, 15, 14, 16, 19],
        borderColor: "rgba(239, 68, 68, 1)",  // red-500
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.4,
      },
      {
        label: "With Aduana Pools",
        data: [10, 9, 8, 7, 6, 5],
        borderColor: "rgba(59, 130, 246, 1)",  // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
    ],
  }

  // Bar chart data for DAO dispute resolution results
  const barData = {
    labels: ["Resolved", "Ruled for Exporter", "Ruled for Importer", "Escalated"],
    datasets: [
      {
        label: "2023",
        data: [65, 15, 12, 8],
        backgroundColor: "rgba(99, 102, 241, 0.8)",  // indigo-500
      },
      {
        label: "2024",
        data: [75, 10, 9, 6],
        backgroundColor: "rgba(59, 130, 246, 0.8)",  // blue-500
      },
    ],
  }

  // Chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: "Insurance Pool Allocations",
        color: "rgba(255, 255, 255, 0.8)",
        font: {
          size: 14,
          weight: "normal" as const
        }
      },
    },
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: "Tariff Costs Over Time (% of Shipment Value)",
        color: "rgba(255, 255, 255, 0.8)",
        font: {
          size: 14,
          weight: "normal" as const
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)"
        }
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)"
        }
      }
    },
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: "DAO Dispute Resolution Results (%)",
        color: "rgba(255, 255, 255, 0.8)",
        font: {
          size: 14,
          weight: "normal" as const
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)"
        }
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)"
        }
      }
    },
  }

  return (
    <section id="insurance" className="w-full py-24 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-1/4 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-3xl" />
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
            <p className="text-blue-300 font-medium text-sm">Risk Management</p>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">DAO Insurance & Pools</h2>
          
          <p className="text-slate-300 md:text-lg max-w-3xl mx-auto">
            Our decentralized insurance system and equity pools distribute risk and reduce costs across the network through collective risk-sharing.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="transition-transform duration-300"
          >
            <Card className="h-full bg-slate-800/50 border-white/5 backdrop-blur-sm overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <CardHeader className="border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600">
                    <PieChart className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-white">Insurance Pool Model</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6 text-slate-300">
                  The Aduana insurance pool protects traders against unexpected tariff changes, regulatory actions, and trade disputes through a collective risk-sharing model.
                </p>
                <div className="h-[300px] flex items-center justify-center p-4 bg-slate-900/50 rounded-lg">
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="transition-transform duration-300"
          >
            <Card className="h-full bg-slate-800/50 border-white/5 backdrop-blur-sm overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              <CardHeader className="border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
                    <LineChart className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-white">Tariff Savings Projection</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6 text-slate-300">
                  By joining Aduana equity pools, traders can achieve significant savings on tariff costs over time through optimized compliance and collective bargaining.
                </p>
                <div className="h-[300px] flex items-center justify-center p-4 bg-slate-900/50 rounded-lg">
                  <Line data={lineData} options={lineOptions} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ y: -5 }}
          className="w-full transition-transform duration-300"
        >
          <Card className="bg-slate-800/50 border-white/5 backdrop-blur-sm overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-sky-500"></div>
            <CardHeader className="border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-sky-500">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-white">DAO Dispute Resolution</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-6 text-slate-300">
                The Aduana DAO provides efficient dispute resolution through decentralized governance, with most cases resolved quickly and fairly through the community-driven process.
              </p>
              <div className="h-[300px] flex items-center justify-center p-4 bg-slate-900/50 rounded-lg">
                <Bar data={barData} options={barOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors">
            <CoinsIcon className="h-5 w-5 text-blue-300 mr-2" />
            <span className="text-blue-200">Backed by a secure and transparent risk assessment model</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 