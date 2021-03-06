import React from "react";

// Layouts
import AuthLayout from "../layouts/Auth";
import DashboardLayout from "../layouts/Dashboard";

// Auth components
import AuthGuard from "../guards/AuthGuard";
import SignIn from "../auth/SignIn";
import ResetPassword from "../auth/ResetPassword";
import Page404 from "../auth/Page404";
import Page500 from "../auth/Page500";

// Page components
import Settings from "../pages/settings-pages";
import Notifications from "../pages/notifications";
import ProtectedPage from "../pages/protected/ProtectedPage";
import NewsComponent from "../pages/news";
import UsersList from "../pages/user-managment/users-pages/UsersList";
import UserView from "../pages/user-managment/users-pages/UserView";
import Transaction from "../pages/transactions";
import KYC from "../pages/kyc";
import Referral from "../pages/referral";
import Administrators from "../pages/user-managment/administrator/Administrators";

// Documentation
import DashboardPage from "../pages/dashboard";
import DeviceManagement from "../pages/device-managment";

// Routes.
const routes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "",

    element: <DashboardLayout />,
    children: [
      {
        path: "kyc",
        element: <KYC />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "device-management",
        element: <DeviceManagement />,
      },
      {
        path: "users",
        element: <UsersList affiliate={false} />,
      },
      {
        path: "affiliate-users",
        element: <UsersList affiliate={true} />,
      },
      {
        path: "view-user",
        element: <UserView />,
      },
      {
        path: "news",
        element: <NewsComponent />,
      },
      {
        path: "referral",
        element: <Referral />,
      },
      {
        path: "transactions",
        element: <Transaction />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "administrators",
        element: <Administrators />,
      },
      {
        path: "protected",
        element: <ProtectedPage />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "500",
        element: <Page500 />,
      },
    ],
  },
  {
    path: "private",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ProtectedPage />,
      },
    ],
  },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
