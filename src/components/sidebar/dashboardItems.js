import {
  Percent,
  Sliders,
  Users,
  Info,
  Bell,
  Settings,
  Key,
  UserPlus,
  GitCommit,
  List,
  Smartphone,
  Archive,
} from "react-feather";

// List of Dashboard Name and Link.

const pagesSection = [
  // Dashboard.
  {
    href: "/dashboard",
    icon: Sliders,
    title: "Dashboard",
  },
  {
    href: "/device-management",
    icon: Smartphone,
    title: "Device Managment",
  },
  // Users.
  {
    href: "",
    icon: Users,
    title: "Users Management",
    children: [
      {
        href: "/user-list",
        icon: List,
        title: "Users",
      },
      {
        href: "/affiliate-users",
        icon: UserPlus,
        title: "Affiliate Users",
      },
      {
        href: "/administrators",
        icon: Archive,
        title: "Administrators",
      },
      // {
      //   href: "/kyc",
      //   icon: Key,
      //   title: "KYC",
      // },
    ],
  },
  // Transactions.
  {
    href: "/transactions",
    icon: Percent,
    title: "Transactions",
  },
  // Settings.
  {
    href: "/settings",
    icon: Settings,
    title: "Settings",
  },
  // Notifications.
  {
    href: "/notifications",
    icon: Bell,
    title: "Notifications",
  },
  // News.
  {
    href: "/news",
    icon: Info,
    title: "News",
  },
  // Referral.
  {
    href: "/referral",
    icon: GitCommit,
    title: "Referral",
  },
];

const navItems = [
  {
    title: "Dashboard Item",
    pages: pagesSection,
  },
];

export default navItems;
