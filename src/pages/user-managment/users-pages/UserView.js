import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  IconButton,
  Grid as MuiGrid,
  Alert as MuiAlert,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  TextField as MuiTextField,
  Avatar as MuiAvatar,
  Tab,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Box,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { useSelector } from "react-redux";
import { ArrowLeft } from "react-feather";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { Eye, EyeOff } from "react-feather";
import Wallets from "./userstab/Wallets";
import Deposits from "./userstab/Deposits";
import Exchange from "./userstab/Exchange";
import SendTable from "../../transactions/SendTable";
import Notification from "./userstab/Notification";
import Activity from "./userstab/Activity";
import SettingsKYC from "./userstab/SettingsKYC";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const Avatar = styled(MuiAvatar)``;
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const UserView = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("1");

  const totlalDashboard = useSelector((state) => state.dashboard);
  const rowExchange = totlalDashboard.rowExchange;

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                  <Typography variant="subtitle1"> User Name </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center" mb={2}>
                <Grid item sx={6} md={2}>
                  <Typography variant="inherit" fontWeight="bold">
                    Phone
                  </Typography>
                </Grid>
                <Spacer mx={4} />
                <Grid item item sx={6} md={2}>
                  <Typography variant="subtitle1">+11 11 00 00 00</Typography>
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
                  <Typography variant="subtitle1"> 01/09/21 </Typography>
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
                <Card>
                  <CardContent p={5}>
                    <Grid container>
                      <Grid item xs={12} md={3}>
                        <Typography>Admin Password</Typography>
                        <Spacer mt={5} />
                        <FormControl sx={{ m: 1 }} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {values.showPassword ? <EyeOff /> : <Eye />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography>Sending Admin</Typography>
                        <Spacer mt={5} />
                        <FormControl fullWidth>
                          <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                          />
                        </FormControl>
                        <Spacer mt={5} />
                        <Button variant="contained">Send</Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
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
