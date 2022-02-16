import React, { Fragment, useEffect, useState } from "react";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar as MuiToolbar,
  Typography,
  TablePagination,
} from "@material-ui/core";
import TopDeviceModal from "../../modal/TopDeviceModal";
import { instance } from "../../services/api";

// Spacing.
const Toolbar = styled(MuiToolbar)(spacing);

const MobileCall = () => {
  // Hooks.
  const title = " Mobile Version ";
  const [rowMobie, setRowMobile] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    getMobileStatistics(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  // Mobile
  const getMobileStatistics = (page, rowsPerPage) => {
    return instance
      .get("/admin/device-statistics/for", {
        params: {
          limit: rowsPerPage,
          page: page,
          deviceType: "mobile",
          type: "model",
        },
      })
      .then((data) => {
        setRowMobile(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getMobileStatistics();
  }, []);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Mobile Info
          </Typography>
        </Toolbar>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="30%">Device Name</TableCell>
              <TableCell>Percent %</TableCell>
              <TableCell align="right">Quantity People</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowMobie?.deviceStatistics &&
              rowMobie?.deviceStatistics.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" width="30%">
                    {row.device_vendor}
                    <TopDeviceModal title={title} rowList={row.device_models} />
                  </TableCell>
                  <TableCell>{row.percent}%</TableCell>
                  <TableCell align="right">{row.devices_count}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        {rowMobie?.deviceStatistics && (
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={rowMobie?.allCount}
            rowsPerPage={rowMobie?.limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    </Fragment>
  );
};

export default MobileCall;
