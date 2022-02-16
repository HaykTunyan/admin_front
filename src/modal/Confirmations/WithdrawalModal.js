import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { blockUserWallet_req } from "../../api/userWalletsAPI";

const WithdrawalModal = ({ row, wallets, getUserWallets, sortBy, userId }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  async function blockUserWallet(wallet) {
    try {
      const response = await blockUserWallet_req(userId, wallet.id);
      if (response) {
        console.log("BLOCK USER WALLET RESPONSE ==>", response);
        getUserWallets("total_balance_usd", sortBy);
        handleClose();
      }
    } catch (e) {
      console.log("BLOCK USER WALLET ERROR ==>", e);
    }
  }

  return (
    <Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ width: "max-content" }}
      >{`${
        row.block_status === true ? "Unblock" : "Block"
      } withdrawal`}</Button>
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
              onClick={() => blockUserWallet(row)}
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

export default WithdrawalModal;
