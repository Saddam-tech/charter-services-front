import Iframe from "pages/InstantQuote";
import Index from "pages/Index";
import Layout from "pages/Layout";
import { createBrowserRouter } from "react-router-dom";
import CustomQuote from "pages/CustomQuote";
import AboutUs from "pages/AboutUs";
import Services from "pages/Services";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
        { path: "", element: <Index /> },
        { path: "c-quote", element: <CustomQuote /> },
        { path: "i-quote", element: <Iframe /> },
        { path: "aboutus", element: <AboutUs /> },
        { path: "services", element: <Services /> },
    ],
}])

export default router;
