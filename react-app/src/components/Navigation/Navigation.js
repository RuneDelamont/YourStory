
import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';

import "./Navigation.css"

const Navigation = () => {
  return (
    <nav id="Navigation">

      <NavLink to='/main' exact={true} activeClassName='active'>
        <img title='home' id='home-button' src='https://your-story-bucket.s3.us-west-1.amazonaws.com/book-pen-logo.png' />
      </NavLink>

      {/* <div className='nav-links'> */}
        <NavLink to='/authors' exact={true} activeClassName='active'>
          <button className='button-nav'>
           Authors 
          </button>
        </NavLink>

        <NavLink to='/books' exact={true} activeClassName='active'>
        <button className='button-nav'>
           Books 
          </button>
        </NavLink>


      {/* </div> */}
        <ProfileButton />

    </nav>
  );
}

export default Navigation;
