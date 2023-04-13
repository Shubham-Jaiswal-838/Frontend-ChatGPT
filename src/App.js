import React, { useEffect, useState } from 'react'
import ChatPage from './pages/ChatPage'
import Home from './pages/Home'
import {Routes, Route, useNavigate} from "react-router-dom";
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    const userId = localStorage.getItem('id');
    if (token && userId) {
      return navigate("/chat")
    }
    return navigate("/");
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="chat" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;






