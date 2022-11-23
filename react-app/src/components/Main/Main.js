import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as sessionActions from '../../store/session';
import "./Main.css";

export default function Main() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authorActions.thunkGetAuthors());
        dispatch(bookActions.thunkGetBooks());
        dispatch(sessionActions.authenticate());
    }, [dispatch]);
    return null;
}