import { TbLayoutGrid } from "react-icons/tb";
import { FaUser, FaUserGroup } from "react-icons/fa6";
import { configs } from "../configs";
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const UsersPage = lazy(() => import("../pages/UsersPage/UsersPage"));
const UserDetails = lazy(() =>
  import("../pages/UsersPage/UserDetails/UserDetails")
);
const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage"));
const UsersQuotations = lazy(() =>
  import("../pages/UsersPage/UsersQuotations/UsersQuotations")
);

const userInfo = JSON.parse(localStorage.getItem(configs.COATECH_USER_PROFILE));

export const publicRoutes = [
  {
    id: 1,
    route: "/",
    icon: <TbLayoutGrid />,
    title: "Quote List",
    hidden: false,
    element: HomePage,
  },
  {
    id: 2,
    route: "/users",
    icon: <FaUserGroup />,
    title: "Users",
    // hidden:false,
    hidden: userInfo?.admin_role == "suber_admin" ? false : true,
    element: UsersPage,
  },
  {
    id: 3,
    route: "/users/:user_id",
    icon: <FaUserGroup />,
    title: "Users Details",
    // hidden:false,
    hidden: true,
    element: UserDetails,
  },
  {
    id: 4,
    route: "/admins",
    icon: <FaUser />,
    title: "Admins",
    hidden: userInfo?.admin_role == "suber_admin" ? false : true,
    element: AdminPage,
  },
  {
    id: 5,
    route: "/user_quotations/:user_id",
    element: UsersQuotations,
    hidden: true,
    icon: "",
    title: "",
  },
];

export const authRoutes = [
  {
    id: 1,
    route: "*",
    icon: "",
    title: "Login",
    hidden: true,
    element: LoginPage,
  },
];
