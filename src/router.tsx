import Iframe from "pages/InstantQuote";
import Index from "pages/Index";
import Layout from "pages/Layout";
import { createBrowserRouter } from "react-router-dom";
import CustomQuote from "pages/CustomQuote";
import AboutUs from "pages/AboutUs";
import Services from "pages/Services";
import Admin from "pages/Admin";
import Main from "pages/Admin/Main";
import Orders from "pages/Admin/Orders";
import SignIn from "pages/Admin/SignIn";
import ProtectedRoute from "pages/ProtectedRoute";
import Banners from "pages/Admin/Banners";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <Index /> },
            { path: "c-quote", element: <CustomQuote /> },
            { path: "i-quote", element: <Iframe /> },
            { path: "aboutus", element: <AboutUs /> },
            { path: "services", element: <Services /> },
        ],
    },
    {
        path: "/admin",
        element: <ProtectedRoute />,
        children: [
            { path: "", element: <Main /> },
            { path: "orders/:path", element: <Orders /> },
            { path: "banners", element: <Banners /> },
        ],
    },
])

export default router;
