import React, { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as chapterActions from '../../store/chapter';
import TemplatePage from '../TemplatePage';
import NotAuthorizedPage from '../NotAuthorizedPage';
import NotFoundPage from '../NotFoundPage';
import EditBookModal from '../EditBookModal';
import DeleteButton from '../DeleteButton';

import './BookDetails.css';

export default function BookDetails() {
    let { bookId } = useParams();
    bookId = Number(bookId);
    const [visible, setVisibility] = useState('hidden');
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);
    const books = useSelector(state => Object.values(state.books));
    const authors = useSelector(state => Object.values(state.authors));
    const chapters = useSelector(state => Object.values(state.chapters))

    const book = useSelector(state => state.books[bookId]);

    const dispatch = useDispatch();
    const history = useHistory();

    const visibilityToggle = () => {
        if (visible === 'hidden') {
            setVisibility('visible');
        } else {
            setVisibility('hidden');
        }
    }

    const newChapterSubmit = async e => {
        e.preventDefault();

        const chapter = {
            user_id: user.id,
            author_id: book.author_id,
            book_id: book.id,
            title: title
        }

        const data = await dispatch(chapterActions.thunkCreateChapter(chapter));

        if (Array.isArray(data)) {
            setErrors(data);
        } else {
            await dispatch(chapterActions.thunkGetChapters());
            setVisibility('hidden');
        }
    }

    useEffect(() => {
        dispatch(authorActions.thunkGetAuthors());
        dispatch(bookActions.thunkGetBooks());
        dispatch(chapterActions.thunkGetChapters());
    }, [dispatch]);

    const author = authors?.filter(author => author.id === book?.author_id)[0];
    const name = book?.name;
    const publishDate = book?.publish_date;
    const bookChapters = chapters?.filter(chapter => chapter.book_id === book?.id);

    // if (!user) return (
    //     <Redirect to='/' />
    // )

    // if (!book) return (
    //     <NotFoundPage />
    // )

    let BookDisplay = (
        user ?
            book ?
                <>
                    <TemplatePage />
                    <div id='parent-book-container'>
                        <div id='book-container'>
                            <div id='book-button-pic-container'>

                                {(book?.user_id === user?.id) && (
                                    <div id='book-button-div'>
                                        <EditBookModal />
                                        <DeleteButton />
                                    </div>
                                )}
                                <img id='book-pic' src='https://your-story-bucket.s3.us-west-1.amazonaws.com/Vintage-Book-Image.jpg' />
                            </div>
                            <section id='book-details'>
                                <h2>{name}</h2>
                                {/* <p className='book-text'>name: {name}</p> */}
                                <p className='book-text'>pulish date: {publishDate}</p>
                                <p className='book-text'>author: {author?.pen_name}</p>
                            </section>
                        </div>
                    </div>
                    <div id='book-lists'>
                        <div id='book-chapters'>
                            <h2 className='chapter-subheaders'>Chapters</h2>
                            {(book?.user_id === user?.id) && (
                                <>
                                    <div id='create-button-container'>
                                        <button id="create-chapter-button"
                                            onClick={visibilityToggle}>
                                            Create Chapter
                                        </button>
                                    </div>
                                    <section style={{ visibility: visible }}>
                                        <form id='create-chapter-form'
                                            onSubmit={newChapterSubmit}
                                        >
                                            <ul id='create-chapter-form-errors'>
                                                {Array.isArray(errors) && errors?.map((error, id) => <li key={id}>{error}</li>)}
                                            </ul>
                                            <label htmlFor='create-chapter-title'>Title</label>
                                            <input id='chapter-title'
                                                required
                                                placeholder='Title'
                                                type='text'
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                            />
                                            {/* <button id='create-chapter-hide-form' onClick={setVisibility('hidden')}>Cancel</button> */}
                                            <button id='create-chapter-button-submit' type='submit'>Create</button>
                                        </form>
                                    </section>
                                </>
                            )}
                            {bookChapters && bookChapters.map((chapter, index) => {
                                return (
                                    <section className='book-chapters-section' key={chapter.id}>
                                        <p className='book-chapters-num'>{index + 1}. </p> <NavLink className='book-chapters-nav' to={`/chapters/${chapter.id}`}> {chapter.title}</NavLink>
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

    return BookDisplay;

    // return (
    //     <>
    //         <TemplatePage />
    //         <div id='parent-book-container'>
    //             <div id='book-container'>
    //                 <div id='book-button-pic-container'>

    //                     {(book?.user_id === user?.id) && (
    //                         <div id='book-button-div'>
    //                             <EditBookModal />
    //                             <DeleteButton />
    //                         </div>
    //                     )}
    //                     <img id='book-pic' src='https://your-story-bucket.s3.us-west-1.amazonaws.com/Vintage-Book-Image.jpg' />
    //                 </div>
    //                 <section id='book-details'>
    //                     <h2>{name}</h2>
    //                     {/* <p className='book-text'>name: {name}</p> */}
    //                     <p className='book-text'>pulish date: {publishDate}</p>
    //                     <p className='book-text'>author: {author?.pen_name}</p>
    //                 </section>
    //             </div>
    //         </div>
    //         <div id='book-lists'>
    //             <div id='book-chapters'>
    //                 <h2 className='chapter-subheaders'>Chapters</h2>
    //                 {bookChapters && bookChapters.map((chapter, index) => {
    //                     return (
    //                         <section className='book-chapters-section' key={chapter.id}>
    //                             <p className='book-chapters-num'>{index + 1}. </p> <NavLink className='book-chapters-nav' to={`/chapters/${chapter.id}`}> {chapter.title}</NavLink>
    //                         </section>
    //                     )
    //                 })}
    //             </div>
    //         </div>
    //     </>
    // );
}