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
  IconButton as MuiIconButton,
  Box,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import { editSaving } from "../redux/actions/settings";

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

const EditFlexibleSavingModal = ({
  savingId,
  min,
  max,
  toPercent,
  fromPercent,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    savingId: savingId,
    type: "flexible", // for flexible
    min: min,
    max: max,
    toPercent: toPercent, //for flexible
    fromPercent: fromPercent, //for flexible
  });

  console.log(" state Edit FLexible ", state);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    console.log("values", values);
    dispatch(editSaving(values)).then((data) => {
      if (data.success) {
        setOpen(false);
      }
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
              Flexible Savings Settings
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

export default EditFlexibleSavingModal;
