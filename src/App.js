import React from 'react'
import ChatPage from './pages/ChatPage'
import Home from './pages/Home'
import {Routes, Route} from "react-router-dom";
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <div>
        <Routes >
           <Route path="/" element={<Home />} />
           <Route path="/chat" element={<ChatPage />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="*" element={<NotFound />} />

        </Routes>
    </div>
  )
}

export default App