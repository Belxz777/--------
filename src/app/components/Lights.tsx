import React from 'react'

type Props = {}

function Lights({}: Props) {
  return (
    <>
 <ambientLight intensity={0.7} />
 <pointLight castShadow intensity={1} position={[100, 100, 100]} />
  </>
  )
}

export default Lights