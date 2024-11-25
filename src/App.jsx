import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginHeader from './components/LoginHeader'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NormalHeader from './components/NormalHeader'

import { AuthProvider } from './context/AuthContext';
import Closet from './pages/Closet'

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        {/* 테스트용 라우터 */}
        <Route path="/test/login-header" element={<LoginHeader />} />
        <Route path="/test/normal-header" element={<NormalHeader />} />

        {/* 페이지 구축 라우터 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/closet" element={<Closet />} />
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App