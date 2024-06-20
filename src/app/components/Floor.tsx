import { useTexture } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import grass from "../../../public/textures/grass.png";
type Props = {
    color:any,
    rotation:any
}
const Floor = ({ color, rotation }: Props) => {
    const texture = useTexture(grass.src)
    
    return (
        <RigidBody type="fixed" colliders="hull">
                 <mesh receiveShadow castShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial map={texture} map-repeat={[200, 10]}  />
      </mesh>
        </RigidBody>
    );
};

export default Floor;