import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NormalHeader from './components/NormalHeader';
import DiaryUpload from './pages/DiaryUpload';
import { AuthProvider } from './context/AuthContext';
import Closet from './pages/Closet';
import ClosetAddPage from './pages/ClosetAddPage';
import Footer from './components/Footer';
import MyProfile from './pages/MyProfile';
import Diary from './pages/Diary';
import { jwtDecode } from 'jwt-decode';
import ClosetEditPage from './pages/ClosetEditPage';
import DiaryEdit from './pages/DiaryEdit';
import Friends from './pages/Friends';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  useEffect(() => {
    const verifyToken = () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          // 토큰 디코딩
          const decodedToken = jwtDecode(accessToken);

          // 현재 시간과 만료 시간 비교
          const currentTime = Date.now() / 1000; // 현재 시간 (초 단위)
          if (decodedToken.exp > currentTime) {
            setIsLoggedIn(true); // 토큰이 유효하면 로그인 상태 유지
          } else {
            console.warn('Token has expired');
            handleLogout(); // 토큰 만료 시 로그아웃 처리
          }
        } catch (error) {
          console.error('Invalid token:', error);
          handleLogout(); // 토큰 디코딩 실패 시 로그아웃 처리
        }
      }
    };

    verifyToken();
  }, []);

  useEffect(() => {
    console.log('Login state changed:', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const value = { isLoggedIn, handleLogin, handleLogout };
  return (
    <Router>
      <AuthProvider>
        <Routes key={isLoggedIn ? 'loggedIn' : 'loggedOut'}>
          <Route path="/*" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/closet" element={isLoggedIn ? <Closet /> : <Navigate to="/login" replace />} />
          <Route path="/closet/add-new" element={isLoggedIn ? <ClosetAddPage /> : <Navigate to="/login" replace />} />
          <Route path="/closet/edit/:id" element={isLoggedIn ? <ClosetEditPage /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={isLoggedIn ? <MyProfile /> : <Navigate to="/login" replace />} />
          <Route path="/diary" element={isLoggedIn ? <Diary /> : <Navigate to="/login" replace />} />
          <Route path="/diaryupload" element={isLoggedIn ? <DiaryUpload /> : <Navigate to="/login" replace />} />
          <Route path="/diary/edit/:id" element={isLoggedIn ? <DiaryEdit /> : <Navigate to="/login" replace />} />
          <Route path="/friends" element={isLoggedIn ? <Friends /> : <Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
