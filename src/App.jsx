import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DiaryUpload from './pages/DiaryUpload';
import { AuthProvider, useAuth, AuthContext } from './context/AuthContext';
import Closet from './pages/Closet';
import ClosetAddPage from './pages/ClosetAddPage';
import MyProfile from './pages/MyProfile';
import Diary from './pages/Diary';
import ClosetEditPage from './pages/ClosetEditPage';
import DiaryEdit from './pages/DiaryEdit';
import Friends from './pages/Friends';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes */}
          <Route
            path="/closet"
            element={<PrivateRoute component={Closet} />}
          />
          <Route
            path="/closet/add-new"
            element={<PrivateRoute component={ClosetAddPage} />}
          />
          <Route
            path="/closet/edit/:id"
            element={<PrivateRoute component={ClosetEditPage} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute component={MyProfile} />}
          />
          <Route
            path="/diary"
            element={<PrivateRoute component={Diary} />}
          />
          <Route
            path="/diaryupload"
            element={<PrivateRoute component={DiaryUpload} />}
          />
          <Route
            path="/diary/edit/:id"
            element={<PrivateRoute component={DiaryEdit} />}
          />
          <Route
            path="/friends"
            element={<PrivateRoute component={Friends} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Your existing code
const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

export default App;
