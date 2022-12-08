import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as authorActions from '../../store/author';



import "./EditAuthorModal.css";

export default function EditAuthorForm({ setShowModal }) {

    let { authorId } = useParams();
    authorId = Number(authorId)
    const author = useSelector(state => state.authors[authorId])
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id)
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState(author.first_name);
    const [lastName, setLastName] = useState(author.last_name);
    const [email, setEmail] = useState(author.email);
    const [penName, setPenName] = useState(author.pen_name);

    const submitAction = async e => {
        e.preventDefault();

        setErrors([]);
        const editedAuthor = {

            first_name: firstName,
            last_name: lastName,
            email: email,
            pen_name: penName
        };

        const data = await dispatch(authorActions.thunkPutAuthor(editedAuthor, authorId));

        if (data) {
            setErrors(data);
        }
        setShowModal(false);
        await dispatch(authorActions.thunkGetAuthors());

        // await history.push('/authors');
    }


    return (
        <form className='edit-author-form' onSubmit={submitAction}>
            <ul id='edit-author-form-errors'>
                {Array.isArray(errors) && errors?.map((error, id) => <li key={id}>{error}</li>)}
            </ul>
            <label for='edit-author-first-name'>First Name</label>
            <input className='edit-author-form-text-input'
                id='edit-author-first-name'
                required
                placeholder={author.first_name}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <label for='edit-author-last-name'>Last Name</label>
            <input className='edit-author-form-text-input'
                id='edit-author-last-name'
                required
                placeholder={author.last_name}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <label for='edit-author-email'>E-mail</label>
            <input className='edit-author-form-text-input'
                id='edit-author-email'
                required
                placeholder={author.email}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label for='edit-author-pen-name'>Pen Name</label>
            <input className='edit-author-form-text-input'
                id='edit-author-pen-name'
                required
                placeholder={author.pen_name}
                type="text"
                value={penName}
                onChange={(e) => setPenName(e.target.value)}
            />
            <button id='edit-author-form-button' type='submit'>Edit Author</button>

        </form>
    );

}