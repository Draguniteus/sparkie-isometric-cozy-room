import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Lighting() {
  const candleLight = useRef()
  const lampLight = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (candleLight.current) {
      candleLight.current.intensity = 1.8 + Math.sin(t * 8) * 0.3 + Math.sin(t * 13) * 0.15
    }
    if (lampLight.current) {
      lampLight.current.intensity = 2.5 + Math.sin(t * 2) * 0.1
    }
  })

  return (
    <>
      {/* Ambient — very soft warm fill */}
      <ambientLight intensity={0.15} color="#3d1f0a" />

      {/* Main ceiling warm point */}
      <pointLight
        position={[0, 5, 0]}
        intensity={0.6}
        color="#ffcc77"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.001}
      />

      {/* Candle flicker light */}
      <pointLight
        ref={candleLight}
        position={[2.2, 1.3, -1.8]}
        intensity={1.8}
        color="#ff8833"
        distance={6}
        decay={2}
        castShadow
        shadow-mapSize={[512, 512]}
      />

      {/* Desk lamp light */}
      <pointLight
        ref={lampLight}
        position={[-2.5, 2.2, -0.8]}
        intensity={2.5}
        color="#ffdd99"
        distance={8}
        decay={2}
        castShadow
        shadow-mapSize={[512, 512]}
      />

      {/* Soft fill from window side */}
      <directionalLight
        position={[5, 4, 3]}
        intensity={0.3}
        color="#ffeebb"
        castShadow={false}
      />
    </>
  )
}
