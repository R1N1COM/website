'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { World } from './World';

export default function Stage({ now, animate, paused }: { now: number; animate: boolean; paused: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={paused ? 'never' : 'always'}
      camera={{ position: [-3.4, 6.2, 9.6], fov: 38, near: 0.1, far: 120 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <World now={now} animate={animate} />
      <EffectComposer multisampling={4}>
        <Bloom intensity={0.7} luminanceThreshold={0.62} luminanceSmoothing={0.2} mipmapBlur />
        <Vignette offset={0.25} darkness={0.55} />
      </EffectComposer>
    </Canvas>
  );
}
