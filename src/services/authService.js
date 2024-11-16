// src/api/authService.js
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// 로그인 요청
export const login = async (email, password) => {
  const response = await axios.post(`${apiUrl}/api/login`, {
    email,
    password,
  });
  return response.data; // 로그인 성공 시 반환되는 데이터 (토큰, 사용자 정보 등)
};

// 로그아웃 요청 (옵션: 서버에 로그아웃 요청 필요 시)
export const logout = async () => {
  // 로그아웃 API가 있다면 여기에 추가
  return Promise.resolve();
};
