import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as authorActions from '../../store/author';



import "./CreateAuthorModal.css";

export default function CreateAuthor() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id)
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [penName, setPenName] = useState('');

    const submitAction = async e => {
        e.preventDefault();
        setErrors([]);

        const author = {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            email: email,
            pen_name: penName
        };

        const data = await dispatch(authorActions.thunkCreateAuthor(author));

        if (Array.isArray(data)) {
            setErrors(data);
        }else{
            await dispatch(authorActions.thunkGetAuthors());
            await history.push('/authors');
        }
    }


    return (
        <form className='author-form' onSubmit={submitAction}>
            {/* <h1 id='author-form-header'>Create Account</h1> */}
            <ul id='author-form-errors'>
                {Array.isArray(errors) && errors?.map((error, id) => <li key={id}>{error}</li>)}
            </ul>
            <label htmlFor='create-author-first-name'>First Name</label>
            <input className='author-form-text-input'
                id='create-author-first-name'
                required
                placeholder='First Name'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor='create-author'>Last Name</label>
            <input className='author-form-text-input'
                id='create-author-last-name'
                required
                placeholder='Last Name'
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor='create-author-email'>E-mail</label>
            <input className='author-form-text-input'
                id='create-author-email'
                required
                placeholder='E-mail'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='create-author-pen-name'>Pen Name</label>
            <input className='author-form-text-input'
                id='create-author-pen-name'
                required
                placeholder='Pen Name'
                type="text"
                value={penName}
                onChange={(e) => setPenName(e.target.value)}
            />
            <button id='create-author-button-form' type='submit'>Create Author</button>

        </form>
    );

}