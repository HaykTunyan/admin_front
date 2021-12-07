import React, { Fragment, useEffect, useState } from "react";
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
  Typography,
  TableHead,
  TablePagination,
  Button,
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

const PandingTable = () => {
  // hooks.
  const classes = useStyles();
  const [panding, setPanding] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = panding?.kyc;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   get Savings.
  const getKyc = () => {
    return instance
      .get("/admin/kyc/all", {
        params: {
          limit: null,
          page: page,
          type: 3,
        },
      })
      .then((data) => {
        setPanding(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  // Use Effect.
  useEffect(() => {
    getKyc();
  }, []);

  // Loader.
  if (!rows) {
    return <Loader />;
  }

  console.log(" panding", panding);

  return (
    <Fragment>
      <Paper>
        <TableContainer component={Paper} className={classes.rootTable}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Verification Date</TableCell>
                <TableCell>Uploaded Documents</TableCell>
                <TableCell>Verify button</TableCell>
                <TableCell>Send for verification</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.user_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.user_id}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        {moment(row.date).format("DD/MM/YYYY HH:mm ")}
                      </TableCell>

                      <TableCell>{row.document}</TableCell>
                      <TableCell>
                        <Button variant="contained">New Verified</Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="contained">Send Verified</Button>
                      </TableCell>
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

export default PandingTable;
