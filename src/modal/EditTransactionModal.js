import React, { useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  Button,
  Paper,
  TextField as MuiTextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider as MuiDivider,
  Grid,
} from "@material-ui/core";
import { Edit2 } from "react-feather";
import { editAdmin } from "../redux/actions/user-managment";
import { editCoin } from "../redux/actions/settings";

// Spacing.
const TextField = styled(MuiTextField)(spacing);
const Spacer = styled.div(spacing);
const Divider = styled(MuiDivider)(spacing);

// validation Schema.
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .min(8, "Must be at least 8 characters")
    .max(255)
    .required("Email is requried"),
  name: Yup.string().required("Name is requrired"),
  performance: Yup.string()
    .length("Min Selected One Item")
    .required(" Performance is required "),
  password: Yup.string()
    .min(6, " Must be a last 6 characters ")
    .max(255, " Must be a last 355 characters")
    .required(" Passowrd is required "),
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
  suspendTransaction,
  autoUpdate,
}) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    coinId: coinId, //is id on list
    name: name,
    coin: coin,
    minSendAmount: minSendAmount,
    decimals: decimals,
    fee: fee,
    price: price,
    priceChange: priceChange,
    priceChangePercent: priceChangePercent,
    suspendTransaction: suspendTransaction,
    autoUpdate: autoUpdate,
  });

  const label = { inputProps: { "aria-label": "Checkbox" } };
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      ...state,
    },
    initialForm: { state },
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      dispatch(editCoin(values)).then();
      //   dispatch(editAdmin(values)).then();
      //   setOpen(false);
    },
  });

  return (
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <Edit2 />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Coin</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ width: "100%", marginRight: "10px" }}>
                <TextField
                  onChange={formik.handleChange}
                  defaultValue={state.name}
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
              </Box>
              <Box sx={{ width: "100%", marginLeft: "10px" }}>
                <TextField
                  onChange={formik.handleChange}
                  defaultValue={state.coin}
                  margin="dense"
                  id="coin"
                  label="Coin"
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
                  onChange={formik.handleChange}
                  defaultValue={state.minSendAmount}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="minSendAmount"
                  label="Min Send Amount"
                  type="number"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
              </Box>
              <Box sx={{ width: "100%", marginX: "5px" }}>
                <TextField
                  onChange={formik.handleChange}
                  defaultValue={state.decimals}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  onChange={formik.handleChange}
                  defaultValue={state.fee}
                  margin="dense"
                  id="fee"
                  label="Fee"
                  type="number"
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
                  onChange={formik.handleChange}
                  defaultValue={state.price}
                  id="price"
                  label="Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
              </Box>
              <Box sx={{ width: "100%", marginX: "5px" }}>
                <TextField
                  onChange={formik.handleChange}
                  defaultValue={state.priceChange}
                  margin="dense"
                  id="priceChange"
                  label="Price Change"
                  type="number"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
              </Box>
              <Box sx={{ width: "100%", marginLeft: "5px" }}>
                <TextField
                  onChange={formik.handleChange}
                  defaultValue={state.priceChangePercent}
                  margin="dense"
                  id="priceChangePercent"
                  label="Price Change Percent"
                  type="number"
                  variant="outlined"
                  fullWidth
                  my={8}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <FormControlLabel
                label="Suspend Transaction"
                name="suspendTransaction"
                control={
                  <Checkbox
                    {...label}
                    defaultChecked={state.suspendTransaction}
                    onChange={formik.handleChange}
                  />
                }
              />
              <FormControlLabel
                label="Auto Update"
                name="autoUpdate"
                control={
                  <Checkbox
                    {...label}
                    defaultChecked={state.autoUpdate}
                    onChange={formik.handleChange}
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
              <Button sx={{ width: "120px" }} type="submit" variant="contained">
                Save Coin
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTransactionModal;
