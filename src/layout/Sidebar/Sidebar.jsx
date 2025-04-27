// import React from "react";
// import { publicRoutes } from "../../routes/routesData";
// import { Link, NavLink } from "react-router-dom";

// export default function Sidebar({open , setOpen}) {
//   return (
//     <aside className="sidebar">
//       <img
//         src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1744709127/logo_coatech_nv2hga.png"
//         className="w-[200px] mx-auto h-[120px] object-cover"
//       />

//       <ul className="flex flex-col gap-3">
//         {publicRoutes?.map(
//           (item) =>
//             !item?.hidden && (
//               <li className="px-5" key={item?.id}>
//                 <NavLink
//                   className={({ isActive }) =>
//                     `flex  gap-2  items-center px-5 py-2 rounded-md ${
//                       isActive
//                         ? "!bg-(--main-blue-color) !text-white"
//                         : "!text-(--main-blue-color)"
//                     }`
//                   }
//                   to={item?.route}
//                 >
//                   <span className="">{item?.icon}</span>
//                   <span className="">{item?.title}</span>
//                 </NavLink>
//               </li>
//             )
//         )}
//       </ul>
//     </aside>
//   );
// }

import React from "react";
import { publicRoutes } from "../../routes/routesData";
import { NavLink } from "react-router-dom";
import { FaX } from "react-icons/fa6";

export default function Sidebar({ open, setOpen, isMobile }) {
  return (
    <aside
      className={`sidebar ${!isMobile&&  open && "hidden"} bg-white fixed top-0 left-0 bottom-0 z-50 transform transition-all duration-300 ${
        isMobile ? (open ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
      }`}
    >
      
      <div className="px-3">
      {isMobile && open && <div onClick={() => setOpen(false)} className="bg-gray-100 flex justify-center items-center w-fit p-2 rounded-md ms-auto my-2">
         <FaX />
        </div>}
      </div>

      <div className="flex flex-col h-full">
        <img
          src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1744709127/logo_coatech_nv2hga.png"
          className="w-[200px] mx-auto h-[40px] object-cover mt-4"
          alt="Logo"
        />
        <ul className="flex flex-col gap-3 mt-6">
          {publicRoutes?.map(
            (item) =>
              !item?.hidden && (
                <li className="px-5" key={item?.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `flex gap-2 items-center px-5 py-2 rounded-md ${
                        isActive
                          ? "bg-(--main-blue-color) text-white"
                          : "text-(--main-blue-color)"
                      }`
                    }
                    to={item?.route}
                    onClick={() => isMobile && setOpen(false)} // لما تدوس على لينك في الموبايل يقفل السايدبار
                  >
                    <span>{item?.icon}</span>
                    <span>{item?.title}</span>
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </div>
    </aside>
  );
}
