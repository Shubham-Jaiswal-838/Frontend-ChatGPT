import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const useAuth = () =>{
    const isIdPresent = localStorage.getItem("id") || []
      let user  = {
           loggedIn: isIdPresent.length > 0 ? true: false
      }

      return user && user.loggedIn;
}

const ProtectedRoute = () => {
    const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute