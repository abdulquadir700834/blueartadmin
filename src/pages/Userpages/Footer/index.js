import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoGray from "../../../assets/logo-grey.png";
import "../css/registerFooter.css";
import playStore from "../../../assets/play-store.png";
import appleStore from "../../../assets/apple-store.png";
import facebookFooter from "../../../assets/facebook.png";
import TwitterFooter from "../../../assets/Twitter.png";
import LinkedInFooter from "../../../assets/LinkedIn.png";
import InstagramFooter from "../../../assets/Instagram.png";

function Footer(props) {
    return (
        <>
            <Container fluid className='footer'>
                <div className='row'>
                    <div className='col-lg-12    col-md-12'>
                        <div className='row'>
                            <div className='col-lg-3 col-md-12'>
                                <div className='footer-links-left'>
                                    <a href={props.FooterLinks?.Aboutus}>ABOUT US</a>
                                    <br />
                                    <a href={props.FooterLinks?.Events}>Events</a>
                                    <br />   
                                    <a href={props.FooterLinks?.Support}>Support</a>
                                    <br />                                    
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-12'>
                                <div className='footer-links'>
                                    <a href={props.FooterLinks?.Features}>FEATURES & EDITORIALS</a>
                                    <br />
                                    <a href={props.FooterLinks?.Terms}>TERMS & CONDITIONS</a>

                                </div>
                            </div>
                            <div className='col-lg-5 col-md-12'>
                                <div className='footer-links'>
                                    <a href={props.FooterLinks?.Privacy}>PRIVACY POLICY</a>
                                </div>
                                <div className='social-media-section d-flex'>
                                    <h2 className='footer-social-media-links'>FOLLOW US</h2>
                                    <a target="_blank" href={props.socialLinks?.Facebook} ><img src={facebookFooter} /></a>
                                    <a target="_blank" href={props.socialLinks?.Twitter}> <img src={TwitterFooter} /></a>
                                    <a target="_blank" href={props.socialLinks?.Linkedin}><img src={LinkedInFooter} /></a>
                                    <a target="_blank" href={props.socialLinks?.Instagram}><img src={InstagramFooter} /></a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='row'>
                            <div className='col-lg-6'>
                            </div>
                            <div className='col-lg-6'>
                                <div className='social-media-section d-flex'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bottom-logo'>
                    <div className='row'>
                        <div className='col-1'>
                        </div>
                        <div className='col-10'>
                            <img className='img-responsive' style={{ width: "100%" }} src={logoGray} />
                        </div>
                        <div className='col-1'>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Footer