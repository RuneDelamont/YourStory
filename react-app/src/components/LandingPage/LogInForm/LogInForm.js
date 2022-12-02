import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";

import "./LogInForm.css";

export default function LogInForm() {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const submitAction = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login( email, password ))
            .catch(async (res) => {
                const data = await res.json();
                console.log(data, 'data');
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <form id="login-form" onSubmit={submitAction}>
            <ul>
                {errors.map((error) => { return <li key={error}>{error}</li> })}
            </ul>
            <input
                className="log-in-text-input"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                className="log-in-text-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button id="Login-button" type="submit">Log in</button>
        </form>
    );
}