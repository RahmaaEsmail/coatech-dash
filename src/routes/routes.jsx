import { Route, Routes } from "react-router-dom";
import { configs } from "../configs";
import { authRoutes, publicRoutes } from "./routesData";

export default function AppRoutes() {
  const isLogin = localStorage?.getItem(configs.localstorageTokenName);
  return (
    <Routes>
      {!isLogin
        ? authRoutes?.map((item) => (
            <Route element={<item.element /> } path={item?.route} key={item?.id} />
          ))
        : publicRoutes?.map((item) => (
<Route element={<item.element />} path={item?.route} key={item?.id} />
          ))}
    </Routes>
  );
}
