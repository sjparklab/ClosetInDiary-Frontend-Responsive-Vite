import React, { useState, useRef } from 'react';
import styles from './DiaryUpload.module.css';
import arrow24 from '../../assets/images/arrow-24.png';
import axios from '../../services/apiClient';

const DiaryUpload = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mainImageFile, setMainImageFile] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(null);

    const [subImageFiles, setSubImageFiles] = useState([]);
    const [subImagePreviews, setSubImagePreviews] = useState([]);

    const fileInputRef = useRef(null); 
    const [currentMode, setCurrentMode] = useState(null); // 'daily' or 'clothes'

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(""); 
    // date는 사용자가 선택하거나 입력하도록 할 수도 있음. 여기서는 단순히 빈 문자열로 시작.

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
                // 첫 번째 파일을 mainImageFile로
                const file = files[0];
                const url = URL.createObjectURL(file);
                setMainImageFile(file);
                setMainImagePreview(url);
            } else if (currentMode === 'clothes') {
                // 선택한 모든 파일을 subImageFiles에 추가
                const selectedFiles = Array.from(files);
                const selectedPreviews = selectedFiles.map(f => URL.createObjectURL(f));
                setSubImageFiles((prev) => [...prev, ...selectedFiles]);
                setSubImagePreviews((prev) => [...prev, ...selectedPreviews]);
            }
        }
    };

    const handleUpload = async () => {
        try {
            setDate(new Date().toISOString().substring(0, 10));
            const formData = new FormData();

            // data 부분(JSON)
            const diaryData = {
                title: title,
                content: content,
                date: date, // 사용자 입력 혹은 현재 날짜 사용
            };
            formData.append("data", new Blob([JSON.stringify(diaryData)], { type: "application/json" }));

            // 메인 이미지 파일 추가
            if (mainImageFile) {
                formData.append("mainImage", mainImageFile);
            }

            // 서브 이미지 파일들 추가
            if (subImageFiles && subImageFiles.length > 0) {
                subImageFiles.forEach(file => formData.append("subImages", file));
            }

            // 서버로 전송 (API 엔드포인트, 인증토큰 등 필요할 수 있음)
            const response = await axios.post("/diaries", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("업로드 성공:", response.data);
            alert("업로드 성공!");

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
                            <img src={mainImagePreview} alt="Main" style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"10px"}} />
                        ) : null}
                    </div>
                    <div className={styles.SubImg}>
                        {subImagePreviews.map((imgSrc, index) => (
                            <img
                                key={index}
                                src={imgSrc}
                                alt={`SubImg-${index}`}
                                style={{width:"90.5px", height:"134.29px", objectFit:"cover", borderRadius:"5px"}}
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

export default DiaryUpload;
