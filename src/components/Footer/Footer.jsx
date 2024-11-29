import React from "react";
import styles from "./Footer.module.css";
import group27 from "./email-logo.svg";
import image from "./footer-line-16.svg";
import line15 from "./footer-line-15.svg";
import line16 from "./footer-line-16.svg";
import vector from "./footer-logo.svg";

const Footer = () => {
    return (
        <div className={styles.categoryFooter}>
            <div className={styles.frame}>
                <div className={styles.group}>
                    <img className={styles.vector} alt="Vector" src={vector} />

                    <div className={styles.div}>
                        <div className={styles.textWrapper}>contact@stand.agency</div>

                        <img className={styles.line} alt="Line" src={line15} />
                    </div>
                </div>

                <div className={styles.group2}>
                    <div className={styles.group3}>
                        <div className={styles.flexContainer}>
                            <p className={styles.text}>
                                <span className={styles.span}>
                                    Facebook
                                    <br />
                                </span>
                            </p>

                            <p className={styles.text}>
                                <span className={styles.span}>
                                    Linkedin
                                    <br />
                                </span>
                            </p>

                            <p className={styles.text}>
                                <span className={styles.span}>
                                    Instagram
                                    <br />
                                </span>
                            </p>

                            <p className={styles.text}>
                                <span className={styles.span}>Twitter</span>
                            </p>
                        </div>

                        <div className={styles.textWrapper2}>Socials</div>

                        <div className={styles.group4}>
                            <div className={styles.textWrapper}>(123) 456-7890</div>

                            <img className={styles.img} alt="Line" src={image} />
                        </div>
                    </div>

                    <div className={styles.sitemap}>
                        <div className={styles.flexContainer2}>
                            <p className={styles.text}>
                                <span className={styles.span}>
                                    Home
                                    <br />
                                </span>
                            </p>

                            <p className={styles.text}>
                                <span className={styles.span}>
                                    Abouts
                                    <br />
                                </span>
                            </p>

                            <p className={styles.text}>
                                <span className={styles.span}>
                                    Growers
                                    <br />
                                </span>
                            </p>

                            <p className={styles.text}>
                                <span className={styles.span}>
                                    Merchants
                                    <br />
                                </span>
                            </p>

                            <p className={styles.text}>
                                <span className={styles.span}>Contact</span>
                            </p>
                        </div>

                        <div className={styles.textWrapper3}>Sitemap</div>
                    </div>
                </div>

                <div className={styles.group5}>
                    <p className={styles.p}>
                        52-57, Yangjeong-ro, Busanjin-gu, Busan, Republic of Korea
                    </p>

                    <div className={styles.textWrapper3}>Head Office</div>

                    <div className={styles.textWrapper4}>News letter</div>

                    <img className={styles.line2} alt="Line" src={line16} />

                    <div className={styles.textWrapper5}>Enter your email address</div>

                    <img className={styles.group6} alt="Group" src={group27} />

                    <p className={styles.elementSTAllRights}>
                        © 2024 ST&amp; All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
