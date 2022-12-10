import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as bookActions from '../../store/book';

import './EditBookModal.css';

export default function EditBookForm({ setShowModal }) {

    let { bookId } = useParams();
    bookId = Number(bookId);
    const book = useSelector(state => state.books[bookId]);
    const dispatch = useDispatch();
    const history = useHistory();

    const currentYear = new Date().getFullYear();
    const userId = useSelector(state => state.session.user.id);
    const [errors, setErrors] = useState([]);
    const [authorId, setAuthorId] = useState(book.author_id);
    const [name, setName] = useState(book.name);
    const [publishDate, setPublishDate] = useState(book.publish_date);

    const authors = useSelector(state => Object.values(state.authors));
    const userAuthors = authors?.filter(author => author.user_id === userId);

    const handleAuthorId = e => {
        setAuthorId(e.target.value);
    }

    const handlePublishDate = e => {
        setPublishDate(e.target.value);
    }

    const years = [];
    for (let i = 1980; i <= currentYear; i++) {
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

        const data = await dispatch(bookActions.thunkEditBook(book, bookId));
        if (Array.isArray(data)) {
            setErrors(data);
        }else {
            await dispatch(bookActions.thunkGetBooks());
            setShowModal(false);
        }
    }

    return (
        <form className='edit-book-form' onSubmit={submitAction}>
            {/* <h1 id='edit-book-form-header'>Create Account</h1> */}
            <ul id='edit-book-form-errors'>
                {Array.isArray(errors) && errors?.map((error, id) => <li key={id}>{error}</li>)}
            </ul>
            <label htmlFor='edit-book-name'>Name</label>
            <input className='edit-book-form-text-input'
                required
                id='edit-book-name'
                placeholder={book.name}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='edit-book-author'>Author</label>
            <select className="edit-book-form-select" 
                required
                id='edit-book-author'
                value={authorId}
                onChange={handleAuthorId}
            >
                {userAuthors?.map(author => {
                    return (
                        <option className="edit-book-author-option" key={author.id} value={author.id}>
                            {author.pen_name}
                        </option>
                    )
                })}
            </select>
            <label htmlFor='edit-book-name'>Publish Date</label>
            <select className="edit-book-form-select"
                required
                id='edit-book-name' 
                value={publishDate} 
                onChange={handlePublishDate}
            >
                {years?.map(year => {
                    return (
                        <option className="edit-book-year-option" key={year} value={year}>
                            {year}
                        </option>
                    )
                })}
            </select>
            <button id='edit-book-form-button' type='submit'>Edit Book</button>
        </form>
    );
}