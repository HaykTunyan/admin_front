import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import instance from "../../services/api";
import {
  Box,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Typography,
  TablePagination,
} from "@material-ui/core";
import moment from "moment";
import { spacing } from "@material-ui/system";
import CSVButton from "../../components/CSVButton";
import Loader from "../../components/Loader";

// Spacing.
const Paper = styled(MuiPaper)(spacing);

// Custom Style.
const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const SendTable = () => {
  //  hooks.
  const classes = useStyles();
  const [send, setSend] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = send.transactions;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //  get Send/Receive
  const getSend = () => {
    return instance
      .get("/admin/transaction/all", {
        params: {
          limit: null,
          page: 1,
          type: "Send/Receive",
        },
      })
      .then((data) => {
        setSend(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  // Use Effect.
  useEffect(() => {
    getSend();
  }, []);

  if (send.transactionsCount === 0) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Paper>
        <TableContainer component={Paper} className={classes.rootTable}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Coin</TableCell>
                <TableCell>TX Id</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Type of operations:</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                send.transactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {moment(row.date).format("DD/MM/YYYY HH:mm ")}{" "}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>
                        {row.amount_sent != null ? (
                          <>{row.amount_sent}</>
                        ) : (
                          <>{row.amount_received}</>
                        )}
                      </TableCell>

                      <TableCell>{row.coinFrom}</TableCell>

                      <TableCell>{row.typeFromat}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.isReal}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
      {rows && (
        <Box
          mt={8}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography variant="subtitle1" color="inherit" component="div">
            Export Data
          </Typography>
          <CSVButton data={rows} />
        </Box>
      )}
    </Fragment>
  );
};

export default SendTable;
