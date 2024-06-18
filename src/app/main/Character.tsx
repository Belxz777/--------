
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { usePlayerControls } from '../components/utils/controller';
import { RigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';
const BaseCharacter = (props: any) => {
    const direction = new Vector3();
    const frontVector = new Vector3();
    const sideVector = new Vector3();
    const speed = new Vector3();
    const SPEED = 5;

    const { camera } = useThree();

    const ref = useRef<any>(null);
    const { forward, backward, left, right, jump } = usePlayerControls();
    // useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), []);
    const ovelocity = useRef([0, 0, 0]);
    useFrame((state) => {
        if (!ref.current) return;
        // if (ref.current) {
        //     console.log(ref)
        //     ref.current.getWorldPosition(camera.position);
        // }
        const velocity = ref.current.linvel();
        if (ref.current) {
            const position = ref.current.translation();
            camera.position.copy(position).add(new Vector3(0, 2, 5));
//лабиринт
            }
        
        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);

    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
    ref.current.wakeUp()
        if (jump && Math.abs(ovelocity.current[1]) < 0.05) ref.current.setLinvel({ x: ovelocity.current[0], y: 5, z: ovelocity.current[2] });
    });

    return (
        <RigidBody
            type="dynamic" mass={1}
            position={[0, 0, 0]}
            ref={ref}
        
            >
            <mesh castShadow position={props.position}  >
                <sphereGeometry args={props.args} />
                <meshStandardMaterial color="#FFFF00" />
            </mesh>
        </RigidBody>
    );
};

export default BaseCharacter;