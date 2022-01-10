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
import TabletCell from "./TabletCall";
import UniqueTable from "./UniqueTable";
import OperationTable from "./OperationTable";
import BrowsersTable from "./BrowsersTable";
import { instance } from "../../services/api";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Spacer = styled.div(spacing);
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const TabletTab = () => {
  // hooks.
  const [tableResolution, setTableResolution] = useState(null);
  const [tableOs, setTableOs] = useState(null);
  const [tableBrowser, setTableBrowser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    getTableOs(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

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

  console.log("tableOs", tableOs);
  console.log("tableBrowser", tableBrowser);

  return (
    <Fragment>
      <Grid item xs={12} md={12}>
        <TabletCell />
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