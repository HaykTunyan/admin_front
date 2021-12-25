import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
  Avatar as MuiAvatar,
} from "@material-ui/core";
import useAuth from "../../hooks/useAuth";
import { logout_req } from "../../redux/actions/users";
import { useDispatch } from "react-redux";

// Custom Style.
const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Avatar = styled(MuiAvatar)``;

const NavbarUserDropdown = () => {
  // hooks.
  const [anchorMenu, setAnchorMenu] = useState(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const dispatch = useDispatch();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    // navigate("/profile");
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    // await signOut();
    // await logout_req().then(navigate("/auth/sign-in"));
    dispatch(logout_req());
    navigate("/auth/sign-in");
  };

  const openSettings = () => {
    navigate("settings");
  };

  return (
    <Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <Avatar sx={{ width: 22, height: 22 }}>A</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        {/* <MenuItem onClick={closeMenu} disabled="true">
          Profile
        </MenuItem>
        <MenuItem onClick={openSettings}>Settings</MenuItem> */}
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default NavbarUserDropdown;
