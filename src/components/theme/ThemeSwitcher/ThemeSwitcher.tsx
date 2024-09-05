import { Switch, Tooltip } from 'antd'
import React from 'react'
import { ThemeSwitcherProps } from '../../../interfaces/props/ThemeSwitcher.interface'
import styles from './ThemeSwitcher.module.css'

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className={styles['theme-switcher']}>
      <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
        <Switch
          checkedChildren='Dark'
          unCheckedChildren='Light'
          checked={isDarkMode}
          onChange={toggleTheme}
        />
      </Tooltip>
    </div>
  )
}

export default ThemeSwitcher
