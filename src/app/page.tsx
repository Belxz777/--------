"use client"
import Obstakles from "./main/Obstakles";
import {Scene} from "./components/Scene";
import Floor from "./components/Floor";
import Lights from "./components/Lights";
import { Physics } from "@react-three/rapier";
import { Canvas } from "@react-three/fiber";
import { PointerLockControls, Sky } from "@react-three/drei";
import BaseCharacter from "./main/Character";

export default function Home() {
  return (
    <div className=" w-screen h-screen">
        <Canvas shadows camera={{ fov: 50 }}>
          <Lights />
        <Physics gravity={[0, -9.81, 0]}  >
        <Obstakles  position={[0, 0.5, 0]} args={[2, 1, 2]} color="red"/>
  <Obstakles  position={[5, 1, 0]} args={[1.5, 2, 1.3]} color="orange" />
  <Obstakles  position={[0, 0.5, 5]} args={[3, 1, 1.3]} color="green" />
  <BaseCharacter controls position={[0, 2, 0]} args={[0.5]} color="yellow" />
  <Floor rotation={[Math.PI / -2, 0, 0]} color="white"/>
        </Physics>
        <PointerLockControls />
        <axesHelper args={[5]} />
      <Sky/>
    </Canvas>
    </div>
  );
} 
