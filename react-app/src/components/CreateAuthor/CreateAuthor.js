import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import * as authorActions from '../../store/author';



import "./CreateAuthor.css";

export default function CreateAuthor() {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.session.user.id)
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [penName, setPenName] = useState('');

    const submitAction = async e => {
        e.preventDefault();

        setErrors([]);
        const author = {firstName, lastName, email, penName};

        const data = await dispatch(authorActions.thunkCreateAuthor(author))
        console.log(data);

        if(data){
            setErrors(data);
        }
    }


    return (
        <form className='author-form' onSubmit={submitAction}>
        {/* <h1 id='author-form-header'>Create Account</h1> */}
        <ul id='author-form-errors'>
            {errors.map((error, id) => <li key={id}>{error}</li>)}
        </ul>
        <input className='author-form-text-input'
            placeholder='First Name'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
        />
        <input className='author-form-text-input'
            placeholder='Last Name'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
        />
        <input className='author-form-text-input'
            placeholder='E-mail'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input className='author-form-text-input'
            placeholder='Pen Name'
            type="text"
            value={penName}
            onChange={(e) => setPenName(e.target.value)}
        />
        <button id='author-form-button' type='submit'>Sign Up</button>

    </form>
    );

}