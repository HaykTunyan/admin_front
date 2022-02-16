import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { verifyKyc } from "../../redux/actions/kyc";
import { useDispatch } from "react-redux";

const PandingVerifyModal = ({ user_id }, getKyc) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [errorMes, setErrorMes] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleVerifed = (user_id) => {
    const status_kyc = 4;
    dispatch(verifyKyc(user_id, status_kyc))
      .then((data) => {
        // setSuccess(!sussess);
        if (data) {
          getKyc();
          handleClose();
        }
        getKyc();
      })
      .catch((error) => {
        console.log("error messages", error?.response?.data);
        setErrorMes(error?.response?.data?.message);
        console.log("errorMes", errorMes);
      });
  };

  return (
    <Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Verify
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle textAlign="center">Confirm Your Action</DialogTitle>
        <DialogActions>
          <Grid width="100%" display="flex" justifyContent="space-around" p={3}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              sx={{ width: "120px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleVerifed(user_id)}
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

export default PandingVerifyModal;
