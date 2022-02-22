import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
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
  Alert as MuiAlert,
} from "@material-ui/core";
import { assigneReferralUser } from "../redux/actions/referral";
import ConfirmationNotice from "../components/ConfirmationNotice";

// Spacing.
const TextField = styled(MuiTextField)(spacing);
const Alert = styled(MuiAlert)(spacing);

// Validation Schema.
const addAdminValidation = Yup.object().shape({
  user_id: Yup.number().required("Id is requrired"),
});

const AssigneReferral = ({ id, getUnassigned }) => {
  //  hooks.
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [messageError, setMessageError] = useState([]);
  const [success, setSuccess] = useState(false);

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
    dispatch(assigneReferralUser(values))
      .then((data) => {
        setSuccess(false);
        if (data.success) {
          setOpen(false);
        }
        setSuccess(true);
        getUnassigned();
      })
      .catch((error) => {
        setMessageError(error?.response?.data);
      });
  };
  const invalid = messageError?.message;

  return (
    <Fragment>
      {success === true && (
        <ConfirmationNotice opening={true} title="Assign User success" />
      )}
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Assign
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
    </Fragment>
  );
};

export default AssigneReferral;
