import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@material-ui/core";

const ActionConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <Fragment>
      <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle textAlign="center">Confirm Your Action</DialogTitle>
        <DialogActions>
          <Grid width="100%" display="flex" justifyContent="space-around" p={3}>
            <Button
              variant="outlined"
              color="error"
              onClick={onClose}
              sx={{ width: "120px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onConfirm}
              sx={{ width: "120px" }}
            >
              Confirm
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ActionConfirmationModal;
