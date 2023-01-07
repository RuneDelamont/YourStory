import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as pageActions from "../../store/page";

import "./EditPageModal.css";

export default function EditPageForm({ setShowModal, page }) {
    const dispatch = useDispatch();
    const history = useHistory();


    const [errors, setErrors] = useState([]);
    const [pageWords, setPageWords] = useState(page.page_words);

    const handleSubmit = async e => {
        e.preventDefault();

        setErrors([]);
        const editedPage = {
            page_words: pageWords
        };

        const data = await dispatch(pageActions.thunkEditPage(editedPage, page.id));

        if (Array.isArray(data)) {
            setErrors(data);
        } else {
            await dispatch(pageActions.thunkGetPages());
            setShowModal(false);
        }
    }

    return (
        <form className="edit-page-form" onSubmit={handleSubmit}>
            <ul id='edit-page-form-errors'>
                {Array.isArray(errors) && errors?.map((error, id) => <li key={id}>{error}</li>)}
            </ul>
            <label htmlFor="edit-page-words">Page Words</label>
            <textarea
                id="edit-page-words"
                required
                placeholder="Page Words"
                value={pageWords}
                onChange={(e) => setPageWords(e.target.value)}
            ></textarea>
            <button className='edit-page-button' type='submit'>Edit Page</button>
        </form>
    );
}
