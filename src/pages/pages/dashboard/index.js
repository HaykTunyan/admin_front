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
import DateRange from "../../components/DateRange";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import UsersTab from "./UsersTab";
import CurrentTab from "./CurrentTab";
import UserBalanceTab from "./UserBalanceTab";
import ReceiveTab from "./ReceiveTab";
import SendTab from "./SendTab";
import ExchnageTab from "./ExchnageTab";
import SavingTab from "./SavingTab";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);

// Moke Data.
export const item = [
  {
    key: 0,
    title: "Actual",
    percent: "100/30 ",
    version: " new version ",
  },
  {
    key: 1,
    title: "Reacive",
    percent: "100/10 ",
    version: " new version ",
  },
  {
    key: 2,
    title: "Reacive",
    percent: "100/40 ",
    version: " new version ",
  },
  {
    key: 3,
    title: "Flex",
    percent: "100/20 ",
    version: " new version ",
  },
  {
    key: 4,
    title: "Savings",
    percent: "100/10 ",
    version: " new version ",
  },
  {
    key: 5,
    title: "Locked ",
    percent: "100/50 ",
    version: " first version ",
  },
];

export const rowUsers = [
  {
    id: 1,
    name: "User Number One",
    balance_coin: "13000",
  },
  {
    id: 2,
    name: "User Number Two",
    balance_coin: "12000",
  },
  {
    id: 3,
    name: "User Number Three",
    balance_coin: "14000",
  },
  {
    id: 4,
    name: "User Number Four",
    balance_coin: "15000",
  },
  {
    id: 5,
    name: "User Number Five",
    balance_coin: "16000",
  },
  {
    id: 6,
    name: "User Number Six",
    balance_coin: "16000",
  },
  {
    id: 7,
    name: "User Number Seven",
    balance_coin: "16000",
  },
];

export const rowCurrent = [
  {
    id: 1,
    name: "User Number One",
    balance_bit: "100",
    balance_coin: "13000",
  },
  {
    id: 2,
    name: "User Number Two",
    balance_bit: "330",
    balance_coin: "12000",
  },
  {
    id: 3,
    name: "User Number Three",
    balance_bit: "400",
    balance_coin: "14000",
  },
  {
    id: 4,
    name: "User Number Four",
    balance_bit: "200",
    balance_coin: "15000",
  },
  {
    id: 5,
    name: "User Number Five",
    balance_bit: "150",
    balance_coin: "16000",
  },
  {
    id: 6,
    name: "User Number Six",
    balance_bit: "530",
    balance_coin: "16000",
  },
  {
    id: 7,
    name: "User Number Seven",
    balance_bit: "320",
    balance_coin: "16000",
  },
];

export const rowReceive = [
  {
    id: 1,
    name: "User Number One",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 2,
    name: "User Number Two",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 3,
    name: "User Number Three",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 4,
    name: "User Number Four",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 5,
    name: "User Number Five",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 6,
    name: "User Number Six",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 7,
    name: "User Number Seven",
    receive_bit: "100",
    receive_coin: "13000",
  },
];

export const rowSend = [
  {
    id: 1,
    name: "User Number One",
    balance_coin: "13000",
  },
  {
    id: 2,
    name: "User Number Two",
    balance_coin: "12000",
  },
  {
    id: 3,
    name: "User Number Three",
    balance_coin: "14000",
  },
  {
    id: 4,
    name: "User Number Four",
    balance_coin: "15000",
  },
  {
    id: 5,
    name: "User Number Five",
    balance_coin: "16000",
  },
  {
    id: 6,
    name: "User Number Six",
    balance_coin: "16000",
  },
  {
    id: 7,
    name: "User Number Seven",
    balance_coin: "16000",
  },
];

export const rowUserList = [
  {
    id: 1,
    name: "User Name",
    sure_name: "User Sure Name",
    email: "emailuser@gmail.com",
  },
  {
    id: 2,
    name: "User Name",
    sure_name: "User Sure Name",
    email: "emailuser@gmail.com",
  },
  {
    id: 3,
    name: "User Name",
    sure_name: "User Sure Name",
    email: "emailuser@gmail.com",
  },
  {
    id: 4,
    name: "User Name",
    sure_name: "User Sure Name",
    email: "emailuser@gmail.com",
  },
  {
    id: 5,
    name: "User Name",
    sure_name: "User Sure Name",
    email: "emailuser@gmail.com",
  },
  {
    id: 6,
    name: "User Name",
    sure_name: "User Sure Name",
    email: "emailuser@gmail.com",
  },
  {
    id: 7,
    name: "User Name",
    sure_name: "User Sure Name",
    email: "emailuser@gmail.com",
  },
];

export const rowExchange = [
  {
    id: 1,
    name: "User Number One",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 2,
    name: "User Number Two",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 3,
    name: "User Number Three",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 4,
    name: "User Number Four",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 5,
    name: "User Number Five",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 6,
    name: "User Number Six",
    receive_bit: "100",
    receive_coin: "13000",
  },
  {
    id: 7,
    name: "User Number Seven",
    receive_bit: "100",
    receive_coin: "13000",
  },
];

export const rowLocked = [
  {
    id: 0,
    coin_name: "BIT",
    status: "active",
    bonus: "120 ",
  },
  {
    id: 1,
    coin_name: "BIT",
    status: "active",
    bonus: "120 ",
  },
  {
    id: 2,
    coin_name: "BIT",
    status: "active",
    bonus: "120 ",
  },
  {
    id: 3,
    coin_name: "BIT",
    status: "active",
    bonus: "120 ",
  },
  {
    id: 4,
    coin_name: "BIT",
    status: "active",
    bonus: "120 ",
  },
  {
    id: 5,
    coin_name: "BIT",
    status: "active",
    bonus: "120 ",
  },
  {
    id: 6,
    coin_name: "BIT",
    status: "active",
    bonus: "120 ",
  },
];

export const rowFlexible = [
  {
    id: 1,
    coin_name: "BIT",
    min_amount: "4 mounth",
    status: "active",
  },
  {
    id: 2,
    coin_name: "BIT",
    min_amount: "4 mounth",
    status: "active",
  },
  {
    id: 3,
    coin_name: "BIT",
    min_amount: "4 mounth",
    status: "active",
  },
  {
    id: 4,
    coin_name: "BIT",
    min_amount: "4 mounth",
    status: "active",
  },
  {
    id: 5,
    coin_name: "BIT",
    min_amount: "4 mounth",
    status: "active",
  },
  {
    id: 6,
    coin_name: "BIT",
    min_amount: "4 mounth",
    status: "active",
  },
];

const DashboardPage = () => {
  // Hooks
  const [panel, setPanel] = useState("1");
  const [users, getUsers] = useState("all");
  const [usersCoin, setUsersCoin] = useState("320 000");
  const [current, setCurrent] = useState("9 150 000");
  const [recevie, setRecevie] = useState("100 000");
  const [send, setSend] = useState("160 000");
  const [change, setChange] = useState("40 000");
  const [saving, setSaving] = useState("250 000");

  const ChangeSend = (event) => {
    setSend(event.target.value);
  };

  const ChangeExchange = (event) => {
    setChange(event.target.value);
  };

  const ChangeSaving = (event) => {
    setSaving(event.target.value);
  };

  const ChangeRecevie = (event) => {
    setRecevie(event.target.value);
  };

  const ChangeUsersStatus = (event) => {
    getUsers(event.target.value);
  };

  const ChangeUsersCoin = (event) => {
    setUsersCoin(event.target.value);
  };

  const ChangeCurrentBalance = (event) => {
    setCurrent(event.target.value);
  };

  const handleChange = (event, newPanel) => {
    setPanel(newPanel);
  };

  function createData(name, coin, percent) {
    return { name, coin, percent };
  }

  const rows = [
    createData("User One", 130, 30),
    createData("User Two", 430, 15),
    createData("User Three", 180, 75),
    createData("User Four", 240, 60),
    createData("User Five", 300, 50),
  ];

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
                            label="All Users"
                            onChange={ChangeUsersStatus}
                          >
                            <MenuItem value="all">All</MenuItem>
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
                        <FormControl fullWidth>
                          <InputLabel id="users-coin-label">
                            Users Coin
                          </InputLabel>
                          <Select
                            labelId="users-coin-label"
                            id="users-coin"
                            value={usersCoin}
                            label="Users Coin"
                            onChange={ChangeUsersCoin}
                            defaultValue="320 000"
                          >
                            <MenuItem value="320 000">
                              320 000
                              <span>&#36;</span>
                            </MenuItem>
                            <MenuItem value="260 000">
                              260 000
                              <span> &#8364;</span>
                            </MenuItem>
                            <MenuItem value="1000">
                              1000
                              <span> &#x20BF;</span>
                            </MenuItem>
                          </Select>
                        </FormControl>

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
                        <FormControl fullWidth>
                          <InputLabel id="current-balance-label">
                            Balance
                          </InputLabel>
                          <Select
                            labelId="current-balance-label"
                            id="current-balance"
                            value={current}
                            label="Balance"
                            onChange={ChangeCurrentBalance}
                          >
                            <MenuItem value="9 150 000">
                              9 150 000
                              <span>&#36;</span>
                            </MenuItem>
                            <MenuItem value="8 400 000">
                              8 400 000
                              <span> &#8364;</span>
                            </MenuItem>
                            <MenuItem value="6000">
                              6000
                              <span> &#x20BF;</span>
                            </MenuItem>
                          </Select>
                        </FormControl>
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
                        <FormControl fullWidth>
                          <InputLabel id="recevie-coin-label">
                            Receive
                          </InputLabel>
                          <Select
                            labelId="receive-coin-label"
                            id="receive-coin"
                            value={recevie}
                            label="Receive"
                            onChange={ChangeRecevie}
                          >
                            <MenuItem value="100 000">
                              100 000
                              <span>&#36;</span>
                            </MenuItem>
                            <MenuItem value="200 000">
                              200 000
                              <span> &#8364;</span>
                            </MenuItem>
                            <MenuItem value="500">
                              500
                              <span> &#x20BF;</span>
                            </MenuItem>
                          </Select>
                        </FormControl>

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
                        <FormControl fullWidth>
                          <InputLabel id="send-coin-label">Send</InputLabel>
                          <Select
                            labelId="send-coin-label"
                            id="send-coin"
                            value={send}
                            label="Send"
                            onChange={ChangeSend}
                          >
                            <MenuItem value="160 000">
                              160 000
                              <span>&#36;</span>
                            </MenuItem>
                            <MenuItem value="130 000">
                              130 000
                              <span> &#8364;</span>
                            </MenuItem>
                            <MenuItem value="570">
                              570
                              <span> &#x20BF;</span>
                            </MenuItem>
                          </Select>
                        </FormControl>
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
                            <MenuItem value="300">
                              300
                              <span> &#x20BF;</span>
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
                  <UserBalanceTab rowUsers={rowUsers} />
                </Grid>
              </TabPanel>
              {/* Panel Three */}
              <TabPanel value="3">
                <Grid item xs={12}>
                  <CurrentTab rowCurrent={rowCurrent} />
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
