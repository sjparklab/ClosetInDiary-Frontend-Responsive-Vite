import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styles from "./ClosetEditPage.module.css"; // 모듈 import
import PropTypes from "prop-types";
import frame53 from "../../assets/images/frame-53.svg";
import keyboardarrowdown from "../../assets/images/keyboard-arrow-down-1.png";
import Header from "../../components/NormalHeader";
import Footer from "../../components/Footer";
import apiClient from "../../services/apiClient";

const ClosetAddClothes = () => {
  const { id } = useParams(); // Get the id from the URL
  const [selectedOption, setSelectedOption] = useState(""); // 선택된 값 관리
  const [uploadedImage, setUploadedImage] = useState(frame53); // 미리보기용 이미지 URL
  const [fileToUpload, setFileToUpload] = useState(null); // 서버로 전송할 File 객체
  const [diaries, setDiaries] = useState([]);
  const [diariesImage, setDiariesImage] = useState([]);


  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    reason: "",
    purchaseDate: "",
    brand: "",
    size: "",
  });

  useEffect(() => {
    const fetchClothesData = async () => {
      try {
        const response = await apiClient.get(`/closet/edit/${id}`);
        const data = response.data;
        setInputs({
          reason: data.reason,
          purchaseDate: data.purchaseDate,
          brand: data.brand,
          size: data.size,
        });
        setSelectedOption(data.category);

        // 이미지 URL을 별도로 요청
        const imageResponse = await apiClient.get(`/closet/image/${id}`, { responseType: 'blob' });
        const imageBlob = imageResponse.data;
        const imageUrl = URL.createObjectURL(imageBlob);
        setUploadedImage(imageUrl);
      } catch (error) {
        console.error("Failed to fetch clothes data:", error);
      }
    };

    if (id) {
      fetchClothesData();
    }
  }, [id]);

  useEffect(() => {
    // 옷과 연결된 일기 데이터를 가져오기
    const fetchDiaries = async () => {
      try {
        const response = await apiClient.get(`/closet/${id}/diaries`);
        const diariesData = response.data;

        // 각 일기의 이미지 URL을 별도로 요청
        const diariesWithImages = await Promise.all(
          diariesData.map(async (diary) => {
            try {
              const imageResponse = await apiClient.get(`/diaries/image/${diary.mainImagePath}`, { responseType: 'blob' });
              const imageBlob = imageResponse.data;
              const imageUrl = URL.createObjectURL(imageBlob);
              return { ...diary, imageUrl };
            } catch (error) {
              console.error(`Failed to fetch image for diary ${diary.id}:`, error);
              return diary; // 이미지 요청 실패 시 원래 객체 반환
            }
          })
        );

        setDiaries(diariesData);
        setDiariesImage(diariesWithImages);
      } catch (error) {
        console.error('Failed to fetch diaries:', error);
      }
    };

    fetchDiaries();
  }, [id]);

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
      const response = await apiClient.put(`/closet/image/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("옷 정보가 성공적으로 수정되었습니다!");
      console.log(response.data);
      navigate('/closet'); // 업로드 성공 시 /closet으로 리디렉션

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
              <p className={styles.p}>이 옷이 품은 당신의 이야기</p>
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
                          <option value="TOPS">TOPS</option>
                          <option value="DRESSES">DRESSES</option>
                          <option value="PANTS">PANTS</option>
                          <option value="SKIRTS">SKIRTS</option>
                          <option value="OUTERWEAR">OUTERWEAR</option>
                          <option value="SHOES">SHOES</option>
                          <option value="BAGS">BAGS</option>
                          <option value="ACCESSORIES">ACCESSORIES</option>
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
        <div className={styles.diaryContainer}>
          {diariesImage.map((diary) => (
            <div key={diary.id} className={styles.diaryFrame}>
              <div className={styles.diaryOverlap}>
                <img className={styles.diaryImage} alt="Image" src={diary.imageUrl} />
              </div>
              <div className={styles.diaryOverlapGroup}>
                <div className={styles.diaryFrameWrapper}>
                  <div className={styles.diaryDivWrapper}>
                    <div className={styles.diaryDiv}>
                      <div className={styles.diaryTextWrapper2}>{new Date(diary.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</div>
                      <div className={styles.diaryTextWrapper3}>{diary.title}</div>
                      <div className={styles.diaryElementWrapper}>
                        <p className={styles.diaryElement}>{diary.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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