import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
import { addSwap } from "../redux/actions/settings";
import instance from "../services/api";

// Spacing.
const Spacer = styled.div(spacing);

// Yup Validation.
const AddSwapSchema = Yup.object().shape({
  fromCoin: Yup.string().required("Field is required"),
  toCoin: Yup.string().required("Field is required"),
  decimals: Yup.string().required("Field is required"),
  fee: Yup.string().required("Field is required"),
  min: Yup.string().required("Field is required"),
  limit: Yup.string().required("Field is required"),
});

const AddSwapModal = () => {
  // hooks.
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const [coinSettings, getCoinSettings] = useState([]);
  const [state, setState] = useState({
    fromCoin: coinSettings.name,
    toCoin: coinSettings.name,
    decimals: "",
    fee: "",
    min: "",
    limit: "",
    limitEnabled: true,
  });

  const [age, setAge] = useState("");

  const handleChangeA = (event) => {
    setAge(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  console.log("coinSettings", coinSettings);

  const handleSubmit = (values) => {
    console.log("values", values);
    // dispatch(addSwap(values)).then();
    // setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Swap
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            {/* {fromCoin.toUpperCase()} - <strong>{toCoin.toUpperCase()}</strong>{" "} */}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            initialForms={state}
            validationSchema={AddSwapSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Grid container pt={6} spacing={6}>
                  {/* From Coin */}
                  <Grid display="flex" item md={4} alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      From Coin Swap
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <FormControl fullWidth>
                      <InputLabel id="select-from-coin">Coin Name</InputLabel>
                      <Select
                        labelId="select-from-coin"
                        id="select-from-coin"
                        label="From Coin Name"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={state.fromCoin}
                      >
                        {coinSettings.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* <TextField
                      margin="dense"
                      id="fromCoin"
                      name="fromCoin"
                      label="fromCoin"
                      type="number"
                      error={Boolean(touched.fromCoin && errors.fromCoin)}
                      fullWidth
                      helperText={touched.fromCoin && errors.fromCoin}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.fromCoin}
                      tabIndex={1}
                    /> */}
                  </Grid>
                  {/* To Coin */}
                  <Grid display="flex" item md={4} alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      To Coin Swap
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <FormControl fullWidth>
                      <InputLabel id="select-to-coin">To Coin Name</InputLabel>
                      <Select
                        labelId="select-to-coin"
                        id="select-to-coin"
                        label="To Coin Name"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={state.toCoin}
                      >
                        {coinSettings.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* <TextField
                      margin="dense"
                      id="toCoin"
                      name="toCoin"
                      label="toCoin"
                      type="number"
                      error={Boolean(touched.toCoin && errors.toCoin)}
                      fullWidth
                      helperText={touched.toCoin && errors.toCoin}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.toCoin}
                      tabIndex={1}
                    /> */}
                  </Grid>
                  {/* Decimals */}
                  <Grid display="flex" item md={4} alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Decimals Swap
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <TextField
                      margin="dense"
                      id="decimals"
                      name="decimals"
                      label="Decimals"
                      type="number"
                      error={Boolean(touched.decimals && errors.decimals)}
                      fullWidth
                      helperText={touched.decimals && errors.decimals}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.decimals}
                      tabIndex={1}
                    />
                  </Grid>
                  {/* Fee  */}
                  <Grid display="flex" alignItems="center" item md={4}>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Fee Swap
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <TextField
                      margin="dense"
                      id="fee"
                      name="fee"
                      label="Fee"
                      type="number"
                      fullWidth
                      error={Boolean(touched.fee && errors.fee)}
                      helperText={touched.fee && errors.fee}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.fee}
                      tabIndex={2}
                    />
                  </Grid>
                  {/* Min */}
                  <Grid display="flex" alignItems="center" item md={4}>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Min Swap
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <TextField
                      margin="dense"
                      id="min"
                      name="min"
                      label="Min"
                      type="number"
                      fullWidth
                      error={Boolean(touched.min && errors.min)}
                      helperText={touched.min && errors.min}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.min}
                      tabIndex={2}
                    />
                  </Grid>
                  {/* Limit Enabled */}
                  <Grid display="flex" alignItems="center" item md={4}>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Limit Enabled
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <FormControlLabel
                      label="Limit Enabled Swap"
                      name="limitEnabled"
                      control={
                        <Checkbox
                          {...label}
                          defaultChecked={state.limitEnabled}
                          onChange={handleChange}
                        />
                      }
                    />
                  </Grid>
                  {/* Limit  */}
                  <Grid display="flex" alignItems="center" item md={4}>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Limit Swap
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <TextField
                      margin="dense"
                      id="limit"
                      name="limit"
                      label="Limit"
                      type="number"
                      fullWidth
                      error={Boolean(touched.limit && errors.limit)}
                      helperText={touched.limit && errors.limit}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.limit}
                      tabIndex={2}
                    />
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
    </div>
  );
};

export default AddSwapModal;
