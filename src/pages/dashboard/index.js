import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  CardContent,
  Card as MuiCard,
  Box,
  Tab,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { useSelector } from "react-redux";
import DateRange from "../../components/date-picker/DateRange";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import UsersTab from "./UsersTab";
import CurrentTab from "./BalanceTab";
import TotalUsers from "./TotalUsers";
import ReceiveTab from "./ReceiveTab";
import SendTab from "./SendTab";
import ExchnageTab from "./ExchnageTab";
import SavingTab from "./SavingTab";
import { DollarSign, User } from "react-feather";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);

const DashboardPage = () => {
  // Hooks
  const [panel, setPanel] = useState("1");
  const [users, getUsers] = useState("all");
  const [send, setSend] = useState("160 000");
  const [change, setChange] = useState("40 000");
  const [saving, setSaving] = useState("250 000");

  const totlalDashboard = useSelector((state) => state.dashboard);

  const rowUserList = totlalDashboard.rowUserList;
  const rowReceive = totlalDashboard.rowReceive;
  const rowUsers = totlalDashboard.totalUsers;
  const rowBalance = totlalDashboard.rowBalance;
  const rowSend = totlalDashboard.rowSend;
  const rowExchange = totlalDashboard.rowExchange;
  const rowLocked = totlalDashboard.rowLocked;
  const rowFlexible = totlalDashboard.rowFlexible;

  const ChangeExchange = (event) => {
    setChange(event.target.value);
  };

  const ChangeSaving = (event) => {
    setSaving(event.target.value);
  };

  const ChangeUsersStatus = (event) => {
    getUsers(event.target.value);
  };

  const handleChange = (event, newPanel) => {
    setPanel(newPanel);
  };

  return (
    <Fragment>
      <Helmet title="Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container justifyContent="space-between">
        <Card mb={6}>
          <CardContent flex>
            <DateRange />
          </CardContent>
        </Card>
      </Grid>
      <Divider my={6} />
      <Grid xs={12}>
        <Grid item>
          <Box sx={{ width: "100%" }}>
            <TabContext value={panel}>
              <Box sx={{ width: "100%" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {/* Tab One All Users */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <FormControl fullWidth>
                          <InputLabel id="users-all-label">
                            All Users
                          </InputLabel>
                          <Select
                            labelId="users-all-label"
                            id="users-all"
                            value={users}
                            defaultValue="all"
                            label="All Users"
                            onChange={ChangeUsersStatus}
                          >
                            <MenuItem value="all"></MenuItem>
                            <MenuItem value="verified">verified </MenuItem>
                            <MenuItem value="unverifyed">unverified </MenuItem>
                          </Select>
                        </FormControl>
                        <Divider my={2} />
                        <Typography fontWeight="bold" children="All Users" />
                      </Box>
                    }
                    value="1"
                    style={{ width: "14.285%" }}
                  />
                  {/*  Tab Two Total Users */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <Box display="flex" justifyContent="space-around">
                          <Typography fontWeight="bold">32 000 000</Typography>
                          <User size={22} />
                        </Box>
                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Total Users" />
                      </Box>
                    }
                    value="2"
                    style={{ width: "14.285%" }}
                  />
                  {/* Tab Three Balance */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <Box display="flex" justifyContent="space-around">
                          <Typography fontWeight="bold">12 200 000</Typography>
                          <DollarSign small={22} />
                        </Box>
                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Balance" />
                      </Box>
                    }
                    value="3"
                    style={{ width: "14.285%" }}
                  />
                  {/* Tab Four Receive */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <Box display="flex" justifyContent="space-around">
                          <Typography fontWeight="bold">9 150 000</Typography>
                          <DollarSign small={22} />
                        </Box>

                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Receive" />
                      </Box>
                    }
                    value="4"
                    style={{ width: "14.285%" }}
                  />
                  {/* Tab Five Send */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <Box display="flex" justifyContent="space-around">
                          <Typography fontWeight="bold">16 200 000</Typography>
                          <DollarSign small={22} />
                        </Box>
                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Send" />
                      </Box>
                    }
                    value="5"
                    style={{ width: "14.285%" }}
                  />
                  {/* Tab Six Exchange */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <FormControl fullWidth>
                          <InputLabel id="exchange-coin-label">
                            ExChange
                          </InputLabel>
                          <Select
                            labelId="exchange-coin-label"
                            id="exchange-coin"
                            value={change}
                            label="Exchange"
                            onChange={ChangeExchange}
                          >
                            <MenuItem value="40 000">
                              40 000
                              <span>&#36;</span>
                            </MenuItem>
                            <MenuItem value="30 000">
                              30 000
                              <span> &#8364;</span>
                            </MenuItem>
                          </Select>
                        </FormControl>

                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Exchange" />
                      </Box>
                    }
                    value="6"
                    style={{ width: "14.285%" }}
                  />
                  {/* Tab Seven Amount */}
                  <Tab
                    label={
                      <Box flex width="100%">
                        <FormControl fullWidth>
                          <InputLabel id="saving-coin-label">Saving</InputLabel>
                          <Select
                            labelId="saving-coin-label"
                            id="saving-coin"
                            value={saving}
                            label="Saving"
                            onChange={ChangeSaving}
                          >
                            <MenuItem value="250 000">
                              250 000
                              <span>&#36;</span>
                            </MenuItem>
                            <MenuItem value="200 000">
                              200 000
                              <span> &#8364;</span>
                            </MenuItem>
                            <MenuItem value="800">
                              800
                              <span> &#x20BF;</span>
                            </MenuItem>
                          </Select>
                        </FormControl>
                        <Divider my={2} />
                        <Typography fontWeight="bold" children="Saving" />
                      </Box>
                    }
                    value="7"
                    style={{ width: "14.285%" }}
                  />
                </TabList>
              </Box>
              {/* Panel One */}
              <TabPanel value="1">
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <UsersTab rowUserList={rowUserList} />
                  </Grid>
                </Grid>
              </TabPanel>
              {/* Panel Two */}
              <TabPanel value="2">
                <Grid item xs={12}>
                  <TotalUsers rowUsers={rowUsers} />
                </Grid>
              </TabPanel>
              {/* Panel Three */}
              <TabPanel value="3">
                <Grid item xs={12}>
                  <CurrentTab rowBalance={rowBalance} />
                </Grid>
              </TabPanel>
              {/* Panel Four */}
              <TabPanel value="4">
                <Grid item xs={12}>
                  <ReceiveTab rowReceive={rowReceive} />
                </Grid>
              </TabPanel>
              {/* Panel Five */}
              <TabPanel value="5">
                <Grid item xs={12}>
                  <SendTab rowSend={rowSend} />
                </Grid>
              </TabPanel>
              {/* Panel Six */}
              <TabPanel value="6">
                <Grid item xs={12}>
                  <ExchnageTab rowExchange={rowExchange} />
                </Grid>
              </TabPanel>
              {/* Panel Seven */}
              <TabPanel value="7">
                <Grid item xs={12}>
                  <SavingTab rowLocked={rowLocked} rowFlexible={rowFlexible} />
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DashboardPage;
