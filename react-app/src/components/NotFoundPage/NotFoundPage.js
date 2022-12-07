import React, { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TemplatePage from '../TemplatePage';

import './NotFoundPage.css';

export default function NotFoundPage() {

    return(
        <>
            <TemplatePage />
            <div id='not-found-container'>
                <h1>Whoops, not found.</h1>
            </div>
        </>
    )
}