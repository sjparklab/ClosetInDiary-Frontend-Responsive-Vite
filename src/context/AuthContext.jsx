import React, { createContext, useState, useContext } from 'react';

// 1. Context 생성
const AuthContext = createContext();

// 2. Provider 컴포넌트 구현
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 로그인 상태 (null은 로그아웃 상태)

  // 로그인 함수
  const login = (userData) => {
    setUser(userData);
    // 예: 토큰을 localStorage에 저장
    localStorage.setItem('token', userData.token);
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // 토큰 삭제
  };

  // 제공할 값
  const value = {
    user,
    isLoggedIn: !!user, // 로그인 여부 (user가 null이 아니면 true)
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Custom Hook (Context 쉽게 사용)
export const useAuth = () => {
  return useContext(AuthContext);
};
