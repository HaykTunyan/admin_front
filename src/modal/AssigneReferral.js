import React, { useState } from "react";
import styled from "styled-components/macro";
import { UserPlus } from "react-feather";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { spacing } from "@material-ui/system";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField as MuiTextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Alert as MuiAlert,
} from "@material-ui/core";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import { assigneReferralUser } from "../redux/actions/referral";

const style = {
  width: 360,
  bgcolor: "background.paper",
};

// Spacing.
const TextField = styled(MuiTextField)(spacing);
const Alert = styled(MuiAlert)(spacing);

// Validation Schema.
const addAdminValidation = Yup.object().shape({
  user_id: Yup.number().required("Id is requrired"),
});

const AssigneReferral = ({ id }) => {
  //  hooks.
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [messageError, setMessageError] = useState([]);

  const [state, setState] = useState({
    user_id: "",
    referral_id: id,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    console.log("values", values);
    dispatch(assigneReferralUser(values))
      .then((data) => {
        if (data.success) {
          console.log(" data success ", data.success);
          setOpen(false);
        }
      })
      .catch((error) => {
        console.log("error", error?.message);
        setMessageError(error?.response?.data);
      });
  };
  const invalid = messageError?.message;

  console.log("messageError", messageError);

  return (
    <>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Assaign
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">
          Information for Referral User
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              ...state,
            }}
            initialForms={state}
            validationSchema={addAdminValidation}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                {messageError.message && (
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
                    {messageError && (
                      <Alert my={2} severity="error">
                        {messageError.message}
                      </Alert>
                    )}
                  </>
                )}
                <TextField
                  margin="dense"
                  id="user_id"
                  defaultValue={state.user_id}
                  error={Boolean(touched.user_id && errors.user_id)}
                  helperText={touched.user_id && errors.user_id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="User ID"
                  type="number"
                  variant="outlined"
                  fullWidth
                  my={8}
                />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    onClick={handleClose}
                    sx={{ width: "120px" }}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Box mx={3} />
                  <Button
                    sx={{ width: "120px" }}
                    variant="contained"
                    type="submit"
                  >
                    Send
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

export default AssigneReferral;
