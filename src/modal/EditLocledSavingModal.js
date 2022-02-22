import React, { Fragment, useState } from "react";
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
  IconButton as MuiIconButton,
  Box,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import { editSaving } from "../redux/actions/settings";
import { XCircle } from "react-feather";
import ConfirmationNotice from "../components/ConfirmationNotice";

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
  min: Yup.number().min(0, "Field can not be minus value"),
  max: Yup.number().min(0, "Field can not be minus value"),
  duration: Yup.array().of(
    Yup.object().shape({
      days: Yup.number(),
      percent: Yup.number(),
    })
  ),
});

const EditLockedSavingModal = ({ savingId, min, max, duration, getLocked }) => {
  // Hooks.
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errorMes, setErrorMes] = useState([]);
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState({
    savingId: savingId,
    min: min,
    max: max,
    duration: duration,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    let data = {
      savingId: values.savingId, // is required
      min: Number(values.min),
      max: Number(values.max),
      duration: values.duration, //for locked
    };

    let result = Object.keys(data).filter(
      (key) => !data[key] || data[key] === ""
    );

    for (let item of result) {
      delete data[`${item}`];
    }

    dispatch(editSaving(data))
      .then((data) => {
        setSuccess(false);
        if (data.success) {
          setOpen(false);
          getLocked();
        }
        getLocked();
        setSuccess(true);
      })
      .catch((error) => {
        setErrorMes(error?.response?.data?.message);
      });
  };

  return (
    <Fragment>
      {success === true && (
        <ConfirmationNotice
          opening={success}
          title="Edit Locked Savings Settings"
        />
      )}
      <IconButton aria-label="done" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            Locked Savings Settings
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
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Grid container pt={6} spacing={6}>
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
                      defaultValue={state.min}
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
                  {/* Duration */}
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
                                onClick={() =>
                                  push({
                                    days: "",
                                    percent: "",
                                  })
                                }
                              >
                                Add
                              </Button>
                            </Box>
                            <Spacer my={4} />
                          </>
                          {values.duration.length > 0 &&
                            values.duration.map((item, index) => (
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                key={index}
                                paddingY={2}
                              >
                                <Grid item md={5}>
                                  <TextField
                                    margin="dense"
                                    id="days"
                                    name={`duration.${index}.days`}
                                    defaultValue={item.days}
                                    label="Number of Days"
                                    type="number"
                                    fullWidth
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md={5}>
                                  <TextField
                                    margin="dense"
                                    id="percent"
                                    name={`duration.${index}.percent`}
                                    defaultValue={item.percent}
                                    label="%"
                                    type="number"
                                    InputProps={{
                                      inputProps: {
                                        min: 0,
                                        step: 0.0000001,
                                      },
                                    }}
                                    fullWidth
                                    onChange={handleChange}
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
                                      onClick={() => remove(item)}
                                    >
                                      <XCircle />
                                    </IconButton>
                                  </Box>
                                </Grid>
                              </Box>
                            ))}
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                </Grid>
                <Spacer my={5} />
                <Divider my={5} />
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
                    sx={{ width: "120px" }}
                    variant="contained"
                    type="submit"
                  >
                    Edit Saving
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

export default EditLockedSavingModal;
