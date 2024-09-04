import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'

type BoxGeometryProps = {
  vertices: number[] // вершины куба, полученные с сервера
  indices: number[] // индексы треугольников для рендеринга
  castShadow?: boolean
}

export const BoxGeometry: React.FC<BoxGeometryProps> = ({
  vertices,
  indices,
  castShadow,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  const geometry = useMemo(() => {
    const bufferGeometry = new THREE.BufferGeometry()

    // передаем позиции вершин
    const verticesFloatArray = new Float32Array(vertices)
    bufferGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(verticesFloatArray, 3),
    )

    // передаем индексы для создания треугольников
    const indexArray = new Uint16Array(indices)
    bufferGeometry.setIndex(new THREE.BufferAttribute(indexArray, 1))

    // вычисление нормалей для каждой грани
    bufferGeometry.computeVertexNormals()

    return bufferGeometry
  }, [vertices, indices])

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      castShadow={castShadow}
      receiveShadow
    >
      <meshStandardMaterial color='orange' flatShading={true} />

      {/* Wireframe для отображения треугольников (убедиться, что 3D объект состоит из треугольников)
      <meshStandardMaterial
        color="orange"
        wireframe={true}
      /> */}
    </mesh>
  )
}
