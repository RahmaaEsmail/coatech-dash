import { TbLayoutGrid } from "react-icons/tb";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import { FaUserGroup } from "react-icons/fa6";
import UsersPage from "../pages/UsersPage/UsersPage";
import UserDetails from "../pages/UsersPage/UserDetails/UserDetails";

const userInfo = JSON.parse(localStorage.getItem("user_info"))

export const publicRoutes = [
    {
        id:1,
        route:"/",
        icon: <TbLayoutGrid />,
        title:"Quote List",
        hidden:false,
        element : HomePage
    },
    {
        id:2,
        route:"/users",
        icon: <FaUserGroup />,
        title:"Users",
        // hidden:false,
        hidden:userInfo?.role == "admin" ? false : true,
        element : UsersPage
    },
    {
        id:3,
        route:"/users/:user_id",
        icon: <FaUserGroup />,
        title:"Users Details",
        // hidden:false,
        hidden:true,
        element : UserDetails
    },
];

export const authRoutes = [
    {
        id:1,
        route:"*",
        icon:"",
        title:"Login",
        hidden:true,
        element: LoginPage
    }
]