/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { EditDeleteButton } from "../EditDeleteButton";
import styles from "./FriendsFrame.module.css";
import sendIcon from "./send.png";
import doNotDisturbOnIcon from "./do-not-disturb-on.png";
const Frame = ({ mode, className }) => {
  console.log(styles); // styles 객체 출력
  return (
    <div className={`${styles.frame} ${styles[mode]} ${className}`}>
      <div className={styles.div2}>
        {["default", "message", "request"].includes(mode) && (
          <>
            <div className={styles.div3}>
              {["default", "message"].includes(mode)}
            </div>
            <div className={styles.div4}>
              {["default", "message"].includes(mode) && (
                <>
                  <div className={styles.name}>
                    {mode === "default" && <>Name</>}
                    {mode === "message" && (
                      <div className={styles.div5}>
                        <div className={styles.textWrapper2}>Name</div>
                        <div className={styles.textWrapper3}>한줄소개 적는 공간</div>
                      </div>
                    )}
                  </div>
                  <div className={styles.div6}>
                    {mode === "default" && <>한줄소개 적는 공간</>}
                    {mode === "message" && (
                      <div className={styles.div7}>
                        <div className={styles.textWrapper4}>
                          응원의 메세지를 입력해보아요.
                        </div>
                        <img className={styles.send} alt="Send" src={sendIcon} />
                      </div>
                    )}
                  </div>
                </>
              )}
              {mode === "request" && (
                <>
                  <div className={styles.textWrapper2}>Name</div>
                  <div className={styles.textWrapper3}>한줄소개 적는 공간</div>
                  <div className={styles.div8}>
                    <EditDeleteButton
                      button="edit"
                      className={styles.editDeleteButtonInstance}
                      divClassName={styles.instanceNode}
                      text="수락"
                    />
                    <EditDeleteButton
                      button="edit"
                      className={styles.editDeleteButtonInstance}
                      divClassName={styles.instanceNode}
                      text="삭제"
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}
        {mode === "delete" && (
          <>
            <div className={styles.div9}>
              <div className={styles.div10} />
              <div className={styles.div5}>
                <div className={styles.textWrapper2}>Name</div>
                <div className={styles.textWrapper3}>한줄소개 적는 공간</div>
              </div>
            </div>
            <img
              className={styles.doNotDisturbOn}
              alt="Do not disturb on"
              src={doNotDisturbOnIcon}
            />
          </>
        )}
      </div>
    </div>
  );
};

Frame.propTypes = {
  mode: PropTypes.oneOf(["request", "message", "delete", "default"]),
};

export default Frame;