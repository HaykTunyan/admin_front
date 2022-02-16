import React, { useState } from "react";
import styled from "styled-components/macro";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { spacing } from "@material-ui/system";
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
  Alert as MuiAlert,
} from "@material-ui/core";
import { editAffiliateExchanges_req } from "../api/userExchangesAPI";

// Spacing.
const Spacer = styled.div(spacing);
const Alert = styled(MuiAlert)(spacing);

const EditAffiliateSwap = ({ userId, exchange, getUserExchanges }) => {
  // hooks.
  const [open, setOpen] = useState(false);
  const [errorMes, setErrorMes] = useState([]);
  const [state, setState] = useState({
    amount: "",
  });

  // Yup Validation.
  const AddSwapSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Field is required")
      .min(0, "Field can not be negative value"),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Error Messages.
  const invalid = errorMes?.message;

  // Form Submit.
  async function editExchange(values) {
    let data = {
      userId: userId,
      transactionId: exchange.exchange_id,
      amount: values.amount,
    };

    console.log("EDIT EXCHANGE DATA ==>", data);

    try {
      const response = await editAffiliateExchanges_req(data);
      if (response) {
        console.log("EDIT AFFILIATE EXCHANGES RESPONSE ==>", response);
        getUserExchanges();
        setOpen(false);
      }
    } catch (e) {
      console.log("EDIT AFFILIATE EXCHANGES ERROR==>", e.response);
    }
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            Edit Exchange
          </Typography>
        </DialogTitle>
        <Divider my={2} />
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            // initialForms={state}
            validateOnChange={true}
            validationSchema={AddSwapSchema}
            onSubmit={editExchange}
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
                  {/* From Wallet */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      From Wallet
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="fromWallet"
                      name="fromWallet"
                      fullWidth
                      value={exchange.coin_from_name}
                    />
                  </Grid>
                  {/* To Wallet */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      To Wallet
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="toWallet"
                      name="toWallet"
                      fullWidth
                      value={exchange.coin_to_name}
                    />
                  </Grid>
                  {/* Amount */}
                  <Grid item xs={4} md={4} display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="div"
                    >
                      Amount
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <TextField
                      margin="dense"
                      id="amount"
                      name="amount"
                      label="Amount"
                      type="number"
                      fullWidth
                      InputProps={{
                        inputProps: {
                          min: 0,
                        },
                      }}
                      error={Boolean(touched.amount && errors.amount)}
                      helperText={touched.amount && errors.amount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={exchange.amount_sent}
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
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Edit Exchange
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

export default EditAffiliateSwap;
