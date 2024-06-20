
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { usePlayerControls } from '../components/utils/controller';
import { RigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useRapier } from '@react-three/rapier';
import { Ray } from '@dimforge/rapier3d-compat';
const BaseCharacter = (props: any) => {
    const direction = new Vector3();
    const frontVector = new Vector3();
    const sideVector = new Vector3();
    const speed = new Vector3();
    const SPEED = 5;

    const { camera } = useThree();

    const ref = useRef<any>(null);
  let { forward, backward, left, right, jump,reload,change } = usePlayerControls();
    const { world, setWorld, rapier } = useRapier();
    const checkGrounded = (): boolean |null => {
        if (!ref.current) return false;
        // const origin = ref.current.translation();
        // console.log('Ray Origin:', origin.y);
        // // const ray = new Ray(origin.y, { x: 0, y: -1, z: 0 });
        // // console.log(ray)
        // // const hit = world.castRay(ray, 1.5, true);
        // const grounded =origin.y > 1
        // console.log('Ray Hit:', hit);
        // return hit !== null && hit.collider !== null && hit.toi <= 1.5;
    
        const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }),10,true);
        const grounded = ray && ray.collider && Math.abs(ray.timeOfImpact) <= 1.5;
        return grounded 
    };

    const doJump = () => {
        if (ref.current) {
            ref.current.setLinvel({ x: ovelocity.current[0], y: 8, z: ovelocity.current[2] });
        }
    };
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
        if (jump && Math.abs(ovelocity.current[1]) < 0.05) ref.current.setLinvel({ x: ovelocity.current[0], y: 4, z: ovelocity.current[2] });
        // if (jump && Math.abs(ovelocity.current[1]) < 0.05 ) {
        //     ref.current.setLinvel({ x: ovelocity.current[0], y: 5, z: ovelocity.current[2] });
        //     // console.log(ref.current.linvel().y)
        // }
 
        ovelocity.current = [velocity.x, velocity.y, velocity.z];

        const grounded = checkGrounded();
        if (jump && grounded) {
            doJump();
        }

        if (reload) {
            ref.current.setTranslation({ x: 0, y: 0, z: 0 });
        }
    
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