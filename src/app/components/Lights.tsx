import React from 'react'

type Props = {}

function Lights({}: Props) {
  return (
    <>
    <ambientLight intensity={1} />
    <spotLight penumbra={0.5} position={[10, 10, 5]} castShadow />
  </>
  )
}

export default Lights