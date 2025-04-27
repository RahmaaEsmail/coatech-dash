import axios from "axios";
import { configs } from "../configs";

export const fetchData = async ({
  url,
  body,
  method,
  isFile ,
}) => {
  console.log(url ,body ,method)
  try {
    const headers = {
      "Content-Type": isFile ? "multipart/form-data" : "application/json",
    };

    const token = localStorage.getItem(configs.localstorageTokenName);
    if (token) {
      headers.Authorization = `Bearer ${
       token
      }`;
    }

    const response = await axios({
      data: body,
      headers: headers,
      method: method || "GET",
      url: `${configs.LIVE_BASE_URL}${url}`,
    });
    return response.data;
  } catch (err) {
    return err?.response?.data?.message;
  }
};
