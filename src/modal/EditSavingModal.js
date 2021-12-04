import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { Formik, Form } from "formik";
import * as Yup from "yup";
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
  FormControlLabel,
  Checkbox,
  Box,
  Alert,
  Stack,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import { spacing } from "@material-ui/system";
import { useDispatch } from "react-redux";
import { editSwap } from "../redux/actions/settings";

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
const editSavingSchema = Yup.object().shape({
  decimals: Yup.string().required("Field is required"),
  fee: Yup.string().required("Field is required"),
  min: Yup.string().required("Field is required"),
  limit: Yup.string().required("Field is required"),
});

const EditSavingModal = ({
  savingId,
  min,
  max,
  fromPersent,
  toPercent,
  duration,
}) => {
  // hooks.
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const [state, setState] = useState({
    swapId: "", //is required
    decimals: "",
    fee: "",
    min: "",
    limit: "",
    limitEnabled: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    console.log("values", values);
    // dispatch(editSwap(values)).then();
    // setOpen(false);
  };

  return (
    <Fragment>
      <IconButton aria-label="done" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            Edit Settings
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            initialForms={state}
            validationSchema={editSavingSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Grid container pt={6} spacing={6}>
                  {/* Min */}
                  <Grid display="flex" alignItems="center" item md={4}>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Min Amount
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
                  {/* Fee  */}
                  <Grid display="flex" alignItems="center" item md={4}>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Fee %
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
                  {/* Decimals */}
                  <Grid display="flex" item md={4} alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Decimals
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
                  {/* Limit Enabled */}
                  <Grid display="flex" alignItems="center" item md={4}>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Limit
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
                  {console.log(" limitEnabled ", state.limitEnabled)}
                  {state.limitEnabled === false && (
                    <>
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
                    </>
                  )}
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
                    Save Swap
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

export default EditSavingModal;
