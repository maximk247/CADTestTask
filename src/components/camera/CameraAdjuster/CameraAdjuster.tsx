import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { CameraProps } from '../../../interfaces/props/Camera.interface'

export const CameraAdjuster: React.FC<CameraProps> = ({ dimensions }) => {
  const { camera } = useThree()

  useEffect(() => {
    // рассчитываем максимальный размер объекта и устанавливаем позицию камеры
    const maxDimension = Math.max(dimensions.length, dimensions.width, dimensions.height)
    const newCameraDistance = maxDimension * 2 // увеличиваем расстояние камеры пропорционально
    camera.position.set(newCameraDistance, newCameraDistance, newCameraDistance)
    camera.updateProjectionMatrix()
  }, [dimensions, camera])

  return null
}
