import React, { useState, useEffect, useRef } from "react";
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
    onelineInfo: "",
    profilePicture: null, // 단일 이미지 업로드
  });

  const fileInputRef = useRef(null); // 파일 업로드 input 참조

  const fetchUserData = async () => {
    try {
      // 사용자 기본 정보 가져오기
      const userInfoResponse = await apiClient.get("/user-data");
      const userInfo = userInfoResponse.data;
  
      // 사용자 프로필 사진 가져오기
      const profilePictureResponse = await apiClient.get("/user-profile-picture", {
        responseType: "blob", // 이미지 데이터를 Blob으로 받음
      });
  
      // Blob 데이터를 URL로 변환
      const profilePictureUrl = URL.createObjectURL(profilePictureResponse.data);
  
      // 상태 업데이트
      setProfile({
        name: userInfo.name || "이름 없음",
        onelineInfo: userInfo.onelineInfo || "소개 없음",
        profilePicture: profilePictureUrl, // Blob URL 설정
      });
    } catch (error) {
      console.error("유저 데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    return () => {
      // Blob URL 해제
      if (profile.profilePicture) {
        URL.revokeObjectURL(profile.profilePicture);
      }
    };
  }, []);


  const saveUserData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("intro", profile.onelineInfo);

      // 프로필 사진 Blob 추가
      if (profile.profilePicture instanceof Blob) {
        formData.append("file", profile.profilePicture);
      }

      const response = await apiClient.put("/user-data", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("API 호출 성공:", response.data);
      alert("프로필이 성공적으로 저장되었습니다!");
      setIsEditing(false); // 저장 후 수정 모드 종료
    } catch (error) {
      console.error("프로필 저장 중 오류 발생:", error);
      alert("프로필 저장 중 오류가 발생했습니다.");
    }
  };


  // 컴포넌트가 마운트될 때 유저 데이터 가져오기
  useEffect(() => {
    return () => {
      if (profile.profilePicture instanceof File) {
        URL.revokeObjectURL(profile.profilePicture);
      }
    };
  }, [profile.profilePicture]);

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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        profilePicture: file, // Blob 객체 저장
      }));
    }
  };

  const getImageSrc = () => {
    if (!profile.profilePicture) {
      // profilePicture 값이 비어있으면 null 반환
      return null;
    }

    if (profile.profilePicture instanceof File || profile.profilePicture instanceof Blob) {
      // File 또는 Blob 객체인 경우 URL 생성
      return URL.createObjectURL(profile.profilePicture);
    }

    if (typeof profile.profilePicture === "string") {
      // 문자열 (Base64 데이터나 URL)인 경우 그대로 반환
      return profile.profilePicture;
    }

    // 그 외 데이터 타입은 null 반환
    return null;
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
                  onClick={isEditing ? () => fileInputRef.current.click() : undefined}
                >
                  {getImageSrc() ? (
                    <img
                      src={getImageSrc()}
                      alt="Uploaded"
                      className={styles.uploadedPhoto}
                    />
                  ) : (
                    isEditing && (
                      <div className={styles.plusButtonWrapper}>
                        <img src={Frame44} alt="플러스 버튼" className={styles.plusButton} />
                      </div>
                    )
                  )}

                  {/* 숨겨진 파일 업로드 input */}
                  <input
                    ref={fileInputRef}
                    id="photo-upload-input"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handlePhotoUpload}
                  />
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
                        name="onelineInfo"
                        value={profile.onelineInfo}
                        placeholder="한줄소개가 비어있어요."
                        onChange={handleInputChange}
                        className={styles.textWrapper3}
                      />
                    ) : (
                      <div className={styles.textWrapper3}>
                        {profile.onelineInfo || "한줄소개가 비어있어요."}
                      </div>
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