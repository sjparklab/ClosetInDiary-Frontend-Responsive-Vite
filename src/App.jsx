import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from 'pages/Home'
// import About from 'pages/About'
import Header from './components/LoginHeader'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        {/* 테스트용 라우터 */}
        <Route path="/test/header" element={<Header />} />

        {/* 페이지 구축 라우터 */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App