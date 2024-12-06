import React, { useEffect, useState } from "react";
import { DailyLookList } from "../../components/DailyLookList";
import { PaginationControl } from "../../components/PaginationControl";
import { PaginationPage } from "../../components/PaginationPage";
import styles from "./DiaryPage.module.css";
import Header from "../../components/NormalHeader";
import Footer from "../../components/Footer";
import apiClient from "../../services/apiClient"; // 위에서 주신 apiClient 코드가 있는 경로
import plusbutton from "./plusbutton.svg"
import DiaryUpload from "../../pages/DiaryUpload";

const DiaryNewest = () => {
  const [diaries, setDiaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // 최대 16개

  useEffect(() => {
    async function loadDiaries() {
      try {
        const { data } = await apiClient.get("/diaries");
        // data: [{ text: "2024-11-01", text1: "내용", imagePath: "/images/1" }, ...]

        const diariesWithBlobs = [];
        for (const diary of data) {
          let blobImage = null;
          if (diary.imagePath) {
            const imageResponse = await apiClient.get(diary.imagePath, { responseType: 'blob' });
            blobImage = imageResponse.data;
          }
          diariesWithBlobs.push({
            ...diary,
            blobImage
          });
        }

        setDiaries(diariesWithBlobs);
      } catch (error) {
        console.error(error);
      }
    }

    loadDiaries();
  }, []);

  const totalPages = Math.ceil(diaries.length / itemsPerPage);
  const currentItems = diaries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div className={styles["diary-newest"]}>
        <div className={styles.group}>
          <div className={styles["div-wrapper"]}>
            <div className={styles["text-wrapper-2"]}>MY DIARY</div>
          </div>

          <div className={styles["group-2"]}>
            <div className={styles["group-3"]}>
              <div className={styles["frame-2"]}>
                <div className={styles["text-wrapper-3"]}>최신순</div>
              </div>
              <div className={styles["frame-3"]}>
                <div className={styles["text-wrapper-4"]}>기간 지정</div>
              </div>
            </div>

            <div className={styles["group-4"]}>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <DailyLookList
                    key={index}
                    className={styles["daily-look-list-instance"]}
                    text={item.text}
                    text1={item.text1}
                  // 필요하다면 frameClassName, divClassName도 적용 가능
                  />
                ))
              ) : (
                <div className={styles["empty-message"]}>
                  당신의 이야기로 채워질 공간입니다. 오늘 하루는 어땠나요?
                </div>
              )}
            </div>
          </div>
        </div>

        {totalPages > 1 && (
          <div className={styles["group-6"]}>
            <div className={styles["frame-wrapper"]}>
              <div className={styles["frame-4"]}>
                {/* 이전 페이지 버튼 */}
                <PaginationControl
                  className={styles["pagination-control-instance"]}
                  divClassName={styles["pagination-control-2"]}
                  size="lg"
                  state="default"
                  type="back"
                  text={true}
                  onClick={handlePrevPage}
                />

                {/* 페이지 번호 버튼들 */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <PaginationPage
                    key={pageNum}
                    className={
                      pageNum === currentPage
                        ? styles["pagination-page-3"] // 현재 페이지 스타일
                        : styles["pagination-page-instance"]
                    }
                    divClassName={
                      pageNum === currentPage
                        ? styles["pagination-page-4"]
                        : styles["pagination-page-5"]
                    }
                    page={String(pageNum)}
                    size="lg"
                    stateProp={pageNum === currentPage ? "active" : "default"}
                    onClick={() => handlePageChange(pageNum)}
                  />
                ))}

                {/* 다음 페이지 버튼 */}
                <PaginationControl
                  className={styles["pagination-control-4"]}
                  divClassNameOverride={styles["pagination-control-3"]}
                  size="lg"
                  state="default"
                  type="next"
                  text={true}
                  onClick={handleNextPage}
                />
              </div>
            </div>
          </div>
        )}
        {/* 추가 버튼 */}
        <button className={styles["add-button"]} onClick={handleOpenModal}>
          <img src={plusbutton} alt="" />
        </button>

        {showModal && (
  <div className={styles["modal-overlay"]} onClick={handleCloseModal}>
      <div onClick={(e) => e.stopPropagation()}>
          <DiaryUpload />
      </div>
  </div>
)}
      </div>

      <Footer />
    </>
  );
};

export default DiaryNewest;
