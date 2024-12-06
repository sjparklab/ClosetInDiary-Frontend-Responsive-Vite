import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyProfile.module.css";
import Header from "../../components/NormalHeader";
import Footer from "../../components/Footer";
import Frame44 from "../../assets/images/frame-44.svg"; // Frame44 이미지 가져오기
import apiClient from "../../services/apiClient";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부 상태
  const [profile, setProfile] = useState({
    name: "",
    intro: "",
  });

  // 서버에서 유저 데이터를 가져오는 함수
  const fetchUserData = async () => {
    try {
      const response = await apiClient.get("/user-data"); // 유저 정보를 가져오는 API
      const data = response.data;

      // null 값 처리
      setProfile({
        name: data.name || "", // null일 경우 빈 문자열로 대체
        intro: data.intro || "", // null일 경우 빈 문자열로 대체
      });
    } catch (error) {
      console.error("유저 정보를 가져오는 중 오류 발생:", error);
    }
  };

  // 수정된 유저 데이터를 서버에 PUT 요청으로 전송
  const saveUserData = async () => {
    console.log("saveUserData 호출됨");
    try {
      console.log("API 호출 시작");
      const response = await apiClient.put("/user-data", profile); // 프로필 저장 API 호출
      console.log("API 호출 성공:", response.data);
      alert("프로필이 성공적으로 저장되었습니다!");
      setIsEditing(false); // 저장 후 수정 모드 종료
    } catch (error) {
      console.error("프로필 저장 중 오류 발생:", error);
      alert("프로필 저장 중 오류가 발생했습니다.");
      setIsEditing(false); // 저장 후 수정 모드 종료
    }
  };

  // 컴포넌트가 마운트될 때 유저 데이터 가져오기
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        await saveUserData(); // 데이터를 저장
        setIsEditing(false); // 저장 성공 시 수정 모드 종료
      } catch (error) {
        console.error("저장 중 오류 발생:", error);
        alert("저장 중 오류가 발생했습니다.");
      }
    } else {
      setIsEditing(true); // 수정 모드 활성화
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlusClick = () => {
    alert("플러스 버튼 클릭됨!"); // 원하는 동작 추가
  };

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.sideLeft}></div>
      <header className={styles.headerAlign}>
        <Header />
      </header>
      <main>
        <div className={styles.side1}></div>
        <div className={styles.content}>
          <div className={styles.frame7}>
            <div className={styles.frameWrapper}>
              <div className={styles.frame8}>
                <div className={styles.textWrapper}>MY PROFILE</div>

                {/* 수정/저장 버튼 */}
                <div
                  className={`${styles.editDeleteButton} ${styles.editDeleteButtonInstance}`}
                  onClick={handleEditToggle} // 저장 또는 수정 모드 토글
                >
                  <button className={`${styles.div3} ${styles.editDeleteButton2}`}>
                    {isEditing ? "저장" : "수정"}
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.frame9}>
              <div className={styles.frame10}>
                <div
                  className={styles.frame11}
                  onClick={isEditing ? handlePlusClick : undefined} // 수정 모드일 때만 클릭 동작 활성화
                >
                  {/* 수정 모드일 때만 플러스 버튼 이미지 표시 */}
                  {isEditing && (
                    <img
                      src={Frame44}
                      alt="플러스 버튼"
                      className={styles.plusButton}
                    />
                  )}
                </div>

                <div className={styles.frame12}>
                  <div className={styles.frame13}>
                    <div className={styles.textWrapper2}>이름</div>

                    {/* 수정 모드에 따라 input으로 변경 */}
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        placeholder="이름이 비어있어요."
                        value={profile.name}
                        onChange={handleInputChange}
                        className={styles.textWrapper3}
                      />
                    ) : (
                      <div className={styles.textWrapper3}>{profile.name || "이름이 비어있어요."}</div>
                    )}
                  </div>

                  <div className={styles.frame14}>
                    <div className={styles.textWrapper4}>한줄소개</div>

                    {/* 수정 모드에 따라 input으로 변경 */}
                    {isEditing ? (
                      <input
                        type="text"
                        name="intro"
                        value={profile.intro}
                        placeholder="한줄소개가 비어있어요."
                        onChange={handleInputChange}
                        className={styles.textWrapper3}
                      />
                    ) : (
                      <div className={styles.textWrapper3}>{profile.intro || "한줄소개가 비어있어요."}</div>
                    )}
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
