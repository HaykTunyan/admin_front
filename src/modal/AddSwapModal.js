import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components/macro";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { spacing } from "@material-ui/system";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Alert as MuiAlert,
} from "@material-ui/core";
import { addSwap } from "../redux/actions/settings";
import { instance } from "../services/api";
import ConfirmationNotice from "../components/ConfirmationNotice";

// Spacing.
const Spacer = styled.div(spacing);
const Alert = styled(MuiAlert)(spacing);

const AddSwapModal = ({ getSwap }) => {
  // hooks.
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [coinSettings, getCoinSettings] = useState([]);
  const [errorMes, setErrorMes] = useState([]);
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState({
    fromCoin: Number,
    toCoin: Number,
    decimals: "",
    fee: "",
    min_from: "",
    min_to: "",
    limit_from: "",
    limit_to: "",
  });

  // Yup Validation.
  const AddSwapSchema = Yup.object().shape({
    decimals: Yup.number()
      .required("Field is required")
      .min(0, "Field min value 10")
      .max(10, "Field max value 10"),
    fee: Yup.number()
      .required("Field is required")
      .min(0, "Field can not be negative value"),
    min_from: Yup.number()
      .required("Field is required")
      .min(0, "Field can not be negative value"),
    min_to: Yup.number()
      .required("Field is required")
      .min(0, "Field can not be negative value"),
    limit_from: check
      ? Yup.number()
          .required("Field is required")
          .min(0, " Field can not be negative value")
      : Yup.number(),
    limit_to: check
      ? Yup.number()
          .required("Field is required")
          .min(0, " Field can not be negative value")
      : Yup.number(),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Form Submit.
  const handleSubmit = (values) => {
    setSuccess(false);

    let data = {
      fromCoin: Number(values.fromCoin),
      toCoin: Number(values.toCoin),
      decimals: values.decimals,
      fee: Number(values.fee),
      min_from: Number(values.min_from),
      min_to: Number(values.min_to),
      limit_from: Number(values.limit_from),
      limit_to: Number(values.limit_to),
      limitEnabled: check,
    };

    let result = Object.keys(data).filter(
      (key) =>
        (!data[key] || data[key] === "") && typeof data[key] !== "boolean"
    );

    for (let item of result) {
      delete data[`${item}`];
    }
    console.log("data", data);
    dispatch(addSwap(data))
      .then((data) => {
        setOpen(false);
        getSwap();
        setSuccess(true);
      })
      .catch((error) => {
        setErrorMes(error?.response?.data);
      });
  };

  // Error Messages.
  const invalid = errorMes?.message;

  // get getSettingCoin.
  const getSettingCoin = () => {
    return instance
      .get("/admin/settings/coins")
      .then((data) => {
        getCoinSettings(data.data);
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getSettingCoin();
  }, []);

  return (
    <Fragment>
      {success === true && <ConfirmationNotice title="Swap Added" />}
      <Button variant="contained" onClick={handleClickOpen}>
        Add Swap
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            Create Swap
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            validationSchema={AddSwapSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
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
                  {/* From Coin */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      From Coin
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControl fullWidth>
                      <InputLabel id="select-from-coin">
                        From Coin Name
                      </InputLabel>
                      <Select
                        labelId="select-from-coin"
                        id="select-from-coin"
                        label="From Coin Name"
                        name="fromCoin"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.fromCoin}
                      >
                        {coinSettings.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* To Coin */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      To Coin
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControl fullWidth>
                      <InputLabel id="select-to-coin">To Coin Name</InputLabel>
                      <Select
                        labelId="select-to-coin"
                        id="select-to-coin"
                        label="To Coin Name"
                        name="toCoin"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.toCoin}
                      >
                        {coinSettings.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* Decimals */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Decimals
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="decimals"
                      name="decimals"
                      label="Decimals"
                      type="number"
                      fullWidth
                      InputProps={{
                        inputProps: {
                          min: 0,
                          max: 10,
                        },
                      }}
                      error={Boolean(touched.decimals && errors.decimals)}
                      helperText={touched.decimals && errors.decimals}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={values.decimals}
                    />
                  </Grid>
                  {/* Fee  */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Fee %
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="fee"
                      name="fee"
                      label="Fee %"
                      fullWidth
                      error={Boolean(touched.fee && errors.fee)}
                      helperText={touched.fee && errors.fee}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.fee}
                    />
                  </Grid>
                  {/* Min From */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Min From
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="min_from"
                      name="min_from"
                      label="Min From"
                      fullWidth
                      error={Boolean(touched.min_from && errors.min_from)}
                      helperText={touched.min_from && errors.min_from}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.min_from}
                    />
                  </Grid>
                  {/* Min To */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Min To
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="min_to"
                      name="min_to"
                      label="Min To"
                      fullWidth
                      error={Boolean(touched.min_to && errors.min_to)}
                      helperText={touched.min_to && errors.min_to}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.min_to}
                    />
                  </Grid>
                  {/* Limit Enabled */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Limit
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControlLabel
                      label="Enable Limit"
                      name="limitEnabled"
                      control={
                        <Checkbox
                          {...label}
                          name="limitEnabled"
                          defaultValue={check}
                          onChange={() => setCheck(!check)}
                        />
                      }
                    />
                  </Grid>
                  {/* Limit  */}
                  {check ? (
                    <>
                      {/* Limit From */}
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
                          Limit Swap From
                        </Typography>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <TextField
                          margin="dense"
                          id="limit_from"
                          name="limit_from"
                          label="Limit From"
                          fullWidth
                          error={Boolean(
                            touched.limit_from && errors.limit_from
                          )}
                          helperText={touched.limit_to && errors.limit_to}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          defaultValue={state.limit_from}
                        />
                      </Grid>
                      <Spacer my={4} />
                      {/* Limit To */}
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
                          Limit Swap To
                        </Typography>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <TextField
                          margin="dense"
                          id="limit_to"
                          name="limit_to"
                          label="Limit To"
                          fullWidth
                          error={Boolean(touched.limit_to && errors.limit_to)}
                          helperText={touched.limit_to && errors.limit_to}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          defaultValue={state.limit_to}
                        />
                      </Grid>
                    </>
                  ) : null}
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
                    type="submit"
                  >
                    Create Swap
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

export default AddSwapModal;
