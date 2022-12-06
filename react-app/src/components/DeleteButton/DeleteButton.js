import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as chapterActions from '../../store/chapter';
import * as pageActions from '../../store/page';

import './DeleteButton.css';

export default function DeleteButton(){
    let {authorId, bookId } = useParams();

    if(authorId) authorId = Number(authorId);
    if(bookId) bookId = Number(bookId);
    

    const authors = useSelector(state => Object.values(state.authors));
    const books = useSelector(state => Object.values(state.books));

    const url = window.location.href.split('/');
    const location = url[3];
    const deleteIdNum = Number(url[4]);
    // console.log(url);

    const history = useHistory();
    const dispatch = useDispatch();

    const deleteFunction = (e) => {
        e.preventDefault();
        if(authorId) {
            let author = authors?.filter(author => author.id === authorId)[0];
            dispatch(authorActions.thunkDeleteAuthor(author));
            history.push('/authors');
            }

        if(bookId) { 
            let book = books?.filter(book => book.id === bookId)[0];
            dispatch(bookActions.thunkDeleteBook(book));
            history.push('/books');
        }
    }

    return (
        <button id='delete-button' onClick={deleteFunction}>Delete</button>
    )
}