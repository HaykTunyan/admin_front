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
  Switch,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/lab";
import { getUserWallets_req } from "../api/userWalletsAPI";
import {
  createAffiliateFlexible_req,
  createAffiliateLocked_req,
} from "../api/userSavingsAPI";

// Spacing.
const Spacer = styled.div(spacing);
const Alert = styled(MuiAlert)(spacing);

const AddAffiliateSaving = ({ userId, tab, getUserSavings }) => {
  // hooks.
  const [open, setOpen] = useState(false);
  const [errorMes, setErrorMes] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [walletId, setWalletId] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [resaving, setResaving] = useState(false);
  const [state, setState] = useState({
    walletId: "",
    type: "",
    amount: "",
    percent: "",
    start_date: "",
    end_date: "",
    duration: "",
  });

  // Yup Validation.
  const AddSavingSchema = Yup.object().shape({
    walletId: Yup.number().required("Field is required"),
    type: Yup.string().required("Field is required!"),
    amount: Yup.number()
      .required("Field is required")
      .min(0, "Field can not be negative value"),
    percent: Yup.number()
      .required("Field is required!")
      .min(0, "Field can not be negative value"),
    start_date:
      type === "completed"
        ? Yup.date().required("Date is required!")
        : Yup.date().notRequired(),
    end_date:
      tab === 1 && type === "completed"
        ? Yup.date().required("Date is required!")
        : Yup.date().notRequired(),
    duration:
      tab === 2
        ? Yup.number().required("Field is required!")
        : Yup.number().notRequired(),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWalletChange = (event, values) => {
    values.walletId = Number(event.target.value);
    setWalletId(event.target.value);
  };

  const handleTypeChange = (event, values) => {
    values.type = event.target.value;
    setType(event.target.value);
  };

  const handleStartDateChange = (newValue, values) => {
    let chosenDate = moment(new Date(newValue)).format("YYYY-MM-DD HH:mm:ss");
    values.start_date = chosenDate;
    setDate(chosenDate);
  };

  const handleEndDateChange = (newValue, values) => {
    let chosenDate = moment(new Date(newValue)).format("YYYY-MM-DD HH:mm:ss");
    values.end_date = chosenDate;
    setEndDate(chosenDate);
  };

  const handleSwitchChange = () => {
    setResaving(!resaving);
  };

  // Error Messages.
  const invalid = errorMes?.message;

  // Form Submit.
  async function addSaving(values) {
    if (tab === 1) {
      let data = {
        userId: userId,
        walletId: Number(values.walletId),
        amount: Number(values.amount),
        percent: Number(values.percent),
        type: values.type,
        start_date: values.start_date,
        end_date: values.end_date,
      };

      let result = Object.keys(data).filter(
        (key) => !data[key] || data[key] === ""
      );

      for (let item of result) {
        delete data[`${item}`];
      }

      console.log("FLEXIBLE DATA ==>", data);

      try {
        const response = await createAffiliateFlexible_req(data);
        if (response) {
          console.log("ADD AFFILIATE FLEXIBLE SAVING RESPONSE ==>", response);
          getUserSavings("flexible");
          setOpen(false);
        }
      } catch (e) {
        console.log("ADD AFFILIATE FLEXIBLE SAVING ERROR ==>", e.response);
        setErrorMes(e?.response?.data);
      }
    } else {
      let data = {
        userId: userId,
        walletId: Number(values.walletId),
        amount: Number(values.amount),
        percent: Number(values.percent),
        type: values.type,
        start_date: values.start_date,
        resaving: resaving,
        duration: Number(values.duration),
      };

      let result = Object.keys(data).filter(
        (key) => !data[key] || data[key] === ""
      );

      for (let item of result) {
        delete data[`${item}`];
      }

      try {
        const response = await createAffiliateLocked_req(data);
        if (response) {
          console.log("ADD AFFILIATE LOCKED SAVING RESPONSE ==>", response);
          getUserSavings("locked");
          setOpen(false);
        }
      } catch (e) {
        console.log("ADD AFFILIATE LOCKED SAVING ERROR ==>", e.response);
        setErrorMes(e?.response?.data);
      }
    }
  }

  // get User Wallets
  async function getUserWallets() {
    console.log("User Id ==>", userId);
    try {
      const response = await getUserWallets_req(userId);
      if (response) {
        console.log("GET USER WALLETS RESPONSE ==>", response);
        setWallets(response.result);
      }
    } catch (e) {
      console.log("GET USER WALLETS ERROR ==>", e.response);
      return Promise.reject(e);
    }
  }

  useEffect(() => {
    getUserWallets();
  }, []);

  console.log("WALLET ID ==>", walletId);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        {`Add ${tab === 1 ? "Flexible" : "Locked"} Saving`}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            {`Add ${tab === 1 ? "Flexible" : "Locked"} Saving`}
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
            validationSchema={AddSavingSchema}
            onSubmit={addSaving}
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
                  {/* Wallet */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Wallet
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControl
                      fullWidth
                      error={errors.walletId && touched.walletId && !walletId}
                    >
                      <InputLabel id="select-wallet">Choose Wallet</InputLabel>
                      <Select
                        labelId="select-wallet"
                        id="select-wallet"
                        value={walletId}
                        onChange={(selectedOption) => {
                          handleWalletChange(selectedOption, values);
                          handleChange("walletId");
                        }}
                        label="Wallet"
                      >
                        {wallets.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.coin_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error>
                        {errors.walletId && touched.walletId && !walletId}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  {/* Type */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Type
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControl fullWidth error={errors.type && !type}>
                      <InputLabel id="select-type">Choose Type</InputLabel>
                      <Select
                        labelId="select-type"
                        id="select-type"
                        value={type}
                        onChange={(selectedOption) => {
                          handleTypeChange(selectedOption, values);
                          handleChange("type");
                        }}
                        label="Type"
                      >
                        <MenuItem value={"new"}>{"New"}</MenuItem>
                        <MenuItem value={"completed"}>{"Completed"}</MenuItem>
                      </Select>
                      <FormHelperText error>
                        {errors.type && !type && touched.type && errors.type}
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
                  {/* Percent */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Percent
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="percent"
                      name="percent"
                      label="Percent"
                      type="number"
                      fullWidth
                      InputProps={{
                        inputProps: {
                          min: 0,
                        },
                      }}
                      error={Boolean(touched.percent && errors.percent)}
                      helperText={touched.percent && errors.percent}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={values.percent}
                    />
                  </Grid>
                  {/* Start Date */}
                  {type === "completed" && (
                    <>
                      <Grid
                        item
                        xs={4}
                        md={4}
                        display="flex"
                        alignItems="center"
                      >
                        <Typography
                          variant="subtitle1"
                          color="inherit"
                          component="div"
                        >
                          Start Date
                        </Typography>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <FormControl fullWidth>
                          <DateTimePicker
                            renderInput={(props) => (
                              <TextField
                                {...props}
                                error={
                                  Boolean(
                                    touched.start_date && errors.start_date
                                  ) && !date
                                }
                                helperText={
                                  touched.start_date &&
                                  errors.start_date &&
                                  !date
                                }
                              />
                            )}
                            label="Choose Start Date"
                            value={date}
                            onChange={(newValue) => {
                              handleStartDateChange(newValue, values);
                              handleChange("start_date");
                            }}
                          />
                        </FormControl>
                      </Grid>
                    </>
                  )}
                  {tab === 1 && type === "completed" && (
                    <>
                      {/* End Date */}
                      <Grid
                        item
                        xs={4}
                        md={4}
                        display="flex"
                        alignItems="center"
                      >
                        <Typography
                          variant="subtitle1"
                          color="inherit"
                          component="div"
                        >
                          End Date
                        </Typography>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <FormControl fullWidth>
                          <DateTimePicker
                            renderInput={(props) => (
                              <TextField
                                {...props}
                                error={
                                  Boolean(
                                    touched.end_date && errors.end_date
                                  ) && !endDate
                                }
                                helperText={
                                  touched.end_date &&
                                  errors.end_date &&
                                  !endDate
                                }
                              />
                            )}
                            label="Choose End Date"
                            value={endDate}
                            onChange={(newValue) => {
                              handleEndDateChange(newValue, values);
                              handleChange("end_date");
                            }}
                          />
                        </FormControl>
                      </Grid>
                    </>
                  )}
                  {tab === 2 && (
                    <>
                      {/* Duration */}
                      <Grid
                        item
                        xs={4}
                        md={4}
                        display="flex"
                        alignItems="center"
                      >
                        <Typography
                          variant="subtitle1"
                          color="inherit"
                          component="div"
                        >
                          Duration
                        </Typography>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <TextField
                          margin="dense"
                          id="duration"
                          name="duration"
                          label="Duration"
                          type="number"
                          fullWidth
                          InputProps={{
                            inputProps: {
                              min: 0,
                            },
                          }}
                          error={Boolean(touched.duration && errors.duration)}
                          helperText={touched.duration && errors.duration}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          defaultValue={values.duration}
                        />
                      </Grid>
                      {/* Resaving */}
                      <Grid
                        item
                        xs={4}
                        md={4}
                        display="flex"
                        alignItems="center"
                      >
                        <Typography
                          variant="subtitle1"
                          color="inherit"
                          component="div"
                        >
                          Resaving
                        </Typography>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <Switch
                          checked={resaving}
                          onChange={handleSwitchChange}
                        />
                      </Grid>
                    </>
                  )}
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
                      console.log("errors ==>", errors);
                      handleSubmit();
                    }}
                  >
                    Add Saving
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

export default AddAffiliateSaving;
