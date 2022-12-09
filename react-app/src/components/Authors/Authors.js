import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as sessionActions from '../../store/session';
import TemplatePage from "../TemplatePage";

import "./Authors.css"
import NotAuthorizedPage from "../NotAuthorizedPage";


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

    let AuthorsPage = (
        user ?
            <>
                <TemplatePage />
                <div id='authors-section'>
                    <h1 id='author-header'>Authors</h1>
                    <div id='author-div'>
                        {authors && Object.entries(authors).map(([key, author]) => {
                            return (<section className="author-sections" key={author.id}>
                                <img id='author-section-pic' src='https://your-story-bucket.s3.us-west-1.amazonaws.com/writer_sihoutte.jpeg' />
                                <NavLink className='author-section-nav' to={`/authors/${author.id}`}>{author.first_name} {author.last_name}</NavLink>
                            </section>
                            )
                        }
                        )}
                    </div>
                </div>
            </>
            :
            <></>
    )

    return AuthorsPage;

    // return (
    //     <>
    //         <TemplatePage />
    //         <div id='authors-section'>
    //             <h1 id='author-header'>Authors</h1>
    //             <div id='author-div'>
    //                 {authors && Object.entries(authors).map(([key, author]) => {
    //                     return (<section className="author-sections" key={author.id}>
    //                         <img id='author-section-pic' src='https://your-story-bucket.s3.us-west-1.amazonaws.com/writer_sihoutte.jpeg' />
    //                         <NavLink className='author-section-nav' to={`/authors/${author.id}`}>{author.first_name} {author.last_name}</NavLink>
    //                     </section>
    //                     )
    //                 }
    //                 )}
    //             </div>
    //         </div>
    //     </>
    // );
}