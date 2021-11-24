import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import {
  Divider as MuiDivider,
  Grid,
  Typography,
  Box,
  Tab,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import AdminManager from "./AdminManager";
import KYCSettings from "./KYC";
import TransactionsSettings from "./TransactionsSettings";
import SavingsSetting from "./SavingsSettings/SavingsSetting";
import SwapSettings from "./SwapSettings";
import UserSettings from "./User-Settings";

// Spacing.
const Divider = styled(MuiDivider)(spacing);

const Settings = () => {
  const [value, setValue] = useState("2");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Helmet title="Settings" />

      <Typography variant="h3" gutterBottom display="inline">
        Settings
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6} mt={6}>
        <Grid item xs={12}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {/* <Tab label="Admin Managment" value="1" /> */}
                  <Tab label="KYC Settings" value="2" />
                  <Tab label="Transactions Settings" value="3" />
                  <Tab label="Savings Setting" value="4" />
                  <Tab label="Swap Settings" value="5" />
                  <Tab label="User Settings" value="6" />
                </TabList>
              </Box>
              {/* <TabPanel value="1" mb={5}>
                <AdminManager />
              </TabPanel> */}
              <TabPanel value="2" mb={5}>
                <KYCSettings />
              </TabPanel>
              <TabPanel value="3" mb={5}>
                <TransactionsSettings />
              </TabPanel>
              <TabPanel value="4" mb={5}>
                <SavingsSetting />
              </TabPanel>
              <TabPanel value="5" mb={5}>
                <SwapSettings />
              </TabPanel>
              <TabPanel value="6" mb={6}>
                <UserSettings />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Settings;
