import { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// CACHED GEOMETRIES & MATERIALS (Prevents Memory Leak & Black Screen)
// -------------------------------------------------------------
const OCTAHEDRON_GEO = new THREE.OctahedronGeometry(1, 0);
const SPHERE_GEO = new THREE.SphereGeometry(0.3, 8, 8);

const WIREFRAME_MAT = new THREE.MeshBasicMaterial({
  color: '#ffffff',
  wireframe: true,
  transparent: true,
  opacity: 0.05,
});

const EMERALD_MAT = new THREE.MeshBasicMaterial({
  color: '#10b981',
  transparent: true,
  opacity: 0.4,
});

// 1. Light-weight Particle Field
const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 350; // Optimized particle count to save GPU VRAM

  const [positions, colors] = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const colArr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      posArr[i * 3] = (Math.random() - 0.5) * 60;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 60;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 60;

      if (Math.random() > 0.9) {
        colArr[i * 3] = 0.06;
        colArr[i * 3 + 1] = 0.72;
        colArr[i * 3 + 2] = 0.5;
      } else {
        colArr[i * 3] = 0.8;
        colArr[i * 3 + 1] = 0.8;
        colArr[i * 3 + 2] = 0.8;
      }
    }

    return [posArr, colArr];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// 2. Floating Shapes
const FloatingShape = ({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.08;
      ref.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh
        ref={ref}
        position={position}
        scale={scale}
        geometry={OCTAHEDRON_GEO}
        material={WIREFRAME_MAT}
      />
    </Float>
  );
};

// 3. Emerald Orb
const EmeraldOrb = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.2;
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      geometry={SPHERE_GEO}
      material={EMERALD_MAT}
    />
  );
};

// 4. Safe Camera Controller
const CameraController = ({ scrollProgress }: { scrollProgress: number }) => {
  const { camera, invalidate } = useThree();
  const lookTarget = useRef(new THREE.Vector3(0, 0, -10));

  useEffect(() => {
    invalidate();
  }, [scrollProgress, invalidate]);

  useFrame((_, delta) => {
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress || 0));

    const targetZ = 15 - clampedProgress * 20;
    const targetY = clampedProgress * 3;
    const targetX = Math.sin(clampedProgress * Math.PI) * 3;

    const step = Math.min(delta * 2, 0.1);
    camera.position.x += (targetX - camera.position.x) * step;
    camera.position.y += (targetY - camera.position.y) * step;
    camera.position.z += (targetZ - camera.position.z) * step;

    lookTarget.current.y = clampedProgress * 2;
    camera.lookAt(lookTarget.current);
  });

  return null;
};

// 5. Main Canvas Scene
interface Scene3DProps {
  scrollProgress: number;
}

const Scene3D = ({ scrollProgress }: Scene3DProps) => {
  const [sceneKey, setSceneKey] = useState(0);

  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    const canvas = gl.domElement;

    // Handle Context Loss gracefully
    const onContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL Context Lost. Reloading Canvas Scene...');
      setTimeout(() => {
        setSceneKey((k) => k + 1); // Force re-mount canvas on context loss
      }, 300);
    };

    canvas.addEventListener('webglcontextlost', onContextLost, false);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a] pointer-events-none">
      <Canvas
        key={sceneKey}
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{
          antialias: false,
          powerPreference: 'low-power', // Prevents GPU Crash on heavy sections
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
          stencil: false,
        }}
        dpr={1} // Strict 1 DPR to stop black screen buffer overflow
        onCreated={handleCreated}
      >
        <CameraController scrollProgress={scrollProgress} />
        <ParticleField />

        <FloatingShape position={[-5, 2, -10]} scale={1.5} />
        <FloatingShape position={[6, -2, -12]} scale={1.2} />

        <EmeraldOrb position={[-6, 0, -8]} />
        <EmeraldOrb position={[8, 2, -14]} />
      </Canvas>
    </div>
  );
};

export default Scene3D;