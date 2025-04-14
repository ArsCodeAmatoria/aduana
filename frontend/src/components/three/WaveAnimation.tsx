"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Stock data
const STOCK_DATA = [
  { symbol: 'DUANA', price: '+12.4%' },
  { symbol: 'TRADE', price: '+8.7%' },
  { symbol: 'VERIFY', price: '+9.1%' },
  { symbol: 'GLOBAL', price: '+5.6%' },
  { symbol: 'TOKEN', price: '+3.9%' },
]

interface WaveProps {
  position: [number, number, number];
  color: string;
  speed: number;
  amplitude: number;
  frequency: number;
}

interface StockPriceProps {
  position: [number, number, number];
  data: { symbol: string; price: string };
  index: number;
  delay: number;
}

// Wave component with increased visibility
function Wave({ position, color, speed, amplitude, frequency }: WaveProps) {
  const lineRef = useRef<THREE.Line>(null)
  const positions = useMemo(() => {
    // Create a sine wave
    const points: THREE.Vector3[] = [];
    const count = 50;
    for (let i = 0; i < count; i++) {
      const x = (i / count) * 40 - 20;
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
      <lineBasicMaterial color={color} linewidth={3} opacity={0.9} transparent />
    </line>
  );
}

// Stock price element with better visibility
function StockPrice({ position, data, index, delay }: StockPriceProps) {
  const textRef = useRef<any>(null);
  const initialDelay = index * 2;
  
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
    }
  });
  
  const { symbol, price } = data;
  // Brighter colors for better visibility
  const color = price.startsWith('+') ? '#4AFF4A' : '#FF4A4A';

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.7}
      color={color}
      anchorX="center"
      anchorY="middle"
      material-transparent={true}
      material-opacity={0}
      fontWeight={700}
    >
      {`${symbol}: ${price}`}
    </Text>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <ambientLight intensity={0.8} />

      {/* Brighter waves with increased visibility */}
      <Wave
        position={[0, 4, 0]}
        color="#3b82f6" // blue-500
        speed={0.4}
        amplitude={1.2}
        frequency={6}
      />
      <Wave
        position={[0, 0, -1]}
        color="#8b5cf6" // purple-500
        speed={0.6}
        amplitude={1.5}
        frequency={8}
      />
      <Wave
        position={[0, -4, -2]}
        color="#06b6d4" // cyan-500
        speed={0.3}
        amplitude={1.8}
        frequency={7}
      />

      {/* Spread out stock prices for better visibility */}
      {STOCK_DATA.map((data, index) => {
        const angle = (index / STOCK_DATA.length) * Math.PI * 2;
        const radius = 8 + Math.random() * 4;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = -Math.random() * 2;
        
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
    <div className="absolute inset-0 z-10">
      <Canvas
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        camera={{ position: [0, 0, 15], fov: 50 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
} 