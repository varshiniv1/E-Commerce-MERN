import React, { useEffect, useState } from 'react'; // Import useState and useEffect
import Slider from 'react-slick';
import { WavesButton } from '../utils/tools.js';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Carrousel = ({ items }) => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight); // State for window height

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight); // Update state on window resize
        };

        window.addEventListener('resize', handleResize); // Add event listener
        return () => {
            window.removeEventListener('resize', handleResize); // Clean up on unmount
        };
    }, []); // Empty dependency array to run once

    const settings = {
        dots: false, // Fixed typo here
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const generateSlides = () => (
        items ?
            items.map((item, i) => (
                <div key={i}>
                    <div
                        className="featured_image"
                        style={{
                            background: `url(${item.img})`,
                            height: `${windowHeight}px` // Use state for height
                        }}
                    >
                        <div className="featured_action">
                            <div className="tag title">{item.lineOne}</div>
                            <div className="tag low_title">{item.lineTwo}</div>
                            <div>
                                <WavesButton
                                    type="default"
                                    title={item.linkTitle}
                                    linkTo={item.linkTo}
                                    style={{
                                        margin: '10px 0 0 0'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))
        : null
    );

    return (
        <Slider {...settings}>
            {generateSlides()}
        </Slider>
    );
}

export default Carrousel;
