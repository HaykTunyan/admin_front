import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import { Drawer as MuiDrawer, ListItemButton } from "@material-ui/core";
import SidebarNav from "./SidebarNav";
import { ReactComponent as Logo } from "../../assets/svg/logo_main.svg";

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Brand = styled(ListItemButton)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)};
  padding-right: ${(props) => props.theme.spacing(6)};
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const BrandLogo = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 60px;
  height: 60px;
  margin-top: 20px;
  margin-right: 20px;
`;

const Sidebar = ({ items, handleDrawerToggle, ...rest }) => {
  return (
    <Drawer variant="permanent" {...rest}>
      <Brand component={NavLink} to="/dashboard">
        <BrandLogo />
      </Brand>
      <SidebarNav items={items} handleDrawerToggle={handleDrawerToggle} />
    </Drawer>
  );
};

export default Sidebar;
