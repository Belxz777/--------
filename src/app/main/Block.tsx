"use client"
import { useCallback, useMemo, useRef, useState } from "react"
import { State, useBlocksState } from "../state"
import { RigidBody } from "@react-three/rapier"
import stone from '../../../public/textures/blockTexture.png'
import wood from '../../../public/textures/wood.jpg'
import glass from '../../../public/textures/glass.jpg'
import { useTexture } from "@react-three/drei"
import { Coming_Soon } from "next/font/google"

export function Blocks(): JSX.Element {
    const stoneTex = useTexture(stone.src)
    const woodTex = useTexture(wood.src)
    const glassTex = useTexture(glass.src)
    const state:any = useBlocksState()
    const cubes = useBlocksState((state: any) => state.blocks)
  
        // cubes.map((coords:any,index:number)=>
        // console.log(coords[3]))
    
    return (
        cubes.map((coords: any, index: number) => (
            
            <Block key={index} position={coords} 
            texture={coords[3] }/>
        ))
        )
}


/**
 * Renders a block component with a customizable texture.
 *
 * @param {object} props - The props for the block component.
 * @param {string} props.position - The position of the block.
 * @param {string} props.texture - The texture of the block, can be "Wood", "Glass", or "Stone".
 * @returns {JSX.Element} - The rendered block component.
 */
export function Block(props: any) {
  const ref = useRef(null)
  const [hover, set] = useState<null | Number>(null)
  const state: any = useBlocksState()
  const stoneTex = useTexture(stone.src);
  const woodTex = useTexture(wood.src);
  const glassTex = useTexture(glass.src);

  // Use useMemo to determine the correct texture based on props.type 
  // This calculation will only re-run if props.type changes.


  const onMove = useCallback((e: any) => {
    e.stopPropagation()
    if (typeof e.faceIndex !== 'undefined') {
      set(Math.floor(e.faceIndex / 2));
    }
    set(Math.floor(e.faceIndex / 2))
  }, [set])
  const onOut = useCallback(() => set(null), [])
  const onClick = useCallback((e: any) => {
    e.stopPropagation();

    // Проверяем, клик левой или правой кнопкой мыши
    if (e.button === 0) { // Левая кнопка - добавление блока
      if (!ref.current) {
        return;
      }
      const { x, y, z } = (ref.current as any).translation();
      const dir = [
        [x + 1, y, z],
        [x - 1, y, z],
        [x, y + 1, z],
        [x, y - 1, z],
        [x, y, z + 1],
        [x, y, z - 1],
      ];
      state.addBlock(...dir[Math.floor(e.faceIndex / 2)], state.colortipes);
    } else if (e.button === 2) { // Правая кнопка - удаление блока
      const { x, y, z } = (ref.current as any).translation();
      // console.log(x,y,z)
      deleteObj(x, y, z)
    }
  }, []);

  const deleteObj = (x: any, y: any, z: any) => {
    state.deleteBlock(x, y, z);
  }
  return (
    <RigidBody {...props} type="kinematicPosition" colliders="cuboid" ref={ref}>
      <mesh receiveShadow castShadow onPointerMove={onMove} onPointerOut={onOut}
        onClick={onClick}
        onContextMenu={(e) => e.nativeEvent.preventDefault()}
      >
        {[...Array(6)].map((_, index) => (
          <meshStandardMaterial
            //  attach={`material-${index}`}
            key={index}
            map={
              props.texture === "Wood" ? woodTex : props.texture === "Glass" ? glassTex : stoneTex
            }
            color={hover === index ? "#ade8f4" : "white"} />
        ))}
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </RigidBody>
  )
}
  