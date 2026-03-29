import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Room Shell ─────────────────────────────────────────────────────────────
function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#5c3d2e" roughness={0.95} metalness={0} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <boxGeometry args={[12, 5, 0.15]} />
        <meshStandardMaterial color="#7a5545" roughness={0.9} metalness={0} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 5, 0.15]} />
        <meshStandardMaterial color="#8a6252" roughness={0.9} metalness={0} />
      </mesh>

      {/* Baseboard left */}
      <mesh position={[-5.9, 0.1, 0]}>
        <boxGeometry args={[0.1, 0.2, 10]} />
        <meshStandardMaterial color="#4a2e20" roughness={0.8} />
      </mesh>

      {/* Baseboard back */}
      <mesh position={[0, 0.1, -4.9]}>
        <boxGeometry args={[12, 0.2, 0.1]} />
        <meshStandardMaterial color="#4a2e20" roughness={0.8} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#3d2518" roughness={1} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

// ─── Window ─────────────────────────────────────────────────────────────────
function Window() {
  const frameColor = '#3d2518'
  const glassColor = '#88ccff'

  return (
    <group position={[-5.9, 2.8, -2]}>
      {/* Window recess */}
      <mesh>
        <boxGeometry args={[0.1, 2.4, 2.4]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>
      {/* Glass panes */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.02, 2.0, 2.0]} />
        <meshStandardMaterial color={glassColor} transparent opacity={0.35} roughness={0} metalness={0.1} />
      </mesh>
      {/* Cross frame horizontal */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[0.06, 0.08, 2.0]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>
      {/* Cross frame vertical */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[0.06, 2.0, 0.08]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>
      {/* Outdoor glow behind window */}
      <pointLight position={[1, 0.5, 0]} intensity={0.8} color="#bbddff" distance={4} decay={2} />
    </group>
  )
}

// ─── Curtains ───────────────────────────────────────────────────────────────
function Curtains() {
  const leftRef = useRef()
  const rightRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (leftRef.current) {
      leftRef.current.rotation.z = Math.sin(t * 0.7) * 0.08
    }
    if (rightRef.current) {
      rightRef.current.rotation.z = Math.sin(t * 0.7 + 1) * 0.08
    }
  })

  const curtainColor = '#8b4513'
  const rodColor = '#6b3510'

  return (
    <group position={[-5.75, 3.5, -2]}>
      {/* Curtain rod */}
      <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 3.2, 8]} />
        <meshStandardMaterial color={rodColor} roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Left curtain panel */}
      <group ref={leftRef} position={[-0.8, 0, 0]}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[0.6, 2.8, 0.05]} />
          <meshStandardMaterial color={curtainColor} roughness={0.95} side={THREE.DoubleSide} />
        </mesh>
        {/* Curtain folds */}
        {[-0.25, 0, 0.25].map((x, i) => (
          <mesh key={i} position={[x, -1, 0.03]}>
            <boxGeometry args={[0.15, 2.8, 0.02]} />
            <meshStandardMaterial color="#7a3d10" roughness={0.95} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* Right curtain panel */}
      <group ref={rightRef} position={[0.8, 0, 0]}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[0.6, 2.8, 0.05]} />
          <meshStandardMaterial color={curtainColor} roughness={0.95} side={THREE.DoubleSide} />
        </mesh>
        {[-0.25, 0, 0.25].map((x, i) => (
          <mesh key={i} position={[x, -1, 0.03]}>
            <boxGeometry args={[0.15, 2.8, 0.02]} />
            <meshStandardMaterial color="#7a3d10" roughness={0.95} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// ─── Bed ────────────────────────────────────────────────────────────────────
function Bed() {
  const blanketRef = useRef()

  useFrame(({ clock }) => {
    if (blanketRef.current) {
      blanketRef.current.material.color.setHSL(0.05, 0.6, 0.45 + Math.sin(clock.getElapsedTime() * 0.3) * 0.01)
    }
  })

  return (
    <group position={[-2.5, 0, -3.5]}>
      {/* Bed frame */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.4, 2.2]} />
        <meshStandardMaterial color="#3d1f10" roughness={0.85} />
      </mesh>

      {/* Headboard */}
      <mesh position={[0, 1.1, -1.05]} castShadow>
        <boxGeometry args={[4, 1.4, 0.15]} />
        <meshStandardMaterial color="#5c3020" roughness={0.8} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.3, 2.0]} />
        <meshStandardMaterial color="#f5e6d0" roughness={0.9} />
      </mesh>

      {/* Pillow 1 */}
      <mesh position={[-0.9, 0.8, -0.6]} castShadow>
        <boxGeometry args={[1.2, 0.2, 0.7]} />
        <meshStandardMaterial color="#fff8f0" roughness={0.95} />
      </mesh>

      {/* Pillow 2 */}
      <mesh position={[0.9, 0.8, -0.6]} castShadow>
        <boxGeometry args={[1.2, 0.2, 0.7]} />
        <meshStandardMaterial color="#fff8f0" roughness={0.95} />
      </mesh>

      {/* Blanket */}
      <mesh ref={blanketRef} position={[0, 0.78, 0.3]} castShadow>
        <boxGeometry args={[3.8, 0.12, 1.6]} />
        <meshStandardMaterial color="#b05a3a" roughness={0.92} />
      </mesh>

      {/* Blanket fold detail */}
      <mesh position={[0, 0.85, -0.1]}>
        <boxGeometry args={[3.8, 0.08, 0.2]} />
        <meshStandardMaterial color="#9a4a2a" roughness={0.92} />
      </mesh>
    </group>
  )
}

// ─── Desk ────────────────────────────────────────────────────────────────────
function Desk() {
  return (
    <group position={[-2.5, 0, -0.5]}>
      {/* Desktop */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 1.4]} />
        <meshStandardMaterial color="#6b3f22" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Legs */}
      {[[-1.35, 0.6], [1.35, 0.6], [-1.35, -0.6], [1.35, -0.6]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.6, z]} castShadow>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#4a2e18" roughness={0.85} />
        </mesh>
      ))}

      {/* Desk lamp base */}
      <mesh position={[-1.0, 1.28, -0.4]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.06, 12]} />
        <meshStandardMaterial color="#8b6914" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Lamp arm */}
      <mesh position={[-1.0, 1.6, -0.4]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
        <meshStandardMaterial color="#8b6914" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Lamp head */}
      <mesh position={[-1.0, 2.05, -0.4]} castShadow>
        <coneGeometry args={[0.2, 0.3, 12]} />
        <meshStandardMaterial color="#ffdd99" emissive="#ffaa44" emissiveIntensity={1.5} roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Lamp shade */}
      <mesh position={[-1.0, 1.95, -0.4]} castShadow>
        <cylinderGeometry args={[0.22, 0.15, 0.2, 12, 1, true]} />
        <meshStandardMaterial color="#f5e6c8" emissive="#ffcc88" emissiveIntensity={0.8} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Monitor */}
      <group position={[0.3, 1.35, -0.3]}>
        {/* Monitor back/frame */}
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.75, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.1, 0.65, 0.01]} />
          <meshStandardMaterial color="#2a4060" emissive="#1a3050" emissiveIntensity={0.5} roughness={0.1} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.45, 0]} castShadow>
          <boxGeometry args={[0.06, 0.15, 0.06]} />
          <meshStandardMaterial color="#222" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[0.3, 0.04, 0.2]} />
          <meshStandardMaterial color="#222" roughness={0.5} metalness={0.4} />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[0.3, 1.27, 0.3]} castShadow>
        <boxGeometry args={[0.7, 0.03, 0.25]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Coffee mug */}
      <mesh position={[1.2, 1.3, 0.2]} castShadow>
        <cylinderGeometry args={[0.07, 0.06, 0.12, 12]} />
        <meshStandardMaterial color="#e8d5b0" roughness={0.7} />
      </mesh>
      <mesh position={[1.2, 1.38, 0.2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.01, 12]} />
        <meshStandardMaterial color="#4a2e10" roughness={0.9} />
      </mesh>

      {/* Books stack */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[1.1, 1.26 + i * 0.05, -0.5]} castShadow>
          <boxGeometry args={[0.35, 0.05, 0.25]} />
          <meshStandardMaterial
            color={['#8b3a2a', '#2a5a3a', '#3a2a6a'][i]}
            roughness={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── Chair ───────────────────────────────────────────────────────────────────
function Chair() {
  return (
    <group position={[-1.0, 0, 0.4]}>
      {/* Seat */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.08, 0.7]} />
        <meshStandardMaterial color="#5c3820" roughness={0.85} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 1.35, -0.3]} castShadow>
        <boxGeometry args={[0.7, 0.7, 0.08]} />
        <meshStandardMaterial color="#5c3820" roughness={0.85} />
      </mesh>

      {/* Legs */}
      {[[-0.28, 0.28], [0.28, 0.28], [-0.28, -0.28], [0.28, -0.28]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.45, z]} castShadow>
          <boxGeometry args={[0.06, 0.9, 0.06]} />
          <meshStandardMaterial color="#3d2515" roughness={0.85} />
        </mesh>
      ))}
    </group>
  )
}

// ─── Bookshelf ───────────────────────────────────────────────────────────────
function Bookshelf() {
  const books = [
    { x: -4.5, w: 0.15, h: 0.7, color: '#8b3a2a' },
    { x: -4.3, w: 0.12, h: 0.6, color: '#2a6a4a' },
    { x: -4.15, w: 0.18, h: 0.75, color: '#3a3a8b' },
    { x: -3.92, w: 0.1, h: 0.55, color: '#8b6914' },
    { x: -3.78, w: 0.14, h: 0.65, color: '#6a2a6a' },
    { x: -3.6, w: 0.16, h: 0.7, color: '#2a4a6a' },
  ]

  const shelves = [-0.6, 0.4, 1.4]

  return (
    <group position={[0, 0, -4.7]}>
      {/* Frame sides */}
      <mesh position={[-0.5, 1.3, 0]} castShadow>
        <boxGeometry args={[0.1, 2.8, 1.2]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.85} />
      </mesh>
      <mesh position={[0.5, 1.3, 0]} castShadow>
        <boxGeometry args={[0.1, 2.8, 1.2]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.85} />
      </mesh>

      {/* Shelves */}
      {shelves.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.08, 1.2]} />
          <meshStandardMaterial color="#5c3820" roughness={0.85} />
        </mesh>
      ))}

      {/* Top */}
      <mesh position={[0, 2.6, 0]} castShadow>
        <boxGeometry args={[1.1, 0.08, 1.2]} />
        <meshStandardMaterial color="#5c3820" roughness={0.85} />
      </mesh>

      {/* Books — shelf 1 */}
      {books.map((b, i) => (
        <mesh key={`b1-${i}`} position={[b.x, shelves[0] + b.h / 2 + 0.04, 0.1]} castShadow>
          <boxGeometry args={[b.w, b.h, 0.8]} />
          <meshStandardMaterial color={b.color} roughness={0.85} />
        </mesh>
      ))}

      {/* Books — shelf 2 */}
      {books.slice(1).map((b, i) => (
        <mesh key={`b2-${i}`} position={[b.x + 0.1, shelves[1] + b.h / 2 + 0.04, 0.1]} castShadow>
          <boxGeometry args={[b.w, b.h * 0.9, 0.8]} />
          <meshStandardMaterial color={['#aa5522', '#225588', '#558822', '#882266', '#6688aa'][i]} roughness={0.85} />
        </mesh>
      ))}

      {/* Small plant on top shelf */}
      <group position={[0.2, 2.65, 0]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.08, 0.12, 8]} />
          <meshStandardMaterial color="#6b3f22" roughness={0.8} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[Math.cos(i * 1.57) * 0.06, 0.1, Math.sin(i * 1.57) * 0.06]} rotation={[0.5, i * 1.57, 0]}>
            <sphereGeometry args={[0.07, 6, 6]} />
            <meshStandardMaterial color="#3a7a3a" roughness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// ─── Rug ─────────────────────────────────────────────────────────────────────
function Rug() {
  return (
    <group>
      {/* Main rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, 0.01, -0.5]} receiveShadow>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial color="#7a3a5a" roughness={0.98} />
      </mesh>
      {/* Rug border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, 0.012, -0.5]}>
        <planeGeometry args={[5.6, 4.6]} />
        <meshStandardMaterial color="#9a4a6a" roughness={0.98} />
      </mesh>
      {/* Inner pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, 0.013, -0.5]}>
        <planeGeometry args={[4.8, 3.8]} />
        <meshStandardMaterial color="#6a2a4a" roughness={0.98} />
      </mesh>
      {/* Center diamond */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, 0.014, -0.5]}>
        <planeGeometry args={[2.5, 2]} />
        <meshStandardMaterial color="#8a4a5a" roughness={0.98} />
      </mesh>
    </group>
  )
}

// ─── Candle ──────────────────────────────────────────────────────────────────
function Candle() {
  const flameRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (flameRef.current) {
      flameRef.current.scale.x = 1 + Math.sin(t * 9) * 0.2
      flameRef.current.scale.y = 1 + Math.sin(t * 7) * 0.15
      flameRef.current.rotation.z = Math.sin(t * 5) * 0.2
    }
  })

  return (
    <group position={[2.2, 1.06, -1.8]}>
      {/* Candle body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.35, 12]} />
        <meshStandardMaterial color="#f5e6d0" roughness={0.9} />
      </mesh>

      {/* Flame */}
      <group ref={flameRef} position={[0, 0.22, 0]}>
        <mesh>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ffdd44" emissive="#ffaa22" emissiveIntensity={3} roughness={0.2} transparent opacity={0.9} />
        </mesh>
        <mesh scale={[1, 1.5, 1]} position={[0, 0.04, 0]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial color="#ff8800" emissive="#ff6600" emissiveIntensity={4} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Candle plate */}
      <mesh position={[0, -0.175, 0]} receiveShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 12]} />
        <meshStandardMaterial color="#c8a870" roughness={0.4} metalness={0.5} />
      </mesh>
    </group>
  )
}

// ─── Plants ─────────────────────────────────────────────────────────────────
function Plant({ position, scale = 1 }) {
  const leavesRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (leavesRef.current) {
      leavesRef.current.rotation.z = Math.sin(t * 0.8 + position[0]) * 0.08
    }
  })

  return (
    <group position={position} scale={scale}>
      {/* Pot */}
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.28, 12]} />
        <meshStandardMaterial color="#b07040" roughness={0.8} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 12]} />
        <meshStandardMaterial color="#3d2a1a" roughness={1} />
      </mesh>

      {/* Leaves */}
      <group ref={leavesRef} position={[0, 0.2, 0]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[Math.cos(i * 1.257) * 0.1, 0.25 + i * 0.05, Math.sin(i * 1.257) * 0.1]}
            rotation={[0.6, i * 1.257, 0.3]}
          >
            <sphereGeometry args={[0.12, 6, 6]} />
            <meshStandardMaterial color="#3a7a3a" roughness={0.85} />
          </mesh>
        ))}
        {/* Center tall leaf */}
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshStandardMaterial color="#4a8a4a" roughness={0.85} />
        </mesh>
      </group>
    </group>
  )
}

// ─── Floor Lamp ─────────────────────────────────────────────────────────────
function FloorLamp() {
  const shadeRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (shadeRef.current) {
      shadeRef.current.material.emissiveIntensity = 0.6 + Math.sin(t * 1.5) * 0.1
    }
  })

  return (
    <group position={[4, 0, -3]}>
      {/* Base */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.1, 12]} />
        <meshStandardMaterial color="#3d2515" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Pole */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
        <meshStandardMaterial color="#8b6914" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Lamp shade */}
      <mesh ref={shadeRef} position={[0, 2.55, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.2, 0.4, 12, 1, true]} />
        <meshStandardMaterial
          color="#f5e6c8"
          emissive="#ffcc88"
          emissiveIntensity={0.6}
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Shade top ring */}
      <mesh position={[0, 2.73, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.03, 12]} />
        <meshStandardMaterial color="#8b6914" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  )
}

// ─── Nightstand ─────────────────────────────────────────────────────────────
function Nightstand() {
  return (
    <group position={[1.2, 0, -2.6]}>
      {/* Body */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.9, 0.6]} />
        <meshStandardMaterial color="#5c3820" roughness={0.85} />
      </mesh>

      {/* Top surface */}
      <mesh position={[0, 0.91, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.85, 0.05, 0.65]} />
        <meshStandardMaterial color="#6b3f22" roughness={0.8} />
      </mesh>

      {/* Drawer front */}
      <mesh position={[0, 0.55, 0.31]} castShadow>
        <boxGeometry args={[0.7, 0.28, 0.04]} />
        <meshStandardMaterial color="#6b4020" roughness={0.85} />
      </mesh>

      {/* Drawer handle */}
      <mesh position={[0, 0.55, 0.34]}>
        <boxGeometry args={[0.2, 0.04, 0.03]} />
        <meshStandardMaterial color="#c8a870" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Lower drawer */}
      <mesh position={[0, 0.2, 0.31]} castShadow>
        <boxGeometry args={[0.7, 0.28, 0.04]} />
        <meshStandardMaterial color="#6b4020" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.2, 0.34]}>
        <boxGeometry args={[0.2, 0.04, 0.03]} />
        <meshStandardMaterial color="#c8a870" roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  )
}

// ─── Wall Art ────────────────────────────────────────────────────────────────
function WallArt() {
  return (
    <group position={[0, 3, -4.9]}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[1.6, 1.1, 0.06]} />
        <meshStandardMaterial color="#3d2518" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Canvas */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[1.4, 0.9, 0.01]} />
        <meshStandardMaterial color="#e8d5b0" roughness={0.95} />
      </mesh>
      {/* Abstract sun/moon — circles made with torus */}
      <mesh position={[-0.2, 0.1, 0.05]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#f5c87a" emissive="#f5a050" emissiveIntensity={0.3} roughness={0.8} />
      </mesh>
      {/* Mountains — triangular prisms */}
      <mesh position={[0.3, -0.15, 0.05]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.3, 0.5, 4]} />
        <meshStandardMaterial color="#6a8a7a" roughness={0.9} />
      </mesh>
      <mesh position={[0.6, -0.25, 0.05]}>
        <coneGeometry args={[0.2, 0.35, 4]} />
        <meshStandardMaterial color="#5a7a6a" roughness={0.9} />
      </mesh>
    </group>
  )
}

// ─── Small Decor Items ───────────────────────────────────────────────────────
function DecorItems() {
  return (
    <group>
      {/* Small vase on nightstand */}
      <mesh position={[1.5, 0.97, -2.5]} castShadow>
        <cylinderGeometry args={[0.06, 0.04, 0.15, 10]} />
        <meshStandardMaterial color="#7a9aaa" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Tiny flower in vase */}
      <mesh position={[1.5, 1.1, -2.5]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#cc6688" roughness={0.8} />
      </mesh>

      {/* Teddy bear on bed — simplified */}
      <group position={[-3.5, 0.95, -2.8]}>
        {/* Body */}
        <mesh castShadow>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#c8a070" roughness={0.9} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <sphereGeometry args={[0.13, 8, 8]} />
          <meshStandardMaterial color="#c8a070" roughness={0.9} />
        </mesh>
        {/* Ears */}
        {[-1, 1].map((x, i) => (
          <mesh key={i} position={[x * 0.1, 0.33, 0]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshStandardMaterial color="#b89060" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Throw blanket on chair */}
      <mesh position={[-1.0, 0.94, 0.4]} castShadow>
        <boxGeometry args={[0.6, 0.04, 0.5]} />
        <meshStandardMaterial color="#8a5a3a" roughness={0.95} />
      </mesh>
    </group>
  )
}

// ─── Main CozyRoom ───────────────────────────────────────────────────────────
export default function CozyRoom() {
  return (
    <group>
      <Room />
      <Window />
      <Curtains />
      <Bed />
      <Desk />
      <Chair />
      <Bookshelf />
      <Rug />
      <Candle />
      <FloorLamp />
      <Nightstand />
      <WallArt />
      <DecorItems />
      <Plant position={[4.5, 0, -1.5]} scale={1.2} />
      <Plant position={[4.5, 0, -0.3]} scale={0.9} />
      <Plant position={[4.2, 0, 0.8]} scale={0.7} />
    </group>
  )
}
