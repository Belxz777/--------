import React from 'react'
import { Canvas } from "@react-three/fiber"
import Lights from './Lights'
import { Physics } from "@react-three/rapier"
import { PointerLockControls} from "@react-three/drei"
import Floor from './Floor'

type Props = {
    children:any
}

export function Scene({ children }: any) {
    return (
        <Canvas shadows camera={{ fov: 50 }}>
            <Lights />
            <Physics gravity={[0, -9.81, 0]}  >
                {children}

            </Physics>
            <PointerLockControls />
            <axesHelper args={[5]} />
        </Canvas>
    )
}
