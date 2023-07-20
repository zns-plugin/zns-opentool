import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import ListTemplate from "./modules/Templates/ListTemplate";
import { ContainerOutlined, UserOutlined } from "@ant-design/icons";
import DetailTemplate from "./modules/Templates/DetailTemplate";
import { ROUTE } from "./constants";
import { ProtectedLayout } from "./modules/ProtectedLayout";
import ErrorBoundary from "./share/componens/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: ROUTE.MAIN,
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: ROUTE.LIST_TEMPLATE,
        element: <ListTemplate />,
      },
      {
        path: ROUTE.DETAIL_TEMPALTE,
        element: <DetailTemplate />,
      },
      {
        path: "*",
        element: <Navigate to={ROUTE.LOGIN} />,
      },
    ],
  },
  {
    path: ROUTE.LOGIN,
    element: <ProtectedLayout />,
  },
]);

export const navConfig = [
  {
    icon: ContainerOutlined,
    title: "Template",
    path: ROUTE.LIST_TEMPLATE,
  },
];

export default router;
