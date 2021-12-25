import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Grid,
  Typography,
  Box,
  TablePagination,
} from "@material-ui/core";
import ReferralUserModal from "../../modal/ReferralUserModal";
import CSVButton from "../../components/CSVButton";
import { useSelector } from "react-redux";
import { instance } from "../../services/api";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";

const Spacer = styled.div(spacing);

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const ReferralTable = () => {
  // hooks.
  const classes = useStyles();

  const [referralRow, setReferralRow] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const getReferrals = () => {
    return instance
      .get("/admin/referral/user/all", {
        params: {
          limit: null,
          page: null,
        },
      })
      .then((data) => {
        setReferralRow(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getReferrals();
  }, []);

  console.log("referralRow", referralRow);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Paper>
            <TableContainer component={Paper} className={classes.rootTable}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell align="center">URL link</TableCell>
                    <TableCell align="center">Registered Users</TableCell>
                    <TableCell align="center">Started using</TableCell>
                    <TableCell align="center">Total Recived </TableCell>
                    <TableCell align="center">Total Balance</TableCell>
                    <TableCell align="center">Action </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {referralRow?.referrals &&
                    referralRow?.referrals
                      // .slice(
                      //   page * rowsPerPage,
                      //   page * rowsPerPage + rowsPerPage
                      // )
                      .map((item) => (
                        <TableRow
                          key={item.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.userFullName}
                            <Spacer mx={2} />
                            <span> {item.userEmail} </span>
                          </TableCell>
                          <TableCell align="center">
                            <span>https://bein.demka.online/</span>
                            <Spacer mx={2} />
                            <span>{item.referralCode}</span>
                          </TableCell>
                          <TableCell align="center">
                            {item.registersCount}
                          </TableCell>
                          <TableCell align="center">
                            {item.usesTheSystemUser}
                          </TableCell>
                          <TableCell align="center">
                            {item.total_received}
                          </TableCell>
                          <TableCell align="center">
                            {item.total_balance}
                          </TableCell>

                          <TableCell padding="none" align="center">
                            <ReferralUserModal
                              id={item.id}
                              totalReceived={item.total_received}
                              detaild={item.detailed}
                              detailedReceived={item.detailed_received}
                              walletsFriends={item.total_balance}
                              usesTheSistem={item.usesTheSystemUser}
                              usesTheSystemPercent={
                                item.usesTheSystemUserPercent
                              }
                              usesTheSavings={item.usesTheSavingsUser}
                              usesTheSavingsPercent={
                                item.usesTheSavingsUserPercent
                              }
                              amountOfSavings={item.total_savings}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
              {/* Pagination */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={referralRow?.allCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Paper>
          <Box
            mt={8}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Typography variant="subtitle1" color="inherit" component="div">
              Export Data
            </Typography>
            {/* <CSVButton data={referralRow?.referrals} /> */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ReferralTable;
