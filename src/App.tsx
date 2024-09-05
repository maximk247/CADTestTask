import { Canvas } from '@react-three/fiber'
import axios from 'axios'
import React, { useState } from 'react'
import './App.css'
import CameraSettings from './components/camera/CameraSettings/CameraSettings'
import { BoxGeometry } from './components/geometry/BoxGeometry/BoxGeometry'
import LightsBox from './components/lights/LightBox/LightsBox'
import Side from './components/side/Side/Side'
import { ThemeMode } from './enums/theme-mode.enum'
import { AppState } from './interfaces/App.interface'
import {
  getInitialDimensions,
  getInitialIndices,
  getInitialInputValues,
  getInitialVertices,
} from './utils/initialValues'

const App: React.FC = () => {
  const [vertices, setVertices] = useState<AppState['vertices']>(getInitialVertices)
  const [indices, setIndices] = useState<AppState['indices']>(getInitialIndices)
  const [dimensions, setDimensions] = useState<AppState['dimensions']>(getInitialDimensions)
  const [inputValues, setInputValues] = useState<AppState['inputValues']>(getInitialInputValues)
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.Dark)

  const onFinish = () => {
    axios
      .post('http://localhost:5000/api/triangulate', inputValues)
      .then(response => {
        setVertices(response.data.vertices)
        setIndices(response.data.indices)
        setDimensions(inputValues)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark))
  }

  return (
    <div className={`app ${themeMode === ThemeMode.Dark ? 'dark-theme' : 'light-theme'}`}>
      <div className='app-container'>
        <Side
          inputValues={inputValues}
          setInputValues={setInputValues}
          onFinish={onFinish}
          isDarkMode={themeMode === ThemeMode.Dark}
          toggleTheme={toggleTheme}
        />

        <Canvas
          shadows
          style={{
            height: '100vh',
            width: '100%',
            background: themeMode === ThemeMode.Dark ? '#1b2b34' : '#d3d3d3',
          }}
          camera={{ position: [10, 10, 10], fov: 50 }}
        >
          <LightsBox />
          <CameraSettings dimensions={dimensions} />

          {vertices.length > 0 && indices.length > 0 && (
            <BoxGeometry vertices={vertices} indices={indices} />
          )}
        </Canvas>
      </div>
    </div>
  )
}

export default App
