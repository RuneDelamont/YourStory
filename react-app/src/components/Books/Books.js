import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as sessionActions from '../../store/session';
import TemplatePage from "../TemplatePage";

import "./Books.css";

export default function Books() {
    const user = useSelector(state => state.session.user);
    const books = useSelector(state => Object.values(state.books));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(bookActions.thunkGetBooks());
    }, [dispatch]);

    if (!user) return (
        <Redirect to='/' />
    )

    return (
        <>
            <TemplatePage />
            <div id='books-section'>
                <h1 id='book-header'>Books</h1>
                <div id='book-div'>
                    {books && Object.entries(books).map(([key, book]) => {
                        return (<section className="book-sections" key={book.id}>
                            <img id='book-section-pic' src='https://your-story-bucket.s3.us-west-1.amazonaws.com/Vintage-Book-Image.jpg' />
                            <NavLink className='book-section-nav' to={`/books/${book.id}`}>{book.name}</NavLink>
                        </section>
                        )
                    }
                    )}
                </div>
            </div>
        </>
    );
}