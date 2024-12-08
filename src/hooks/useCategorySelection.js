import { useState } from 'react';
import apiClient from '../services/apiClient'; // axios 인스턴스 사용

export function useCategorySelection() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imageIds, setImageIds] = useState([]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);

    try {
      // 서버에 카테고리 데이터 요청
      const response = await apiClient.get(`/closet/${category}`);
      const ids = response.data.map((item) => item.id);
      setImageIds(ids);
    } catch (error) {
      console.error('Error fetching category data:', error);
      alert('Failed to load category data. Please try again.');
    }
  };

  return {
    selectedCategory,
    setSelectedCategory,
    handleCategoryClick,
    imageIds,
  };
}
