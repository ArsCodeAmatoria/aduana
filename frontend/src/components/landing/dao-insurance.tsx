"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
          "rgba(54, 162, 235, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "With Aduana Pools",
        data: [10, 9, 8, 7, 6, 5],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
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
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "2024",
        data: [75, 10, 9, 6],
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
    ],
  }

  // Chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Insurance Pool Allocations",
      },
    },
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Tariff Costs Over Time (% of Shipment Value)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "DAO Dispute Resolution Results (%)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <section id="insurance" className="w-full py-20 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight">DAO Insurance & Pools</h2>
          <p className="mt-4 text-slate-600 md:text-lg max-w-3xl mx-auto">
            Our decentralized insurance system and equity pools distribute risk and reduce costs across the network.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Insurance Pool Model</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-slate-600">
                  The Aduana insurance pool protects traders against unexpected tariff changes, regulatory actions, and trade disputes through a collective risk-sharing model.
                </p>
                <div className="h-[300px] flex items-center justify-center">
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
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Tariff Savings Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-slate-600">
                  By joining Aduana equity pools, traders can achieve significant savings on tariff costs over time through optimized compliance and collective bargaining.
                </p>
                <div className="h-[300px] flex items-center justify-center">
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
          className="w-full"
        >
          <Card>
            <CardHeader>
              <CardTitle>DAO Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-slate-600">
                The Aduana DAO provides efficient dispute resolution through decentralized governance, with most cases resolved quickly and fairly through the community-driven process.
              </p>
              <div className="h-[300px] flex items-center justify-center">
                <Bar data={barData} options={barOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
} 