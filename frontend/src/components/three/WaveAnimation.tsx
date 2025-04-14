"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Stock data - added more stocks for visibility
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

interface WaveProps {
  position: [number, number, number];
  color: string;
  speed: number;
  amplitude: number;
  frequency: number;
  thickness?: number;
}

interface StockPriceProps {
  position: [number, number, number];
  data: { symbol: string; price: string };
  index: number;
  delay: number;
}

// Wave component with increased visibility
function Wave({ position, color, speed, amplitude, frequency, thickness = 5 }: WaveProps) {
  const lineRef = useRef<THREE.Line>(null)
  const positions = useMemo(() => {
    // Create a sine wave with more points for smoother curves
    const points: THREE.Vector3[] = [];
    const count = 80; // Increased point count for smoother waves
    for (let i = 0; i < count; i++) {
      const x = (i / count) * 50 - 25; // Wider wave
      points.push(new THREE.Vector3(x, Math.sin(x * 0.2) * amplitude, 0));
    }
    return new Float32Array(points.length * 3).map((_, i) => {
      const j = Math.floor(i / 3);
      if (i % 3 === 0) return points[j].x;
      if (i % 3 === 1) return points[j].y;
      return points[j].z;
    });
  }, [amplitude]);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      const time = clock.getElapsedTime() * speed;
      const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
      
      // Update y positions of all points in the wave
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        positions[i + 1] = Math.sin(x / frequency + time) * amplitude;
      }
      
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <line ref={lineRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]} 
          count={positions.length / 3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} linewidth={thickness} opacity={1} transparent />
    </line>
  );
}

// Stock price element with better visibility
function StockPrice({ position, data, index, delay }: StockPriceProps) {
  const textRef = useRef<any>(null);
  const initialDelay = index * 1.2; // Faster cycling of stock prices
  
  useFrame(({ clock }) => {
    if (textRef.current && textRef.current.material) {
      const t = clock.getElapsedTime() - initialDelay;
      if (t < 0) return;

      // Animation cycle: 0-1 fade in, 1-3 visible, 3-4 fade out, 4-5 invisible, repeat
      const cycle = 5;
      const time = (t % cycle);
      
      let opacity = 0;
      if (time < 1) opacity = time; // fade in
      else if (time < 3) opacity = 1; // visible
      else if (time < 4) opacity = 1 - (time - 3); // fade out
      
      // Make text more visible with higher opacity
      if ('opacity' in textRef.current.material) {
        textRef.current.material.opacity = opacity;
      }

      // Add a slight floating animation
      if (textRef.current.position) {
        textRef.current.position.y += Math.sin(t * 2) * 0.003;
      }
    }
  });
  
  const { symbol, price } = data;
  // Even brighter colors with more contrast
  const color = price.startsWith('+') ? '#00FF00' : '#FF0000';

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={1.2} // Much larger text
      color={color}
      anchorX="center"
      anchorY="middle"
      material-transparent={true}
      material-opacity={0}
      fontWeight={800} // Bolder text
      outlineWidth={0.05} // Add outline for better visibility
      outlineColor="#000000"
    >
      {`${symbol}: ${price}`}
    </Text>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60} />
      <ambientLight intensity={1.0} />

      {/* Brighter waves with increased visibility */}
      <Wave
        position={[0, 6, 0]}
        color="#2563eb" // blue-600 - more vivid
        speed={0.5}
        amplitude={2.0} // Much larger amplitude
        frequency={5}
        thickness={6}
      />
      <Wave
        position={[0, 0, -1]}
        color="#7c3aed" // purple-600 - more vivid
        speed={0.7}
        amplitude={2.5} // Much larger amplitude
        frequency={7}
        thickness={6}
      />
      <Wave
        position={[0, -6, -2]}
        color="#0ea5e9" // sky-500 - more vivid
        speed={0.4}
        amplitude={3.0} // Much larger amplitude
        frequency={6}
        thickness={6}
      />

      {/* Extra waves for fuller effect */}
      <Wave
        position={[0, 3, -1.5]}
        color="#ec4899" // pink-500 - add contrast
        speed={0.6}
        amplitude={1.8}
        frequency={8}
        thickness={4}
      />
      <Wave
        position={[0, -3, -1.5]}
        color="#10b981" // emerald-500 - add contrast
        speed={0.3}
        amplitude={2.2}
        frequency={9}
        thickness={4}
      />

      {/* Spread out stock prices for better visibility - orbital arrangement */}
      {STOCK_DATA.map((data, index) => {
        const angle = (index / STOCK_DATA.length) * Math.PI * 2;
        const radius = 10 + Math.random() * 3; // Larger radius
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = -Math.random() * 2 - 2; // Push slightly further back
        
        return (
          <StockPrice
            key={data.symbol}
            position={[x, y, z]}
            data={data}
            index={index}
            delay={index * 1.5}
          />
        );
      })}
    </>
  );
}

export function WaveAnimation() {
  return (
    <div className="absolute inset-0 z-5"> {/* Lower z-index to be behind content */}
      <Canvas
        dpr={[1, 2]} // Higher resolution
        style={{ background: 'transparent' }}
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ 
          antialias: true, // Enable antialiasing for smoother lines
          alpha: true
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
} 