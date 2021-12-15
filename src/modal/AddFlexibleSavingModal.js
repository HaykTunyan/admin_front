import React, { useState } from "react";
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
  Box,
} from "@material-ui/core";
import { addSaving } from "../redux/actions/settings";

// Spacing.
const Spacer = styled.div(spacing);

// Yup Validation.
const AddSavingSchema = Yup.object().shape({
  coin: Yup.string().required("Field is required"),
  min: Yup.string().required("Field is required"),
  max: Yup.string().required("Field is required"),
  toPercent: Yup.string().required("Field is required"),
  fromPercent: Yup.string().required("Field is required"),
});

const AddFlexibleSavingModal = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    coin: "",
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

  const handleSubmit = (values) => {
    console.log("values", values);
    dispatch(addSaving(values)).then((data) => {
      console.log("data", data);
      setOpen(false);
    });
  };

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
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Grid container pt={6} spacing={6}>
                    {/* Coin */}
                    <Grid display="flex" item md={4} alignItems="center">
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        component="div"
                      >
                        Saving Coin
                      </Typography>
                    </Grid>
                    <Grid item md={8}>
                      <TextField
                        margin="dense"
                        id="coin"
                        name="coin"
                        label="Coin"
                        type="number"
                        error={Boolean(touched.coin && errors.coin)}
                        fullWidth
                        helperText={touched.coin && errors.coin}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={state.coin}
                      />
                    </Grid>
                    {/* Min */}
                    <Grid display="flex" item md={4} alignItems="center">
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        component="div"
                      >
                        Min
                      </Typography>
                    </Grid>
                    <Grid item md={8}>
                      <TextField
                        margin="dense"
                        id="min"
                        name="min"
                        label="Min"
                        type="number"
                        error={Boolean(touched.min && errors.min)}
                        fullWidth
                        helperText={touched.min && errors.min}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={state.max}
                      />
                    </Grid>
                    {/* Max */}
                    <Grid display="flex" item md={4} alignItems="center">
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        component="div"
                      >
                        Max
                      </Typography>
                    </Grid>
                    <Grid item md={8}>
                      <TextField
                        margin="dense"
                        id="max"
                        name="max"
                        label="Max"
                        type="number"
                        error={Boolean(touched.max && errors.max)}
                        fullWidth
                        helperText={touched.max && errors.max}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={state.max}
                      />
                    </Grid>
                    {/* To Percent  */}
                    <Grid display="flex" alignItems="center" item md={4}>
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        component="div"
                      >
                        7 Day API
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        margin="dense"
                        id="fromPercent"
                        name="fromPercent"
                        label="From"
                        type="number"
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
                    <Grid item md={4}>
                      <TextField
                        margin="dense"
                        id="toPercent"
                        name="toPercent"
                        label="To"
                        type="number"
                        fullWidth
                        error={Boolean(touched.toPercent && errors.toPercent)}
                        helperText={touched.toPercent && errors.toPercent}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={state.toPercent}
                      />
                    </Grid>
                    {/* From Percent */}
                    {/* <Grid display="flex" alignItems="center" item md={4}>
                      <Typography
                        variant="subtitle1"
                        color="inherit"
                        component="div"
                      >
                        From Percent
                      </Typography>
                    </Grid>
                    <Grid item md={8}>
                      <TextField
                        margin="dense"
                        id="fromPercent"
                        name="fromPercent"
                        label="From Percent"
                        type="number"
                        fullWidth
                        error={Boolean(
                          touched.fromPercent && errors.fromPercent
                        )}
                        helperText={touched.fromPercent && errors.fromPercent}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue={state.fromPercent}
                      />
                    </Grid> */}
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
