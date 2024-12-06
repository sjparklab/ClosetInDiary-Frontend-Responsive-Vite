import React from "react";
import styles from "./ClosetAddPage.module.css"; // 모듈 import
import PropTypes from "prop-types";
import frame53 from "../../assets/images/frame-53.svg";
import keyboardarrowdown from "../../assets/images/keyboard-arrow-down-1.png";
import Header from "../../components/NormalHeader";
import Footer from "../../components/Footer";
const ClosetAddClothes = () => {
  return (
    <>
    <Header />
    <div className={styles.closetAddClothes}>
      <div className={styles.frame2}>
        <div className={styles.frameWrapper}>
          <div className={styles.divWrapper}>
            <p className={styles.p}>이 옷이 담아낼 당신의 이야기는 어떤 모습일까요?</p>
          </div>
        </div>

        <div className={styles.frame3}>
          <div className={styles.frame4}>
            <img className={styles.img} alt="Frame" src={frame53} />

            <div className={styles.frame5}>
              <div className={styles.frame6}>
                <p className={styles.textWrapper2}>
                  이 옷을 사게 된 계기는 무엇인가요?
                </p>

                <div className={styles.frame7}>
                  <div className={styles.textWrapper3}>계기를 입력해주세요</div>
                </div>
              </div>

              <div className={styles.frame8}>
                <div className={styles.textWrapper2}>어떤 옷인가요?</div>

                <div className={styles.frame9}>
                  <div className={styles.frame10}>
                    <div className={styles.textWrapper4}>카테고리</div>

                    <div className={styles.frame11}>
                      <div className={styles.textWrapper5}>
                        카테고리를 선택해주세요
                      </div>

                      <img
                        className={styles.keyboardArrowDown2}
                        alt="Keyboard arrow down"
                        src={keyboardarrowdown}
                      />
                    </div>
                  </div>

                  <div className={styles.frame12}>
                    <div className={styles.textWrapper4}>구매일</div>

                    <div className={styles.frame13}>
                      <div className={styles.textWrapper6}>
                        구매일을 입력해주세요
                      </div>
                    </div>
                  </div>

                  <div className={styles.frame12}>
                    <div className={styles.textWrapper7}>브랜드</div>

                    <div className={styles.frame13}>
                      <div className={styles.textWrapper6}>
                        브랜드를 입력해주세요
                      </div>
                    </div>
                  </div>

                  <div className={styles.frame12}>
                    <div className={styles.textWrapper7}>사이즈</div>

                    <div className={styles.frame13}>
                      <div className={styles.textWrapper6}>
                        사이즈를 입력해주세요
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.frame321Wrapper}>
            <Frame
              className={styles.frame321}
              divClassName={styles.frameInstance}
              mOde="UPLOAD"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export const Frame = ({ mOde, className, divClassName }) => {
  return (
    <div className={`${styles.frame} ${className}`}>
      <div className={`${styles.textWrapperFrame} ${divClassName}`}>업로드</div>
    </div>
  );
};

Frame.propTypes = {
  mOde: PropTypes.oneOf(["UPLOAD"]),
};


export default ClosetAddClothes;