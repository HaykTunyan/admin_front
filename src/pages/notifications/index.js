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
  TablePagination,
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChange = (event) => {
    setSelectNotificate(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    getNotifTemplates(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  async function getNotifTemplates(page, rowsPerPage) {
    try {
      const response = await getNotifTemplates_req(page, rowsPerPage);
      if (response) {
        console.log("GETTING NOTIF TEMPLATES RESPONSE ==>", response);
        setNotifList(response);
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
            <AddNotificationModal getTemplates={getNotifTemplates} />
          </Grid>
          <Divider my={5} />
          <Grid container spacing={5}>
            {notifList?.templates &&
              notifList?.templates.map((item) => (
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
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
          <Grid spacing={5}>
            <Box
              mt={4}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              {/* Pagination */}
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={notifList?.allCount}
                rowsPerPage={notifList?.limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Notifications;
