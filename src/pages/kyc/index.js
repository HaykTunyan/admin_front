import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Divider, Grid, Typography, Box, Tab } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import PendingTable from "./Pending";
import VerifiedTable from "./VerifiedTab";
import NotVerifiedTable from "./NotVerifiedTab";

const KYC = () => {
  // Hooks.
  const [step, setStep] = useState("1");

  const handleChangeTab = (event, newStep) => {
    setStep(newStep);
  };

  return (
    <Fragment>
      <Helmet title="KYC" />
      <Grid container>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            KYC
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container mt={6}>
        <Grid item sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={step} sx={{ width: "100%" }}>
              <Box
                sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}
              >
                <TabList
                  onChange={handleChangeTab}
                  aria-label="lab API tabs example"
                  sx={{ width: "100%" }}
                >
                  <Tab label="Pending" value="1" sx={{ width: "33.33%" }} />
                  <Tab label="Verified" value="2" sx={{ width: "33.33%" }} />
                  <Tab
                    label="Not Verified"
                    value="3"
                    sx={{ width: "33.33%" }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <PendingTable />
              </TabPanel>
              <TabPanel value="2">
                <VerifiedTable />
              </TabPanel>
              <TabPanel value="3">
                <NotVerifiedTable />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
      <Divider my={6} />
    </Fragment>
  );
};

export default KYC;
