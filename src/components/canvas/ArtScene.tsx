"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

// --- THE SCULPTURE COMPONENT ---
function Sculpture() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animate the sculpture (Slow breathing rotation)
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Complex organic rotation
    meshRef.current.rotation.x = Math.sin(t / 4) * 0.5;
    meshRef.current.rotation.y = Math.sin(t / 2) * 0.5;
    
    // Slight morphing effect (simulated via scale breath)
    const breath = 1 + Math.sin(t) * 0.05;
    meshRef.current.scale.set(breath, breath, breath);
  });

  // Material Logic based on system preference is handled via parent props in a full app, 
  // but here we'll make a hybrid material that looks good in both or relies on the Environment.
  // We use MeshTransmissionMaterial for a "Glass/Liquid" look that feels premium.

  return (
    <group dispose={null}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} castShadow receiveShadow>
          {/* 
            Knot Geometry: Approximates a complex organic sculpture 
            (torusKnotGeometry args: [radius, tube, tubularSegments, radialSegments, p, q])
          */}
          <torusKnotGeometry args={[1, 0.35, 200, 32, 2, 3]} />
          
          {/* HIGH END MATERIAL: Glass/Liquid Chrome */}
          <MeshTransmissionMaterial 
            backside={false}
            samples={16} // Quality of blur
            resolution={1024} 
            transmission={1} // Glass-like
            roughness={0.2} // Smooth but not perfect mirror
            clearcoat={1}
            clearcoatRoughness={0}
            thickness={0.5} // Refraction depth
            ior={1.5} // Index of Refraction (Glass)
            chromaticAberration={0.06} // Subtle prism effect
            anisotropy={0.1}
            distortion={0.2} // Warps background
            distortionScale={0.3}
            temporalDistortion={0.5}
            color={"#ffffff"} 
            background={new THREE.Color("#000000")} // Helps transmission contrast
          />
        </mesh>
      </Float>
    </group>
  );
}

// --- THE SCENE WRAPPER ---
export default function ArtScene() {
  return (
    <div className="w-full h-full absolute inset-0 z-20 pointer-events-none">
      <Canvas 
        shadows 
        dpr={[1, 2]} // Retina support
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* LIGHTING SETUP */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {/* REALISTIC ENVIRONMENT REFLECTIONS (Studio Lighting) */}
        <Environment preset="city" />

        {/* THE ART PIECE */}
        <Sculpture />

        {/* SHADOW ON THE "FLOOR" (Even if floating, adds depth) */}
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
        />
      </Canvas>
    </div>
  );
}
