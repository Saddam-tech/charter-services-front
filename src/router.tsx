import Iframe from "components/Iframe";
import Index from "pages/Index";
import Layout from "pages/Layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
        { path: "", element: <Index /> },
        { path: "reservation", element: <Iframe /> },
    ],
}])

export default router;
