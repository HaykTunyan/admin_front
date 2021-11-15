import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton as MuiIconButton,
  Grid,
  Divider,
} from "@material-ui/core";
import { Trash } from "react-feather";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const DeleteModal = ({ dialog, description }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <Trash />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle textAlign="center">{dialog}</DialogTitle>
        <DialogContent>
          <DialogContentText pt={4} textAlign="center">
            {description}
          </DialogContentText>
        </DialogContent>
        <Divider my={6} />
        <DialogActions>
          <Grid width="100%" display="flex" justifyContent="space-around" p={3}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ width: "120px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              sx={{ width: "120px" }}
            >
              Delete Item
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteModal;
