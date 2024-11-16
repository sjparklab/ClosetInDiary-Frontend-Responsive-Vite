import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/reset.css';     // Reset 스타일
import './assets/styles/variables.css'; // CSS 변수
import './assets/styles/global.css';    // 글로벌 스타일
import './assets/styles/typography.css' // 폰트 스타일
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)