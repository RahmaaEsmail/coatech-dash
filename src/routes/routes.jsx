import { Route, Routes } from "react-router-dom";
import { configs } from "../configs";
import { authRoutes, publicRoutes } from "./routesData";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { Suspense } from "react";
import { Spin } from "antd";
import { AnimatePresence, motion } from "framer-motion";

export default function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route element={<ProtectedRoute />}>
          {publicRoutes?.map((item) => (
            <Route
              element={
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-screen">
                      <Spin size="large" />
                    </div>
                  }
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.element />
                  </motion.div>
                </Suspense>
              }
              path={item?.route}
              key={item?.id}
            />
          ))}
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AnimatePresence>
  );
}
