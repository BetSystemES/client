import jwt from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import jsCookie from "js-cookie";

const token = Cookies.get("access-token");

export const isAdmin = () => {
  try {
    const data = jwt(jsCookie.get("access-token"));
    if (token === undefined) {
      return false;
    }
    return data.role.includes("admin");
  } catch (error) {
    return false;
  }
};

export const isUser = () => {
  try {
    const data = jwt(jsCookie.get("access-token"));
    if (token === undefined) {
      return false;
    }
    return data.role.includes("user");
  } catch (error) {
    return false;
  }
};

const instance = axios.create({
  baseURL: "http://localhost:5068",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
