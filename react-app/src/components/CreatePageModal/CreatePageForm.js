import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as pageActions from '../../store/page';
// import * as bookActions from '../../store/book';
// import * as authorActions from '../..store/author';

import './CreatePageModal.css';

export default function CreatePageForm({ setShowModal }) {

    let { chapterId } = useParams();
    chapterId = Number(chapterId);

    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id);
    const chapter = useSelector(state => state.chapters[chapterId]);
    const [errors, setErrors] = useState([]);
    const [pageWords, setPageWords] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        setErrors([]);
        const page = {
            user_id: userId,
            author_id: chapter.authorId,
            book_id: chapter.bookId,
            chapter_id: chapterId,
            page_words: pageWords
        }

        const data = await dispatch(pageActions.thunkCreateNewPage(chapterId, page));

        if (Array.isArray(data)) {
            setErrors(data);
        } else {
            await dispatch(pageActions.thunkGetPages());
            setShowModal(false)
        }

    }

    return (
        <form className="create-page-form" onSubmit={handleSubmit}>
            <ul id='create-page-form-errors'>
                {Array.isArray(errors) && errors?.map((error, id) => <li key={id}>{error}</li>)}
            </ul>
            <label htmlFor="create-page-words">Page Words</label>
            <textarea
                id="create-page-words"
                required
                placeholder="Page Words"
                value={pageWords}
                onChange={(e) => setPageWords(e.target.value)}
            ></textarea>
            <button id='create-page-button-form' type='submit'>Create Page</button>
        </form>
    )
}