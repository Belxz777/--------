import { RigidBody } from '@react-three/rapier'
import React from 'react'

type Props = {
    args: any,
    color: any,
    position: any
}

function Obstakles({ args, color, position }: Props) {
    return (
        <RigidBody type="dynamic" colliders="cuboid" mass={1}>
            <mesh castShadow position={position}
            >
                <boxGeometry args={args} />
                <meshStandardMaterial color={color} />
            </mesh>
        </RigidBody>
    )
}

export default Obstakles