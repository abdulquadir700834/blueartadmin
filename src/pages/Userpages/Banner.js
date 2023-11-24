import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import "./css/homepage.css";
import BannerImage from "../../assets/art/resized-t-q-GOPvKYn26F4-unsplash 1.png"
function Banner() {
    return (
        <>
            <div>
                <img style={{ width: "100%", marginTop: "100px" }} src={BannerImage} className="img-responsive" />
            </div>
        </>
    );
}

export default Banner;