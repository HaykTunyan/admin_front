import React, { useState, useEffect, Fragment } from "react";
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
import { addAffiliateExchanges_req } from "../api/userExchangesAPI";
import ConfirmationNotice from "../components/ConfirmationNotice";

// Spacing.
const Spacer = styled.div(spacing);
const Alert = styled(MuiAlert)(spacing);

const AddAffiliateSwap = ({ userId, getUserExchanges }) => {
  // hooks.
  const [open, setOpen] = useState(false);
  const [errorMes, setErrorMes] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [value, setValue] = useState(null);
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState({
    fromWallet: "",
    toWallet: "",
    amount: "",
    date: "",
  });

  // Yup Validation.
  const AddSwapSchema = Yup.object().shape({
    fromWallet: Yup.number().required("Field is required"),
    toWallet: Yup.number().required("Field is required"),
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

  const handleChangeFrom = (event, values) => {
    values.fromWallet = event.target.value;
    setFrom(event.target.value);
  };

  const handleChangeTo = (event, values) => {
    values.toWallet = event.target.value;
    setTo(event.target.value);
  };

  const handleDateChange = (newValue, values) => {
    let chosenDate = moment(new Date(newValue)).format("YYYY-MM-DD HH:mm:ss");
    values.date = chosenDate;
    setValue(chosenDate);
  };

  // Error Messages.
  const invalid = errorMes?.message;

  // Form Submit.
  async function addExchange(values) {
    let data = {
      userId: userId,
      walletFromId: values.fromWallet,
      walletToId: values.toWallet,
      amount: values.amount,
      date: values.date,
    };

    try {
      const response = await addAffiliateExchanges_req(data);
      setSuccess(false);
      if (response) {
        getUserExchanges();
        setOpen(false);
      }
      setSuccess(true);
    } catch (e) {
      setErrorMes(e?.response?.data);
    }
  }

  // get User Wallets
  async function getUserWallets() {
    try {
      const response = await getUserWallets_req(userId);
      if (response) {
        setWallets(response.result);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  useEffect(() => {
    getUserWallets();
  }, []);

  return (
    <Fragment>
      {success === true && (
        <ConfirmationNotice
          opening={success}
          title="Create Affilate Exchange"
        />
      )}
      <Button variant="contained" onClick={handleClickOpen}>
        Add Exchange
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            Add Exchange
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
            onSubmit={addExchange}
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
                  {/* From Wallet */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      From Wallet
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControl fullWidth error={errors.fromWallet && !from}>
                      <InputLabel id="select-from-wallet">
                        Choose Wallet
                      </InputLabel>
                      <Select
                        labelId="select-from-wallet"
                        id="select-from-wallet"
                        value={from}
                        onChange={(selectedOption) => {
                          handleChangeFrom(selectedOption, values);
                          handleChange("fromWallet");
                        }}
                        label="From Wallet"
                      >
                        {wallets.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.coin_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error>
                        {errors.fromWallet &&
                          !from &&
                          touched.fromWallet &&
                          errors.fromWallet}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  {/* To Wallet */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      To Wallet
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControl fullWidth error={errors.toWallet && !to}>
                      <InputLabel id="select-to-wallet">
                        Choose Wallet
                      </InputLabel>
                      <Select
                        labelId="select-to-wallet"
                        id="select-to-wallet"
                        value={to}
                        onChange={(selectedOption) => {
                          handleChangeTo(selectedOption, values);
                          handleChange("toWallet");
                        }}
                        label="To Wallet"
                      >
                        {wallets.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.coin_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error>
                        {errors.toWallet &&
                          !to &&
                          touched.toWallet &&
                          errors.toWallet}
                      </FormHelperText>
                    </FormControl>
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
                    Add Exchange
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default AddAffiliateSwap;
