
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import "./Navigation.css"

const Navigation = () => {
  return (
    <nav id="Navigation">
      <div className='nav-links'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>

          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>

          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>

          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>

          <LogoutButton />
      </div>

    </nav>
  );
}

export default Navigation;
