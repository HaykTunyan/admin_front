import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  CardContent,
  Card as MuiCard,
} from "@material-ui/core";
import { instance } from "../../services/api";
import DesktopCall from "./DesktopCall";
import UniqueTable from "./UniqueTable";
import OperationTable from "./OperationTable";
import BrowsersTable from "./BrowsersTable";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Spacer = styled.div(spacing);
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const WebTab = () => {
  // hooks.
  const [webResolution, setWebResolution] = useState(null);
  const [webOs, setWebOs] = useState(null);
  const [webBrowser, setWebBrowser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    getWebOs(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

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

  console.log("webOs", webOs);
  console.log("webBrowser", webBrowser);

  return (
    <Fragment>
      <Grid item xs={12} md={12}>
        <DesktopCall />
      </Grid>
      {/* Unique User */}
      <Grid item xs={12} md={12}>
        <Card my={6}>
          <UniqueTable />
        </Card>
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
