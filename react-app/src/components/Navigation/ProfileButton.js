import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';


export default function ProfileButton() {
    const user = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () =>{
        if(showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu]);

    return(
        <>
            <img onClick={openMenu} id='profile-logo' src='https://your-story-bucket.s3.us-west-1.amazonaws.com/profile-logo.png' />
            {showMenu  && (
                <div id='user-dropdown'>
                    <NavLink to={`/my`}><button className='button-nav'>My Profile</button></NavLink>
                    <LogoutButton />
                </div>
            )}
        </>
    )
}