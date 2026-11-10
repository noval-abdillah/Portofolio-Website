'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Monogram Medallion using the Teal NA Monogram icon
function Monogram3D() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Load the icon texture
  const texture = useLoader(THREE.TextureLoader, '/icon.png');
  texture.colorSpace = THREE.SRGBColorSpace;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Smooth subtle rotating swing
    groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.45 + mouse.current.x * 0.4;
    groupRef.current.rotation.x = Math.cos(t * 0.5) * 0.15 - mouse.current.y * 0.3;

    // Rings rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      ringRef.current.rotation.x = t * 0.2;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -t * 0.25;
      outerRingRef.current.rotation.y = t * 0.3;
    }

    // Parallax mouse follow
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      mouse.current.x * 0.6,
      0.05
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      mouse.current.y * 0.35,
      0.05
    );
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.8}>
      <group ref={groupRef}>
        {/* Core Monogram Disc */}
        <mesh>
          <cylinderGeometry args={[1.65, 1.65, 0.14, 64]} />
          {/* Cylinder side material */}
          <meshStandardMaterial
            attach="material-0"
            color="#0d9488"
            metalness={0.85}
            roughness={0.2}
            emissive="#14b8a6"
            emissiveIntensity={0.35}
          />
          {/* Top/Front face with Monogram texture */}
          <meshStandardMaterial
            attach="material-1"
            map={texture}
            metalness={0.4}
            roughness={0.25}
            emissive="#0d9488"
            emissiveIntensity={0.25}
          />
          {/* Bottom/Back face */}
          <meshStandardMaterial
            attach="material-2"
            map={texture}
            metalness={0.4}
            roughness={0.25}
            emissive="#0d9488"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Inner Glowing Teal Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.0, 0.02, 16, 100]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.65} />
        </mesh>

        {/* Outer Tech Orbit Ring with dashed feeling */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[2.3, 0.015, 16, 64]} />
          <meshBasicMaterial color="#14b8a6" transparent opacity={0.4} wireframe />
        </mesh>

        {/* Backlight glow point attached to emblem */}
        <pointLight color="#14b8a6" intensity={3} distance={5} />
      </group>
    </Float>
  );
}

// Optimized Teal Particle Atmosphere
const PARTICLE_COUNT = 350;
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
  PARTICLE_POSITIONS[i * 3] = (Math.random() - 0.5) * 18;
  PARTICLE_POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 18;
  PARTICLE_POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 18;
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#2dd4bf"
        transparent
        opacity={0.7}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function Canvas3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      style={{ background: '#09090b' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <pointLight position={[10, 10, 10]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#14b8a6" />
      <directionalLight position={[0, 4, 4]} intensity={1.5} color="#2dd4bf" />

      <Monogram3D />
      <Particles />

      <Stars
        radius={80}
        depth={40}
        count={600}
        factor={3.5}
        saturation={1}
        fade
        speed={0.8}
      />
    </Canvas>
  );
}
