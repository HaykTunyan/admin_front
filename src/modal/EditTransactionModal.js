import React, { useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField as MuiTextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  FormControlLabel,
  Checkbox,
  Divider as MuiDivider,
} from "@material-ui/core";
import { Edit2 } from "react-feather";
import { editCoin } from "../redux/actions/settings";

// Spacing.
const TextField = styled(MuiTextField)(spacing);
const Divider = styled(MuiDivider)(spacing);

// validation Schema.
const editTransactionSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  minSendAmount: Yup.number()
    .moreThan(0, "Min send amount must be greater than 0.")
    .required("Min send amount is required."),
  decimals: Yup.number()
    .moreThan(0, "Decimals must be greater than 0.")
    .required("decimals is required."),
  fee: Yup.number()
    .moreThan(0, "Fee must be greater than 0.")
    .required("fee is required."),
  price: Yup.number()
    .moreThan(0, "Price must be greater than 0.")
    .required("Price is required."),
  priceChange: Yup.number()
    .moreThan(0, "Price Change must be greater than 0.")
    .required("Price Change is required."),
  priceChangePercent: Yup.number()
    .moreThan(0, "Price Change Percent must be greater than 0.")
    .required("Price Change Percent is required."),
});

const EditTransactionModal = ({
  coinId,
  name,
  coin,
  minSendAmount,
  decimals,
  fee,
  price,
  priceChange,
  priceChangePercent,
  suspendSendTransaction,
  suspendReceiveTransaction,
  getCoins,
}) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    coinId: coinId, //is id on list
    name: name,
    minSendAmount: minSendAmount,
    decimals: decimals,
    fee: fee,
    price: price,
    priceChange: priceChange,
    priceChangePercent: priceChangePercent,
  });
  const [suspendSend, setSuspendSend] = useState(suspendSendTransaction);
  const [suspendReceive, setSuspendReceive] = useState(
    suspendReceiveTransaction
  );

  const label = { inputProps: { "aria-label": "Checkbox" } };
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReceiveChange = () => {
    setSuspendReceive(!suspendReceive);
  };

  const handleSendChange = () => {
    setSuspendSend(!suspendSend);
  };

  const handleSubmit = (values) => {
    let data = {
      coin_id: Number(values.coinId), // is required
      name: values.name,
      minSendAmount: Number(values.minSendAmount),
      decimals: Number(values.decimals),
      fee: Number(values.fee),
      price: Number(values.price),
      priceChange: Number(values.priceChange),
      priceChangePercent: Number(values.priceChangePercent),
      suspendSendTransaction: suspendSend,
      suspendReceiveTransaction: suspendReceive,
    };

    let result = Object.keys(data).filter(
      (key) =>
        (!data[key] || data[key] === "") && typeof data[key] !== "boolean"
    );

    for (let item of result) {
      delete data[`${item}`];
    }
    console.log("Data =>", data);

    dispatch(editCoin(data)).then((data) => {
      if (data.success) {
        setOpen(false);
      }
      getCoins();
    });
  };

  return (
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <Edit2 />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Coin</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            initialForms={state}
            validateOnChange={true}
            validationSchema={editTransactionSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ width: "100%", marginRight: "10px" }}>
                    <TextField
                      defaultValue={state.name}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      margin="dense"
                      id="name"
                      label="Name"
                      type="text"
                      variant="outlined"
                      fullWidth
                      my={8}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex ", justifyContent: "space-between" }}>
                  <Box sx={{ width: "100%", marginRight: "5px" }}>
                    <TextField
                      margin="dense"
                      error={Boolean(
                        touched.minSendAmount && errors.minSendAmount
                      )}
                      helperText={touched.minSendAmount && errors.minSendAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.minSendAmount}
                      id="minSendAmount"
                      label="Min Send Amount"
                      variant="outlined"
                      fullWidth
                      my={8}
                    />
                  </Box>
                  <Box sx={{ width: "100%", marginX: "5px" }}>
                    <TextField
                      error={Boolean(touched.decimals && errors.decimals)}
                      helperText={touched.decimals && errors.decimals}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.decimals}
                      margin="dense"
                      id="decimals"
                      label="Decimals"
                      type="number"
                      variant="outlined"
                      fullWidth
                      my={8}
                    />
                  </Box>
                  <Box sx={{ width: "100%", marginLeft: "5px" }}>
                    <TextField
                      error={Boolean(touched.fee && errors.fee)}
                      helperText={touched.fee && errors.fee}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.fee}
                      margin="dense"
                      id="fee"
                      label="Fee"
                      variant="outlined"
                      fullWidth
                      my={8}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ width: "100%", marginRight: "5px" }}>
                    <TextField
                      margin="dense"
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.price}
                      id="price"
                      label="Price"
                      variant="outlined"
                      fullWidth
                      my={8}
                    />
                  </Box>
                  <Box sx={{ width: "100%", marginX: "5px" }}>
                    <TextField
                      error={Boolean(touched.priceChange && errors.priceChange)}
                      helperText={touched.priceChange && errors.priceChange}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.priceChange}
                      margin="dense"
                      id="priceChange"
                      label="Price Change"
                      variant="outlined"
                      fullWidth
                      my={8}
                    />
                  </Box>
                  <Box sx={{ width: "100%", marginLeft: "5px" }}>
                    <TextField
                      error={Boolean(
                        touched.priceChangePercent && errors.priceChangePercent
                      )}
                      helperText={
                        touched.priceChangePercent && errors.priceChangePercent
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={state.priceChangePercent}
                      margin="dense"
                      id="priceChangePercent"
                      label="Price Change Percent"
                      variant="outlined"
                      fullWidth
                      my={8}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <FormControlLabel
                    label="Suspend Receive"
                    name="suspendReceiveTransaction"
                    control={
                      <Checkbox
                        {...label}
                        defaultChecked={suspendReceive}
                        onChange={handleReceiveChange}
                      />
                    }
                  />
                  <FormControlLabel
                    label="Suspend Send"
                    name="suspendSendTransaction"
                    control={
                      <Checkbox
                        {...label}
                        defaultChecked={suspendSend}
                        onChange={handleSendChange}
                      />
                    }
                  />
                </Box>
                <Divider my={2} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "10px",
                  }}
                >
                  <Button onClick={handleClose} sx={{ width: "120px" }}>
                    Cancel
                  </Button>
                  <Box mx={3} />
                  <Button
                    sx={{ width: "120px" }}
                    type="submit"
                    variant="contained"
                  >
                    Save Coin
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTransactionModal;
