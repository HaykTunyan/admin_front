import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import {
  Typography as MuiTypography,
  Box,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TablePagination,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import CSVButton from "../../components/CSVButton";

// Spacing.
const Typography = styled(MuiTypography)(spacing);

const CurrentTab = ({ rowCurrent }) => {
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
        <Table aria-label="simple table" mt={6}>
          <TableHead>
            <TableRow>
              <TableCell>&#35;</TableCell>
              <TableCell align="center">Users Name</TableCell>
              <TableCell align="center">Balance Bit</TableCell>
              <TableCell align="right">Balance Coin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowCurrent
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    {row.balance_bit}
                    <span> &#x20BF;</span>
                  </TableCell>
                  <TableCell align="right">
                    {row.balance_coin} <span>&#36;</span>{" "}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rowCurrent.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Box mt={8} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={rowCurrent} />
      </Box>
    </Fragment>
  );
};

export default CurrentTab;
