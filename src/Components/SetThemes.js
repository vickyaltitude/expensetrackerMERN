import React from 'react'
import './SetTheme.css';
import { useSelector } from 'react-redux';

const SetThemes = ({children}) => {

    const isDark = useSelector(state => state.theme.darkTheme)
    
  return (
    <div className={isDark ? "dark-theme-container" : "light-theme-container"}>
        {children}
    </div>
  )
}

export default SetThemes