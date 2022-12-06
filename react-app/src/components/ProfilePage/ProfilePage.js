import React, { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as sessionActions from '../../store/session';
import * as userActions from '../../store/user';
import TemplatePage from '../TemplatePage';
import Carousel from '../Carousel/Carousel';
// import CreateAuthorModal from '../CreateAuthor/CreateAuthor';
// import CreateAuthorModal from '../CreateAuthor/CreateAuthor';
import CreateAuthorModal from '../CreateAuthorModal';
import './ProfilePage.css';

export default function ProfilePage() {
    const user = useSelector(state => state.session.user);
    const books = useSelector(state => Object.values(state.books));
    const authors = useSelector(state => Object.values(state.authors));

    const userAuthors = authors?.filter(author => author.user_id === user?.id)
    const userBooks = books?.filter(book => book.user_id === user?.id)

    const userFirstName = user?.first_name;
    const userLastName = user?.last_name;
    const userEmail = user?.email;
    const userName = user?.username;


    const dispatch = useDispatch();
    // let { albumId } = useParams();
    const history = useHistory();

    useEffect(() => {
        dispatch(userActions.thunkGetUsers())
        dispatch(authorActions.thunkGetAuthors())
        dispatch(bookActions.thunkGetBooks())
        // dispatch(userActions.thunkGetCurrentUser())
    }, [dispatch])


    return (
        <>
            <TemplatePage />
            <div id='button-container'>
                <CreateAuthorModal />
                <button>Click me too bro</button>
            </div>
            <div id='profile-container'>
                <div id='profile-pic'>
                </div>
                <section id='profile-details'>
                    <h2> Profile</h2>
                    <p className='profile-text'>user name: {userName}</p>
                    <p className='profile-text'>first name: {userFirstName}</p>
                    <p className='profile-text'>last name: {userLastName}</p>
                    <p className='profile-text'>email: {userEmail}</p>
                </section>
            </div>
            <div id='profile-lists'>
                <div id='profile-authors'>
                    <h3 className='profile-subheaders'>Authors</h3>
                    {userAuthors && userAuthors.map(author => {
                        return (
                            <section className='profile-authors-section' key={author.id}>
                                <NavLink to={`/authors/${author.id}`}>{author.pen_name}</NavLink>
                            </section>
                        )
                    })}
                </div>
                <div id='profile-books'>
                    <h3 className='profile-subheaders'>Books</h3>
                    {userBooks && userBooks.map(book => {
                        return (
                            <section className='profile-books-section' key={book.id}>
                                <NavLink to={`/books/${book.id}`}>{book.name}</NavLink>
                            </section>
                        )
                    })}
                </div>
            </div>
        </>
    )
}