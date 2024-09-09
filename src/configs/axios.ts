import axios from "axios";

const baseURL = "https://www.summitchs.com";

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
  ADMIN_INFO = "/admin/info",
  ADMIN_UPDATE = "/admin/update",

  // orders
  ORDERS = "/orders",
  SPEC_ORDER = "/orders/order", // /:orderid // specific order query
  STATUS_UPDATE = "/orders/status-update",
  DELETE_ORDER = "/orders", // /:orderId

  // fleet
  FLEET = "/fleet/all",
  NEW_FLEET = "/fleet/new",
  SPEC_FLEET = "/fleet", // :uuid
  EDIT_FLEET = "/fleet", // :uuid
  DELETE_FLEET = "/fleet", // :uuid

  // fleet
  SERVICES = "/services/all",
  NEW_SERVICE = "/services/new",
  SPEC_SERVICE = "/services", // :uuid
  EDIT_SERVICE = "/services", // :uuid
  DELETE_SERVICE = "/services", // :uuid
}
