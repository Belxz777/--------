"use client"
import Obstakles from "./main/Obstakles";
import {Scene} from "./components/Scene";
import Floor from "./components/Floor";
import Lights from "./components/Lights";
import { Physics } from "@react-three/rapier";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Clouds, PointerLockControls, Sky, Sparkles, StatsGl } from "@react-three/drei";
import BaseCharacter from "./main/Character";
import { Forest } from "./models/Forest";
import { Taxi } from "./models/Taxi";
import { useRef } from "react";
import { Model } from "./models/Block";
import { Blocks,Block } from "./main/Block";
import MaterialMenu from "./components/viso/inventory";

export default function Home() {
  const ref = useRef()
  const cloud0 = useRef()

  return (
    <div className=" w-screen h-screen overflow-hidden">
        <Canvas shadows camera={{ fov: 50 }}>
          
        <StatsGl />
          <Lights />
        <Physics   >
        <Obstakles  position={[0, 2, 4]} args={[2, 1, 2]} color="red"/>
  <Obstakles  position={[5, 1, 0]} args={[1.5, 2, 1.3]} color="orange" />
  <Obstakles  position={[0, 0.5, 5]} args={[3, 1, 1.3]} color="green" />
  <BaseCharacter controls position={[0, 2, 0]} args={[0.5]} color="yellow" />
  <Forest position={[10,2.2,20]} scale={20}/>
          {Array.from({ length: 3 }, (_, i) => (
            <Block key={i} position={[i * 2, i , i * 2]} />
          ))}

 <Blocks/> 
  <Sparkles scale={20} position={[10,10, 20]}/>
  <Floor rotation={[Math.PI / -2, 0, 0]} color="red"/>
  
        </Physics>

        <axesHelper args={[5]} /> 
               <PointerLockControls />
      <Sky/>
      <Clouds  limit={100} range={100} position={[0, 300, 0]}>
          {/* <Cloud  bounds={[0, 1, 1]} color="#d0d0d0" seed={1} position={[0, 60, 0]} /> */}
          {/* <Cloud color="#fffff" seed={2} position={[15, 60, 0]} />
          <Cloud color="#d0e0d0" seed={3} position={[-15, 60, 0]} />
          <Cloud  color="#a0b0d0" seed={4} position={[0, 60, -12]} />
          <Cloud color="#c0c0dd" seed={5} position={[0, 60, 12]} /> */}
          <Cloud concentrate="inside" growth={100} color="#FDFEFE" opacity={1.25} seed={10} bounds={200} volume={200} 
          />
        </Clouds>
   
    </Canvas> 
    <MaterialMenu />
    </div>
  );
} 
