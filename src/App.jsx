import React from 'react'
import AppRoutes from './routes/routes'
import { ToastContainer } from 'react-toastify';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';

export default function App() {
  return (
    <div>
      <DefaultLayout>
      <AppRoutes />
      </DefaultLayout>
      <ToastContainer />

    </div>
  )
}
