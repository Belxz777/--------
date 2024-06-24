"use client"
import React, { use, useEffect, useState } from 'react';
import { useBlocksState } from '@/app/state';
import { usePlayerControls } from '../utils/controller';
import { useTexture } from '@react-three/drei'
import stone from '../../../../public/textures/blockTexture.png'

import wood from '../../../../public/textures/wood.jpg'
import glass from '../../../../public/textures/glass.jpg'


const MaterialMenu = () => {
const changeMaterial = useBlocksState((state: any) => state.changeColor);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
const current = useBlocksState((state: any) => state.colortipes)
    const [materialIndex, setMaterialIndex] = useState(0);
  const materials = ['Stone', 'Glass', 'Wood'];
  let {change,car } = usePlayerControls();
  useEffect(()=>{
    let prev =0
    if(materialIndex == materials.length){
        // alert(
        //   ` ${ materials.length},${materialIndex}`
        // )
        setMaterialIndex(0);
        // alert(materialIndex)
        changeMaterial(materials[materialIndex]);
        return;
      }

      setMaterialIndex((materialIndex + 1) % materials.length);
    changeMaterial(materials[materialIndex]);
    return
  },[change])
  useEffect(()=>{
    alert("df")
},[car])
//   const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
//        alert(
//     event.key
//       )
//     if (event.key === 'Tab') {
//       setMaterialIndex((materialIndex + 1) % materials.length);
//       changeMaterial(materials[materialIndex]);
  
//     }
//   };

  const handleMaterialSelect = (material:any) => {
    setMaterialIndex((materialIndex + 1) % materials.length);
    changeMaterial(materials[materialIndex]);
    // Perform actions with the selected material
  };

  return (
        <div className="absolute flex flex-row justify-center items-center  top-3.5  left-3/4"
    >
            <img
                src={stone.src}
                alt="Stone"
                className="cursor-pointer mx-2"
                title='Stone'
                width={50}
                height={50}
                onClick={() => handleMaterialSelect('material1')}
            />
            <img
                src={glass.src}
                alt="Glass"
                title='Glass'
                className="cursor-pointer mx-2"
                width={50}
                height={50}
                onClick={() => handleMaterialSelect('material2')}
            />
                   <img
                src={wood.src}
                alt="Wood"
                title='Wood'
                className="cursor-pointer mx-2"
                width={50}
                height={50}
                onClick={() => handleMaterialSelect('material3')}
            />
                 <h1>{current}</h1>
            {/* Add more menu items as needed */}
        </div>

  );
};

export default MaterialMenu;
