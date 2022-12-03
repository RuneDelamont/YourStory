import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Carousel.css";

export default function Carousel({ slides }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };


    return (
        <div className="carousel">
            <div>
                <div className="card">
                    <div onClick={goToPrevious} className="leftArrowStyles">
                        ❰
                    </div>
                    <div className="slides">{slides[currentIndex]}</div>
                    <div onClick={goToNext} className="rightArrowStyles">
                        ❱
                    </div>
                </div>
                <div className="dot-container">
                    {slides.map((slide, slideIndex) => (
                        <div
                            className="dot-slides"
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                        >
                            ●
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}