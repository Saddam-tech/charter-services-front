import Index from "pages/Index";
import Layout from "pages/Layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
        { path: "", element: <Index /> }
    ],
}])

export default router;