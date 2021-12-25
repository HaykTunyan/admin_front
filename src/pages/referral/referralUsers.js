import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Search as SearchIcon } from "react-feather";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Typography as MuiTypography,
  Divider as MuiDivider,
  InputBase,
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
  Box,
  TablePagination,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { generateReferral } from "../../redux/actions/referral";
import { instance } from "../../services/api";
import CSVButton from "../../components/CSVButton";
import { useSelector } from "react-redux";
import ReferralUserModal from "../../modal/ReferralUserModal";
import moment from "moment";
import AssigneReferral from "../../modal/AssigneReferral";

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

// Spacing.
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const ReferralUsers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(false);

  const [unassignedList, setUnassignedList] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // setUnassignedList(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // setUnassignedList(+event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(1);
    // setUnassignedList(unassignedList.page);
  };

  const handleGenerate = () => {
    try {
      dispatch(generateReferral()).then((data) => {
        if (data.success) {
          setShowList(true);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getUnassigned = () => {
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

  console.log(" showList ", showList);

  console.log("unassignedList", unassignedList);

  return (
    <Fragment>
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
              {unassignedList ? (
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
                            unassignedList?.referrals
                              // .slice(
                              //   unassignedList?.page * unassignedList?.limit,
                              //   unassignedList?.page * unassignedList?.limit +
                              //     unassignedList?.limit
                              // )
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
                                    {moment(row.created_date).format(
                                      "DD/MM/YYYY HH:mm "
                                    )}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.referral_code}
                                  </TableCell>

                                  <TableCell padding="none" align="right">
                                    <AssigneReferral id={row.id} />
                                  </TableCell>
                                </TableRow>
                              ))}
                        </TableBody>
                      </Table>
                      {/* Pagination */}
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={unassignedList?.allCount}
                        rowsPerPage={unassignedList?.limit}
                        page={unassignedList?.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableContainer>
                  </Paper>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ReferralUsers;
