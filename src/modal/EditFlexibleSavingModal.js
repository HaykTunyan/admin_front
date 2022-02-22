import React, { Fragment, useState } from "react";
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
  min: Yup.number(),
  max: Yup.number(),
  toPercent: Yup.number(),
  fromPercent: Yup.number(),
});

const EditFlexibleSavingModal = ({
  savingId,
  min,
  max,
  toPercent,
  fromPercent,
  getFlexible,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState({
    savingId: savingId,
    min: min,
    max: max,
    toPercent: toPercent, //for flexible
    fromPercent: fromPercent, //for flexible
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
      toPercent: Number(values.toPercent),
      fromPercent: Number(values.fromPercent),
    };

    let result = Object.keys(data).filter(
      (key) => !data[key] || data[key] === ""
    );

    for (let item of result) {
      delete data[`${item}`];
    }

    dispatch(editSaving(data)).then((data) => {
      if (data.success) {
        setOpen(false);
        getFlexible();
      }
      getFlexible();
      setSuccess(true);
    });
  };

  return (
    <Fragment>
      {success && <ConfirmationNotice title="Add Flexible Saving" />}
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
                  {/* To Percent  */}
                  <Grid item xs={12} md={4} display="flex" alignItems="center">
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
                      error={Boolean(touched.fromPercent && errors.fromPercent)}
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

export default EditFlexibleSavingModal;
