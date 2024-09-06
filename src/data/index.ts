import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";
import dayjs from "dayjs";

export const navigation = [
  { page: "Services", route: "services" },
  { page: "Fleet", route: "" },
  { page: "Blogs", route: "blogs" },
  { page: "About Us", route: "aboutus" },
  // { page: "Careers", route: "" },
  // { page: "Contact", route: "" },
  { page: "+1(628) 224 7797", route: "+1(628) 224 7797" },
  { page: "Make a custom quote!", route: "c-quote" },
];

export const socials = [
  {
    name: "instagram",
    path: "https://www.instagram.com/summitchs?igsh=YTQwZjQ0NmI0OA%3D%3D&utm_source=qr",
    icon: InstagramIcon,
  },
  {
    name: "facebook",
    path: "https://www.facebook.com/profile.php?id=61554970350854&mibextid=LQQJ4d",
    icon: FacebookIcon,
  },
  {
    name: "twitter",
    path: "https://x.com/summitchs?s=21&t=OUzCNaAdoBfN9wkW-UmD_g",
    icon: TwitterIcon,
  },
  {
    name: "linkedin",
    path: "https://x.com/summitchs?s=21&t=OUzCNaAdoBfN9wkW-UmD_g",
    icon: LinkedInIcon,
  },
  {
    name: "pinterest",
    path: "https://x.com/summitchs?s=21&t=OUzCNaAdoBfN9wkW-UmD_g",
    icon: PinterestIcon,
  },
  {
    name: "youtube",
    path: "https://x.com/summitchs?s=21&t=OUzCNaAdoBfN9wkW-UmD_g",
    icon: YouTubeIcon,
  },
];

export const c_quote_default = {
  type: "",
  date: dayjs("2023-12-01"),
  time: dayjs("0000-00-00"),
  n_ppl: "",
  car_type: "",
  pickup_location: "",
  dropoff_location: "",
  firstname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  special_req: "",
};

export const _errorState = {
  pickup_location_error: false,
  dropoff_location_error: false,
};

export const dropdown_data = {
  0: [
    "Point-to-Point transportation",
    "Hourly Ride",
    "Airport pick-up/drop-off",
  ],
  1: new Array(50)
    .fill("passenger")
    .map((el, i) => i + 1 + " " + el + (i > 0 ? "s" : "")),
  2: [
    "Tesla Model 3 (5 seats)",
    "Cadillac Escalade (8 seats)",
    "BMW i7 (5 seats)",
    "Mercedes Vito (11 seats)",
    "Charter Bus (24 seats)",
  ],
};
