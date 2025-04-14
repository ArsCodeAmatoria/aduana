"use client"

import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Stock price data that will fade in and out
const STOCK_DATA = [
  { symbol: 'DUANA', price: '+12.4%' },
  { symbol: 'TRADE', price: '+8.7%' },
  { symbol: 'TARRIF', price: '-2.3%' },
  { symbol: 'ORIGIN', price: '+15.2%' },
  { symbol: 'VERIFY', price: '+9.1%' },
  { symbol: 'GLOBAL', price: '+5.6%' },
  { symbol: 'SECURE', price: '+11.8%' },
  { symbol: 'CHAIN', price: '+7.3%' },
  { symbol: 'TOKEN', price: '+3.9%' },
  { symbol: 'POOL', price: '+6.2%' },
]

interface WaveProps {
  position: [number, number, number];
  color: string;
  speed: number;
  amplitude: number;
  frequency: number;
}

// Wave component that animates based on time
function Wave({ position, color, speed, amplitude, frequency }: WaveProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const geometry = useRef<THREE.BufferGeometry>(null)
  
  // Create points for the wave
  const points = useMemo(() => {
    const points = []
    for (let i = 0; i <= 50; i++) {
      points.push(new THREE.Vector3((i - 25) * 2, 0, 0))
    }
    return points
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    // Update each point in the wave
    if (geometry.current) {
      const positions = geometry.current.attributes.position.array as Float32Array
      
      for (let i = 0; i <= 50; i++) {
        const y = Math.sin(i / frequency + time * speed) * amplitude
        positions[i * 3 + 1] = y
      }
      
      geometry.current.attributes.position.needsUpdate = true
    }
  })

  return (
    <group position={position}>
      <line>
        <bufferGeometry ref={geometry}>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.length * 3)}
            itemSize={3}
            args={[new Float32Array(points.length * 3), 3]}
            onUpdate={self => {
              const positions = self.array
              points.forEach((point, i) => {
                positions[i * 3] = point.x
                positions[i * 3 + 1] = point.y
                positions[i * 3 + 2] = point.z
              })
            }}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} linewidth={2} opacity={0.7} transparent />
      </line>
    </group>
  )
}

interface StockPriceProps {
  position: [number, number, number];
  data: { symbol: string; price: string };
  index: number;
  delay: number;
}

// Stock price text that fades in and out
function StockPrice({ position, data, index, delay }: StockPriceProps) {
  const text = useRef<any>(null)
  const startTime = useRef<number>(0)
  const visible = useRef<boolean>(false)
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    // Initialize start time on first visibility
    if (!visible.current && time > delay) {
      startTime.current = time
      visible.current = true
    }
    
    // Calculate opacity based on time passed since becoming visible
    if (visible.current) {
      const elapsed = time - startTime.current
      let opacity = 0
      
      // Fade in for 1 second, stay visible for 3 seconds, fade out for 1 second
      if (elapsed < 1) {
        opacity = elapsed // Fade in
      } else if (elapsed < 4) {
        opacity = 1 // Stay visible
      } else if (elapsed < 5) {
        opacity = 1 - (elapsed - 4) // Fade out
      } else {
        // Reset for next cycle with random delay
        visible.current = false
        startTime.current = 0
      }
      
      if (text.current && text.current.material) {
        text.current.material.opacity = opacity
      }
    }
  })
  
  const { symbol, price } = data
  const color = price.startsWith('+') ? '#4CAF50' : '#F44336'
  
  return (
    <group position={position}>
      <Text 
        ref={text} 
        position={[0, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-transparent={true}
      >
        {`${symbol}: ${price}`}
      </Text>
    </group>
  )
}

// Main scene component
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <ambientLight intensity={0.5} />
      
      {/* Three waves at different heights, speeds, and colors */}
      <Wave 
        position={[0, 3, 0]} 
        color="#3b82f6" 
        speed={0.5} 
        amplitude={0.8} 
        frequency={8}
      />
      <Wave 
        position={[0, 0, -2]} 
        color="#6366f1" 
        speed={0.7} 
        amplitude={1.2} 
        frequency={12}
      />
      <Wave 
        position={[0, -3, -4]} 
        color="#8b5cf6" 
        speed={0.3} 
        amplitude={1.5} 
        frequency={10}
      />
      
      {/* Stock prices that fade in and out at random positions */}
      {STOCK_DATA.map((data, index) => {
        // Random positions spread across the scene
        const x = (Math.random() - 0.5) * 20
        const y = (Math.random() - 0.5) * 8
        const z = Math.random() * -3
        
        // Different delay for each stock price
        const delay = index * 1.5
        
        return (
          <StockPrice 
            key={data.symbol}
            position={[x, y, z]}
            data={data}
            index={index}
            delay={delay}
          />
        )
      })}
    </>
  )
}

// Main export component
export function WaveAnimation() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={[1, 2]} style={{ background: 'transparent' }}>
        <Scene />
      </Canvas>
    </div>
  )
} 