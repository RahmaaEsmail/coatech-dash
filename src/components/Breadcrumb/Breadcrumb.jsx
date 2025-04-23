import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumb({navigationData}) {
  return (
    <div className="border-[2px] py-2 h-[50px] !border-(--main-blue-color) p-2 rounded-md w-full flex gap-2 items-center">
        {navigationData?.map((item , index) => item?.route ? <Link to={item?.route}>{item?.name} {index < navigationData?.length - 1 && "/"}</Link> : <span>{item?.name} {index < navigationData?.length - 1 && "/"}</span>)}
    </div>
  )
}
