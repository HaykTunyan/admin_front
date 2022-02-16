import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Formik, Form, FieldArray } from "formik";
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
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton as MuiIconButton,
  Alert,
} from "@material-ui/core";
import { addSaving } from "../redux/actions/settings";
import { instance } from "../services/api";
import { XCircle } from "react-feather";

// Spacing.
const Spacer = styled.div(spacing);

// Custom Style.
const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

// Yup Validation.
const AddSavingSchema = Yup.object().shape({
  min: Yup.number()
    .required("Field is required")
    .min(0, " Field can not be a negative value"),
  max: Yup.number()
    .required("Field is required")
    .min(0, "Field can not be a negative value"),
  duration: Yup.array().of(
    Yup.object().shape({
      days: Yup.number().required("Field is required!"),
      percent: Yup.number().required("Field is required!"),
    })
  ),
});

const AddLockedSavingModal = ({ getLocked }) => {
  //  hooks.
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errorMes, setErrorMes] = useState([]);
  const [coinSettings, getCoinSettings] = useState([]);
  const [state, setState] = useState({
    type: "locked",
    min: "",
    max: "",
    duration: [
      {
        days: "",
        percent: "",
      },
    ],
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
      type: "locked",
      min: Number(values.min),
      max: Number(values.max),
      duration: values.duration, //for locked
    };

    console.log("DATA ==>", data);

    dispatch(addSaving(data))
      .then((data) => {
        if (data.success) {
          setOpen(false);
        }
        setOpen(false);
        getLocked();
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
      <Button variant="contained" onClick={handleClickOpen}>
        Add Saving
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            Add Locked Savings
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
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
                    {errorMes?.message && (
                      <Alert my={2} severity="error">
                        {errorMes.message}
                      </Alert>
                    )}
                  </>
                )}
                <Grid container pt={6} spacing={6}>
                  {/* Saving Coin  */}
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
                  {/* Min Coin */}
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
                      fullWidth
                      error={Boolean(touched.min && errors.min)}
                      helperText={touched.min && errors.min}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.max}
                    />
                  </Grid>
                  {/* Max Coin */}
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

                  <Grid item xs={12} md={12}>
                    <FieldArray name="duration">
                      {({ insert, remove, push }) => (
                        <>
                          <>
                            <Box display="flex" justifyContent="center">
                              <Typography
                                variant="subtitle1"
                                color="inherit"
                                component="div"
                              >
                                Duration
                              </Typography>
                              <Spacer mx={3} />
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => push({ days: "", percent: "" })}
                              >
                                Add
                              </Button>
                            </Box>
                            <Spacer my={4} />
                          </>

                          {state.duration.length > 0 &&
                            state.duration.map((duration, index) => (
                              <>
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  key={index}
                                >
                                  <Grid item md={5}>
                                    <TextField
                                      margin="dense"
                                      id="days"
                                      name={`duration.${index}.days`}
                                      label="Number of Days"
                                      type="number"
                                      fullWidth
                                      onChange={handleChange}
                                      error={Boolean(
                                        touched.duration && errors.duration
                                      )}
                                      helperText={
                                        touched.duration && errors.duration
                                      }
                                    />
                                  </Grid>
                                  <Grid item md={5}>
                                    <TextField
                                      margin="dense"
                                      id="percent"
                                      name={`duration.${index}.percent`}
                                      label="%"
                                      fullWidth
                                      type="number"
                                      InputProps={{
                                        inputProps: {
                                          min: 0,
                                          step: 0.0000001,
                                        },
                                      }}
                                      onChange={handleChange}
                                      error={Boolean(
                                        touched.duration && errors.duration
                                      )}
                                      helperText={
                                        touched.duration && errors.duration
                                      }
                                    />
                                  </Grid>
                                  <Grid item md={1}>
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                    >
                                      <IconButton
                                        aria-label="close"
                                        color="primary"
                                        onClick={() => remove(index)}
                                      >
                                        <XCircle />
                                      </IconButton>
                                    </Box>
                                  </Grid>
                                </Box>
                              </>
                            ))}
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                </Grid>
                <Spacer my={5} />

                {/*  */}
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
    </>
  );
};

export default AddLockedSavingModal;
