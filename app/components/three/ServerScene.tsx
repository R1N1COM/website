'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LEDS_X = 10;
const LEDS_Y = 3;
const UNITS = 3;

/** Front-panel status lights that keep blinking whether or not the cable is in. */
function Leds({ animate }: { animate: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = LEDS_X * LEDS_Y * UNITS;
  const seeds = useMemo(() => Array.from({ length: count }, () => Math.random() * 10), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const c = useMemo(() => new THREE.Color(), []);
  const teal = useMemo(() => new THREE.Color('#3fd1c2'), []);
  const signal = useMemo(() => new THREE.Color('#f2c230'), []);
  const off = useMemo(() => new THREE.Color('#203243'), []);
  const placed = useRef(false);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = animate ? state.clock.elapsedTime : 1.3;
    let i = 0;
    for (let u = 0; u < UNITS; u++) {
      for (let y = 0; y < LEDS_Y; y++) {
        for (let x = 0; x < LEDS_X; x++, i++) {
          if (!placed.current) {
            dummy.position.set(0.25 + x * 0.12, u * 0.62 + 0.2 + y * 0.1, 0.81);
            dummy.updateMatrix();
            m.setMatrixAt(i, dummy.matrix);
          }
          const on = Math.sin(t * (2 + (seeds[i] % 3)) + seeds[i]) > 0.15;
          c.copy(on ? (i % 7 === 0 ? signal : teal) : off);
          m.setColorAt(i, c);
        }
      }
    }
    placed.current = true;
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.06, 0.04, 0.02]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function Chassis() {
  return (
    <group>
      {Array.from({ length: UNITS }, (_, u) => (
        <group key={u} position={[0, u * 0.62, 0]}>
          <mesh position={[0, 0.27, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.6, 0.54, 1.6]} />
            <meshStandardMaterial color="#1b2b3a" roughness={0.45} metalness={0.35} />
          </mesh>
          {/* front bezel */}
          <mesh position={[0, 0.27, 0.805]}>
            <boxGeometry args={[2.62, 0.5, 0.01]} />
            <meshStandardMaterial color="#23364a" roughness={0.6} />
          </mesh>
          {/* vent slots */}
          {Array.from({ length: 7 }, (_, k) => (
            <mesh key={k} position={[-1.1 + k * 0.1, 0.27, 0.812]}>
              <boxGeometry args={[0.04, 0.34, 0.005]} />
              <meshStandardMaterial color="#0f1922" />
            </mesh>
          ))}
        </group>
      ))}
      {/* side panel, a touch lighter so the port reads */}
      <mesh position={[1.302, 0.92, 0]}>
        <boxGeometry args={[0.004, 1.84, 1.6]} />
        <meshStandardMaterial color="#2a4157" roughness={0.6} />
      </mesh>
      {/* network port on the side of the bottom unit */}
      <mesh position={[1.31, 0.27, 0.35]}>
        <boxGeometry args={[0.03, 0.2, 0.26]} />
        <meshStandardMaterial color="#cfd8de" roughness={0.4} />
      </mesh>
      <mesh position={[1.315, 0.27, 0.35]}>
        <boxGeometry args={[0.02, 0.12, 0.18]} />
        <meshStandardMaterial color="#0b1218" />
      </mesh>
    </group>
  );
}

/** The network cable. `pull` 0 = plugged in, 1 = pulled out and dropped on the floor. */
function Cable({ pull }: { pull: number }) {
  const port = { x: 1.32, y: 0.27, z: 0.35 };
  const out = Math.min(1, pull / 0.55);
  const drop = Math.max(0, pull - 0.55) / 0.45;
  const px = port.x + 0.13 + out * 0.55;
  const py = port.y - drop * (port.y - 0.07);
  const pz = port.z + drop * 0.15;

  const geom = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(px + 0.12, py, pz),
      new THREE.Vector3(px + 0.55, Math.max(0.04, py - 0.12), pz + 0.25),
      new THREE.Vector3(px + 0.95, 0.04, pz + 0.75),
      new THREE.Vector3(3.6, 0.04, 1.9),
      new THREE.Vector3(5.5, 0.04, 2.4),
    ]);
    return new THREE.TubeGeometry(curve, 64, 0.035, 10, false);
  }, [px, py, pz]);

  return (
    <group>
      <mesh geometry={geom} castShadow>
        <meshStandardMaterial color="#f2c230" roughness={0.5} />
      </mesh>
      <mesh position={[px, py, pz]} rotation={[0, drop * 0.6, -drop * 0.25]} castShadow>
        <boxGeometry args={[0.26, 0.14, 0.18]} />
        <meshStandardMaterial color="#e6ecef" roughness={0.3} />
      </mesh>
    </group>
  );
}

function LinkLed({ pull }: { pull: number }) {
  const on = pull < 0.15;
  return (
    <mesh position={[1.32, 0.42, 0.35]}>
      <boxGeometry args={[0.02, 0.05, 0.05]} />
      <meshBasicMaterial color={on ? '#f2c230' : '#203243'} toneMapped={false} />
    </mesh>
  );
}

function Scene({ pull, animate }: { pull: number; animate: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const t = animate ? state.clock.elapsedTime : 0;
    g.current.rotation.y = 0.1 + Math.sin(t * 0.25) * 0.05;
  });
  return (
    <group ref={g} position={[-0.9, -0.85, -0.3]} scale={1.12}>
      <Chassis />
      <Leds animate={animate} />
      <Cable pull={pull} />
      <LinkLed pull={pull} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, -0.001, 0.6]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function ServerScene({
  pull,
  animate,
  active,
}: {
  pull: number;
  animate: boolean;
  active: boolean;
}) {
  return (
    <Canvas
      className="three-canvas"
      dpr={[1, 2]}
      shadows
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [3.6, 2.3, 4.6], fov: 38 }}
      onCreated={({ camera }) => camera.lookAt(0.3, 0, 0.2)}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 6, 4]} intensity={1.8} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 2, 3]} intensity={6} color="#3fd1c2" distance={9} />
      <Scene pull={pull} animate={animate} />
    </Canvas>
  );
}
