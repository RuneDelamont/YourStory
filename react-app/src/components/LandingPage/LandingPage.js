import React from "react";
import { NavLink } from "react-router-dom";
// import videoBackground from '../../assets/sky-standard.mp4';
import './LandingPage.css';

const LandingPage = () => {

    return (
        <div id="landing-main">
            <div id="video-background">
                <video src="../../assets/sky-standard.mp4" 
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
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LandingPage;