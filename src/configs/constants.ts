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
