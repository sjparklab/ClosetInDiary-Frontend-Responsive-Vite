import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/LoginHeader'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        {/* 테스트용 라우터 */}
        <Route path="/test/header" element={<Header />} />

        {/* 페이지 구축 라우터 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App