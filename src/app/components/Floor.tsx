import { RigidBody } from "@react-three/rapier";

type Props = {
    color:any,
    rotation:any
}
const Floor = ({ color, rotation }: Props) => {
    return (
        <RigidBody type="fixed" colliders="trimesh" >
            <mesh receiveShadow rotation={rotation}
            >
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color="#11F3FA" />
            </mesh>
        </RigidBody>
    );
};

export default Floor;