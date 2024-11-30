import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyProfile.module.css';
import Header from '../../components/NormalHeader';
import Footer from '../../components/Footer';

const MyProfile = () => {
  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.sideLeft}></div>
      <header class={styles.headerAlign}>
        <Header />
      </header>
      <main>
        <div className={styles.side1}>
        </div>
        <div className={styles.content}>
          <div className={styles.frame7}>
            <div className={styles.frameWrapper}>
              <div className={styles.frame8}>
                <div className={styles.textWrapper}>MY PROFILE</div>

                {/* EditDeleteButton 직접 구현 */}
                <div className={`${styles.editDeleteButton} ${styles.editDeleteButtonInstance}`}>
                  <div className={`${styles.div3} ${styles.editDeleteButton2}`}>
                    <>수정</>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.frame9}>
              <div className={styles.frame10}>
                <div className={styles.frame11} />

                <div className={styles.frame12}>
                  <div className={styles.frame13}>
                    <div className={styles.textWrapper2}>이름</div>

                    <div className={styles.textWrapper3}>이름이 비어있어요.</div>
                  </div>

                  <div className={styles.frame14}>
                    <div className={styles.textWrapper4}>한줄소개</div>

                    <div className={styles.textWrapper3}>한줄소개가 비어있어요.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
      <div className={styles.sideRight}></div>
    </div>
  );
};

export default MyProfile;
