import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as chapterActions from '../../store/chapter';
import * as pageActions from '../../store/page';

import './DeleteButton.css';

export default function DeleteButton(){
    let {authorId, bookId } = useParams();
    

    const url = window.location.href.split('/');
    const location = url[3];
    const deleteIdNum = Number(url[4]);
    // console.log(url);
    const deleteFunction = (e) => {
        if(authorId) console.log(authorId);
        e.preventDefault();

        if(bookId) console.log(bookId);
        console.log(location);
        console.log(deleteIdNum, 'deleteIdNum')
    }

    return (
        <button id='delete-button' onClick={deleteFunction}>Delete</button>
    )
}