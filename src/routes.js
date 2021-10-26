import React from "react";
import async from "./components/Async";

// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";

// Auth components
import AuthGuard from "./components/guards/AuthGuard";
import SignIn from "./pages/auth/SignIn";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";

// Page components
import InvoiceList from "./pages/pages/PlayOff";
import Settings from "./pages/pages/settings";
import Projects from "./pages/pages/Projects";
import Notifications from "./pages/pages/notifications";
import DashboardList from "./pages/pages/DashboardList";
import ProtectedPage from "./pages/protected/ProtectedPage";
import NewsComponent from "./pages/pages/news";
import UsersList from "./pages/pages/user-managment/UsersList";
import UserView from "./pages/pages/user-managment/UserView";
import AffiliateUsers from "./pages/pages/user-managment/AffiliateUsers";
import Calendar from "./pages/pages/Calendar";
import Transaction from "./pages/pages/transactions";
import KYC from "./pages/pages/kyc";
import DeviceManagement from "./pages/pages/DeviceManagement";
import Referral from "./pages/pages/referral";
import Administrators from "./pages/pages/user-managment/Administrators";

// Documentation
import Redux from "./pages/docs/Redux";
import DashboardPage from "./pages/pages/dashboard";

// Dashboard components
const Default = async(() => import("./pages/dashboards/Default"));
const Analytics = async(() => import("./pages/dashboards/Analytics"));
const Profile = async(() => import("./pages/pages/Profile"));

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
        path: "dashboard-default",
        element: <Default />,
      },
      {
        path: "kyc",
        element: <KYC />,
      },
      {
        path: "dashboard-analytics",
        element: <Analytics />,
      },
      {
        path: "dashboard-list",
        element: <DashboardList />,
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
        element: <UsersList />,
      },
      {
        path: "affiliate-users",
        element: <AffiliateUsers />,
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
        path: "invoices",
        element: <InvoiceList />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "profile",
        element: <Profile />,
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
    path: "forms",
    element: <DashboardLayout />,
    children: [
      {
        path: "redux",
        element: <Redux />,
      },
    ],
  },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      {
        path: "test",
        element: <Calendar />,
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
