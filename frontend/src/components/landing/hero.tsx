"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { WaveAnimation } from "../three/WaveAnimation"
import { useEffect, useState } from "react"

// Stock data - moved from Three.js component to here
const STOCK_DATA = [
  { symbol: 'DUANA', price: '+12.4%' },
  { symbol: 'TRADE', price: '+8.7%' },
  { symbol: 'VERIFY', price: '+9.1%' },
  { symbol: 'GLOBAL', price: '+5.6%' },
  { symbol: 'TOKEN', price: '+3.9%' },
  { symbol: 'TARIFF', price: '-2.3%' },
  { symbol: 'CHAIN', price: '+6.2%' },
  { symbol: 'INDEX', price: '+10.5%' },
]

export function Hero() {
  // State to track which stock prices are visible
  const [visibleStocks, setVisibleStocks] = useState<number[]>([]);

  // Effect to animate stock prices
  useEffect(() => {
    // Initial visibility - show some stocks immediately
    setVisibleStocks([0, 3, 6]);
    
    // Cycle through stocks with staggered timing
    const intervalIds: NodeJS.Timeout[] = [];
    
    STOCK_DATA.forEach((_, index) => {
      // Create a cycling visibility for each stock
      const interval = setInterval(() => {
        setVisibleStocks(prev => {
          // If stock is visible, remove it, otherwise add it
          if (prev.includes(index)) {
            return prev.filter(i => i !== index);
          } else {
            return [...prev, index];
          }
        });
      }, 3000 + index * 500); // Staggered timing
      
      intervalIds.push(interval);
    });
    
    // Cleanup intervals on unmount
    return () => {
      intervalIds.forEach(id => clearInterval(id));
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-24 md:pt-28">
      {/* ThreeJS Animation Background - waves only */}
      <div className="absolute inset-0 z-5">
        <WaveAnimation />
      </div>
      
      {/* Stock price overlay - positioned above the waves */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {STOCK_DATA.map((data, index) => {
          // Calculate position for each stock price
          const angle = (index / STOCK_DATA.length) * Math.PI * 2;
          const radius = 30; // Percentage of container
          const left = 50 + Math.cos(angle) * radius; // Center + radius * cos(angle)
          const top = 50 + Math.sin(angle) * radius; // Center + radius * sin(angle)
          
          // Determine text color
          const color = data.price.startsWith('+') ? '#00FF00' : '#FF0000';
          
          return (
            <motion.div
              key={data.symbol}
              className="absolute font-bold text-2xl md:text-3xl text-center"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: 'translate(-50%, -50%)',
                textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,1)',
                color,
                opacity: visibleStocks.includes(index) ? 1 : 0,
              }}
              animate={{
                y: [0, 5, 0], // Subtle floating animation
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {`${data.symbol}: ${data.price}`}
            </motion.div>
          );
        })}
      </div>
      
      {/* Semi-transparent gradient overlay - very low opacity to show more of the animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 to-slate-900/40 z-10"></div>
      
      {/* Background gradients at the bottom layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-slate-900/60" />
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Content with highest z-index */}
      <div className="container relative z-20 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto backdrop-blur-sm bg-slate-900/40 p-8 rounded-2xl border border-slate-700/50"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Transforming International Trade Through Blockchain
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Our decentralized platform mitigates trade tariffs through verifiable origin proofs, equity pools, and innovative financial instruments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/documents/aduana_whitepaper.pdf" target="_blank">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto">
                Download Whitepaper
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="bg-slate-700/80 border-blue-400 text-blue-300 hover:bg-slate-600/80 hover:text-blue-200 text-lg px-8 py-6 h-auto backdrop-blur-sm">
                Explore Documentation
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Animated down arrow */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-8 h-8 border-b-2 border-r-2 border-blue-400 transform rotate-45"></div>
        </motion.div>
      </div>
    </section>
  )
} 