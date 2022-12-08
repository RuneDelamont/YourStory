import React, { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as chapterActions from '../../store/chapter';
import TemplatePage from '../TemplatePage';
import EditBookModal from '../EditBookModal';
import DeleteButton from '../DeleteButton';
import NotFoundPage from '../NotFoundPage';

import './BookDetails.css';

export default function BookDetails() {
    let { bookId } = useParams();
    bookId = Number(bookId);

    const user = useSelector(state => state.session.user);
    const books = useSelector(state => Object.values(state.books));
    const authors = useSelector(state => Object.values(state.authors));
    const chapters = useSelector(state => Object.values(state.chapters))

    const book = useSelector(state => state.books[bookId]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authorActions.thunkGetAuthors());
        dispatch(bookActions.thunkGetBooks());
        dispatch(chapterActions.thunkGetChapters());
    }, [dispatch]);

    const author = authors?.filter(author => author.id === book?.author_id)[0];
    const name = book?.name;
    const publishDate = book?.publish_date;
    const bookChapters = chapters?.filter(chapter => chapter.book_id === book?.id);

    if (!user) return (
        <Redirect to='/' />
    )

    if(!book)  return (
        <NotFoundPage />
    )

    return (
        <>
            <TemplatePage />
            {(book?.user_id === user?.id) && (
                <>
                    <EditBookModal />
                    <DeleteButton/>
                </>
            )}
            <div id='book-container'>
                
                <img id='book-pic' src='https://your-story-bucket.s3.us-west-1.amazonaws.com/Vintage-Book-Image.jpg' />
                
                <section id='book-details'>
                    <h2>{name}</h2>
                    {/* <p className='book-text'>name: {name}</p> */}
                    <p className='book-text'>pulish date: {publishDate}</p>
                    <p className='book-text'>author: {author?.pen_name}</p>
                </section>
            </div>
            <div id='book-lists'>
                <div id='book-chapters'>
                    <h3 className='chapter-subheaders'>Chapters</h3>
                    {bookChapters && bookChapters.map((chapter, index) => {
                        return (
                            <section className='book-chapters-section' key={chapter.id}>
                                <p>{index + 1}. <NavLink to={`/chapters/${chapter.id}`}>{chapter.title}</NavLink>
                                </p>
                            </section>
                        )
                    })}
                </div>
            </div>
        </>
    );
}