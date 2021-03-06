import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Grid,
  Box,
  Card as MuiCard,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  TablePagination,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { generateReferral } from "../../redux/actions/referral";
import { instance } from "../../services/api";
import moment from "moment";
import AssigneReferral from "../../modal/AssigneReferral";
import ConfirmationNotice from "../../components/ConfirmationNotice";
import Loader from "../../components/Loader";

// Spacing.
const Card = styled(MuiCard)(spacing);

const ReferralUsers = () => {
  // Hooks.
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(false);
  const [unassignedList, setUnassignedList] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [message, setMessage] = useState({
    open: false,
    error: false,
  });

  const handleChangePage = (event, newPage) => {
    getUnassigned(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleGenerate = () => {
    setMessage({ ...message, open: false, error: false });
    try {
      dispatch(generateReferral()).then((data) => {
        if (data.success) {
          setShowList(true);
        }
        setMessage({ ...message, open: true });
        getUnassigned();
      });
    } catch (error) {
      console.log("error", error);
      setMessage({ ...message, open: true, error: true });
    }
  };

  const getUnassigned = (page, rowsPerPage) => {
    return instance
      .get("/admin/referral/all", {
        params: {
          limit: rowsPerPage,
          page: page,
        },
      })
      .then((data) => {
        setUnassignedList(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  // Use Effect.
  useEffect(() => {
    getUnassigned();
  }, []);

  return (
    <Fragment>
      {message.open === true && (
        <ConfirmationNotice
          error={message.error}
          title={
            message.error === true
              ? "An error occurred, try again"
              : "Successfully Generated"
          }
        />
      )}
      <Card xs={12}>
        <CardContent>
          <Grid
            container
            spacing={6}
            display="flex"
            justifyContent="space-between"
          >
            <Grid item alignItems="center" md={3}>
              <Button variant="contained" onClick={handleGenerate}>
                Generate{" "}
              </Button>
            </Grid>
            <Grid item md={5}>
              {unassignedList?.referrals ? (
                <Grid item>
                  <Paper>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Create Data</TableCell>
                            <TableCell align="center">Referral Code</TableCell>
                            <TableCell align="right">Action </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {unassignedList?.referrals &&
                            unassignedList?.referrals.map((row) => (
                              <TableRow
                                key={row.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {moment(row.created_date).format(
                                    "DD/MM/YYYY HH:mm "
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  {row.referral_code}
                                </TableCell>

                                <TableCell padding="none" align="right">
                                  <AssigneReferral
                                    id={row.id}
                                    getUnassigned={getUnassigned}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      {/* Pagination */}
                      {unassignedList?.referrals && (
                        <Box py={5} display="flex" justifyContent="flex-end">
                          <TablePagination
                            rowsPerPageOptions={[10]}
                            component="div"
                            count={unassignedList?.allCount}
                            rowsPerPage={unassignedList?.limit}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        </Box>
                      )}
                    </TableContainer>
                  </Paper>
                </Grid>
              ) : (
                <Box sx={{ marginTop: "100px" }}>
                  <Loader />
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ReferralUsers;
