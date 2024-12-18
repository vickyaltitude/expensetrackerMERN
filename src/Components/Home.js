import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        Your profile is incomplete! Please update your profile to continue <NavLink to='/profileupdate'>Click here to update</NavLink>
    </div>
  )
}

export default Home