import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";

import "./SignUpForm.css";

export default function SignUpForm() {

    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const submitAction = async e => {
        e.preventDefault();
        setErrors([]);
        if (password === confirmPassword) {

            const data = await dispatch(sessionActions.signUp(userName, firstName, lastName, email, password))

            if (data) {
                console.log(data);
                return setErrors(data)
            };
        }
        return setErrors(["Password and confirm password must match."]);
    }

    return (
        <form className='sign-up-form' onSubmit={submitAction}>
            {/* <h1 id='sign-up-header'>Create Account</h1> */}
            <ul id='sign-up-errors'>
                {errors.map((error, id) => { return <li key={id}>{error}</li> })}
            </ul>
            <input className='sign-up-text-input'
                required
                placeholder='First Name'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input className='sign-up-text-input'
                required
                placeholder='Last Name'
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input className='sign-up-text-input'
                required
                placeholder='E-mail'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input className='sign-up-text-input'
                placeholder='User Name'
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input className='sign-up-text-input'
                required
                placeholder='Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input className='sign-up-text-input'
                required
                placeholder='Confirm Password'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button id='sign-up-button' type='submit'>Sign Up</button>

        </form>
    )

}