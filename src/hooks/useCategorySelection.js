import { useState } from 'react';
import apiClient from '../services/apiClient'; // axios 인스턴스 사용

export function useCategorySelection() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [images, setImages] = useState([]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);

    try {
      // 서버에 카테고리 데이터 요청
      const response = await apiClient.get(`/closet/${category}`);
      const imageIds = response.data.map((item) => item.id);

      // 이미지 요청
      const imageRequests = imageIds.map((id) =>
        apiClient.get(`/closet/image/${id}`, { responseType: 'blob' })
      );

      const imageResponses = await Promise.all(imageRequests);

      // Blob URL 생성
      const imageUrls = imageResponses.map((response) => URL.createObjectURL(response.data));
      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching category data:', error);
      alert('Failed to load category data. Please try again.');
    }
  };

  return {
    selectedCategory,
    handleCategoryClick,
    images,
  };
}
