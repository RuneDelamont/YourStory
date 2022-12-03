import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as sessionActions from '../../store/session';
import TemplatePage from "../TemplatePage";

import "./Books.css";

export default function Books() {
    const user = useSelector(state => state.session.user);
    const books = useSelector(state => Object.values(state.books));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(bookActions.thunkGetBooks());
    }, [dispatch]);

    if (!user) return (
        <Redirect to='/' />
    )

    return (
        <>
            <TemplatePage />
            <div id='book-div'>
                <h1 id='book-header'>Books</h1>
                {books && Object.entries(books).map(([key, book]) => {
                    return (<section className="book-sections" key={book.id}>
                                <NavLink to={`/books/${book.id}`}><h3>{book.name}</h3></NavLink>
                            </section>
                    )}
                )}
            </div>
        </>
    );
}