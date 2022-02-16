import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { Grid, Card as MuiCard } from "@material-ui/core";
import TabletCell from "./TabletCall";
import OperationTable from "./OperationTable";
import BrowsersTable from "./BrowsersTable";
import { instance } from "../../services/api";

// Spacing.
const Card = styled(MuiCard)(spacing);

const TabletTab = () => {
  // hooks.
  const [tableOs, setTableOs] = useState(null);
  const [tableBrowser, setTableBrowser] = useState(null);

  const getTableOs = (page, rowsPerPage) => {
    return instance
      .get("/admin/device-statistics/for", {
        params: {
          limit: rowsPerPage,
          page: page,
          deviceType: "tablet",
          type: "os",
        },
      })
      .then((data) => {
        setTableOs(data.data);
        return data;
      });
  };

  const getTableBrowser = (page, rowsPerPage) => {
    return instance
      .get("/admin/device-statistics/for", {
        params: {
          limit: rowsPerPage,
          page: page,
          deviceType: "tablet",
          type: "browser",
        },
      })
      .then((data) => {
        setTableBrowser(data.data);
        return data;
      });
  };

  useEffect(() => {
    getTableOs();
    getTableBrowser();
  }, []);

  return (
    <Fragment>
      <Grid item xs={12} md={12}>
        <TabletCell />
      </Grid>
      {/* Operation Sistem */}
      <Grid item xs={12} md={6}>
        <Card my={6}>
          <OperationTable rowList={tableOs} />
        </Card>
      </Grid>
      {/* Browsers */}
      <Grid item xs={12} md={6}>
        <Card my={6}>
          <BrowsersTable rowBrowser={tableBrowser} />
        </Card>
      </Grid>
    </Fragment>
  );
};

export default TabletTab;
