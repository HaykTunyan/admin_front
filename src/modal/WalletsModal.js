import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  DialogTitle,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import {
  addToUserWallet_req,
  sendToUserWallet_req,
} from "../api/userWalletsAPI";
import ConfirmationNotice from "../components/ConfirmationNotice";

const WalletsModal = ({ id, wallet, userId }) => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    amount: 0,
    address: "",
    tags: "",
  });
  const [message, setMessage] = useState({
    open: false,
    error: false,
    type: "topUp",
  });

  const [transaction, setTransaction] = useState(false);

  const userWalletSchema = yup.object().shape({
    amount: yup.number().required("Field is required"),
    address:
      id === "withdraw" && transaction === true
        ? yup.string().required("Field is required")
        : yup.string().notRequired(),
    tags: yup.string().notRequired(),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckbox = () => {
    setTransaction(!transaction);
  };

  async function handleWalletAction(values) {
    setMessage({ ...message, open: false, error: false, type: id });

    let data = {
      userId: userId,
      walletId: wallet.id,
      amount: Number(values.amount),
      address: id === "withdraw" ? values.address : null,
      transaction: transaction,
    };
    try {
      if (id === "topUp") {
        const response = await addToUserWallet_req(data);
        if (response) {
          console.log("ADDED TO USER WALLET ==>", response);
          setOpen(false);
          setMessage({ ...message, open: true, type: "topUp" });
        }
      } else {
        const response = await sendToUserWallet_req(data);
        if (response) {
          console.log("SENT TO USER WALLET ==>", response);
          setOpen(false);
          setMessage({ ...message, open: true, type: "withdraw" });
        }
      }
    } catch (e) {
      console.log("WALLET ACCTION ERROR ==>", e);
      setOpen(false);
      setMessage({ ...message, open: true, error: true });
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{ width: "max-content" }}
      >
        {id === "topUp" ? "Top up balance" : "Withdraw"}
      </Button>
      <Formik
        validateOnChange={true}
        initialValues={{ ...initialValues }}
        validationSchema={userWalletSchema}
        onSubmit={(values) => {
          handleWalletAction(values);
        }}
      >
        {({ errors, touched, handleSubmit, handleChange }) => {
          return (
            <>
              <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>{wallet.coin_name}</DialogTitle>
                <DialogContent>
                  <Box my={8}>
                    <Typography variant="subtitle1" component="div">
                      Total Balance: {wallet.total_balance}
                    </Typography>
                    {id === "topUp" && (
                      <Typography variant="subtitle1" component="div">
                        Address: {"address"}
                      </Typography>
                    )}
                  </Box>
                  <FormControl fullWidth my={8} variant="outlined">
                    <TextField
                      label="Amount"
                      id="amount"
                      variant="outlined"
                      defaultValue={initialValues.amount}
                      onChange={handleChange("amount")}
                      error={touched.amount && errors.amount}
                      helperText={touched.amount && errors.amount}
                    />
                  </FormControl>
                  {id === "withdraw" && (
                    <>
                      <FormControl
                        fullWidth
                        my={8}
                        variant="outlined"
                        sx={{ marginTop: "20px" }}
                      >
                        <TextField
                          label="Address"
                          id="address"
                          variant="outlined"
                          defaultValue={initialValues.address}
                          onChange={handleChange("address")}
                          error={touched.address && errors.address}
                          helperText={touched.address && errors.address}
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        my={8}
                        variant="outlined"
                        sx={{ marginTop: "20px" }}
                      >
                        <TextField
                          label="Tags"
                          id="tags"
                          variant="outlined"
                          defaultValue={initialValues.tags}
                          onChange={handleChange("tags")}
                          error={touched.tags && errors.tags}
                          helperText={touched.tags && errors.tags}
                        />
                      </FormControl>
                    </>
                  )}
                  <FormControlLabel
                    sx={{ marginTop: "20px" }}
                    control={
                      <Checkbox
                        checked={transaction}
                        onChange={handleCheckbox}
                      />
                    }
                    label="Add to transaction history"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} sx={{ width: "120px" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSubmit()}
                    sx={{ width: "120px" }}
                  >
                    {id === "topUp" ? "Add To Balance" : "Send"}
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          );
        }}
      </Formik>
      {message.open === true && (
        <ConfirmationNotice
          error={message.error}
          title={
            message.error === true
              ? "An error occurred, try again"
              : message.type === "topUp"
              ? "Balance toped up"
              : "Amount withdrawn"
          }
        />
      )}
    </div>
  );
};

export default WalletsModal;
