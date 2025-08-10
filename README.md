# Closet in Diary — Frontend (Vite + React)

## ✨ Features
- 반응형 UI, **카테고리형 옷장**(업로드/수정/삭제)
- **일기 작성**(텍스트 + 메인 이미지 + 착장 다중 첨부)
- 친구/메시지, 마이페이지(프로필 이미지 조회/업데이트)
- **JWT 기반 인증**: 액세스·리프레시 토큰 저장 및 자동 갱신(axios 인터셉터)

## Tech Stack
- React, Vite, React Router
- axios, SASS, classnames, emoji-picker-react
- 토큰: `localStorage` 저장, 인터셉터로 자동 부착/갱신

## 환경 변수
- `.env` 또는 `.env.local`\
VITE_API_URL=http://localhost:8080

## 폴더 구조(요약)
src/\
pages/ # Closet, ClosetAdd/Edit, Diary(Upload/Edit), Friends, Login, SignUp, MyProfile\
components/ # Header/Footer, List/Item, Buttons, Modals...\
services/ # apiClient.js (인터셉터), authService.js\
assets/styles/ # reset, global, variables

## API 연동 요약
- `src/services/apiClient.js`
  - `baseURL = ${VITE_API_URL}/api`
  - 401 응답 시 **refresh-token** 재발급
- `src/services/authService.js`
  - `/api/signup`, `/api/login` 등 인증 관련 호출
