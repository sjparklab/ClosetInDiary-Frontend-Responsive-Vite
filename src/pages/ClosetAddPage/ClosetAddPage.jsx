import React, { useState } from "react";
import styles from "./ClosetAddPage.module.css"; // 모듈 import
import PropTypes from "prop-types";
import frame53 from "../../assets/images/frame-53.svg";
import keyboardarrowdown from "../../assets/images/keyboard-arrow-down-1.png";
import Header from "../../components/NormalHeader";
import Footer from "../../components/Footer";
import apiClient from "../../services/apiClient";

const ClosetAddClothes = () => {
  const [selectedOption, setSelectedOption] = useState(""); // 선택된 값 관리
  const [uploadedImage, setUploadedImage] = useState(frame53); // 미리보기용 이미지 URL
  const [fileToUpload, setFileToUpload] = useState(null); // 서버로 전송할 File 객체

  const [inputs, setInputs] = useState({
    reason: "",
    purchaseDate: "",
    brand: "",
    size: "",
  });

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileToUpload(file); // 서버 전송용으로 File 객체 저장

      // 미리보기를 위해 FileReader 사용
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // 데이터 URL로 변환된 이미지를 미리보기용으로 저장
      };
      reader.readAsDataURL(file); // File 객체를 데이터 URL로 읽기
    }
  };


  const handleUpload = async () => {
    console.log("test");
    const formData = new FormData();

    // FormData에 데이터 추가
    formData.append("file", fileToUpload); // File 객체로 전송
    formData.append("category", selectedOption);
    formData.append("reason", inputs.reason);
    formData.append("purchaseDate", inputs.purchaseDate);
    formData.append("brand", inputs.brand);
    formData.append("size", inputs.size);

    try {
      const response = await apiClient.post("/closet/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("옷 정보가 성공적으로 업로드되었습니다!");
      console.log(response.data);

      // 입력 필드 초기화
      setInputs({
        reason: "",
        purchaseDate: "",
        brand: "",
        size: "",
      });
      setSelectedOption(""); // 선택된 카테고리 초기화
      setUploadedImage(frame53); // 업로드된 이미지 초기화 (기본 이미지로 복원)
      setFileToUpload(null); // 파일 상태 초기화
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드 중 문제가 발생했습니다.");
    }
  };

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
              {/* 이미지 업로드 기능 추가 */}
              <label htmlFor="file-upload" className={styles.imgWrapper}>
                <img className={styles.img} alt="Frame" src={uploadedImage} />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />


              <div className={styles.frame5}>
                <div className={styles.frame6}>
                  <p className={styles.textWrapper2}>
                    이 옷을 사게 된 계기는 무엇인가요?
                  </p>

                  <div className={styles.frame7}>
                    <input
                      className={styles.textWrapper3}
                      placeholder="계기를 입력해주세요"
                      name="reason" // 추가
                      value={inputs.reason} // 상태와 연결
                      onChange={(e) => setInputs({ ...inputs, reason: e.target.value })} // 값 반영
                    />

                  </div>
                </div>

                <div className={styles.frame8}>
                  <div className={styles.textWrapper2}>어떤 옷인가요?</div>

                  <div className={styles.frame9}>
                    <div className={styles.frame10}>
                      <div className={styles.textWrapper4}>카테고리</div>

                      <div className={styles.frame11}>
                        <select
                          className={styles.textWrapper5}
                          value={selectedOption}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            카테고리를 선택해주세요
                          </option>
                          <option value="TOPS">상의</option>
                          <option value="DRESSES">드레스</option>
                          <option value="PANTS">바지</option>
                          <option value="SKIRTS">치마</option>
                          <option value="OUTERWEAR">아우터</option>
                          <option value="SHOES">신발</option>
                          <option value="BAGS">가방</option>
                          <option value="ACCESSORIES">액세서리</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.frame12}>
                      <div className={styles.textWrapper4}>구매일</div>

                      <div className={styles.frame13}>
                        <input
                          className={styles.textWrapper6}
                          placeholder="구매일을 입력해주세요"
                          type="date" // 날짜 입력을 강제
                          name="purchaseDate" // 추가
                          value={inputs.purchaseDate} // 상태와 연결
                          onChange={(e) => setInputs({ ...inputs, purchaseDate: e.target.value })} // 값 반영
                        />
                      </div>
                    </div>

                    <div className={styles.frame12}>
                      <div className={styles.textWrapper7}>브랜드</div>

                      <div className={styles.frame13}>
                        <input
                          className={styles.textWrapper6}
                          placeholder="브랜드를 입력해주세요"
                          name="brand" // 추가
                          value={inputs.brand} // 상태와 연결
                          onChange={(e) => setInputs({ ...inputs, brand: e.target.value })} // 값 반영
                        />
                      </div>
                    </div>

                    <div className={styles.frame12}>
                      <div className={styles.textWrapper7}>사이즈</div>

                      <div className={styles.frame13}>
                        <input
                          className={styles.textWrapper6}
                          placeholder="사이즈를 입력해주세요"
                          name="size" // 추가
                          value={inputs.size} // 상태와 연결
                          onChange={(e) => setInputs({ ...inputs, size: e.target.value })} // 값 반영
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.frame321Wrapper}>
                  <Frame
                    className={styles.frame321}
                    divClassName={styles.frameInstance}
                    mOde="UPLOAD"
                    onClick={handleUpload} // 추가
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const Frame = ({ mOde, className, divClassName, onClick }) => {
  return (
    <button
      className={`${styles.frame} ${className}`}
      onClick={onClick} // 클릭 이벤트 추가
      type="button" // 기본 제출 동작 방지
    >
      <div className={`${styles.textWrapperFrame} ${divClassName}`}>업로드</div>
    </button>
  );
};


Frame.propTypes = {
  mOde: PropTypes.oneOf(["UPLOAD"]),
};


export default ClosetAddClothes;