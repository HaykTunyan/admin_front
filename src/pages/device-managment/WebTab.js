import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { Grid, Card as MuiCard } from "@material-ui/core";
import { instance } from "../../services/api";
import DesktopCall from "./DesktopCall";
import OperationTable from "./OperationTable";
import BrowsersTable from "./BrowsersTable";

// Spacing.
const Card = styled(MuiCard)(spacing);

const WebTab = () => {
  // Hooks.
  const [webOs, setWebOs] = useState(null);
  const [webBrowser, setWebBrowser] = useState(null);

  const getWebOs = (page, rowsPerPage) => {
    return instance
      .get("/admin/device-statistics/for", {
        params: {
          limit: rowsPerPage,
          page: page,
          deviceType: "web",
          type: "os",
        },
      })
      .then((data) => {
        setWebOs(data.data);
        return data;
      });
  };

  const getWebBrowser = (page, rowsPerPage) => {
    return instance
      .get("/admin/device-statistics/for", {
        params: {
          limit: rowsPerPage,
          page: page,
          deviceType: "web",
          type: "browser",
        },
      })
      .then((data) => {
        setWebBrowser(data.data);
        return data;
      });
  };

  useEffect(() => {
    getWebOs();
    getWebBrowser();
  }, []);

  return (
    <Fragment>
      <Grid item xs={12} md={12}>
        <DesktopCall />
      </Grid>
      {/* Operation Sistem */}
      <Grid item xs={12} md={6}>
        <Card my={6}>
          <OperationTable rowList={webOs} />
        </Card>
      </Grid>
      {/* Browsers */}
      <Grid item xs={12} md={6}>
        <Card my={6}>
          <BrowsersTable rowBrowser={webBrowser} />
        </Card>
      </Grid>
    </Fragment>
  );
};

export default WebTab;
