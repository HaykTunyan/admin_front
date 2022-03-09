import React, { Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import reduceChildRoutes from "./reduceChildRoutes";
import { Box } from "@material-ui/core";

const SidebarNavList = (props) => {
  const { pages, depth, handleDrawerToggle } = props;
  const router = useLocation();
  const params = useParams();
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

  const handelNavClose = (router, props) => {
    if (
      router.view.location.pathname === "/dashboard" ||
      router.view.location.pathname === "/device-management" ||
      router.view.location.pathname === "/users" ||
      router.view.location.pathname === "/affiliate-users" ||
      router.view.location.pathname === "/news" ||
      router.view.location.pathname === "/referral" ||
      router.view.location.pathname === "/transactions" ||
      router.view.location.pathname === "/settings" ||
      router.view.location.pathname === "/notifications" ||
      router.view.location.pathname === "/kyc" ||
      router.view.location.pathname === "/administrators"
    ) {
      handleDrawerToggle();
    }
  };

  return (
    <Fragment>
      <Box onClick={handelNavClose}>{childRoutes}</Box>
    </Fragment>
  );
};

export default SidebarNavList;
