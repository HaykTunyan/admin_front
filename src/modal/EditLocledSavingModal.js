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
  IconButton as MuiIconButton,
  Checkbox,
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import { editSaving } from "../redux/actions/settings";
import { PlusCircle } from "react-feather";

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
  coin: Yup.string().required("Field is required"),
  min: Yup.string().required("Field is required"),
  max: Yup.string().required("Field is required"),
  toPercent: Yup.string().required("Field is required"),
  fromPercent: Yup.string().required("Field is required"),
});

const EditLockedSavingModal = ({ savingId, min, max, duration }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const [state, setState] = useState({
    savingId: savingId,
    min: min,
    max: max,
    duration: duration,
  });
  const [newDuretion, setNewDuretion] = useState(false);

  console.log(" state Edit Locked ", state);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    console.log("values", values);
    dispatch(editSaving(values)).then();
    setOpen(false);
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
              {({ errors, touched, handleChange, handleBlur }) => (
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
                    {/* <Grid display="flex" alignItems="center" item md={4}>
                      <Box display="flex" flexDirection="column">
                        <Typography
                          variant="subtitle1"
                          color="inherit"
                          component="div"
                        >
                          Duretion
                        </Typography>
                      </Box>
                    </Grid> */}
                    <Grid item md={12}>
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
                          onClick={() => setNewDuretion(true)}
                        >
                          Add
                        </Button>
                      </Box>
                      {duration.map((item) => (
                        <Box display="flex" justifyContent="">
                          <Grid item md={5}>
                            <TextField
                              margin="dense"
                              id="days"
                              name="days"
                              label="Number of Days"
                              type="number"
                              fullWidth
                              error={Boolean(touched.days && errors.days)}
                              helperText={touched.days && errors.days}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              defaultValue={item.days}
                              tabIndex={2}
                            />
                          </Grid>
                          <Grid item md={2}></Grid>
                          <Grid item md={5}>
                            <TextField
                              margin="dense"
                              id="percent"
                              name="percent"
                              label="%"
                              type="number"
                              fullWidth
                              error={Boolean(touched.percent && errors.percent)}
                              helperText={touched.percent && errors.percent}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              defaultValue={item.percent}
                              tabIndex={2}
                            />
                          </Grid>
                        </Box>
                      ))}
                      {/*  */}

                      {newDuretion && (
                        <Box display="flex" justifyContent="space-between">
                          <Grid item md={5}>
                            <TextField
                              margin="dense"
                              id="days"
                              name="days"
                              label="Number of Days"
                              type="number"
                              fullWidth
                              error={Boolean(touched.days && errors.days)}
                              helperText={touched.days && errors.days}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              defaultValue={duration.days}
                              tabIndex={2}
                            />
                          </Grid>
                          <Grid item md={2}></Grid>
                          <Grid item md={5}>
                            <TextField
                              margin="dense"
                              id="percent"
                              name="percent"
                              label="%"
                              type="number"
                              fullWidth
                              error={Boolean(touched.percent && errors.percent)}
                              helperText={touched.percent && errors.percent}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              defaultValue={duration.percent}
                              tabIndex={2}
                            />
                          </Grid>
                        </Box>
                      )}

                      {/* Add New Duretion */}
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
