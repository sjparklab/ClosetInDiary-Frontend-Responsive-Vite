import React, { useState } from 'react';
import styles from './Login.module.css';
import Header from '../../components/LoginHeader';
import uncheckedIcon from "../../assets/images/check-box.svg";
import checkedIcon from "../../assets/images/checked-box.svg";
import { Link } from 'react-router-dom';

const Login = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.title}>Log in</div>
                <form className={styles.loginBox}>
                    {/* 제목 영역 */}

                    {/* 입력 필드 영역 */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>Email address</label>
                        <input type="text" id="username" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input type="password" id="password" className={styles.input} />
                    </div>

                    {/* RememberMe 영역 */}
                    <div className={styles.rememberMeBox}>
                        <div className={styles.rememberMe} onClick={handleCheckboxClick}>
                            <img
                                src={isChecked ? checkedIcon : uncheckedIcon}
                                alt={isChecked ? "Checked" : "Unchecked"}
                                className={styles.checkBox}
                            />
                            Remember Me
                        </div>
                    </div>

                    {/* 버튼 영역 */}
                    <div className={styles.buttonSection}>
                        <button type="submit" className={styles.button}>Log in</button>
                    </div>
                    <div className={styles.notiBox}>
                        <div className={styles.forgetYourPassword}>Forget your password</div>
                        <div className={styles.signUpMessage}>Don't have an account?&nbsp;<Link to="/signup" className={styles.signUpLink}>
                            Sign up
                        </Link></div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;