"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { GlobeIcon, PackageIcon, CreditCardIcon, GaugeIcon, ArrowDownIcon } from "lucide-react"
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
      
      {/* Stock price overlay - positioned around hero content */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {STOCK_DATA.map((data, index) => {
          // Calculate position for each stock price - arrange only around content area
          const angle = (index / STOCK_DATA.length) * Math.PI * 2;
          
          // Determine position based on angle to avoid center area
          let radius = 42; // Larger radius to push further out
          let left = 50 + Math.cos(angle) * radius;
          let top = 50 + Math.sin(angle) * radius;
          
          // Adjust vertical positions to avoid center
          if (top > 30 && top < 70) {
            // If in middle vertical area, push further left/right
            radius = 48; // Even larger radius for middle items
            left = 50 + Math.cos(angle) * radius;
          }
          
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
      
      {/* Semi-transparent gradient overlay - slightly darker for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/50 z-10"></div>
      
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
          className="max-w-4xl"
        >
          <div className="inline-block mb-6 px-6 py-2 border border-blue-400/30 rounded-full backdrop-blur-sm bg-blue-500/10">
            <p className="text-blue-300 font-medium">Revolutionizing International Trade</p>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight">
            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Cross-Border</span> Trade Compliance
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Aduana mitigates international trade tariffs through decentralized origin verification, equity pools, and synthetic derivatives on a secure blockchain platform.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Link href="/documents/aduana_whitepaper.pdf" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto">
              Download Whitepaper
            </Button>
          </Link>
          <Link href="/docs">
            <Button size="lg" variant="outline" className="bg-slate-700/80 border-blue-400 text-blue-300 hover:bg-slate-600/80 hover:text-blue-200 text-lg px-8 py-6 h-auto backdrop-blur-sm">
              Explore Documentation
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center space-y-3 p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-full bg-blue-600/80">
              <GlobeIcon className="h-6 w-6" />
            </div>
            <span className="text-white font-medium">Global Trade</span>
          </div>
          <div className="flex flex-col items-center space-y-3 p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-full bg-blue-600/80">
              <PackageIcon className="h-6 w-6" />
            </div>
            <span className="text-white font-medium">Customs Verification</span>
          </div>
          <div className="flex flex-col items-center space-y-3 p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-full bg-blue-600/80">
              <CreditCardIcon className="h-6 w-6" />
            </div>
            <span className="text-white font-medium">Tariff Optimization</span>
          </div>
          <div className="flex flex-col items-center space-y-3 p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-full bg-blue-600/80">
              <GaugeIcon className="h-6 w-6" />
            </div>
            <span className="text-white font-medium">DAO Governance</span>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-blue-300 text-sm mb-2">Explore More</span>
            <ArrowDownIcon className="h-5 w-5 text-blue-300" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-1/4 right-[5%] w-64 h-64 rounded-full bg-blue-500/20 blur-3xl z-0"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-1/4 left-[10%] w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl z-0"
      />
    </section>
  )
} 