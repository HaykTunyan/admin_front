import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Grid,
  Box,
  Typography as MuiTypography,
  Divider as MuiDivider,
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
  IconButton,
  Stack,
  Pagination,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { generateReferral } from "../../redux/actions/referral";
import { instance } from "../../services/api";
import moment from "moment";
import AssigneReferral from "../../modal/AssigneReferral";

// Spacing.
const Card = styled(MuiCard)(spacing);

const ReferralUsers = () => {
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(false);
  const [statePage, setStatePage] = useState(1);
  const [unassignedList, setUnassignedList] = useState(null);

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

  const getUnassigned = (stateIndex) => {
    return instance
      .get("/admin/referral/all", {
        params: {
          limit: 5,
          page: stateIndex ? stateIndex : statePage,
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
  let arr = [];
  useEffect(() => {
    getUnassigned();
  }, [statePage]);

  const dataPage = unassignedList?.allCount / unassignedList?.limit;

  const dataPageMath = Math.round(dataPage);
  console.log("data", dataPageMath);
  if (!dataPageMath) {
    return null;
  }
  arr.length = dataPageMath;
  console.log("arr", arr?.length);
  arr.fill(1);

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
                                  <AssigneReferral id={row.id} />
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>

                      <Stack
                        direction="row"
                        display="flex"
                        alignItems="flex-end"
                        spacing={2}
                      >
                        {arr.map((item, index) => (
                          <Box
                            display="flex"
                            onClick={() => getUnassigned(index + 1)}
                          >
                            <IconButton color="primary" component="span">
                              <span>{index + 1}</span>
                            </IconButton>
                          </Box>
                        ))}
                      </Stack>
                      {/* Pagination */}
                      {/* <Box py={5} display="flex" justifyContent="flex-end">
              

                        <Pagination
                          variant="outlined"
                          shape="rounded"
                          count={dataPage.length}
                          limit={unassignedList?.limit}
                          page={unassignedList?.page}
                          onClick={() =>
                            getUnassigned(arr.map((index) => index + 1))
                          }
                        />
                      </Box> */}
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
