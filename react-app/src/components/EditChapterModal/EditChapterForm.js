import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as chapterActions from '../../store/chapter';

import './EditChapterModal.css';

export default function EditChapterForm({ setShowModal }) {
    let { chapterId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    chapterId = Number(chapterId);
    const chapter = useSelector(state => state.chapters[chapterId]);
    const userId = useSelector(state => state.session.user.id);


    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(chapter.title);

    const submitAction = async e => {
        e.preventDefault();

        setErrors([]);
        const chapter = {
            title: title
        }

        const data = await dispatch(chapterActions.thunkUpdateChapter(chapterId, chapter))
        if (Array.isArray(data)) {
            setErrors(data);
        } else {
            await dispatch(chapterActions.thunkGetChapters());
            setShowModal(false);
        }
    }

    return (
        <form className="edit-chapter-form" onSubmit={submitAction}>
            <h1>Edit Chapter</h1>
            <ul id='edit-chapter-form-errors'>
                {Array.isArray(errors) && errors?.map((error, id) => <li key={id}>{error}</li>)}
            </ul>
            <label htmlFor='edit-chapter-title'>Title</label>
            <input id='edit-chapter-title'
                required
                placeholder={chapter.title}
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <button id='edit-chapter-button-submit' type='submit'>Edit Chapter</button>
        </form>
    )
}