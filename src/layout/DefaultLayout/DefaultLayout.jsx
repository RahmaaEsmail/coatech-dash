import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import LoginPage from '../../pages/LoginPage/LoginPage';
import { configs } from '../../configs';

export default function DefaultLayout({children}) {
    const isLogin = localStorage?.getItem(configs.localstorageTokenName);
  
    if(!isLogin) {
      return <LoginPage />
    }
  return (
    <div className="flex main-layout">
         <Sidebar />
         <div className="main-content">
           <Header/>
           <main className='mt-4'>
            {children}
           </main>
         </div>
    </div>
  )
}
