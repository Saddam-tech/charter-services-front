export type PathKey = "incoming" | "accepted" | "rejected";

export interface Order {
  id: number;
  orderid: string;
  userid: string;
  active: number;
  type: string;
  date: string;
  time: string;
  n_ppl: string;
  pickup_location: string;
  dropoff_location: string;
  car_type: string;
  special_req: string;
  created_at: string;
  updated_at: string;
  status: number;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
}
