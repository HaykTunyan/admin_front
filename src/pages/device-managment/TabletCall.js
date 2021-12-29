import React, { Fragment, useState } from "react";
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

const Toolbar = styled(MuiToolbar)(spacing);

const TabletCell = ({ tabletData }) => {
  //  hooks.
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const title = " Tablet Info ";

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {tabletData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" width="30%">
                    {row.brand_name}
                    <TopDeviceModal title={title} />
                  </TableCell>
                  <TableCell>{row.percent}%</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={tabletData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Fragment>
  );
};

export default TabletCell;
