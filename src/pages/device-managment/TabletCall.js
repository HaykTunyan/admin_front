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

const Toolbar = styled(MuiToolbar)(spacing);

const TabletCell = ({ tabletData }) => {
  //  hooks.
  const title = " Tablet Info ";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowTable, setRowTable] = useState(null);

  const handleChangePage = (event, newPage) => {
    getTableStatistics(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  // Tablet
  const getTableStatistics = (page, rowsPerPage) => {
    return instance
      .get("/admin/device-statistics/for", {
        params: {
          limit: rowsPerPage,
          page: page,
          deviceType: "tablet",
          type: "model",
        },
      })
      .then((data) => {
        setRowTable(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getTableStatistics();
  }, []);

  console.log("rowTable", rowTable);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Tablet Info
          </Typography>
        </Toolbar>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="30%">Brand Name</TableCell>
              <TableCell>Percent %</TableCell>
              <TableCell align="right">Quantity People</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowTable?.deviceStatistics &&
              rowTable?.deviceStatistics.map((row) => (
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
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={rowTable?.allCount}
          rowsPerPage={rowTable?.limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Fragment>
  );
};

export default TabletCell;
