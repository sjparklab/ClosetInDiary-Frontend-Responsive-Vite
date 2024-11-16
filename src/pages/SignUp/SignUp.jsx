import React, { useState } from 'react';
import styles from './SignUp.module.css';
import Header from '../../components/LoginHeader';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
    const { signup } = useAuth(); // AuthContext의 signup 함수 호출
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
          alert('Passwords do not match!');
          return;
        }
        await signup(formData); // 회원가입 요청
      };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.title}>Sign Up</div>
                <form className={styles.signUpBox} onSubmit={handleSubmit}>
                    {/* 입력 필드 영역 */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input type="text"
                            id="name"
                            name="name"
                            className={styles.input}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>User ID</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={styles.input}
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email address</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles.input}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="passwordConfirm" className={styles.label}>Password Confirm</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            className={styles.input}
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* 버튼 영역 */}
                    <div className={styles.buttonSection}>
                        <button type="submit" className={styles.button}>Sign Up</button>
                        <div className={styles.notiBox}>
                            <p className={styles.signUpNotice}>By creating an account, you agree to the <span className={styles.noticeHighlight}>Terms of use</span> and <span className={styles.noticeHighlight}>Privacy Policy.</span></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;