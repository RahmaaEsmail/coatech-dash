import React, { useState } from 'react';

export default function Header() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("user_info"))
  return (
    <div className="header relative p-4">
      <div className="flex justify-between items-center">
        {/* Menu icon */}
        <img src="https://admin.sawani.ae/menu.svg" alt="menu" className="w-6 h-6 cursor-pointer" />
        
        {/* Profile Icon + Dropdown */}
        <div className="relative">
         <div className='flex gap-3'>
         <h4 className='my-auto  text-lg font-semibold text-(--main-red-color)'>{userInfo?.role}</h4>
          <img
            src="https://admin.sawani.ae/person.png"
            alt="user"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setOpenDropDown(prev => !prev)}
          />
         </div>

          {/* Dropdown */}
          {openDropDown && (
            <div className="absolute right-0 mt-2 top-10 w-40 p-3 !bg-white rounded-md shadow-md z-50">
              <button
              onClick={() => {
                localStorage.removeItem("QUOATATION_ACCESS_TOKEN");
                window.location.reload("*")
              }}
                className="w-full mx-auto py-2 px-4 text-sm text-white bg-[#E82F3C] hover:bg-[#c42a32] transition rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
