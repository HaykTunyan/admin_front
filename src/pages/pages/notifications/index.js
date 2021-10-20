import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Divider as MuiDivider,
  Grid,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  FormControl as MuiFormControl,
  TextField as MuiTextField,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddNotificationModal from "../../modal/AddNotificationModal";

// Styele Component.
const Divider = styled(MuiDivider)(spacing);

const Card = styled(MuiCard)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const Notifications = () => {
  const [selectNoficate, setSelectNotificate] = useState("1");

  const handleChange = (event) => {
    setSelectNotificate(event.target.value);
  };

  return (
    <Fragment>
      <Helmet title="Notification" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Notification
          </Typography>
        </Grid>
        <Grid item>
          <AddNotificationModal />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spasing={6}>
        <Grid item xs={12}>
          <Card md={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New Notification
              </Typography>
              <Divider my={5} />

              <Grid container spacing={6}>
                <Grid item md={6}>
                  <TextField
                    id="selectIssuer"
                    label="Seleect Issuer"
                    defaultValue="Issuer"
                    variant="outlined"
                    fullWidth
                    my={3}
                  />
                  <TextField
                    id="titleNotification"
                    label="Title Notification"
                    defaultValue="titleNotification"
                    variant="outlined"
                    fullWidth
                    my={3}
                  />
                  {/*  */}
                  <FormControl fullWidth my={3} variant="outlined">
                    <Select
                      value={selectNoficate}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="1">Arrest After Registrations</MenuItem>
                      <MenuItem value="2">Half Translation</MenuItem>
                      <MenuItem value="3">Correct Translation</MenuItem>
                      <MenuItem value="4">Deviated KYC</MenuItem>
                      <MenuItem value="5">Print KYC</MenuItem>
                    </Select>
                  </FormControl>
                  {/*  */}

                  <FormControl fullWidth my={3} variant="outlined">
                    <TextField
                      label="Notification Info"
                      id="info"
                      multiline={true}
                      rows={3}
                      maxRows={4}
                      variant="outlined"
                      defaultValue=" Send Notification for Users "
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Button variant="contained" color="primary">
                New Notification
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Notifications;
