import React, { useState } from 'react';
import styles from './Diary.module.css';
import Header from '../../components/NormalHeader';

const Diary = () => {
    return (
        <div className={styles.DiaryContainer}>
            <Header />
            <div className={styles.main}>
                <div className={styles.categorySelector}>
                    <div className={styles.catTitleUnderline}>
                        <div className={styles.categoryTitle}>
                            MY CLOSET
                        </div>
                    </div>
                </div>
                <div className={styles.clothData}>
                    박스
                </div>
                <div className={styles.pageSelector}>
                    1234
                </div>
            </div>
        </div>
    );
};

export default Diary;