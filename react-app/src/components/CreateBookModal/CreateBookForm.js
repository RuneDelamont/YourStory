import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as bookActions from '../../store/book';
// import * as authorActions from '../..store/author';

import './CreateBookModal.css';

export default function CreateBookForm(){
    const dispatch = useDispatch();
    const history = useHistory();

    const currentYear  = new Date().getFullYear();

    const userId = useSelector(state => state.session.user.id);
    const [errors, setErrors] = useState([]);
    const [authorId, setAuthorId] = useState(1);
    const [name, setName] = useState('');
    const [publishDate, setPublishDate] = useState(currentYear);

    const authors = useSelector(state => Object.values(state.authors));
    const userAuthors = authors?.filter(author => author.user_id === userId);



    const handleAuthorId = e => {
        setAuthorId(e.target.value);
    }

    const handlePublishDate = e => {
        setPublishDate(e.target.value);
    }
    // console.log(userAuthors);
    const years = [];
    for( let i = 1980; i <= currentYear; i++){
        years.push(i);
    }

    const submitAction = async e => {
        e.preventDefault();

        setErrors([]);
        const book = {
            user_id: userId,
            author_id: authorId,
            name: name,
            publish_date: publishDate
        };

        const data = await dispatch(bookActions.thunkCreateBook(book));
        if(data){
            setErrors(data);
        }
        await dispatch(bookActions.thunkGetBooks());
        await history.push('/books');
    }

    return (
        <form className='create-book-form' onSubmit={submitAction}>
        {/* <h1 id='create-book-form-header'>Create Account</h1> */}
        <ul id='create-book-form-errors'>
            {Array.isArray(errors) && errors?.map((error, id) => <li key={id}>{error}</li>)}
        </ul>
        <label for="create-book-form-name">Name</label>
        <input className='create-book-form-text-input'
            id="create-book-form-name"
            required
            placeholder='Name'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <label for="create-book-form-author-id">Author</label>
        <select 
            className="create-book-form-select" 
            id="create-book-form-author-id"
            value={authorId} 
            onChange={handleAuthorId} 
            required
        >
            {userAuthors?.map(author => {
                return(
                    <option className="book-author-option" key={author.id} value={author.id}>
                        {author.pen_name}
                    </option>
                )
            })}
        </select>
        <label for="create-book-form-publish-date">Publish Date</label>
        <select 
            className="create-book-form-select" 
            id="create-book-form-publish-date"
            value={publishDate} 
            onChange={handlePublishDate} 
            required
        >
            {years?.map(year => {
                return(
                    <option className="book-year-option" key={year} value={year}>
                        {year}
                    </option>
                )
            })}
        </select>
        <button id='create-book-button-form' type='submit'>Create Book</button>
    </form>
    );

}