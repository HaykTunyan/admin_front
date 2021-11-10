import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Box,
  Tab,
} from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Locked from "./Locked";
import Flexible from "./Flexible";

const Card = styled(MuiCard)(spacing);

const SavingsSetting = () => {
  const [panel, setPanel] = useState("1");

  const handleChangePanel = (event, newPanel) => {
    setPanel(newPanel);
  };

  return (
    <Fragment>
      <Card mb={6}>
        <CardContent>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={panel}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangePanel}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Locked" value="1" />
                  <Tab label="Flexible" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Locked />
              </TabPanel>
              <TabPanel value="2">
                <Flexible />
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SavingsSetting;
