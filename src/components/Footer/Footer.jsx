import React from "react";
import group27 from "./email-logo.svg";
import image from "./footer-line-16.svg";
import line15 from "./footer-line-15.svg";
import line16 from "./footer-line-16.svg";
import "./Footer.css";
import vector from "./footer-logo.svg";

const Footer = () => {
    return (
        <div className="category-footer">
            <div className="frame">
                <div className="group">
                    <img className="vector" alt="Vector" src={vector} />

                    <div className="div">
                        <div className="text-wrapper">contact@stand.agency</div>

                        <img className="line" alt="Line" src={line15} />
                    </div>
                </div>

                <div className="group-2">
                    <div className="group-3">
                        <div className="flexcontainer">
                            <p className="text">
                                <span className="span">
                                    Facebook
                                    <br />
                                </span>
                            </p>

                            <p className="text">
                                <span className="span">
                                    Linkedin
                                    <br />
                                </span>
                            </p>

                            <p className="text">
                                <span className="span">
                                    Instagram
                                    <br />
                                </span>
                            </p>

                            <p className="text">
                                <span className="span">Twitter</span>
                            </p>
                        </div>

                        <div className="text-wrapper-2">Socials</div>

                        <div className="group-4">
                            <div className="text-wrapper">(123) 456-7890</div>

                            <img className="img" alt="Line" src={image} />
                        </div>
                    </div>

                    <div className="sitemap">
                        <div className="flexcontainer-2">
                            <p className="text">
                                <span className="span">
                                    Home
                                    <br />
                                </span>
                            </p>

                            <p className="text">
                                <span className="span">
                                    Abouts
                                    <br />
                                </span>
                            </p>

                            <p className="text">
                                <span className="span">
                                    Growers
                                    <br />
                                </span>
                            </p>

                            <p className="text">
                                <span className="span">
                                    Merchants
                                    <br />
                                </span>
                            </p>

                            <p className="text">
                                <span className="span">Contact</span>
                            </p>
                        </div>

                        <div className="text-wrapper-3">Sitemap</div>
                    </div>
                </div>

                <div className="group-5">
                    <p className="p">
                        52-57, Yangjeong-ro, Busanjin-gu, Busan, Republic of Korea
                    </p>

                    <div className="text-wrapper-3">Head Office</div>

                    <div className="text-wrapper-4">News letter</div>

                    <img className="line-2" alt="Line" src={line16} />

                    <div className="text-wrapper-5">Enter your email address</div>

                    <img className="group-6" alt="Group" src={group27} />

                    <p className="element-ST-all-rights">
                        © 2024 ST&amp; All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};


export default Footer;