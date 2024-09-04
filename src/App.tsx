import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Button, Form, InputNumber, Switch, Tooltip } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import './App.css'
import { BoxGeometry } from './BoxGeometry'
import { CameraAdjuster } from './CameraAdjuster'

const App: React.FC = () => {
  const [vertices, setVertices] = useState<number[]>([
    // для передней грани
    -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
    // для задней грани
    -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5,
  ])

  const [indices, setIndices] = useState<number[]>([
    // грань передняя
    0, 1, 2, 0, 2, 3,
    // задняя грань
    4, 6, 5, 4, 7, 6,
    // верхняя грань
    3, 2, 6, 3, 6, 7,
    // грань нижняя
    0, 5, 1, 0, 4, 5,
    // левая грань
    0, 3, 7, 0, 7, 4,
    // правая грань
    1, 6, 2, 1, 5, 6,
  ])

  const [dimensions, setDimensions] = useState({
    length: 1,
    width: 1,
    height: 1,
  })

  const [inputValues, setInputValues] = useState({
    length: 1,
    width: 1,
    height: 1,
  })

  const [isDarkMode, setIsDarkMode] = useState(true)

  const onFinish = () => {
    console.log('Sending data to server:', inputValues)
    axios
      .post('http://localhost:5000/api/triangulate', inputValues)
      .then(response => {
        setVertices(response.data.vertices)
        setIndices(response.data.indices)
        setDimensions(inputValues)
        console.log(true)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode)
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className='app-container'>
        <div className='box'>
          <Form layout='vertical' className='box-form' initialValues={inputValues}>
            <Form.Item label='Height'>
              <Tooltip title='Set the height of the box'>
                <InputNumber
                  min={1}
                  value={inputValues.height}
                  onChange={value => setInputValues({ ...inputValues, height: value || 1 })}
                />
              </Tooltip>
            </Form.Item>

            <Form.Item label='Width'>
              <Tooltip title='Set the width of the box'>
                <InputNumber
                  min={1}
                  value={inputValues.width}
                  onChange={value => setInputValues({ ...inputValues, width: value || 1 })}
                />
              </Tooltip>
            </Form.Item>

            <Form.Item label='Length'>
              <Tooltip title='Set the length of the box'>
                <InputNumber
                  min={1}
                  value={inputValues.length}
                  onChange={value => setInputValues({ ...inputValues, length: value || 1 })}
                />
              </Tooltip>
            </Form.Item>

            <Form.Item>
              <Button type='primary' onClick={onFinish}>
                Update Box
              </Button>
            </Form.Item>
          </Form>

          <div className='theme-switcher'>
            <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
              <Switch
                checkedChildren='Dark'
                unCheckedChildren='Light'
                checked={isDarkMode}
                onChange={toggleTheme}
              />
            </Tooltip>
          </div>
        </div>

        <Canvas
          shadows
          style={{
            height: '100vh',
            width: '100%',
            background: isDarkMode ? '#1b2b34' : '#d3d3d3',
          }}
          camera={{ position: [10, 10, 10], fov: 50 }}
        >
          <ambientLight intensity={0.3} />
          {/* основные источники света */}
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.7} />
          <directionalLight position={[5, 2, 2]} intensity={0.6} />
          <directionalLight position={[2, 2, -5]} intensity={0.5} />

          {/* компонент для автоматического изменения камеры */}
          <CameraAdjuster dimensions={dimensions} />

          {/* контроль камеры */}
          <OrbitControls />

          {vertices.length > 0 && indices.length > 0 && (
            <BoxGeometry vertices={vertices} indices={indices} />
          )}
        </Canvas>
      </div>
    </div>
  )
}

export default App
