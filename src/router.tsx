import Layout from "pages/Layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [],
}])

export default router;