import axios from "axios";

const baseURL = "http://localhost:3001";

const token = localStorage.getItem("authorizationToken");
axios.defaults.headers.common["Authorization"] = `${token}`;
export const provider = axios.create({ baseURL });

export enum EPS {
  BANNERS = "/banners/all",
  NEW_BANNER = "/banners/new",
  ORDERS = "/orders",
  ADMIN_SIGNIN = "/admin/signin",
}
