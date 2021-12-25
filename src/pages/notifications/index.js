import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Divider as MuiDivider,
  Grid,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CardActions,
  FormControl as MuiFormControl,
  TextField as MuiTextField,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddNotificationModal from "../../modal/AddNotificationModal";
import SendNotificationModal from "../../modal/SendNotificationModal";
import {
  getNotifTemplates_req,
  sendNotification_req,
} from "../../api/notificationsAPI";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);

const Notifications = () => {
  const [selectNoficate, setSelectNotificate] = useState("1");
  const [notifList, setNotifList] = useState([]);

  const handleChange = (event) => {
    setSelectNotificate(event.target.value);
  };

  async function getNotifTemplates() {
    try {
      const response = await getNotifTemplates_req();
      if (response) {
        console.log("GETTING NOTIF TEMPLATES RESPONSE ==>", response);
        setNotifList(response.templates);
      }
    } catch (e) {
      console.log("GETTING NOTIF TEMPLATES ERROR ==>", e.response);
    }
  }

  useEffect(() => {
    getNotifTemplates();
  }, []);

  return (
    <Fragment>
      <Helmet title="Notification" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Notification
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spasing={6}>
        <Grid item xs={12}>
          <Grid display="flex" justifyContent="end" spacing={6}>
            <AddNotificationModal />
          </Grid>
          <Divider my={5} />
          <Grid container spacing={5}>
            {notifList.map((item) => (
              <Grid item md={4} mb={1}>
                <Card
                  variant="outlined"
                  sx={{
                    height: "80px",
                  }}
                >
                  <CardContent my={3}>
                    <CardActions sx={{ justifyContent: "space-between" }}>
                      <Typography variant="h5" component="h2">
                        {item.title}
                      </Typography>
                      <Box sx={{ alignSelf: "flex-end" }}>
                        <SendNotificationModal item={item} />
                      </Box>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Notifications;
