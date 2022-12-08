import React, { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as chapterActions from '../../store/chapter';
import * as pageActions from '../../store/page';
import TemplatePage from '../TemplatePage';
import EditBookModal from '../EditBookModal';
import DeleteButton from '../DeleteButton';

import './ChapterDetails.css';
import NotFoundPage from '../NotFoundPage';

export default function ChapterDetails() {
    let { chapterId } = useParams();
    chapterId = Number(chapterId);

    const user = useSelector(state => state.session.user);
    const authors = useSelector(state => Object.values(state.authors));
    const books = useSelector(state => Object.values(state.books));
    const chapters = useSelector(state => Object.values(state.chapters))
    const pages = useSelector(state => Object.values(state.pages));

    const chapter = useSelector(state => state.chapters[chapterId]);
    console.log(chapter)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authorActions.thunkGetAuthors());
        dispatch(bookActions.thunkGetBooks());
        dispatch(chapterActions.thunkGetChapters());
        dispatch(pageActions.thunkGetPages());
    }, [dispatch]);

    const author = authors?.filter(author => author.id === chapter?.author_id)[0];
    const book = books?.filter(book => book.id === chapter?.book_id)[0];
    const title = chapter?.title;
    const chapterPages = pages?.filter(page => page.book_id === book?.id);

    if (!user) return (
        <Redirect to='/' />
    )

    if(!chapter) return (
        <NotFoundPage />
    )

    return (
        <>
            <TemplatePage />
            {(chapter?.user_id === user?.id) && (
                <>
                    {/* <EditBookModal /> */}
                    <DeleteButton/>
                </>
            )}
            <div id='chapter-container'>
                <div id='chapter-pic'>
                </div>
                <section id='chapter-details'>
                    <p className='chapter-text'>Book: {book?.name}</p>
                    <p className='chapter-text'>title: {title}</p>
                </section>
            </div>
            <div id='chapter-lists'>
                <div id='chapter-chapters'>
                    <h3 className='chapter-subheaders'>Chapters</h3>
                    {chapterPages && chapterPages?.map((page, index) => {
                        return (
                            <section className='page-section' key={page.id}>
                                <p>{index + 1}. {page.page_words}</p>
                            </section>
                        )
                    })}
                </div>
            </div>
        </>
    );

}