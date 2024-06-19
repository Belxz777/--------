import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Taxi(props:any) {
  const { nodes, materials } = useGLTF('./models/Taxi.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Taxi.geometry}
        material={materials.Mat}
        userData={{ name: 'Taxi' }}
        scale={0.00001}
      />
    </group>
  )
}

useGLTF.preload('./models/Taxi.glb')