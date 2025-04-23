import React from 'react'
import { publicRoutes } from '../../routes/routesData'
import { Link, NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className='sidebar'>
        <img src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1744709127/logo_coatech_nv2hga.png" className='w-[200px] mx-auto h-[120px] object-cover'/>

        <ul className='flex flex-col gap-3'>
            {publicRoutes?.map(item => !item?.hidden && <li className="px-5" key={item?.id}><NavLink 
             className={({ isActive }) =>
                `flex  gap-2  items-center px-5 py-2 rounded-md ${
                  isActive ? '!bg-(--main-blue-color) !text-white' : '!text-(--main-blue-color)'
                }`
              }
            to={item?.route}>
                <span className="">{item?.icon}</span>
            {/* <img className='my-auto flex justify-center items-center !h-[26px] w-[26px]' src={item?.icon}/> */}
              <span className=''>{item?.title}</span>
            </NavLink></li>)}
        </ul>
    </aside>
  )
}
