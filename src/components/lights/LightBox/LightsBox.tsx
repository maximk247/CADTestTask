import React from 'react'

const LightsBox: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.7} />
      <directionalLight position={[5, 2, 2]} intensity={0.6} />
      <directionalLight position={[2, 2, -5]} intensity={0.5} />
    </>
  )
}

export default LightsBox
