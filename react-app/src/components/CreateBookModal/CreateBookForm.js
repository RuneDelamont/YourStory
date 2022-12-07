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
    // console.log(years);

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
        <form className='book-form' onSubmit={submitAction}>
        {/* <h1 id='book-form-header'>Create Account</h1> */}
        <ul id='book-form-errors'>
            {Array.isArray(errors) && errors?.map((error, id) => <li key={id}>{error}</li>)}
        </ul>
        <input className='book-form-text-input'
            placeholder='Name'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <select className="book-form-select" value={authorId} onChange={handleAuthorId}>
            {userAuthors?.map(author => {
                return(
                    <option className="book-author-option" key={author.id} value={author.id}>
                        {author.pen_name}
                    </option>
                )
            })}
        </select>
        <select className="book-form-select" value={publishDate} onChange={handlePublishDate}>
            {years?.map(year => {
                return(
                    <option className="book-year-option" key={year} value={year}>
                        {year}
                    </option>
                )
            })}
        </select>
        <button id='book-form-button' type='submit'>Create Book</button>
    </form>
    );

}