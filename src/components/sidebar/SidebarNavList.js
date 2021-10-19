import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

import reduceChildRoutes from "./reduceChildRoutes";

const SidebarNavList = (props) => {
  const { pages, depth } = props;
  const router = useLocation();
  const currentRoute = router.pathname;

  const childRoutes = pages.reduce(
    (items, page) => reduceChildRoutes({ items, page, currentRoute, depth }),
    []
  );

  return <Fragment>{childRoutes}</Fragment>;
};

export default SidebarNavList;
