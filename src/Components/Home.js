import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {


  return (
    <>
   
   

      <h4>Your profile is incomplete! Please update your profile to continue <NavLink to='/profileupdate'>Click here to update</NavLink></h4>


    </>
  );
};

export default HomePage;



