'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { scroll } from './scroll';
import { CHECKS_PER_DAY, MORNING, RELEASE_HOURS } from './schedule';

const FONT = '/fonts/schibsted-grotesk-latin-600-normal.woff';
const TAU = Math.PI * 2;

export const C = {
  bg: '#0c1824',
  paper: '#e9eff3',
  mute: '#7f93a3',
  idle: '#24384a',
  teal: '#35b3a6',
  signal: '#f2c230',
};

/* World layout: each chapter has its own place along the x axis. */
export const PLACES = {
  ring: new THREE.Vector3(0, 0, 0),
  server: new THREE.Vector3(16, 0, 0),
  buyx: new THREE.Vector3(32, 2.7, 0),
  mmcc: new THREE.Vector3(48, 2.3, 0),
};

/* ───────────────────────── Chapter 0: the day ring ───────────────────────── */

const R = 3.2;
function onRing(hour: number, r = R): [number, number] {
  const a = (hour / 24) * TAU;
  return [r * Math.sin(a), -r * Math.cos(a)];
}

function Checks({ now, animate }: { now: number; animate: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const cols = useMemo(
    () => ({ idle: new THREE.Color(C.idle), teal: new THREE.Color(C.teal), hour: new THREE.Color(C.paper), sig: new THREE.Color(C.signal) }),
    [],
  );
  const replay = useRef(0);

  useFrame((_, dt) => {
    const m = mesh.current;
    if (!m) return;
    if (animate) replay.current = (replay.current + dt / 7) % 1;
    const scan = animate ? replay.current * now : -1;
    for (let i = 0; i < CHECKS_PER_DAY; i++) {
      const hour = (i * 5) / 60;
      const [x, z] = onRing(hour);
      const done = hour <= now;
      const hourMark = i % 12 === 0;
      const lift = done && scan >= 0 ? Math.max(0, 1 - Math.abs(hour - scan) / 0.7) : 0;
      const h = (hourMark ? 0.45 : 0.22) + lift * 1.1;
      dummy.position.set(x, h / 2, z);
      dummy.rotation.set(0, -(hour / 24) * TAU, 0);
      dummy.scale.set(1, h, 1);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      if (!done) color.copy(cols.idle);
      else if (lift > 0.05) color.copy(cols.teal).lerp(cols.sig, lift);
      else color.copy(hourMark ? cols.hour : cols.teal);
      m.setColorAt(i, color);
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, CHECKS_PER_DAY]}>
      <boxGeometry args={[0.045, 1, 0.16]} />
      <meshStandardMaterial roughness={0.4} emissive={C.teal} emissiveIntensity={0.08} />
    </instancedMesh>
  );
}

function Releases({ now }: { now: number }) {
  return (
    <>
      {RELEASE_HOURS.map((h) => {
        const [x, z] = onRing(h, R + 0.4);
        const done = h <= now;
        return (
          <group key={h} position={[x, 0, z]}>
            <mesh position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 2.4, 16]} />
              <meshStandardMaterial
                color={C.signal}
                emissive={C.signal}
                emissiveIntensity={done ? 1.6 : 0.05}
                transparent
                opacity={done ? 1 : 0.3}
                toneMapped={!done}
              />
            </mesh>
            <mesh position={[0, 2.5, 0]}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color={C.signal} emissive={C.signal} emissiveIntensity={done ? 1.2 : 0} transparent opacity={done ? 1 : 0.3} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function Morning() {
  const [start, end] = MORNING;
  const thetaStart = Math.PI / 2 - (end / 24) * TAU;
  const thetaLength = ((end - start) / 24) * TAU;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
      <ringGeometry args={[R - 0.5, R + 0.25, 48, 1, thetaStart, thetaLength]} />
      <meshBasicMaterial color={C.teal} transparent opacity={0.16} side={THREE.DoubleSide} />
    </mesh>
  );
}

function NowHand({ now }: { now: number }) {
  const len = R + 0.75;
  return (
    <group rotation={[0, -(now / 24) * TAU, 0]}>
      <mesh position={[0, 0.03, -len / 2]}>
        <boxGeometry args={[0.025, 0.025, len]} />
        <meshBasicMaterial color={C.paper} />
      </mesh>
      <mesh position={[0, 0.03, -len]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color={C.paper} emissive={C.paper} emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
    </group>
  );
}

function RingLabels() {
  return (
    <>
      {[0, 6, 12, 18].map((h) => {
        const [x, z] = onRing(h, R + 1.15);
        return (
          <Text key={h} font={FONT} position={[x, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.26} color={C.mute} anchorX="center" anchorY="middle">
            {`${String(h).padStart(2, '0')}:00`}
          </Text>
        );
      })}
    </>
  );
}

function Core({ animate }: { animate: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current && animate) g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.3) * 0.6;
  });
  const u = 2.2 / 64;
  const block = (x0: number, y0: number, x1: number, y1: number, color: string, emissive = 0, depth = 0.5) => (
    <mesh position={[((x0 + x1) / 2 - 32) * u, (32 - (y0 + y1) / 2) * u, 0]}>
      <boxGeometry args={[(x1 - x0) * u, (y1 - y0) * u, depth]} />
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} emissive={color} emissiveIntensity={emissive} />
    </mesh>
  );
  return (
    <group ref={g} position={[0, 1.3, 0]}>
      {block(12, 14, 22, 50, '#dfe6eb', 0.05, 0.6)}
      {block(27, 14, 52, 24, C.signal, 0.35)}
      {block(27, 29, 44, 39, C.teal, 0.3)}
      {block(27, 44, 36, 50, '#dfe6eb', 0.05)}
    </group>
  );
}

function Ring({ now, animate }: { now: number; animate: boolean }) {
  return (
    <group position={PLACES.ring}>
      <Morning />
      <Checks now={now} animate={animate} />
      <Releases now={now} />
      <NowHand now={now} />
      <RingLabels />
      <Core animate={animate} />
    </group>
  );
}

/* ───────────────────────── Chapter 1: the private server ───────────────────────── */

function Leds({ animate }: { animate: boolean }) {
  const X = 10, Y = 3, U = 3;
  const count = X * Y * U;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const seeds = useMemo(() => Array.from({ length: count }, (_, i) => (Math.sin(i * 91.7) * 43758.5) % 10), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const c = useMemo(() => new THREE.Color(), []);
  const on1 = useMemo(() => new THREE.Color('#5fe3d4'), []);
  const on2 = useMemo(() => new THREE.Color(C.signal), []);
  const off = useMemo(() => new THREE.Color('#1c2c3a'), []);
  const placed = useRef(false);
  useFrame((s) => {
    const m = mesh.current;
    if (!m) return;
    const t = animate ? s.clock.elapsedTime : 1.3;
    let i = 0;
    for (let u = 0; u < U; u++)
      for (let y = 0; y < Y; y++)
        for (let x = 0; x < X; x++, i++) {
          if (!placed.current) {
            dummy.position.set(0.25 + x * 0.12, u * 0.62 + 0.2 + y * 0.1, 0.815);
            dummy.updateMatrix();
            m.setMatrixAt(i, dummy.matrix);
          }
          const lit = Math.sin(t * (2 + (Math.abs(seeds[i]) % 3)) + seeds[i]) > 0.15;
          m.setColorAt(i, c.copy(lit ? (i % 7 === 0 ? on2 : on1) : off));
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

function Cable() {
  const tube = useRef<THREE.Mesh>(null);
  const plug = useRef<THREE.Mesh>(null);
  const link = useRef<THREE.MeshBasicMaterial>(null);
  const last = useRef(-1);
  const port = { x: 1.32, y: 0.27, z: 0.35 };

  useFrame(() => {
    const pull = scroll.unplug;
    if (Math.abs(pull - last.current) < 0.002) return;
    last.current = pull;
    const out = Math.min(1, pull / 0.55);
    const drop = Math.max(0, pull - 0.55) / 0.45;
    const px = port.x + 0.13 + out * 0.6;
    const py = port.y - drop * (port.y - 0.07);
    const pz = port.z + drop * 0.15;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(px + 0.12, py, pz),
      new THREE.Vector3(px + 0.55, Math.max(0.04, py - 0.12), pz + 0.25),
      new THREE.Vector3(px + 0.95, 0.04, pz + 0.75),
      new THREE.Vector3(3.6, 0.04, 1.9),
      new THREE.Vector3(6, 0.04, 2.6),
    ]);
    if (tube.current) {
      tube.current.geometry.dispose();
      tube.current.geometry = new THREE.TubeGeometry(curve, 64, 0.035, 10, false);
    }
    if (plug.current) {
      plug.current.position.set(px, py, pz);
      plug.current.rotation.set(0, drop * 0.6, -drop * 0.25);
    }
    if (link.current) link.current.color.set(pull < 0.12 ? C.signal : '#1c2c3a');
  });

  return (
    <group>
      <mesh ref={tube}>
        <bufferGeometry />
        <meshStandardMaterial color={C.signal} roughness={0.5} emissive={C.signal} emissiveIntensity={0.15} />
      </mesh>
      <mesh ref={plug}>
        <boxGeometry args={[0.26, 0.14, 0.18]} />
        <meshStandardMaterial color="#e6ecef" roughness={0.3} />
      </mesh>
      <mesh position={[1.322, 0.42, 0.35]}>
        <boxGeometry args={[0.02, 0.05, 0.05]} />
        <meshBasicMaterial ref={link} color={C.signal} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Server({ animate }: { animate: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) g.current.rotation.y = 0.15 + (animate ? Math.sin(s.clock.elapsedTime * 0.25) * 0.05 : 0);
  });
  return (
    <group position={PLACES.server}>
      <group ref={g} position={[-1.2, 0, -0.4]} scale={1.15}>
        {[0, 1, 2].map((u) => (
          <group key={u} position={[0, u * 0.62, 0]}>
            <mesh position={[0, 0.27, 0]}>
              <boxGeometry args={[2.6, 0.54, 1.6]} />
              <meshStandardMaterial color="#1a2b3b" roughness={0.4} metalness={0.45} />
            </mesh>
            <mesh position={[0, 0.27, 0.805]}>
              <boxGeometry args={[2.62, 0.5, 0.01]} />
              <meshStandardMaterial color="#223649" roughness={0.6} />
            </mesh>
            {Array.from({ length: 7 }, (_, k) => (
              <mesh key={k} position={[-1.1 + k * 0.1, 0.27, 0.812]}>
                <boxGeometry args={[0.04, 0.34, 0.005]} />
                <meshStandardMaterial color="#0b141c" />
              </mesh>
            ))}
          </group>
        ))}
        <mesh position={[1.302, 0.92, 0]}>
          <boxGeometry args={[0.004, 1.84, 1.6]} />
          <meshStandardMaterial color="#2b4359" roughness={0.6} />
        </mesh>
        <mesh position={[1.31, 0.27, 0.35]}>
          <boxGeometry args={[0.03, 0.2, 0.26]} />
          <meshStandardMaterial color="#cfd8de" roughness={0.4} />
        </mesh>
        <mesh position={[1.315, 0.27, 0.35]}>
          <boxGeometry args={[0.02, 0.12, 0.18]} />
          <meshStandardMaterial color="#0b1218" />
        </mesh>
        <Leds animate={animate} />
        <Cable />
      </group>
      <pointLight position={[-2, 2.5, 3]} intensity={8} color={C.teal} distance={10} />
    </group>
  );
}

/* ───────────────────────── Chapter 2: buyX, ~20 automations around one marketplace ───────────────────────── */

const NODES = 20;

function BuyX({ animate }: { animate: boolean }) {
  const g = useRef<THREE.Group>(null);
  const pulses = useRef<THREE.InstancedMesh>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const c = useMemo(() => new THREE.Color(), []);
  const base = useMemo(() => new THREE.Color(C.teal), []);
  const hot = useMemo(() => new THREE.Color(C.signal), []);

  // Nodes on a fibonacci sphere: one per automation.
  const nodes = useMemo(() => {
    const out: THREE.Vector3[] = [];
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODES; i++) {
      const y = 1 - (i / (NODES - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = ga * i;
      out.push(new THREE.Vector3(Math.cos(th) * r, y * 0.75, Math.sin(th) * r).multiplyScalar(2.8));
    }
    return out;
  }, []);

  const lines = useMemo(() => {
    const pos: number[] = [];
    nodes.forEach((n) => pos.push(0, 0, 0, n.x, n.y, n.z));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    return geo;
  }, [nodes]);

  useFrame((s, dt) => {
    const t = animate ? s.clock.elapsedTime : 0;
    if (g.current && animate) g.current.rotation.y += dt * 0.12;
    const hotIndex = Math.floor(t / 1.2) % NODES; // one automation reports in at a time
    if (nodesRef.current) {
      nodes.forEach((n, i) => {
        const k = i === hotIndex ? 1.6 : 1;
        dummy.position.copy(n);
        dummy.scale.setScalar(k);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
        nodesRef.current!.setColorAt(i, c.copy(i === hotIndex ? hot : base));
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
      if (nodesRef.current.instanceColor) nodesRef.current.instanceColor.needsUpdate = true;
    }
    if (pulses.current) {
      nodes.forEach((n, i) => {
        const f = ((t * 0.5 + i * 0.137) % 1) as number;
        dummy.position.copy(n).multiplyScalar(f);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        pulses.current!.setMatrixAt(i, dummy.matrix);
      });
      pulses.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={PLACES.buyx}>
      <group ref={g}>
        <mesh>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial color="#1f3a52" roughness={0.25} metalness={0.6} flatShading emissive={C.teal} emissiveIntensity={0.12} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.87, 1]} />
          <meshBasicMaterial color={C.teal} wireframe transparent opacity={0.5} />
        </mesh>
        <lineSegments geometry={lines}>
          <lineBasicMaterial color={C.teal} transparent opacity={0.35} />
        </lineSegments>
        <instancedMesh ref={nodesRef} args={[undefined, undefined, NODES]}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshStandardMaterial emissive={C.teal} emissiveIntensity={0.9} toneMapped={false} />
        </instancedMesh>
        <instancedMesh ref={pulses} args={[undefined, undefined, NODES]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshBasicMaterial color="#bff7f0" toneMapped={false} />
        </instancedMesh>
      </group>
      {/* The lines it never crosses: a fixed boundary around everything */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.7, 0.012, 8, 160]} />
        <meshBasicMaterial color={C.signal} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[3.9, 0.008, 8, 160]} />
        <meshBasicMaterial color={C.signal} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/* ───────────────────────── Chapter 3: MMCC, one video sets everything off ───────────────────────── */

const OUTPUTS = ['Car count and water report', 'YouTube', 'TikTok', 'Google Business', 'Booking page'];

function MMCC({ animate }: { animate: boolean }) {
  const pulses = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const source = useMemo(() => new THREE.Vector3(-2.2, 0, 0), []);
  const targets = useMemo(
    () => OUTPUTS.map((_, i) => new THREE.Vector3(1.9, 1.7 - i * 0.85, -0.4 + Math.abs(i - 2) * 0.35)),
    [],
  );
  const curves = useMemo(
    () =>
      targets.map(
        (t) =>
          new THREE.CubicBezierCurve3(
            source.clone().add(new THREE.Vector3(0.75, 0, 0)),
            new THREE.Vector3(-0.4, source.y, 0),
            new THREE.Vector3(0.2, t.y, t.z),
            t.clone().add(new THREE.Vector3(-0.85, 0, 0)),
          ),
      ),
    [source, targets],
  );
  const tubes = useMemo(() => curves.map((cv) => new THREE.TubeGeometry(cv, 48, 0.012, 6, false)), [curves]);

  useFrame((s) => {
    if (!pulses.current) return;
    const t = animate ? s.clock.elapsedTime : 0.6;
    curves.forEach((cv, i) => {
      const f = (t * 0.45 + i * 0.08) % 1;
      dummy.position.copy(cv.getPoint(f));
      dummy.updateMatrix();
      pulses.current!.setMatrixAt(i, dummy.matrix);
    });
    pulses.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={PLACES.mmcc}>
      {/* the one vertical video */}
      <group position={source}>
        <mesh>
          <boxGeometry args={[1.4, 2.5, 0.06]} />
          <meshStandardMaterial color="#132332" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[1.28, 2.36]} />
          <meshStandardMaterial color="#1d3346" emissive={C.teal} emissiveIntensity={0.18} />
        </mesh>
        <mesh position={[0.05, 0, 0.05]}>
          <circleGeometry args={[0.28, 3]} />
          <meshBasicMaterial color={C.paper} toneMapped={false} />
        </mesh>
        <Text font={FONT} position={[0, -1.55, 0]} fontSize={0.17} color={C.mute} anchorX="center">
          One Instagram post
        </Text>
      </group>
      {tubes.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshBasicMaterial color={C.teal} transparent opacity={0.55} />
        </mesh>
      ))}
      <instancedMesh ref={pulses} args={[undefined, undefined, OUTPUTS.length]}>
        <sphereGeometry args={[0.06, 14, 14]} />
        <meshBasicMaterial color={C.signal} toneMapped={false} />
      </instancedMesh>
      {targets.map((t, i) => (
        <group key={OUTPUTS[i]} position={t}>
          <mesh>
            <boxGeometry args={[1.7, 0.62, 0.05]} />
            <meshStandardMaterial color="#16283a" roughness={0.4} metalness={0.25} />
          </mesh>
          <mesh position={[-0.72, 0, 0.03]}>
            <boxGeometry args={[0.06, 0.4, 0.01]} />
            <meshBasicMaterial color={i === 0 ? C.teal : C.signal} toneMapped={false} />
          </mesh>
          <Text font={FONT} position={[-0.6, 0, 0.04]} fontSize={0.15} maxWidth={1.3} color={C.paper} anchorX="left" anchorY="middle">
            {OUTPUTS[i]}
          </Text>
        </group>
      ))}
    </group>
  );
}

/* ───────────────────────── Camera ───────────────────────── */

type Shot = { pos: THREE.Vector3; look: THREE.Vector3 };

function shots(narrow: boolean): Shot[] {
  // On wide screens the subject sits beside the text; on narrow screens it sits behind it.
  const side = narrow ? 0 : 1;
  const far = narrow ? 1.45 : 1;
  const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const r = PLACES.ring, s = PLACES.server, b = PLACES.buyx, m = PLACES.mmcc;
  return [
    { pos: v(r.x - 3.6 * side, 7 * far, 11 * far), look: v(r.x - 3.6 * side, 0.3, 0) },
    { pos: v(s.x + 1.8 - 1.2 * side, 3.4 * far, 9 * far), look: v(s.x - 3.4 * side, 0.7, 0) },
    { pos: v(b.x + 3.4 * side, b.y + 1.6 * far, 11.5 * far), look: v(b.x + 3.6 * side, b.y, 0) },
    { pos: v(m.x - 2.8 * side, m.y + 1.2 * far, 11 * far), look: v(m.x - 2.8 * side, m.y, 0) },
    { pos: v(24, 26, 34), look: v(24, 0, 0) },
  ].map((shot, i) => {
    // On phones the text sits in the lower half, so lift each subject into the upper half.
    if (narrow && i < 4) shot.look.y -= 1.8;
    return shot;
  });
}

const ease = (t: number) => t * t * (3 - 2 * t);

function CameraRig({ animate }: { animate: boolean }) {
  const { camera, size, pointer } = useThree();
  const narrow = size.width < 900;
  const list = useMemo(() => shots(narrow), [narrow]);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const curLook = useRef(list[0].look.clone());
  const first = useRef(true);

  useFrame((_, dt) => {
    const c = Math.max(0, Math.min(list.length - 1, scroll.chapter));
    const i = Math.min(list.length - 2, Math.floor(c));
    const f = ease(c - i);
    pos.lerpVectors(list[i].pos, list[i + 1].pos, f);
    look.lerpVectors(list[i].look, list[i + 1].look, f);
    if (animate && !narrow) {
      pos.x += pointer.x * 0.6;
      pos.y += pointer.y * 0.35;
    }
    if (first.current || !animate) {
      camera.position.copy(pos);
      curLook.current.copy(look);
      first.current = false;
    } else {
      // Frame-rate independent easing, so slow devices still arrive.
      const k = 1 - Math.exp(-Math.min(dt, 0.1) * 5);
      camera.position.lerp(pos, k);
      curLook.current.lerp(look, k);
    }
    camera.lookAt(curLook.current);
  });
  return null;
}

/* ───────────────────────── The world ───────────────────────── */

export function World({ now, animate }: { now: number; animate: boolean }) {
  return (
    <>
      <color attach="background" args={[C.bg]} />
      <fog attach="fog" args={[C.bg, 14, 46]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 10, 6]} intensity={1.6} />
      <directionalLight position={[-6, 4, -6]} intensity={0.35} color={C.teal} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[24, -0.01, 0]}>
        <planeGeometry args={[140, 60]} />
        <meshStandardMaterial color="#0e1c29" roughness={0.95} />
      </mesh>
      <Ring now={now} animate={animate} />
      <Server animate={animate} />
      <BuyX animate={animate} />
      <MMCC animate={animate} />
      <CameraRig animate={animate} />
    </>
  );
}
