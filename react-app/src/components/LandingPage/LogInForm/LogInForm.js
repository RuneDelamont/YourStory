import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";

import "./LogInForm.css";

export default function LogInForm() {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const submitAction = async (e) => {
        e.preventDefault();
        setErrors([]);

        const data = await dispatch(sessionActions.login(email, password));

        if (data) {
            setErrors(data)
        }
    }

    return (
        <form id="login-form" onSubmit={submitAction}>
            <ul id='login-errors'>
                {errors.map((error) => { return <li key={error}>{error}</li> })}
            </ul>
            <input
                id='email-input'
                className="log-in-text-input"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                id="password-input"
                className="log-in-text-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button id="login-button" type="submit">Log in</button>
        </form>
    );
}