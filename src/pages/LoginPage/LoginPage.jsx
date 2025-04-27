import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { configs } from "../../configs";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../features/authSlice";
import axios from "axios";
import { userApis } from "../../api/userEndpoint";


export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { data, loginLoading } = useSelector((state) => state?.auth);

  function handleSubmit(e) {
    e.preventDefault();

    if (!loginData.email) {
      toast.warn("Please Enter Email First!");
      return;
    }
    if (!loginData.password) {
      toast.warn("Please Enter Password First!");
      return;
    }
    dispatch(handleLogin({ body: loginData }))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.token) {
          toast.success(res?.message);
          localStorage.setItem(configs.localstorageTokenName, res?.token);
          localStorage.setItem(
            configs.COATECH_USER_PROFILE,
            JSON.stringify(res?.data)
          );
          window.location.href = "/";
        } else {
          toast.error(res);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err || "Login Failed");
        console.error("Login Error:", err);
      });
  }
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="w-[90%] md:w-[50%] mx-auto">
        <img
          className="w-[250px] h-[100px] mx-auto object-cover"
          src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1744709127/logo_coatech_nv2hga.png"
        />

        <h4 className="text-center my-4  font-bold text-3xl text-(--main-blue-color)">
          Quotation System
        </h4>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="input-group">
            <label>Email</label>
            <input
              value={loginData.email}
              type="email"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              value={loginData.password}
              type="password"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>

          <button className="!bg-(--main-red-color) mt-2 py-3 rounded-md text-white flex justify-center items-center">
            {loginLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
