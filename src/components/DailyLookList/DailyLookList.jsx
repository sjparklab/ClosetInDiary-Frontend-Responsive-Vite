import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

// DailyLookList 컴포넌트에서 imageUrl 대신 blobImage를 받아 처리하는 경우
export const DailyLookList = ({
  className,
  text = "2024-11-10",
  frameClassName,
  text1 = "첫 일기. 꼬박꼬박 잘 써야지 !",
  divClassName,
  blobImage,
}) => {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    if (blobImage) {
      // Blob 데이터를 Blob URL로 변환
      const url = URL.createObjectURL(blobImage);
      setBlobUrl(url);

      // 컴포넌트 언마운트 시 URL 해제
      return () => URL.revokeObjectURL(url);
    }
  }, [blobImage]);

  return (
    <div className={`daily-look-list ${className}`}>
      <div className="dailylook-box">
        {blobUrl ? (
          <img src={blobUrl} alt="Daily Look" className="dailylook-image" />
        ) : (
          <div className="no-image-placeholder" />
        )}
      </div>

      <div className="ellipse" />

      <div className={`frame ${frameClassName}`}>
        <div className="element">{text}</div>
        <p className={`text-wrapper ${divClassName}`}>{text1}</p>
      </div>
    </div>
  );
};

DailyLookList.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
  blobImage: PropTypes.instanceOf(Blob),
};
