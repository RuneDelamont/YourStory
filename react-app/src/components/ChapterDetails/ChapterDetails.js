import React, { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as chapterActions from '../../store/chapter';
import * as pageActions from '../../store/page';
import TemplatePage from '../TemplatePage';
import NotAuthorizedPage from '../NotAuthorizedPage';
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

    // if (!user) return (
    //     <Redirect to='/' />
    // )

    // if (!chapter) return (
    //     <NotFoundPage />
    // )


    let ChapterDetailsPage = (
        user ?
            chapter ?
                <>
                    <TemplatePage />
                    <div id='chapter-parent-container'>
                        <div id='chapter-container'>
                            <div id='chapter-into-container'>
                                {(chapter?.user_id === user?.id) && (
                                    <div id='chapter-button-div'>
                                        {/* <EditBookModal /> */}
                                        <DeleteButton />
                                    </div>
                                )}
                                <section id='chapter-details'>
                                    <h1 className='chapter-text'>{book?.name}</h1>
                                    <h2 className='chapter-text'>{title}</h2>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div id='chapter-lists'>
                        <div id='chapter-chapters'>
                            {chapterPages && chapterPages?.map((page, index) => {
                                return (
                                    <section className='page-section' key={page.id}>
                                        <div className='words-container'>
                                            <h3 className='chapter-details-subheader'>Page {index + 1}</h3>
                                            <p className='page'>{page.page_words}</p>
                                        </div>
                                    </section>
                                )
                            })}
                        </div>
                    </div>
                </>
                :
                <></>
            :
        <></>
    )
    return ChapterDetailsPage;


    // return (
    //     <>
    //         <TemplatePage />
    //         <div id='chapter-parent-container'>
    //             <div id='chapter-container'>
    //                 <div id='chapter-into-container'>
    //                     {(chapter?.user_id === user?.id) && (
    //                         <div id='chapter-button-div'>
    //                             {/* <EditBookModal /> */}
    //                             <DeleteButton />
    //                         </div>
    //                     )}
    //                     <section id='chapter-details'>
    //                         <h1 className='chapter-text'>{book?.name}</h1>
    //                         <h2 className='chapter-text'>{title}</h2>
    //                     </section>
    //                 </div>
    //             </div>
    //         </div>
    //         <div id='chapter-lists'>
    //             <div id='chapter-chapters'>
    //                 {chapterPages && chapterPages?.map((page, index) => {
    //                     return (
    //                         <section className='page-section' key={page.id}>
    //                             <div className='words-container'>
    //                                 <h3 className='chapter-details-subheader'>Page {index + 1}</h3>
    //                                 <p className='page'>{page.page_words}</p>
    //                             </div>
    //                         </section>
    //                     )
    //                 })}
    //             </div>
    //         </div>
    //     </>
    // );

}