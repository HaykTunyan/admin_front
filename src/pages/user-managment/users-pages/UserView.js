import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { useNavigate, useLocation } from "react-router-dom";
import { instance } from "../../../services/api";
import moment from "moment";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  IconButton,
  Grid as MuiGrid,
  Card as MuiCard,
  CardContent,
  Avatar as MuiAvatar,
  Tab,
  Box,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { useSelector } from "react-redux";
import { ArrowLeft } from "react-feather";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Wallets from "./userstab/Wallets";
import Deposits from "./userstab/Deposits";
import Exchange from "./userstab/Exchange";
import SendTable from "../../transactions/SendTable";
import Notification from "./userstab/Notification";
import Activity from "./userstab/Activity";
import SettingsKYC from "./userstab/SettingsKYC";
import UserSettings from "./userstab/UserSettings";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const Avatar = styled(MuiAvatar)``;

const UserView = (state) => {
  //  hooks.
  const navigate = useNavigate();
  const [tab, setTab] = useState("1");
  const [profile, getProfile] = useState([]);
  const location = useLocation();
  const totlalDashboard = useSelector((state) => state.dashboard);
  const rowExchange = totlalDashboard?.rowExchange;
  const profileId = location?.state;
  const userId = profileId?.id;

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  // Get Req.
  const getProfile_req = () => {
    return instance
      .get(`/admin/user/${userId}`, { mode: "no-cors" })
      .then((data) => {
        getProfile(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  // useEffect.
  useEffect(() => {
    getProfile_req();
  }, []);

  return (
    <Fragment>
      <Helmet title="User Info" />

      <Grid flex justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            User Information
          </Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label="left" onClick={() => navigate("/users")}>
            <ArrowLeft />
          </IconButton>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container>
        <Grid xs={12} item>
          <Card mb={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User
              </Typography>
              <Spacer mb={4} />

              <Grid container direction="row" alignItems="center" mb={2}>
                <Grid item item sx={6} md={2}>
                  <Avatar sx={{ width: 22, height: 22 }}>A</Avatar>
                </Grid>
                <Spacer mx={4} />
                <Grid item item sx={6} md={2}>
                  <Typography variant="subtitle1">
                    {" "}
                    {profile?.userAccountInfo?.full_name}{" "}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container direction="row" alignItems="center" mb={2}>
                <Grid item item sx={6} md={2}>
                  <Typography variant="inherit" fontWeight="bold">
                    Date Registration
                  </Typography>
                </Grid>
                <Spacer mx={4} />
                <Grid item item sx={6} md={2}>
                  <Typography variant="subtitle1">
                    {moment(profile?.userAccountInfo?.created_date).format(
                      "DD/MM/YYYY HH:mm "
                    )}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center" mb={2}>
                <Grid item item sx={6} md={2}>
                  <Typography variant="inherit" fontWeight="bold">
                    Referral
                  </Typography>
                </Grid>
                <Spacer mx={4} />
                <Grid item item sx={6} md={2}>
                  <Typography variant="subtitle1"> 1000 </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center" mb={2}>
                <Grid item item sx={6} md={2}>
                  <Typography variant="inherit" fontWeight="bold">
                    Locetion
                  </Typography>
                </Grid>
                <Spacer mx={4} />
                <Grid item item sx={6} md={2}>
                  <Typography variant="subtitle1"> Yerevan </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center" mb={2}>
                <Grid item item sx={6} md={2}>
                  <Typography variant="inherit" fontWeight="bold">
                    User ID
                  </Typography>
                </Grid>
                <Spacer mx={4} />
                <Grid item item sx={6} md={2}>
                  <Typography variant="subtitle1">
                    {profile?.userAccountInfo?.id}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} item></Grid>
      </Grid>

      <Grid container>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChangeTab}
                aria-label="lab API tabs example"
              >
                <Tab label="Settings" value="1" />
                <Tab label="Wallets" value="2" />
                <Tab label="Deposits" value="3" />
                <Tab label="Exchange" value="4" />
                <Tab label="Settings KYC" value="5" />
                <Tab label="Transaction history" value="6" />
                <Tab label="Notifications" value="7" />
                <Tab label="Account Activity" value="8" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Spacer mt={4} />

              <Grid item>
                <UserSettings />
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Spacer mt={4} />
              <Grid item>
                <Wallets />
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <Spacer mt={4} />
              <Grid item>
                <Deposits />
              </Grid>
            </TabPanel>
            <TabPanel value="4">
              <Spacer mt={4} />
              <Grid item>
                <Exchange rowExchange={rowExchange} />
              </Grid>
            </TabPanel>
            <TabPanel value="5">
              <Spacer mt={4} />
              <Grid item>
                <SettingsKYC />
              </Grid>
            </TabPanel>
            <TabPanel value="6">
              <Spacer mt={4} />
              <Grid item>
                <SendTable />
              </Grid>
            </TabPanel>
            <TabPanel value="7">
              <Spacer mt={4} />
              <Grid item>
                <Notification />
              </Grid>
            </TabPanel>
            <TabPanel value="8">
              <Spacer mt={4} />
              <Grid item>
                <Activity />
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Fragment>
  );
};

export default UserView;
