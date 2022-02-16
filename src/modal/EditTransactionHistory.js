import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { spacing } from "@material-ui/system";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Grid,
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Alert as MuiAlert,
  FormHelperText,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/lab";
import { getUserWallets_req } from "../api/userWalletsAPI";
import {
  createAffiliateReceive_req,
  createAffiliateSend_req,
  editAffiliateReceive_req,
  editAffiliateSend_req,
} from "../api/userTransactionsAPI";

// Spacing.
const Spacer = styled.div(spacing);
const Alert = styled(MuiAlert)(spacing);

const EditTransactionHistory = ({ userId, transaction, getTransactions }) => {
  // hooks.
  const [open, setOpen] = useState(false);
  const [errorMes, setErrorMes] = useState([]);
  const [value, setValue] = useState(transaction.date);
  const [state, setState] = useState({
    walletAddress: "",
    amount: "",
    date: "",
  });

  // Yup Validation.
  const AddSwapSchema = Yup.object().shape({
    walletAddress: Yup.string().required("Field is required"),
    amount: Yup.number()
      .required("Field is required")
      .min(0, "Field can not be negative value"),
    date: Yup.date().required("Date is required!"),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddress = (event, values) => {
    values.walletAddress = event.target.value;
  };

  const handleDateChange = (newValue, values) => {
    let chosenDate = moment(new Date(newValue)).format("YYYY-MM-DD HH:mm:ss");
    values.date = chosenDate;
    setValue(chosenDate);
  };

  // Error Messages.
  const invalid = errorMes?.message;

  // Form Submit.
  async function editTransaction(values) {
    let data = {
      userId: userId, // is required
      transactionId: transaction.transaction_id,
      [`${
        transaction.type === "send" ? `walletAddressTo` : `walletAddressFrom`
      }`]: values.walletAddress,
      date: values.date,
      amount: values.amount,
    };

    let result = Object.keys(data).filter((key) => data[key] === "");

    for (let item of result) {
      delete data[`${item}`];
    }

    console.log("SEND/RECEIVE DATA ==>", data);

    if (transaction.type === "send") {
      try {
        const response = await editAffiliateSend_req(data);
        if (response) {
          console.log("EDIT AFFILIATE SEND RESPONSE ==>", response);
          getTransactions();
          setOpen(false);
        }
      } catch (e) {
        console.log("EDIT AFFILIATE SEND ERROR ==>", e.response);
        setErrorMes(e?.response?.data);
      }
    } else {
      try {
        const response = await editAffiliateReceive_req(data);
        if (response) {
          console.log("EDIT AFFILIATE RECEIVE RESPONSE ==>", response);
          getTransactions();
          setOpen(false);
        }
      } catch (e) {
        console.log("EDIT AFFILIATE RECEIVE ERROR ==>", e);
        setErrorMes(e?.response?.data);
      }
    }
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            Edit Transaction History
          </Typography>
        </DialogTitle>
        <Divider my={2} />
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            // initialForms={state}
            validateOnChange={true}
            validationSchema={AddSwapSchema}
            onSubmit={editTransaction}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form>
                {invalid && (
                  <>
                    {invalid[0]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[0]?.messages}
                      </Alert>
                    )}

                    {invalid[1]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[1]?.messages}
                      </Alert>
                    )}
                    {invalid[2]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[2]?.messages}
                      </Alert>
                    )}
                    {invalid[3]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[3]?.messages}
                      </Alert>
                    )}
                    {invalid && (
                      <Alert my={2} severity="error">
                        {invalid}
                      </Alert>
                    )}
                  </>
                )}
                <Grid container pt={6} spacing={6}>
                  {/* Operation Type */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Operation Type
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControl fullWidth>
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        component="div"
                      >
                        {transaction.type === "send" ? "Send" : "Receive"}
                      </Typography>
                    </FormControl>
                  </Grid>
                  {/* From/To Wallet */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      {`${transaction.type === "send" ? "From" : "To"} Wallet`}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControl fullWidth>
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        component="div"
                      >
                        {transaction.type === "send"
                          ? transaction.coin_from_name
                          : transaction.coin_to_name}
                      </Typography>
                    </FormControl>
                  </Grid>
                  {/* Address */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      {`Address ${transaction.type === "send" ? "To" : "From"}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="walletAddress"
                      name="walletAddress"
                      label={`Address ${
                        transaction.type === "send" ? "To" : "From"
                      }`}
                      fullWidth
                      onChange={(event) => {
                        handleAddress(event, values);
                        handleChange("walletAddress");
                      }}
                      error={Boolean(
                        touched.walletAddress && errors.walletAddress
                      )}
                      helperText={touched.walletAddress && errors.walletAddress}
                      defaultValue={
                        transaction.type === "send"
                          ? transaction.address_to
                          : transaction.address_from
                      }
                    />
                  </Grid>
                  {/* Amount */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Amount
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="amount"
                      name="amount"
                      label="Amount"
                      type="number"
                      fullWidth
                      InputProps={{
                        inputProps: {
                          min: 0,
                        },
                      }}
                      error={Boolean(touched.amount && errors.amount)}
                      helperText={touched.amount && errors.amount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={
                        transaction.type === "send"
                          ? transaction.amount_sent
                          : transaction.amount_received
                      }
                    />
                  </Grid>
                  {/* Date */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Date
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControl fullWidth>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            error={
                              Boolean(touched.date && errors.date) && !value
                            }
                            helperText={touched.date && errors.date && !value}
                          />
                        )}
                        label="Choose Date"
                        value={value}
                        onChange={(newValue) => {
                          handleDateChange(newValue, values);
                          handleChange("date");
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Spacer my={5} />
                <Divider my={2} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "20px",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{ width: "120px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ width: "120px" }}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Edit Transaction History
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditTransactionHistory;
