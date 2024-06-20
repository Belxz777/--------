import { create } from "zustand"

export type State = {
    blocks:any[],
    addBlock:(x:number, y:number, z:number)=>void
}
export type ColorType = "blockTexture" | "green" | "blue";
export const useBlocksState = create((set) => (
   { 
    blocks:[],
    colortipes:"Stone",
    addBlock:(x:number, y:number, z:number,tipe:string)=>set((state: { blocks: any })=>({
        blocks:[...state.blocks, [x,y,z,tipe]]
    })),
    deleteBlock:(x:number, y:number, z:number)=>set((state: { blocks: any })=>({
        blocks:state.blocks.filter((block:any)=>block[0]!==x || block[1]!==y || block[2]!==z)
    })),
    changeColor:(newColor:string)=>set((state: { type: any })=>({
        colortipes:newColor
    }))
}
))
