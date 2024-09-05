import { OrbitControls } from '@react-three/drei'
import React from 'react'
import { CameraProps } from '../../../interfaces/props/Camera.interface'
import { CameraAdjuster } from '../CameraAdjuster/CameraAdjuster'

const CameraSettings: React.FC<CameraProps> = ({ dimensions }) => {
  return (
    <>
      <CameraAdjuster dimensions={dimensions} />
      <OrbitControls />
    </>
  )
}

export default CameraSettings
