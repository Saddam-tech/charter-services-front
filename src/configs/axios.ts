import axios from "axios";

const baseURL = "http://localhost:3001";

export const provider = axios.create({ baseURL });

export enum EPS {
  ORDERS = "/orders",
}
