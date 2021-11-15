import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { Button as MuiButton, Menu, MenuItem } from "@material-ui/core";
import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
} from "@material-ui/icons";
import { spacing } from "@material-ui/system";

// Spacing.
const Button = styled(MuiButton)(spacing);

// Custom Style.
const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;
  svg {
    width: 0.9em;
    height: 0.9em;
  }
`;

function Actions() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <SmallButton size="small" mr={2}>
        <LoopIcon />
      </SmallButton>
      <SmallButton size="small" mr={2}>
        <FilterListIcon />
      </SmallButton>
      <Button
        variant="contained"
        color="secondary"
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        Today: April 29
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Today</MenuItem>
        <MenuItem onClick={handleClose}>Yesterday</MenuItem>
        <MenuItem onClick={handleClose}>Last 7 days</MenuItem>
        <MenuItem onClick={handleClose}>Last 30 days</MenuItem>
        <MenuItem onClick={handleClose}>This month</MenuItem>
        <MenuItem onClick={handleClose}>Last month</MenuItem>
      </Menu>
    </Fragment>
  );
}

export default Actions;
