import React from 'react'

import BoxForm from '../../forms/BoxForm/BoxForm'
import ThemeSwitcher from '../../theme/ThemeSwitcher/ThemeSwitcher'

import styles from './Side.module.css'
interface SideProps {
  inputValues: any
  setInputValues: React.Dispatch<React.SetStateAction<any>>
  onFinish: () => void
  isDarkMode: boolean
  toggleTheme: () => void
}

const Side: React.FC<SideProps> = ({
  inputValues,
  setInputValues,
  onFinish,
  isDarkMode,
  toggleTheme,
}) => {
  return (
    <div className={styles['side-container']}>
      <BoxForm inputValues={inputValues} setInputValues={setInputValues} onFinish={onFinish} />
      <ThemeSwitcher isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  )
}

export default Side
