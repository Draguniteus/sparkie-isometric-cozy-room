import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import CozyRoom from './components/CozyRoom'
import Lighting from './components/Lighting'

export default function App() {
  return (
    <Canvas
      shadows
      camera={{
        position: [10, 8, 10],
        fov: 35,
        near: 0.1,
        far: 200
      }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#1a0f0a']} />
      <fog attach="fog" args={['#1a0f0a', 20, 40]} />
      <Suspense fallback={null}>
        <CozyRoom />
        <Lighting />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.4}
        minDistance={8}
        maxDistance={22}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  )
}
