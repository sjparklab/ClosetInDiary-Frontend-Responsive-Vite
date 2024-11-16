import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from 'pages/Home'
// import About from 'pages/About'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <Routes>
        {/* 테스트용 라우터 */}
        <Route path="/test/header" element={<Header />} />


        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  )
}

export default App