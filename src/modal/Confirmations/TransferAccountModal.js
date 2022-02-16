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
import { editUserData_req, getUserData_req } from "../../api/userAPI";

const TransferAccountModal = ({
  setAffiliateUser,
  affiliateUser,
  userId,
  getUserData,
  setErrors,
  errors,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  async function transferAccount(event) {
    setAffiliateUser(!affiliateUser);

    try {
      const response = await editUserData_req(
        userId,
        event.target.id,
        !affiliateUser
      );
      if (response) {
        console.log("TRANSFER ACCOUNT RESPONSE ==>", response);
        getUserData();
        setErrors({ ...errors, [`${event.target.id}`]: "" });
      }
    } catch (error) {
      console.log("TRANSFER ACCOUNT ERROR ==>", error.response.data);
      if (Array.isArray(error.response.data.message)) {
        setErrors({
          ...errors,
          [`${error.response.data.message[0].property}`]:
            error.response.data.message[0].messages,
        });
      } else {
        setErrors({
          ...errors,
          [`${event.target.id}`]: error.response.data.message,
        });
      }
    }
  }

  return (
    <Fragment>
      <Button
        id={"is_affiliate"}
        variant="contained"
        sx={{ width: "100%" }}
        onClick={handleClickOpen}
      >
        {`Transfer account to ${affiliateUser ? "real" : "Affiliate"}`}
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
              onClick={(event) => transferAccount(event)}
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

export default TransferAccountModal;
