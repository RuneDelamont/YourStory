import React, {useState } from 'react';
import { useDispatch } from 'react-redux'
// import * as sessionActions from '../../../store/session';
import * as sessionActions from "../../../store/session";
import './DemoUser.css'

export default function DemoUser () {
    const dispatch = useDispatch();
    const [email] = useState('demo@aa.io');
    const [password] = useState('password');

    const demoLogin = e => {
        e.preventDefault();
        return dispatch(sessionActions.login({ email, password }));
    }

    return (
        <button className='button-demo-user' type='submit' onClick={demoLogin}>Demo User</button>
    )
}

