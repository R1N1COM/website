'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { CHECKS_PER_DAY, MORNING, RELEASE_HOURS } from './schedule';

const INK = new THREE.Color('#14202b');
const TEAL = new THREE.Color('#2e8c84');
const SIGNAL = new THREE.Color('#f2c230');
const IDLE = new THREE.Color('#c3ccd4');
const FONT = '/fonts/schibsted-grotesk-latin-600-normal.woff';

const R = 3.2;
const TAU = Math.PI * 2;

/** Hour of day -> point on the ring. 00:00 at the back, running clockwise seen from above. */
function onRing(hour: number, r = R): [number, number] {
  const a = (hour / 24) * TAU;
  return [r * Math.sin(a), -r * Math.cos(a)];
}

function Checks({ now, animate }: { now: number; animate: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const replay = useRef(0);

  useFrame((_, dt) => {
    const m = mesh.current;
    if (!m) return;
    // A scanner replays today's checks from midnight up to now, every ~6 seconds.
    if (animate) replay.current = (replay.current + dt / 6) % 1;
    const scan = animate ? replay.current * now : -1;

    for (let i = 0; i < CHECKS_PER_DAY; i++) {
      const hour = (i * 5) / 60;
      const [x, z] = onRing(hour);
      const done = hour <= now;
      const hourMark = i % 12 === 0;
      const dist = scan >= 0 ? Math.abs(hour - scan) : 99;
      const lift = done ? Math.max(0, 1 - dist / 0.6) : 0;
      const h = (hourMark ? 0.42 : 0.2) + lift * 0.9;

      dummy.position.set(x, h / 2, z);
      dummy.rotation.set(0, -(hour / 24) * TAU, 0);
      dummy.scale.set(1, h, 1);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);

      if (!done) color.copy(IDLE);
      else if (lift > 0.05) color.copy(TEAL).lerp(SIGNAL, lift * 0.6);
      else color.copy(hourMark ? INK : TEAL);
      m.setColorAt(i, color);
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, CHECKS_PER_DAY]}>
      <boxGeometry args={[0.04, 1, 0.16]} />
      <meshStandardMaterial roughness={0.55} metalness={0.05} />
    </instancedMesh>
  );
}

function Releases({ now }: { now: number }) {
  return (
    <>
      {RELEASE_HOURS.map((h) => {
        const [x, z] = onRing(h, R + 0.35);
        const done = h <= now;
        return (
          <group key={h} position={[x, 0, z]}>
            <mesh position={[0, 1.1, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 2.2, 16]} />
              <meshStandardMaterial
                color={SIGNAL}
                emissive={SIGNAL}
                emissiveIntensity={done ? 0.55 : 0}
                transparent
                opacity={done ? 1 : 0.35}
              />
            </mesh>
            <mesh position={[0, 2.3, 0]}>
              <boxGeometry args={[0.22, 0.22, 0.22]} />
              <meshStandardMaterial color={SIGNAL} transparent opacity={done ? 1 : 0.35} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function Morning() {
  const [start, end] = MORNING;
  // RingGeometry runs counter-clockwise from +x; convert our clock angles.
  const thetaStart = Math.PI / 2 - (end / 24) * TAU;
  const thetaLength = ((end - start) / 24) * TAU;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
      <ringGeometry args={[R - 0.45, R + 0.2, 48, 1, thetaStart, thetaLength]} />
      <meshStandardMaterial color="#9fd1cb" transparent opacity={0.55} side={THREE.DoubleSide} />
    </mesh>
  );
}

function NowHand({ now }: { now: number }) {
  const [x, z] = onRing(now, R + 0.7);
  const len = Math.hypot(x, z);
  return (
    <group rotation={[0, -(now / 24) * TAU, 0]}>
      <mesh position={[0, 0.03, -len / 2]}>
        <boxGeometry args={[0.03, 0.03, len]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      <mesh position={[0, 0.03, -len]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color={INK} />
      </mesh>
    </group>
  );
}

function Labels() {
  return (
    <>
      {[0, 6, 12, 18].map((h) => {
        const [x, z] = onRing(h, R + 1.05);
        return (
          <Text
            key={h}
            font={FONT}
            position={[x, 0.01, z]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.26}
            color="#4f5f6d"
            anchorX="center"
            anchorY="middle"
          >
            {`${String(h).padStart(2, '0')}:00`}
          </Text>
        );
      })}
    </>
  );
}

/** The R1N1 mark, built from the same four blocks as the logo. */
function Core({ animate }: { animate: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current || !animate) return;
    g.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.5;
  });
  const u = 2.2 / 64; // logo grid unit
  const block = (x0: number, y0: number, x1: number, y1: number, color: string, depth = 0.5) => (
    <mesh position={[((x0 + x1) / 2 - 32) * u, (32 - (y0 + y1) / 2) * u, 0]} castShadow>
      <boxGeometry args={[(x1 - x0) * u, (y1 - y0) * u, depth]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
  );
  return (
    <group ref={g} position={[0, 1.25, 0]}>
      {block(12, 14, 22, 50, '#14202b', 0.6)}
      {block(27, 14, 52, 24, '#f2c230')}
      {block(27, 29, 44, 39, '#2e8c84')}
      {block(27, 44, 36, 50, '#14202b')}
    </group>
  );
}

function Rig({ animate }: { animate: boolean }) {
  const { camera, pointer } = useThree();
  const base = useMemo(() => new THREE.Vector3(0, 8.4, 11.2), []);
  useFrame(() => {
    const tx = base.x + (animate ? pointer.x * 1.2 : 0);
    const ty = base.y + (animate ? pointer.y * 0.6 : 0);
    camera.position.x += (tx - camera.position.x) * 0.05;
    camera.position.y += (ty - camera.position.y) * 0.05;
    camera.position.z = base.z;
    camera.lookAt(0, 0.5, 0);
  });
  return null;
}

export default function DayRing({
  now,
  animate,
  active,
}: {
  now: number;
  animate: boolean;
  active: boolean;
}) {
  return (
    <Canvas
      className="three-canvas"
      dpr={[1, 2]}
      shadows
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 8.4, 11.2], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 8, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 3, -4]} intensity={0.4} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[R + 1.5, 128]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <Morning />
      <Checks now={now} animate={animate} />
      <Releases now={now} />
      <NowHand now={now} />
      <Labels />
      <Core animate={animate} />
      <Rig animate={animate} />
    </Canvas>
  );
}
