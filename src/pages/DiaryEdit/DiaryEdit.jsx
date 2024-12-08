import React, { useState, useEffect, useRef } from 'react';
import axios from '../../services/apiClient';
import styles from './DiaryEdit.module.css';
import arrow24 from '../../assets/images/arrow-24.png';

const DiaryEdit = ({ id, closeModal }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [subImageFiles, setSubImageFiles] = useState([]);
  const [subImagePreviews, setSubImagePreviews] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState(null); // 'daily' or 'clothes'
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const response = await axios.get(`/diaries/${id}`);
        const data = response.data;
        setTitle(data.title);
        setContent(data.content);
        setDate(data.date);

        // 메인 이미지 URL 요청
        const mainImageResponse = await axios.get(`/diaries/image/${data.mainImagePath}`, { responseType: 'blob' });
        const mainImageBlob = mainImageResponse.data;
        const mainImageUrl = URL.createObjectURL(mainImageBlob);
        setMainImagePreview(mainImageUrl);
        setMainImageFile(new File([mainImageBlob], data.mainImagePath)); // Blob을 File로 변환하여 저장
        console.log('Main image file:', new File([mainImageBlob], data.mainImagePath));

        // 서브 이미지 URL 요청
        const subImageBlobs = await Promise.all(
          data.subImagePaths.map(async (key) => {
            const response = await axios.get(`/diaries/image/${key}`, { responseType: 'blob' });
            return response.data;
          })
        );
        const subImageUrls = subImageBlobs.map(blob => URL.createObjectURL(blob));
        setSubImagePreviews(subImageUrls);
        const subImageFiles = subImageBlobs.map((blob, index) => new File([blob], data.subImagePaths[index]));
        setSubImageFiles(subImageFiles); // Blob을 File로 변환하여 저장
      } catch (error) {
        console.error('Failed to fetch diary data:', error);
      }
    };

    fetchDiaryData();
  }, [id]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDailyLookClick = () => {
    setCurrentMode('daily');
    openFileDialog(false);
  };

  const handleClothesClick = () => {
    setCurrentMode('clothes');
    openFileDialog(true);
  };

  const openFileDialog = (multiple) => {
    if (fileInputRef.current) {
      fileInputRef.current.multiple = multiple;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (currentMode === 'daily') {
        // 첫 번째 파일을 mainImageFile로 교체
        const file = files[0];
        const url = URL.createObjectURL(file);
        setMainImageFile(file);
        setMainImagePreview(url);
        console.log('New main image file:', file);
      } else if (currentMode === 'clothes') {
        // 선택한 모든 파일을 subImageFiles에 추가
        const selectedFiles = Array.from(files);
        const selectedPreviews = selectedFiles.map(f => URL.createObjectURL(f));
        setSubImageFiles((prev) => [...prev, ...selectedFiles]);
        setSubImagePreviews((prev) => [...prev, ...selectedPreviews]);
        console.log('New sub image files:', selectedFiles);
      }
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      // data 부분(JSON)
      const diaryData = {
        title: title,
        content: content,
        date: date, // 사용자 입력 혹은 현재 날짜 사용
      };
      await formData.append("data", new Blob([JSON.stringify(diaryData)], { type: "application/json" }));

      // 메인 이미지 파일 추가
      if (mainImageFile) {
        await formData.append("mainImage", mainImageFile);
      }

      // 서브 이미지 파일들 추가
      if (subImageFiles && subImageFiles.length > 0) {
        await subImageFiles.forEach(file => formData.append("subImages", file));
      }

      // 서버로 전송 (API 엔드포인트, 인증토큰 등 필요할 수 있음)
      const response = await axios.put(`/diaries/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("업로드 성공:", response.data);
      alert("업로드 성공!");
      closeModal(); // 업로드 성공 시 모달 닫기

    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드 실패");
    }
  };

  return (
    <div className={styles.DiaryUploadContainer}>
      <div className={styles.MainContainer}>
        <div className={styles.LeftBox}>
          <div className={styles.UploadTitle}>
            오늘의 이야기
          </div>

          <div className={styles.UploadInput}>
            <div className={styles.InputTitle}>
              <input
                placeholder="제목을 입력해 주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.Inputcontent}>
              <textarea
                placeholder="오늘의 이야기를 자유롭게 펼쳐 보세요!"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.UploadButtons}>
            <div className={styles.FileSelectButton}>
              <button onClick={handleDropdownToggle}>
                <p>파일 선택하기</p>
                <img src={arrow24} alt="arrow" />
              </button>
              {dropdownOpen && (
                <div className={styles.DropdownMenu}>
                  <button className={styles.DropdownItem} onClick={handleDailyLookClick}>
                    데일리룩 등록
                  </button>
                  <button className={styles.DropdownItem} onClick={handleClothesClick}>
                    옷 등록
                  </button>
                </div>
              )}
            </div>
            <div className={styles.UpBt}>
              <button className={styles.UpBt2} onClick={handleUpload}>업로드</button>
            </div>
          </div>
        </div>
        <div className={styles.RightBox}>
          <div className={styles.MainImg}>
            {mainImagePreview ? (
              <img src={mainImagePreview} alt="Main" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
            ) : null}
          </div>
          <div className={styles.SubImg}>
            {subImagePreviews.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`SubImg-${index}`}
                style={{ width: "90.5px", height: "134.29px", objectFit: "cover", borderRadius: "5px" }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* 숨겨진 파일 입력 필드 */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};

export default DiaryEdit;
