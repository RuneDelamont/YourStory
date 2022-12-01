import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as authorActions from '../../store/author';
import * as bookActions from '../../store/book';
import * as sessionActions from '../../store/session';
import SignUpFormModal from "./SignUpForm";
import LogInFormModal from "./LogInForm";
import DemoUser from "./DemoUser/DemoUser";
import './LandingPage.css';

const LandingPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sessionActions.authenticate());
    }, [dispatch]);

    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to="/main" />;
    }

    return (
        <div id="landing-main">
            <div id="video-background">
                <video src="/assets/sky-standard.mp4"
                    autoPlay
                    loop
                    muted
                    height={'100%'}
                    width={'100%'} />
                <div id="overlay">
                    <div id="content">
                        <div id="text-container">
                            <h1>Your Story</h1>
                            <h1>Give flight to your words</h1>
                            <div id="buttons-container">
                                <LogInFormModal />
                                <SignUpFormModal />
                                <DemoUser />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LandingPage;