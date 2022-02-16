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
  FormControl,
  InputLabel,
  Grid,
  Box,
  Alert,
  Select,
  MenuItem,
} from "@material-ui/core";
import { addSaving } from "../redux/actions/settings";
import { instance } from "../services/api";

// Spacing.
const Spacer = styled.div(spacing);

// Yup Validation.
const AddSavingSchema = Yup.object().shape({
  coin: Yup.number().required("Field is required"),
  min: Yup.number()
    .required("Field is required")
    .min(0, " Field can not be negative value"),
  max: Yup.number()
    .required("Field is required")
    .min(0, " Field can not be negative value"),
  toPercent: Yup.number().required("Field is required"),
  fromPercent: Yup.number().required("Field is required"),
});

const AddFlexibleSavingModal = ({ getFlexible }) => {
  // hooks.
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errorMes, setErrorMes] = useState([]);
  const [coinSettings, getCoinSettings] = useState([]);
  const [state, setState] = useState({
    coin: Number,
    type: "flexible", // for flexible
    min: "",
    max: "",
    toPercent: "", //for flexible
    fromPercent: "", //for flexible
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Form Req.
  const addSavings = (values) => {
    let data = {
      coin: Number(values.coin),
      type: "flexible",
      min: Number(values.min),
      max: Number(values.max),
      toPercent: Number(values.toPercent),
      fromPercent: Number(values.fromPercent),
    };

    console.log("DATA ==>", data);

    dispatch(addSaving(data))
      .then((data) => {
        console.log("data", data);
        setOpen(false);
        getFlexible();
      })
      .catch((error) => {
        console.log(" error messages ", error?.response?.data);
        setErrorMes(error?.response?.data);
      });
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

  return (
    <>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Saving
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography variant="h4" color="inherit" component="div">
              Add Flexible Saving
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                ...state,
              }}
              initialForms={state}
              validationSchema={AddSavingSchema}
              onSubmit={addSavings}
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
                  {errorMes && (
                    <>
                      {errorMes[0]?.messages && (
                        <Alert my={2} severity="error">
                          {errorMes[0]?.messages}
                        </Alert>
                      )}

                      {errorMes[1]?.messages && (
                        <Alert my={2} severity="error">
                          {errorMes[1]?.messages}
                        </Alert>
                      )}
                      {errorMes[2]?.messages && (
                        <Alert my={2} severity="error">
                          {errorMes[2]?.messages}
                        </Alert>
                      )}
                      {errorMes[3]?.messages && (
                        <Alert my={2} severity="error">
                          {errorMes[3]?.messages}
                        </Alert>
                      )}
                      {errorMes.message && (
                        <Alert my={2} severity="error">
                          {errorMes.message}
                        </Alert>
                      )}
                    </>
                  )}
                  <Grid container pt={6} spacing={6}>
                    {/* Coin */}
                    <Grid item xs={4} md={4} display="flex" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        component="div"
                      >
                        Saving Coin
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
                          name="coin"
                          value={values.coin}
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          {coinSettings.map((item) => (
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* Min */}
                    <Grid item xs={4} md={4} display="flex" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        component="div"
                      >
                        Min
                      </Typography>
                    </Grid>
                    <Grid item xs={8} md={8}>
                      <TextField
                        margin="dense"
                        id="min"
                        name="min"
                        label="Min"
                        error={Boolean(touched.min && errors.min)}
                        fullWidth
                        helperText={touched.min && errors.min}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={state.max}
                      />
                    </Grid>
                    {/* Max */}
                    <Grid item xs={4} md={4} display="flex" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        component="div"
                      >
                        Max
                      </Typography>
                    </Grid>
                    <Grid item xs={8} md={8}>
                      <TextField
                        margin="dense"
                        id="max"
                        name="max"
                        label="Max"
                        error={Boolean(touched.max && errors.max)}
                        fullWidth
                        helperText={touched.max && errors.max}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={state.max}
                      />
                    </Grid>
                    {/* To Percent  */}
                    <Grid
                      item
                      xs={12}
                      md={4}
                      display="flex"
                      alignItems="center"
                    >
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        component="div"
                      >
                        7 Day API
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        margin="dense"
                        id="fromPercent"
                        name="fromPercent"
                        label="From"
                        fullWidth
                        error={Boolean(
                          touched.fromPercent && errors.fromPercent
                        )}
                        helperText={touched.fromPercent && errors.fromPercent}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={state.fromPercent}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        margin="dense"
                        id="toPercent"
                        name="toPercent"
                        label="To"
                        fullWidth
                        error={Boolean(touched.toPercent && errors.toPercent)}
                        helperText={touched.toPercent && errors.toPercent}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={state.toPercent}
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
                      onClick={handleSubmit}
                    >
                      Create Saving
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddFlexibleSavingModal;
