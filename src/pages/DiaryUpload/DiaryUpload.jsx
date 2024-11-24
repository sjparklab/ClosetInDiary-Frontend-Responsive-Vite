import React, { useState } from 'react';
import styles from './DiaryUpload.module.css';
import arrow24 from '../../assets/images/arrow-24.png'

const DiaryUpload = () => {
    return (
        <div className={styles.DiaryUploadContainer}>
            <div className={styles.MainContainer}>
                <div className={styles.LeftBox}>

                    <div className={styles.UploadTitle}>
                        오늘의 이야기
                        
                    </div>

                    <div className={styles.UploadInput}>
                        <div className={styles.InputTitle}>
                            <input placeholder="제목을 입력해 주세요."></input>
                        </div>
                        <div className={styles.Inputcontent}>
                        <textarea placeholder="오늘의 이야기를 자유롭게 펼쳐 보세요!"></textarea>
                        </div>
                    </div>

                    <div className={styles.UploadButtons}>
                        <div className={styles.FileSelectButton}>
                        <button><p>파일 선택하기</p><img src={arrow24}></img></button>
                        </div>
                        <div classNmae={styles.UpBt}>
                            <button className={styles.UpBt2}>업로드</button>
                        </div>
                    </div>
                </div>
                <div className={styles.RightBox}>
                    <div className={styles.MainImg}>
                
                    </div>
                    <div className={styles.SubImg}>
                        <div className={styles.SubImg1}>
                        
                        </div>
                        <div className={styles.SubImg2}>
                        
                        </div>
                        <div className={styles.SubImg3}>
                        
                        </div>
                        <div className={styles.SubImg4}>
                        
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DiaryUpload;