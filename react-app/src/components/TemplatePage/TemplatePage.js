import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as sessionActions from '../../store/session';
import Navigation from '../Navigation';

import './TemplatePage.css'

export default function TemplatePage() {

    return (
        <>
            <Navigation />
            <img id='book-image-background' src="https://your-story-bucket.s3.us-west-1.amazonaws.com/flipping-pages.jpg" />
        </>
    )
}