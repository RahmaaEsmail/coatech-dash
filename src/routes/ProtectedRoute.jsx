import React from 'react'
import { configs } from '../configs'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const isLogin = localStorage.getItem(configs.localstorageTokenName);
  return (
    isLogin ? <Outlet /> : <Navigate to="/login" replace={true}/>
  )
}
