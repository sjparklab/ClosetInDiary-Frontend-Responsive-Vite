import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ClothesSelectionModal.module.css';
import apiClient from '../../services/apiClient';

const ClothesSelectionModal = ({ isOpen, onClose, onSelect }) => {
    const [clothesList, setClothesList] = useState([]);
    const [selectedClothes, setSelectedClothes] = useState([]);

    useEffect(() => {
        if (isOpen) {
            // 옷장 데이터 가져오기
            const fetchClothes = async () => {
                try {
                    const response = await apiClient.get('/closet/All'); // API 엔드포인트 수정
                    const clothesData = response.data;

                    // 각 객체의 fileName을 사용하여 추가 요청 보내기
                    const clothesWithFileNames = await Promise.all(
                        clothesData.map(async (clothes) => {
                            try {
                                const fileResponse = await apiClient.get(`/closet/image/${clothes.id}`, { responseType: 'blob' });
                                const imageUrl = URL.createObjectURL(fileResponse.data);
                                return { ...clothes, imageUrl };
                            } catch (fileError) {
                                console.error(`Failed to fetch file for ${clothes.fileName}:`, fileError);
                                return clothes; // 파일 요청 실패 시 원래 객체 반환
                            }
                        })
                    );

                    setClothesList(clothesWithFileNames);
                } catch (error) {
                    console.error('Failed to fetch clothes:', error);
                }
            };
            fetchClothes();
        }
    }, [isOpen]);

    const handleSelect = (clothes) => {
        setSelectedClothes((prev) => {
            if (prev.includes(clothes)) {
                return prev.filter((item) => item !== clothes);
            } else {
                return [...prev, clothes];
            }
        });
    };

    const handleConfirm = () => {
        onSelect(selectedClothes);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.clothSelectionText}>옷 선택</h2>
                <table className={styles.clothesTable}>
                    <thead>
                        <tr>
                            <th>카테고리</th>
                            <th>브랜드</th>
                            <th>사진</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clothesList
                            .sort((a, b) => a.category.localeCompare(b.category)) // 카테고리 이름 순서대로 정렬
                            .map((clothes) => (
                                <tr
                                    key={clothes.id}
                                    className={`${styles.clothesRow} ${selectedClothes.includes(clothes) ? styles.selected : ''}`}
                                    onClick={() => handleSelect(clothes)}
                                >
                                    <td>{clothes.category}</td>
                                    <td>{clothes.brand}</td>
                                    <td>
                                        <img src={clothes.imageUrl} alt={clothes.name} className={styles.clothesImage} />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className={styles.actions}>
                    <button onClick={handleConfirm}>확인</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

ClothesSelectionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default ClothesSelectionModal;