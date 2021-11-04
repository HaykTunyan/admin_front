import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableHead,
  TablePagination,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import CSVButton from "../../components/CSVButton";
import { useSelector } from "react-redux";

const Paper = styled(MuiPaper)(spacing);

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const SavingsTable = () => {
  const classes = useStyles();
  const callList = useSelector((state) => state.transaction);

  const rows = callList.savingList;

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
      <Paper>
        <TableContainer component={Paper} className={classes.rootTable}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date Opetation</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Sum</TableCell>
                <TableCell align="center">Coin / Coin</TableCell>
                <TableCell align="center">TX ID</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Operation Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.date_operation}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.sum}</TableCell>
                    <TableCell align="center">{row.coin}</TableCell>
                    <TableCell align="center">{row.tx_id}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="center">{row.operation_type}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
      <Box mt={8} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={rows} />
      </Box>
    </Fragment>
  );
};

export default SavingsTable;
