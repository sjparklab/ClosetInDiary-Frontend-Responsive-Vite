// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 정보
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 여부
  const navigate = useNavigate();

  const signup = async (userData) => {
    try {
      await authService.signup(userData); // 회원가입 API 호출
      alert('Sign up successful! You can now log in.');
      navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.response?.data?.message || 'Sign up failed. Please try again.');
    }
  };

  const login = async (email, password) => {
    try {
      const { accessToken, refreshToken, user } = await authService.login(email, password);

      // 토큰 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // 사용자 상태 업데이트
      setUser(user);
      setIsAuthenticated(true);

      // 페이지 이동
      navigate('/closet');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const logout = () => {
    // 로그아웃 처리
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
