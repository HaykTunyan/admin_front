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
} from "../api/userTransactionsAPI";

// Spacing.
const Spacer = styled.div(spacing);
const Alert = styled(MuiAlert)(spacing);

const AddTransactionHistory = ({ userId, getTransactions }) => {
  // hooks.
  const [open, setOpen] = useState(false);
  const [errorMes, setErrorMes] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [type, setType] = useState("0");
  const [walletId, setWalletId] = useState("");
  const [value, setValue] = useState(null);
  const [state, setState] = useState({
    walletId: "",
    walletAddress: "",
    amount: "",
    date: "",
  });

  // Yup Validation.
  const AddSwapSchema = Yup.object().shape({
    walletId: Yup.number().required("Field is required"),
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

  const handleWalletChange = (event, values) => {
    values.walletId = event.target.value;
    setWalletId(event.target.value);
  };

  const handleDateChange = (newValue, values) => {
    let chosenDate = moment(new Date(newValue)).format("YYYY-MM-DD HH:mm:ss");
    values.date = chosenDate;
    setValue(chosenDate);
  };

  // Error Messages.
  const invalid = errorMes?.message;

  // Form Submit.
  async function addTransactionSend(values) {
    let data = {
      userId: userId, // is required
      walletFromId: values.walletId,
      walletAddressTo: values.walletAddress,
      date: values.date,
      amount: values.amount,
    };

    let result = Object.keys(data).filter((key) => data[key] === "");

    for (let item of result) {
      delete data[`${item}`];
    }

    console.log("SEND DATA ==>", data);

    try {
      const response = await createAffiliateSend_req(data);
      if (response) {
        console.log("CREATE AFFILIATE SEND RESPONSE ==>", response);
        getTransactions();
        setOpen(false);
      }
    } catch (e) {
      console.log("CREATE AFFILIATE SEND ERROR ==>", e);
      setErrorMes(e?.response?.data);
    }
  }

  async function addTransactionReceive(values) {
    let data = {
      userId: userId, // is required
      walletToId: values.walletId,
      walletAddressFrom: values.walletAddress,
      date: values.date,
      amount: values.amount,
    };

    let result = Object.keys(data).filter((key) => data[key] === "");

    for (let item of result) {
      delete data[`${item}`];
    }

    console.log("RECEIVE DATA ==>", data);

    try {
      const response = await createAffiliateReceive_req(data);
      if (response) {
        console.log("CREATE AFFILIATE RECEIVE RESPONSE ==>", response);
        getTransactions();
        setOpen(false);
      }
    } catch (e) {
      console.log("CREATE AFFILIATE RECEIVE ERROR ==>", e);
      setErrorMes(e?.response?.data);
    }
  }

  function addTransaction(values) {
    if (Number(type) === 0) {
      addTransactionSend(values);
    } else {
      addTransactionReceive(values);
    }
  }

  // get User Wallets
  async function getUserWallets() {
    try {
      const response = await getUserWallets_req(userId);
      if (response) {
        console.log("GET USER WALLETS RESPONSE ==>", response);
        setWallets(response.result);
      }
    } catch (e) {
      console.log("GET USER WALLETS ERROR ==>", e);
      return Promise.reject(e);
    }
  }

  useEffect(() => {
    getUserWallets();
  }, []);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Transaction History
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            Add Transaction History
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
            onSubmit={addTransaction}
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
                      <InputLabel id="select-type">Choose Type</InputLabel>
                      <Select
                        labelId="select-type"
                        id="select-type"
                        value={type}
                        onChange={(selectedOption) => {
                          setType(selectedOption.target.value);
                        }}
                        label="Operation Type"
                      >
                        <MenuItem value={0}>{"Send"}</MenuItem>
                        <MenuItem value={1}>{"Receive"}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* From Wallet */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      {`${Number(type) === 0 ? "From" : "To"} Wallet`}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControl fullWidth error={errors.walletId && !walletId}>
                      <InputLabel id="select-wallet-id">
                        {`Choose Wallet`}
                      </InputLabel>
                      <Select
                        labelId="select-wallet-id"
                        id="select-wallet-id"
                        value={walletId}
                        onChange={(selectedOption) => {
                          handleWalletChange(selectedOption, values);
                          handleChange("walletId");
                        }}
                        label={`${Number(type) === 0 ? "From" : "To"} Wallet`}
                      >
                        {wallets.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.coin_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error>
                        {errors.walletId &&
                          !walletId &&
                          touched.walletId &&
                          errors.walletId}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  {/* Address */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      {`Address ${Number(type) === 0 ? "To" : "From"}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="walletAddress"
                      name="walletAddress"
                      label={`Address ${Number(type) === 0 ? "To" : "From"}`}
                      fullWidth
                      onChange={(event) => {
                        handleAddress(event, values);
                        handleChange("walletAddress");
                      }}
                      error={Boolean(
                        touched.walletAddress && errors.walletAddress
                      )}
                      helperText={touched.walletAddress && errors.walletAddress}
                      defaultValue={values.walletAddress}
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
                      defaultValue={values.amount}
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
                    Add Transaction History
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

export default AddTransactionHistory;
