import React, { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as sessionActions from '../../store/session';
import * as userActions from '../../store/user';
import TemplatePage from '../TemplatePage';
import EditAutorModal from '../EditAuthorModal';
import DeleteButton from '../DeleteButton';
import NotFoundPage from '../NotFoundPage';

import './AuthorDetails.css';

export default function AuthorDetails() {
    const { authorId } = useParams();


    const user = useSelector(state => state.session.user);
    const books = useSelector(state => Object.values(state.books));
    const authors = useSelector(state => Object.values(state.authors));

    const authorBooks = books?.filter(book => book.author_id === Number(authorId))
    const author = useSelector(state => state.authors[authorId]);



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authorActions.thunkGetAuthors());
        dispatch(bookActions.thunkGetBooks());
        // dispatch(authorActions.thunkGetAuthor(authorId));
    }, [dispatch])

    const authorFirstName = author?.first_name;
    const authorLastName = author?.last_name;
    const authorPenName = author?.pen_name;
    const authorEmail = author?.email; 
    const authorUserID = author?.user_id;
    
    if(!author)  return (
        <NotFoundPage />
    )


    return (
        <>
            <TemplatePage />
            {(authorUserID === user?.id) && (
                <>
                    <EditAutorModal author={authorId}/>
                    <DeleteButton />
                </>
            )}
            <div id='author-container'>
                <div id='author-pic'>
                </div>
                <section id='author-details'>
                    <h2> Author</h2>
                    <p className='author-text'>pen name: {authorFirstName}</p>
                    <p className='author-text'>first name: {authorLastName}</p>
                    <p className='author-text'>last name: {authorPenName}</p>
                    <p className='author-text'>email: {authorEmail}</p>
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