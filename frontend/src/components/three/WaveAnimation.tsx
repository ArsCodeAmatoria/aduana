"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

interface WaveProps {
  position: [number, number, number];
  color: string;
  speed: number;
  amplitude: number;
  frequency: number;
  thickness?: number;
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

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60} />
      <ambientLight intensity={1.2} /> {/* Brighter lighting */}

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
          alpha: true,
          preserveDrawingBuffer: true // Try this to help with rendering issues
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
} 