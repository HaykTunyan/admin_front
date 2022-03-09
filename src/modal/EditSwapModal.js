import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { instance } from "../services/api";
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
import ConfirmationNotice from "../components/ConfirmationNotice";

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
  minFrom,
  minTo,
  limitFrom,
  limitTo,
  limitSwap,
  limitEnabledSwap,
  fromCoin,
  toCoin,
  getSwap,
}) => {
  // hooks.
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(limitEnabledSwap);
  const [errorMes, setErrorMes] = useState([]);
  const [coinSettings, getCoinSettings] = useState([]);
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState({
    swapId: idSwap, //is required
    decimals: decimalsSwap,
    fee: feeSwap,
    min_from: minFrom,
    min_to: minTo,
    min: minSwap,
    limit_from: limitFrom,
    limit_to: limitTo,
    limit: limitSwap,
  });

  // Yup Validation.
  const editSwapSchema = Yup.object().shape({
    decimals: Yup.number().required("Field is required"),
    fee: Yup.number()
      .required("Field is required")
      .min(0, " Field can not be negative value"),
    min_from: Yup.number()
      .required("Field is required")
      .min(0, " Field can not be negative value"),
    min_to: Yup.number()
      .required("Field is required")
      .min(0, " Field can not be negative value"),
    limit_from: check
      ? Yup.number()
          .required("Field is required")
          .min(0, " Field can not be negative value")
      : Yup.number(),
    limit_to: check
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
    setSuccess(false);

    let data = {
      swapId: values.swapId, //is required
      decimals: values.decimals,
      fee: Number(values.fee),
      min_from: Number(values.min_from),
      min_to: Number(values.min_to),
      limit_from: Number(values.limit_from),
      limit_to: Number(values.limit_to),
      limitEnabled: check,
    };

    let result = Object.keys(data).filter(
      (key) =>
        (!data[key] || data[key] === "") && typeof data[key] !== "boolean"
    );

    for (let item of result) {
      delete data[`${item}`];
    }

    dispatch(editSwap(data))
      .then((data) => {
        setOpen(false);
        getSwap();
        setSuccess(true);
      })
      .catch((error) => {
        setErrorMes(error?.response?.data);
      });
  };

  const invalid = errorMes?.message;

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
    <Fragment>
      {success === true && (
        <ConfirmationNotice title="Swap Successfully Edited" />
      )}
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
                      fullWidth
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
                  {/* Min From */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Min {fromCoin.toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="min_from"
                      name="min_from"
                      label={` Min ${fromCoin.toUpperCase()}`}
                      fullWidth
                      error={Boolean(touched.min_from && errors.min_from)}
                      helperText={touched.min_from && errors.min_from}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.min_from}
                    />
                  </Grid>
                  {/* Min To */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Min {toCoin.toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="min_to"
                      name="min_to"
                      label={` Min ${toCoin.toUpperCase()}`}
                      fullWidth
                      error={Boolean(touched.min_to && errors.min_to)}
                      helperText={touched.min_to && errors.min_to}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.min_to}
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
                  </Grid>
                  {/* check */}
                  {check ? (
                    <>
                      {/* Limit From */}
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
                          Limit Swap {fromCoin.toUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <TextField
                          margin="dense"
                          id="limit_from"
                          name="limit_from"
                          label={`Limit Swap ${fromCoin.toUpperCase()} `}
                          fullWidth
                          error={Boolean(
                            touched.limit_from && errors.limit_from
                          )}
                          helperText={touched.limit_from && errors.limit_from}
                          defaultValue={limitFrom}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>
                      {/* Limit To */}
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
                          Limit Swap {toCoin.toUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <TextField
                          margin="dense"
                          id="limit_to"
                          name="limit_to"
                          label={`Limit Swap ${toCoin.toUpperCase()}  `}
                          fullWidth
                          error={Boolean(touched.limit_to && errors.limit_to)}
                          helperText={touched.limit_to && errors.limit_to}
                          defaultValue={limitTo}
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
