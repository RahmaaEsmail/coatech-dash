// // import React, { useEffect, useState } from 'react'
// // import Header from '../Header/Header'
// // import Sidebar from '../Sidebar/Sidebar'
// // import LoginPage from '../../pages/LoginPage/LoginPage';
// // import { configs } from '../../configs';

// // export default function DefaultLayout({children}) {
// //     const isLogin = localStorage?.getItem(configs.localstorageTokenName);
// //     const [isOpen , setIsOpen] = useState(false);
// //     const [isMobile , setIsMobile] = useState(window.innerWidth <= 768);

// //   useEffect(() => {
// //     function handleResize() {
// //       setIsMobile(window.innerWidth <= 768)
// //     }

// //     window.addEventListener("resize",handleResize);
// //     return () => window.removeEventListener("resize" , handleResize);
// //   } , []);

// //     if(!isLogin) {
// //       return <LoginPage />
// //     }
// //   return (
// //     <div className="flex main-layout">
// //          {isOpen && isMobile && <div className="absolute z-50 indent-0 !bg-[rgba(0,0,0,0.5)]">
// //           <Sidebar open={isOpen} setOpen={setIsOpen}/>
// //           </div>}
// //          {!isOpen && <Sidebar open={isOpen} setOpen={setIsOpen}/>}
// //          <div className={`${isOpen && !isMobile ? "!w-full !ms-0" :"!w-full lg:main-content ms-0 lg:!ms-[280px]"}`}>
// //            <Header open={isOpen} setOpen={setIsOpen}/>
// //            <main className='mt-4'>
// //             {children}
// //            </main>
// //          </div>
// //     </div>
// //   )
// // }

// import React, { useEffect, useState } from 'react';
// import Header from '../Header/Header';
// import Sidebar from '../Sidebar/Sidebar';
// import LoginPage from '../../pages/LoginPage/LoginPage';
// import { configs } from '../../configs';

// export default function DefaultLayout({ children }) {
//   const isLogin = localStorage?.getItem(configs.localstorageTokenName);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     function handleResize() {
//       setIsMobile(window.innerWidth <= 768);
//     }
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   if (!isLogin) {
//     return <LoginPage />;
//   }

//   return (
//     <div className="flex main-layout relative min-h-screen">

//       <Sidebar open={isOpen} setOpen={setIsOpen} isMobile={isMobile} />

//       <div className={`main-content`}>
//         <Header open={isOpen} setOpen={setIsOpen} />
//         <main className="p-4">{children}</main>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { configs } from "../../configs";

export default function DefaultLayout({ children }) {
  const isLogin = localStorage?.getItem(configs.localstorageTokenName);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false); // لما يبقى ديسكتوب تأكد السايدبار مفتوح بدون overlay
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLogin) {
    return <LoginPage />;
  }

  return (
    <div className="main-layout relative min-h-screen">
      {/* Overlay لما يكون موبايل والسايدبار مفتوح */}
      {isMobile && isOpen && (
        <div
          className="fixed transition-all  duration-300 inset-0 bg-[rgba(0,0,0,0.5)] z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <Sidebar open={isOpen} setOpen={setIsOpen} isMobile={isMobile} />

      <div
        className={`flex-1 !transition-all duration-300 ${
          isMobile || isOpen ? "ml-0" : "md:ml-[270px]"
        }`}
      >
        <Header open={isOpen} setOpen={setIsOpen} />
        <main className="p-4 w-full">{children}</main>
      </div>
    </div>
  );
}
