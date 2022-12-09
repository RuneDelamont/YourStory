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

    // if (!user) return (
    //     <Redirect to='/' />
    // )

    if (!author) return (
        <NotFoundPage />
    )

    return (
        <>
            <TemplatePage />

            <div id='parent-container'>
                <div id='author-container'>
                    <div id='button-pic-container'>

                        {(authorUserID === user?.id) && (
                            <div id='button-div'>

                                <EditAutorModal author={authorId} />
                                <DeleteButton />
                            </div>
                        )}
                        <img id='author-details-pic' src='https://your-story-bucket.s3.us-west-1.amazonaws.com/writer_sihoutte.jpeg' />
                    </div>
                    <section id='author-details'>
                        <h2>Author</h2>
                        <p className='author-text'>first name: {authorFirstName}</p>
                        <p className='author-text'>last name: {authorLastName}</p>
                        <p className='author-text'>pen name: {authorPenName}</p>
                        <p className='author-text'>email: {authorEmail}</p>
                    </section>
                </div>
            </div>
            <div id='author-lists'>
                <div id='author-books'>
                    <h2 className='author-subheaders'>Books</h2>
                    {authorBooks && authorBooks.map(book => {
                        return (
                            <section className='author-books-section' key={book.id}>
                                <img id='author-book-section-pic' src='https://your-story-bucket.s3.us-west-1.amazonaws.com/Vintage-Book-Image.jpg' />
                                <NavLink className='author-books-nav' to={`/books/${book.id}`}>{book.name}</NavLink>
                            </section>
                        )
                    })}
                </div>
            </div>
        </>
    );
}