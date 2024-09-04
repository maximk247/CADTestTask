import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

type CameraAdjusterProps = {
  dimensions: { length: number; width: number; height: number }
}

export const CameraAdjuster: React.FC<CameraAdjusterProps> = ({
  dimensions,
}) => {
  const { camera } = useThree()

  useEffect(() => {
    // рассчитываем максимальный размер объекта и устанавливаем позицию камеры
    const maxDimension = Math.max(
      dimensions.length,
      dimensions.width,
      dimensions.height,
    )
    const newCameraDistance = maxDimension * 2 // увеличиваем расстояние камеры пропорционально
    camera.position.set(newCameraDistance, newCameraDistance, newCameraDistance)
    camera.updateProjectionMatrix()
  }, [dimensions, camera])

  return null
}
