import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Box3, Vector3 } from 'three'
import './Mathan3D.css'

const MODEL_URL = '/Mathan.glb'
const TARGET_SIZE = 0.7   // smaller = model occupies less of the frame
const Y_LIFT = 0.1        // positive = move model up in the canvas

function Model({ idleSpin = 0.25 }) {
  const { scene } = useGLTF(MODEL_URL)
  const ref = useRef()

  const fit = useMemo(() => {
    const box = new Box3().setFromObject(scene)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const scale = TARGET_SIZE / maxDim
    const offset = center.clone().multiplyScalar(-scale)
    offset.y += Y_LIFT
    return { scale, offset }
  }, [scene])

  // Gentle idle rotation — OrbitControls override when user is dragging.
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * idleSpin
  })

  return (
    <group ref={ref} scale={fit.scale} position={fit.offset}>
      <primitive object={scene} />
    </group>
  )
}

export default function Mathan3D() {
  return (
    <div className="holo">
      {/* Scanlines overlay across the hologram column */}
      <span className="holo__scanlines" aria-hidden />
      <span className="holo__flicker" aria-hidden />

      <div className="holo__canvas">
        <Canvas
          camera={{ position: [0, 0, 2.6], fov: 28 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.55} />
            <directionalLight position={[3, 4, 5]} intensity={1.35} />
            <directionalLight position={[-4, 2, -3]} intensity={0.7} />
            <directionalLight position={[0, -3, 2]} intensity={0.25} />
            <Model />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.9}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={(2 * Math.PI) / 3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Hologram base/pedestal — sits beneath the model */}
      <div className="holo__base" aria-hidden>
        <span className="holo__beam" />
        <span className="holo__ring holo__ring--1" />
        <span className="holo__ring holo__ring--2" />
        <span className="holo__ring holo__ring--3" />
        <span className="holo__particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <i key={i} style={{
              left: `${(i * 27) % 100}%`,
              animationDelay: `${(i % 6) * 0.4}s`,
              animationDuration: `${3 + (i % 4) * 0.6}s`,
            }} />
          ))}
        </span>
      </div>

      <span className="holo__hud" aria-hidden>
        <span className="holo__hud-dot" /> HOLO · v01 · DRAG TO ROTATE
      </span>
    </div>
  )
}

useGLTF.preload(MODEL_URL)
