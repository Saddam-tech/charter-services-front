import { PathKey, StatusKey } from "./types";

export const mapPathToStatus: Record<PathKey, number> = {
  incoming: 0,
  accepted: 1,
  rejected: 2,
};

export const mapStatusToString: Record<StatusKey, string> = {
  0: "Pending...",
  1: "Accepted",
  2: "Rejected",
};

export const STATUS = {
  DELETE: 0,
  ACCEPT: 1,
  REJECT: 2,
};

export const mapStatusToStringForAlertMessage: Record<number, string> = {
  0: "Delete",
  1: "Accept",
  2: "Reject",
};

export const defaultOrder = {
  id: 0,
  orderid: "",
  userid: "",
  active: 0,
  type: "",
  date: "",
  time: "",
  n_ppl: "",
  pickup_location: "",
  dropoff_location: "",
  car_type: "",
  special_req: "",
  created_at: "",
  updated_at: "",
  status: 0,
  firstname: "",
  lastname: "",
  email: "",
  phonenumber: "",
};

export const defaultAdmin = {
  firstname: "",
  lastname: "",
  username: "",
  active: 1,
  bio: "",
  profileImgUrl: "",
  password: "",
  email: "",
  phone_1: "",
  phone_2: "",
  address: "",
};

export const fleetTypes = [
  "Luxury SUVs",
  "Luxury Sedans",
  "Luxury Vans",
  "Luxury Shuttles",
  "School Busses",
];

export const defaultFleet = {
  model_name: "",
  brand_name: "",
  description: "",
  seats: "1 passenger",
  active: true,
  type: "Luxury SUVs",
};
