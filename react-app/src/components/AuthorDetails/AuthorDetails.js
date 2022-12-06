import React, { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as sessionActions from '../../store/session';
import * as userActions from '../../store/user';
import TemplatePage from '../TemplatePage';

import './AuthorDetails.css';

export default function AuthorDetails() {
    const { authorId } = useParams();

    const user = useSelector(state => state.session.user);
    const books = useSelector(state => Object.values(state.books));
    const authors = useSelector(state => Object.values(state.authors));

    // const userAuthors = authors.filter(author => author.user_id === authorId)
    const authorBooks = books.filter(book => book.author_id === Number(authorId))
    const author = useSelector(state => state.authors[authorId]);
    // console.log(authorBooks)
    console.log(author)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authorActions.thunkGetAuthors());
        dispatch(bookActions.thunkGetBooks());
        // dispatch(authorActions.thunkGetAuthor(authorId));
    }, [dispatch])

    // const authorFirstName = author.first_name ? author.first_name : null;
    // const authorLastName = author.last_name ? author.last_name: null;
    // const authorPenName = author.pen_name ? author.pen_name: null;
    // const authorEmail = author.email ? author.email: null;
    


    return (
        <>
            <TemplatePage />
            <div id='author-container'>
                <div id='author-pic'>
                </div>
                <section id='author-details'>
                    <h2> Author</h2>
                    <p className='author-text'>pen name: {author.pen_name}</p>
                    <p className='author-text'>first name: {author.first_name}</p>
                    <p className='author-text'>last name: {author.last_name}</p>
                    <p className='author-text'>email: {author.email}</p>
                </section>
            </div>
            <div id='author-lists'>
                <div id='author-books'>
                    <h3 className='author-subheaders'>Books</h3>
                    {authorBooks && authorBooks.map(book => {
                        return (
                            <section className='author-books-section' key={book.id}>
                                <NavLink to={`/books/${book.id}`}>{book.name}</NavLink>
                            </section>
                        )
                    })}
                </div>
            </div>
        </>
    );
}