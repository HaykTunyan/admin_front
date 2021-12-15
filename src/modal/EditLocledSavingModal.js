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
  IconButton as MuiIconButton,
  Box,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import { editSaving } from "../redux/actions/settings";
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
    .min(0, " Filed can not be minus value"),
  max: Yup.number()
    .required("Field is required")
    .min(0, " Filed can not be minus value"),
});

const EditLockedSavingModal = ({ savingId, min, max, duration }) => {
  // hooks.
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [newDuretion, setNewDuretion] = useState([]);
  const [errorMes, setErrorMes] = useState([]);
  const [state, setState] = useState({
    savingId: savingId,
    min: min,
    max: max,
    duration: duration,
  });

  const addDuretion = () => {
    setNewDuretion((oldDuretion) => [...oldDuretion, oldDuretion.length]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    console.log("values", values);
    dispatch(editSaving(values))
      .then((data) => {
        if (data.success) {
          setOpen(false);
        }
      })
      .catch((error) => {
        console.log(" error messages ", error?.response?.data);
        setErrorMes(error?.response?.data?.message);
      });
  };

  return (
    <>
      <div>
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
                    {/* Duretion */}
                    <Grid item md={12}>
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
                                    push({ days: "", percent: "" })
                                  }
                                >
                                  Add
                                </Button>
                              </Box>
                              <Spacer my={4} />
                            </>
                            {duration.length > 0 &&
                              duration.map((item, index) => (
                                <>
                                  <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    key={index}
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
                                    <Grid item md={2}>
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
                                    <Grid item md={5}>
                                      <TextField
                                        margin="dense"
                                        id="percent"
                                        name={`duration.${index}.percent`}
                                        defaultValue={item.percent}
                                        label="%"
                                        type="number"
                                        fullWidth
                                        onChange={handleChange}
                                      />
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

export default EditLockedSavingModal;
