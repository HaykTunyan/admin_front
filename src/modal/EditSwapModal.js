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
  Alert as MuiAlert,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import { spacing } from "@material-ui/system";
import { useDispatch } from "react-redux";
import { editSwap } from "../redux/actions/settings";

// Spacing.
const Spacer = styled.div(spacing);
const Alert = styled(MuiAlert)(spacing);

// Custom Style.
const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const EditSwapModal = ({
  idSwap,
  decimalsSwap,
  feeSwap,
  minSwap,
  limitSwap,
  limitEnabledSwap,
  fromCoin,
  toCoin,
  getSwap,
}) => {
  // hooks.
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(limitEnabledSwap);
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const [errorMes, setErrorMes] = useState([]);
  const [state, setState] = useState({
    swapId: idSwap, //is required
    decimals: decimalsSwap,
    fee: feeSwap,
    min: minSwap,
    limit: limitSwap,
  });

  // Yup Validation.
  const editSwapSchema = Yup.object().shape({
    decimals: Yup.number().required("Field is required"),
    fee: Yup.number()
      .required("Field is required")
      .min(0, " Field can not be negative value"),
    min: Yup.number()
      .required("Field is required")
      .min(0, " Field can not be negative value"),
    limit: check
      ? Yup.number()
          .required("Field is required")
          .min(0, " Field can not be negative value")
      : Yup.number(),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    let data = {
      swapId: values.swapId, //is required
      decimals: values.decimals,
      fee: Number(values.fee),
      min: Number(values.min),
      limit: Number(values.limit),
      limitEnabled: check,
    };

    let result = Object.keys(data).filter(
      (key) =>
        (!data[key] || data[key] === "") && typeof data[key] !== "boolean"
    );

    for (let item of result) {
      delete data[`${item}`];
    }
    console.log("Data =>", data);

    dispatch(editSwap(data))
      .then((data) => {
        setOpen(false);
        getSwap();
      })
      .catch((error) => {
        console.log("error messages", error?.response?.data);
        setErrorMes(error?.response?.data);
      });
  };

  const invalid = errorMes?.message;

  return (
    <Fragment>
      <IconButton aria-label="done" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            {fromCoin.toUpperCase()} - <strong>{toCoin.toUpperCase()}</strong>{" "}
            Settings
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            initialForms={state}
            validationSchema={editSwapSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                {invalid && (
                  <>
                    {invalid[0]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[0]?.messages}
                      </Alert>
                    )}

                    {invalid[1]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[1]?.messages}
                      </Alert>
                    )}
                    {invalid[2]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[2]?.messages}
                      </Alert>
                    )}
                    {invalid[3]?.messages && (
                      <Alert my={2} severity="error">
                        {invalid[3]?.messages}
                      </Alert>
                    )}
                    {invalid && (
                      <Alert my={2} severity="error">
                        {invalid}
                      </Alert>
                    )}
                  </>
                )}
                <Grid container pt={6} spacing={6}>
                  {/* Min */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Min Amount
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="min"
                      name="min"
                      label="Min"
                      //type="number"
                      fullWidth
                      error={Boolean(touched.min && errors.min)}
                      helperText={touched.min && errors.min}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.min}
                    />
                  </Grid>
                  {/* Fee  */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Fee %
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="fee"
                      name="fee"
                      label="Fee"
                      //type="number"
                      fullWidth
                      // InputProps={{
                      //   inputProps: {
                      //     min: 0,
                      //   },
                      // }}
                      error={Boolean(touched.fee && errors.fee)}
                      helperText={touched.fee && errors.fee}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.fee}
                    />
                  </Grid>
                  {/* Decimals */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Decimals
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
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
                    />
                  </Grid>
                  {/* Limit Enabled */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Limit
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <FormControlLabel
                      label="Enabled Limit"
                      name="limitEnabled"
                      control={
                        <Checkbox
                          {...label}
                          onChange={() => setCheck(!check)}
                          defaultChecked={check}
                        />
                      }
                    />
                    {/* <FormControlLabel
                      label="Enabled Limit"
                      name="limitEnabled"
                      control={
                        <Checkbox
                          {...label}
                          defaultChecked={state.limitEnabled}
                          onChange={handleChange}
                        />
                      }
                    /> */}
                  </Grid>
                  {/* Limit  */}
                  {/* check */}
                  {check ? (
                    <>
                      <Grid
                        item
                        xs={4}
                        md={4}
                        display="flex"
                        alignItems="center"
                      >
                        <Typography
                          variant="subtitle1"
                          color="inherit"
                          component="div"
                        >
                          Limit Swap
                        </Typography>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <TextField
                          margin="dense"
                          id="limit"
                          name="limit"
                          label="Limit"
                          //type="number"
                          fullWidth
                          error={Boolean(touched.limit && errors.limit)}
                          helperText={touched.limit && errors.limit}
                          defaultValue={limitSwap}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>
                    </>
                  ) : null}
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

export default EditSwapModal;
