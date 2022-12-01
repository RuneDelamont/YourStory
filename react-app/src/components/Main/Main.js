import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as sessionActions from '../../store/session';
import Navigation from '../Navigation';
import Carousel from '../Carousel/Carousel';

import "./Main.css";


export default function Main() {

    const user = useSelector(state => state.session.user);
    const authors = useSelector(state => Object.values(state.authors));
    const books = useSelector(state => Object.values(state.books));


    const authorNames = [];
    const bookTitles = [];

    authors.forEach(author => {
        authorNames.push(`${author.first_name} ${author.last_name}`);
    })

    books.forEach(book => {
        bookTitles.push(`${book.name}`)
    })


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sessionActions.authenticate());
        dispatch(authorActions.thunkGetAuthors());
        dispatch(bookActions.thunkGetBooks());
    }, [dispatch]);

    if (!user) return (
        <Redirect to='/' />
    )

    return (
        <>
            {/* <Navigation /> */}
            <img id='book-image' src="https://your-story-bucket.s3.us-west-1.amazonaws.com/flipping-pages.jpg" />
            <section id='main-section'>
                <h1 className='main-title'>Authors</h1>
                <Carousel slides={authorNames} />

                <h1 className='main-title'>Books</h1>
                <Carousel slides={bookTitles} />
            </section>
        </>
    );
}