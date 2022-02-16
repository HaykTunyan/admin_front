import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import reduceChildRoutes from "./reduceChildRoutes";
import { Box } from "@material-ui/core";

const SidebarNavList = (props) => {
  const { pages, depth, handleDrawerToggle } = props;
  const router = useLocation();
  const currentRoute = router.pathname;

  const childRoutes = pages.reduce(
    (items, page) =>
      reduceChildRoutes({
        items,
        page,
        currentRoute,
        depth,
        handleDrawerToggle,
      }),
    []
  );

  return (
    <Fragment>
      <Box>{childRoutes}</Box>
    </Fragment>
  );
};

export default SidebarNavList;
