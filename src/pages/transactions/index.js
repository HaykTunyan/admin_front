import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid, Typography, Box, Tab } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import SendTable from "./SendTable";
import SwapTable from "./SwapTable";
import SavingsTable from "./SavingsTable";

const Transaction = () => {
  // hooks.
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Helmet title="Transaction" />
      <Grid flex justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Transaction
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6} mt={6}>
        <Grid item sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value} sx={{ width: "100%" }}>
              <Box
                sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{ width: "100%" }}
                >
                  <Tab
                    label="Send/Receive"
                    value="1"
                    sx={{ width: "33.33%" }}
                  />
                  <Tab label="Swap" value="2" sx={{ width: "33.33%" }} />
                  <Tab label="Savings" value="3" sx={{ width: "33.33%" }} />
                </TabList>
              </Box>
              <TabPanel value="1">
                <SendTable />
              </TabPanel>
              <TabPanel value="2">
                <SwapTable />
              </TabPanel>
              <TabPanel value="3">
                <SavingsTable />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Transaction;
