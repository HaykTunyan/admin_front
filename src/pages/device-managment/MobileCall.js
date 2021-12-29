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

// Spacing.
const Toolbar = styled(MuiToolbar)(spacing);

export const rows = [
  {
    id: "01",
    brand_name: "Samsung",
    percent: "40",
    quantity: "4000",
  },
  {
    id: "02",
    brand_name: "Oppo",
    percent: "5",
    quantity: "500",
  },
  {
    id: "03",
    brand_name: "Xiaomi",
    percent: "15",
    quantity: "1500",
  },
  {
    id: "04",
    brand_name: "Vivo",
    percent: "10",
    quantity: "1000",
  },
  {
    id: "05",
    brand_name: "Apple",
    percent: "30",
    quantity: "3000",
  },
];

const MobileCall = ({ mobileDate }) => {
  // hooks.
  const title = " Mobile Version ";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
            Mobile Info
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
            {mobileDate
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
          count={mobileDate.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Fragment>
  );
};

export default MobileCall;
