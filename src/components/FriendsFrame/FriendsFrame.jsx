/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { EditDeleteButton } from "../EditDeleteButton";
import styles from "./FriendsFrame.module.css";
import sendIcon from "./send.png";
import doNotDisturbOnIcon from "./do-not-disturb-on.png";
import apiClient from "../../services/apiClient";

const handleAccept = async (requestId) => {
  let formData = new FormData();
  formData.append('requestId', requestId);
  try {
    const response = await apiClient.post('/friend-requests/accept', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(`Friend request accepted for user with ID: ${requestId}`, response.data);
    window.location.reload(); // 성공 후 페이지 새로고침
  } catch (error) {
    console.error('Error accepting friend request:', error);
  }
};

const handleDecline = async (requestId) => {
  let formData = new FormData();
  formData.append('requestId', requestId);
  try {
    const response = await apiClient.post('/friend-requests/decline', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(`Friend request declined for user with ID: ${requestId}`, response.data);
    window.location.reload(); // 성공 후 페이지 새로고침
  } catch (error) {
    console.error('Error declining friend request:', error);
  }
};

const Frame = ({ mode, className, friend }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  useEffect(() => {
    const fetchProfilePicture = async (profilePictureUrl) => {
      try {
        const response = await apiClient.get(`/user-profile-picture/${profilePictureUrl}`, { responseType: 'blob' });
        const imageUrl = URL.createObjectURL(response.data);
        setProfilePicture(imageUrl);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    if (mode === "request" && friend?.sender?.profilePicture) {
      fetchProfilePicture(friend.sender.profilePicture);
    } else if (mode !== "request" && friend?.profilePicture) {
      fetchProfilePicture(friend.profilePicture);
    }
  }, [friend?.profilePicture, friend?.sender?.profilePicture, mode]);

  return (
    <div className={`${styles.frame} ${styles[mode]} ${className}`}>
      <div className={styles.div2}>
        {["default", "message", "request"].includes(mode) && (
          <>
            <div className={styles.div3}>
              {["default", "message", "request"].includes(mode) && profilePicture && (
                <img src={profilePicture} alt={`${friend.name}'s profile`} className={styles.profilePicture} />
              )}
            </div>
            <div className={styles.div4}>
              {["default", "message"].includes(mode) && (
                <>
                  <div className={styles.name}>
                    {mode === "default" && <>Name</>}
                    {mode === "message" && (
                      <div className={styles.div5}>
                        <div className={styles.textWrapper2}>{friend.name}</div>
                        <div className={styles.textWrapper3}>{friend.onelineInfo}</div>
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
                  <div className={styles.textWrapper2}>{friend.sender.name}</div>
                  <div className={styles.textWrapper3}>{friend.sender.onelineInfo}</div>
                  <div className={styles.EditDeleteButton}>
                    <EditDeleteButton
                      button="edit"
                      className={styles.editDeleteButtonInstance}
                      divClassName={styles.instanceNode}
                      text="수락"
                      onClick={() => handleAccept(friend.id)}
                    />
                    <EditDeleteButton
                      button="edit"
                      className={styles.editDeleteButtonInstance}
                      divClassName={styles.instanceNode}
                      text="삭제"
                      onClick={() => handleDecline(friend.id)}
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
                <div className={styles.textWrapper2}>{friend.name}</div>
                <div className={styles.textWrapper3}>{friend.onelineInfo}</div>
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