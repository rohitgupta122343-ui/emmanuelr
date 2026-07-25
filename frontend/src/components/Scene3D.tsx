import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Particle field component
const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Most particles white, few emerald
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
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
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

// Floating geometric shapes
const FloatingShape = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </Float>
  );
};

// Emerald accent sphere
const EmeraldOrb = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
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

// Camera controller that responds to scroll
const CameraController = ({ scrollProgress }: { scrollProgress: number }) => {
  const { camera } = useThree();

  useFrame(() => {
    // Move camera based on scroll
    const targetZ = 15 - scrollProgress * 30;
    const targetY = scrollProgress * 5;
    const targetX = Math.sin(scrollProgress * Math.PI) * 5;

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
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 80]} />

        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#10b981" />

        <CameraController scrollProgress={scrollProgress} />
        <ParticleField />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

        {/* Floating shapes */}
        <FloatingShape position={[-8, 3, -10]} scale={2} />
        <FloatingShape position={[10, -2, -15]} scale={1.5} />
        <FloatingShape position={[-5, -5, -20]} scale={3} />
        <FloatingShape position={[8, 5, -25]} scale={2.5} />

        {/* Subtle emerald accents */}
        <EmeraldOrb position={[-12, 0, -8]} />
        <EmeraldOrb position={[15, 4, -20]} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
