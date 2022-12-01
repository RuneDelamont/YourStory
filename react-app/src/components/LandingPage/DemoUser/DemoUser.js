import React, {useState } from 'react';
import { useDispatch } from 'react-redux'
// import * as sessionActions from '../../../store/session';
import * as sessionActions from "../../../store/session";
import './DemoUser.css'

export default function DemoUser () {
    const [email] = useState('demo@aa.io');
    const [password] = useState('password');
    const dispatch = useDispatch();

    const demoLogin = async e => {
        e.preventDefault();
        return await dispatch(sessionActions.login( email, password ));
    }

    return (
        <button className='button-demo-user' type='submit' onClick={demoLogin}>Demo User</button>
    )
}

