import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as sessionActions from '../../store/session';
import TemplatePage from "../TemplatePage";

import "./Authors.css"


export default function Authors() {
    const user = useSelector(state => state.session.user);
    const authors = useSelector(state => Object.values(state.authors));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authorActions.thunkGetAuthors());
    }, [dispatch]);

    // if (!user) return (
    //     <Redirect to='/' />
    // )

    return (
        <>
            <TemplatePage />
            <div id='author-div'>
                <h1 id='author-header'>Authors</h1>
                {authors && Object.entries(authors).map(([key, author]) => {
                    return (<section className="author-sections" key={author.id}>
                                <NavLink to={`/authors/${author.id}`}><h3>{author.first_name} {author.last_name}</h3></NavLink>
                            </section>
                    )}
                )}
            </div>
        </>
    );
}