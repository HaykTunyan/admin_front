import React, { Fragment, useState, useEffect } from "react";
import { Grid, Card as MuiCard } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import MobileCall from "./MobileCall";
import OperationTable from "./OperationTable";
import BrowsersTable from "./BrowsersTable";
import { instance } from "../../services/api";

// Spacing.
const Card = styled(MuiCard)(spacing);

const MobileTab = () => {
  // hooks.
  const [mobileOs, setMobileOs] = useState(null);
  const [mobileBrowser, setMobileBrowser] = useState(null);

  const getMobileOs = (page, rowsPerPage) => {
    return instance
      .get("/admin/device-statistics/for", {
        params: {
          limit: rowsPerPage,
          page: page,
          deviceType: "mobile",
          type: "os",
        },
      })
      .then((data) => {
        setMobileOs(data.data);
        return data;
      });
  };

  const getMobileBrowser = (page, rowsPerPage) => {
    return instance
      .get("/admin/device-statistics/for", {
        params: {
          limit: rowsPerPage,
          page: page,
          deviceType: "mobile",
          type: "browser",
        },
      })
      .then((data) => {
        setMobileBrowser(data.data);
        return data;
      });
  };

  useEffect(() => {
    getMobileOs();
    getMobileBrowser();
  }, []);

  return (
    <Fragment>
      <Grid item xs={12} md={12}>
        <Card my={6}>
          <MobileCall />
        </Card>
      </Grid>
      {/* Operation Sistem */}
      <Grid item xs={12} md={6}>
        <Card my={6}>
          <OperationTable rowList={mobileOs} />
        </Card>
      </Grid>
      {/* Browsers */}
      <Grid item xs={12} md={6}>
        <Card my={6}>
          <BrowsersTable rowBrowser={mobileBrowser} />
        </Card>
      </Grid>
    </Fragment>
  );
};

export default MobileTab;
