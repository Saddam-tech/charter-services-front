import Iframe from "pages/InstantQuote";
import Index from "pages/Index";
import Layout from "pages/Layout";
import { createBrowserRouter } from "react-router-dom";
import CustomQuote from "pages/CustomQuote";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
        { path: "", element: <Index /> },
        { path: "c-quote", element: <CustomQuote /> },
        { path: "i-quote", element: <Iframe /> },
    ],
}])

export default router;
