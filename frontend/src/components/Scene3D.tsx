import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. Optimized Particle Field (Reduced count slightly & improved buffer binding)
const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 1500; // 2000 se 1500 karne se FPS kaafi drop nahi hoga

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      if (Math.random() > 0.95) {
        colors[i * 3] = 0.2;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 0.5;
      } else {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      }
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// 2. Optimized Floating Shapes
const FloatingShape = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </Float>
  );
};

// 3. Optimized Emerald Orb
const EmeraldOrb = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} /> {/* Reduced segments from 32 to 16 for speed */}
      <meshStandardMaterial
        color="#10b981"
        emissive="#10b981"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// 4. Smoother Camera Controller (Using lerp logic)
const CameraController = ({ scrollProgress }: { scrollProgress: number }) => {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = 15 - scrollProgress * 30;
    const targetY = scrollProgress * 5;
    const targetX = Math.sin(scrollProgress * Math.PI) * 5;

    // Smooth movement with lerp
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    camera.lookAt(0, scrollProgress * 3, -10);
  });

  return null;
};

interface Scene3DProps {
  scrollProgress: number;
}

const Scene3D = ({ scrollProgress }: Scene3DProps) => {
  return (
    // Direct CSS background di hai taaki rendering delay me screen black flicker na kare
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]} // Device Pixel Ratio limit kiya lag rokne ke liye (Retina screens par FPS fix)
      >
        <fog attach="fog" args={['#000000', 10, 80]} />

        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#10b981" />

        <CameraController scrollProgress={scrollProgress} />
        <ParticleField />

        {/* Floating Shapes */}
        <FloatingShape position={[-8, 3, -10]} scale={2} />
        <FloatingShape position={[10, -2, -15]} scale={1.5} />
        <FloatingShape position={[-5, -5, -20]} scale={3} />
        <FloatingShape position={[8, 5, -25]} scale={2.5} />

        {/* Emerald Accents */}
        <EmeraldOrb position={[-12, 0, -8]} />
        <EmeraldOrb position={[15, 4, -20]} />
      </Canvas>
    </div>
  );
};

export default Scene3D;