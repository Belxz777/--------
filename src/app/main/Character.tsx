
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { usePlayerControls } from '../components/utils/controller';
import { RigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useRapier } from '@react-three/rapier';
const BaseCharacter = (props: any) => {
    const direction = new Vector3();
    const frontVector = new Vector3();
    const sideVector = new Vector3();
    const speed = new Vector3();
    const SPEED = 20;

    const { camera } = useThree();

    const ref = useRef<any>(null);
  let { forward, backward, left, right, jump,reload } = usePlayerControls();
    const { world, setWorld, rapier } = useRapier();
    // useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), []);
    const ovelocity = useRef([0, 0, 0]);
    useFrame((state) => {
        if (!ref.current) return;
        const velocity = ref.current.linvel();
        if (ref.current) {
            const position = ref.current.translation();
            camera.position.copy(position).add(new Vector3(0, 2, 0));
        }

        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation);

        ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
        ref.current.wakeUp()
        if (jump && Math.abs(ovelocity.current[1]) < 0.05) ref.current.setLinvel({ x: ovelocity.current[0], y: 5, z: ovelocity.current[2] });
        if (reload) {
            ref.current.setTranslation({ x: 0, y: 0, z: 0 });
        }

//         const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }), 1.5,true);
//         const grounded = ray && ray.collider && ray.timeOfImpact<= 1.5;
// const doJump = () => {
//         ref.current.setLinvel({x: 0, y: 8, z: 0});
//     }
//         if (jump && grounded) doJump();

    
    });

    return (
        <RigidBody
            type="dynamic" mass={1}
            position={[0, 0, 0]}
            ref={ref}
            lockRotations
            >
            <mesh castShadow position={props.position}  >
                <sphereGeometry  />
                <meshStandardMaterial color="#FFFF00" />
            </mesh>
        </RigidBody>
    );
};

export default BaseCharacter;