import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Closet.module.css';
import Header from '../../components/NormalHeader';
import Footer from '../../components/Footer';
import classNames from 'classnames';
import addNewCategoryImage from '../../assets/images/addNewCategory.png';
import allCategoryImage from '../../assets/images/allCategory.png';
import topsCategoryImage from '../../assets/images/topsCategory.png';
import dressesCategoryImage from '../../assets/images/dressesCategory.png';
import pantsCategoryImage from '../../assets/images/pantsCategory.png';
import skirtsCategoryImage from '../../assets/images/skirtsCategory.png';
import outwearCategoryImage from '../../assets/images/outwearCategory.png';
import shoesCategoryImage from '../../assets/images/shoesCategory.png';
import bagsCategoryImage from '../../assets/images/bagsCategory.png';
import accessoriesCategoryImage from '../../assets/images/accessoriesCategory.png';
import { useCategorySelection } from '../../hooks/useCategorySelection';
import apiClient from '../../services/apiClient';

const categories = [
  { name: 'Add New', image: addNewCategoryImage },
  { name: 'All', image: allCategoryImage },
  { name: 'Tops', image: topsCategoryImage },
  { name: 'Dresses', image: dressesCategoryImage },
  { name: 'Pants', image: pantsCategoryImage },
  { name: 'Skirts', image: skirtsCategoryImage },
  { name: 'Outerwear', image: outwearCategoryImage },
  { name: 'Shoes', image: shoesCategoryImage },
  { name: 'Bags', image: bagsCategoryImage },
  { name: 'Accessories', image: accessoriesCategoryImage },
];

const Closet = () => {
  const { selectedCategory, setSelectedCategory, handleCategoryClick, imageIds } = useCategorySelection();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleCategoryClickWithNavigation = (categoryName) => {
    if (categoryName === 'Add New') {
      navigate('/closet/add-new'); // "Add New" 클릭 시 /add-new 경로로 이동
    } else {
      handleCategoryClick(categoryName); // 다른 카테고리의 기존 동작 처리
    }
  };

  const handleImageClick = (id) => {
    navigate(`/closet/edit/${id}`);
  };

  useEffect(() => {
    // 컴포넌트가 마운트되면 기본 카테고리를 "All"로 설정
    handleCategoryClickWithNavigation('All');
  }, [setSelectedCategory]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageRequests = imageIds.map((id) =>
          apiClient.get(`/closet/image/${id}`, { responseType: 'blob' })
        );

        const imageResponses = await Promise.all(imageRequests);
        const imageUrls = imageResponses.map((response) => URL.createObjectURL(response.data));
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
        alert('Failed to load images. Please try again.');
      }
    };

    if (imageIds.length > 0) {
      fetchImages();
    }
  }, [imageIds]);

  return (
    <div className={styles.maxSizingContainer}>
      <div className={styles.DiaryContainer}>
        <div className={styles.Header}>
          <Header />
        </div>
        <div className={styles.main}>
          <div className={styles.sideleft} />
          <div className={styles.categorySelector}>
            <div className={styles.catTitleUnderline}>
              <div className={styles.categoryTitle}>MY CLOSET</div>
            </div>
            <div className={styles.categorySettigns}>
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={styles.categorySettingsBox}
                  onClick={() => handleCategoryClickWithNavigation(category.name)}
                >
                  <div
                    className={classNames(styles.categoryList, {
                      [styles.selected]: selectedCategory === category.name,
                    })}
                  >
                    <img src={category.image} alt={category.name} />
                  </div>
                  <p>{category.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.side2} />
          <div className={styles.side3} />
          <div className={styles.clothData}>
            <div className={images.length > 0 ? styles.grid : styles.emptyGrid}>
              {images.length > 0 ? (
                images.map((url, index) => (
                  <div key={index} className={styles.gridItem} onClick={() => handleImageClick(imageIds[index])}>
                    <img src={url} alt={`Image ${index}`} className={styles.gridImage} />
                  </div>
                ))
              ) : (
                <p className={styles.noDataMessage}>옷장이 아직 비어있어요! 당신의 스타일로 채워보세요.</p>
              )}
            </div>
          </div>
          <div className={styles.side4} />
          <div className={styles.side5} />
          <div className={styles.sideright} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Closet;
