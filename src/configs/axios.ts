import axios from "axios";

const baseURL = "http://localhost:3001";

const token = localStorage.getItem("authorizationToken");
axios.defaults.headers.common["Authorization"] = `${token}`;
export const provider = axios.create({ baseURL });

export enum EPS {
  // blogs
  BLOGS = "/blogs/all",
  BLOG = "/blogs", // /:uuid // specific blog
  NEW_BLOG = "/blogs/new",
  EDIT_BLOG = "/blogs", // /:uuid
  DELETE_BLOG = "/blogs",

  // banners
  BANNERS = "/banners/all",
  NEW_BANNER = "/banners/new",
  EDIT_BANNER = "/banners", // /:uuid
  DELETE_BANNER = "/banners",

  // admin
  ADMIN_SIGNIN = "/admin/signin",
  // orders
  ORDERS = "/orders",
}
