import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { instance } from "../../services/api";
import moment from "moment";
import { spacing } from "@material-ui/system";
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
  Card as MuiCard,
  Grid,
  IconButton,
} from "@material-ui/core";
import CSVButton from "../../components/CSVButton";
import PandingInformationModal from "../../modal/PandingInformationModal";
import PandingDocumentModal from "../../modal/PandingDocumentModal";
import PandingVerififeyModal from "../../modal/PandingVerififeyModal";
import { useDispatch } from "react-redux";
import { verifyKyc } from "../../redux/actions/kyc";
import NoData from "../../components/NoData";
import { ArrowDown, ArrowUp } from "react-feather";
import DateRange from "../../components/date-picker/DateRange";
import ConfirmationModal from "../../modal/ConfirmationModal";
import PandingVerifyModal from "../../modal/Confirmations/PandingVerifyModal";
import SearchComponent from "../../components/SearchComponent";

// Spacing.
const Paper = styled(MuiPaper)(spacing);
const Card = styled(MuiCard)(spacing);

const PandingTable = () => {
  // Hooks.
  const dispatch = useDispatch();
  const [panding, setPanding] = useState([]);
  const [page, setPage] = useState(0);
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = panding?.kyc;
  const [errorMes, setErrorMes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [primission, setPrimission] = useState("");
  const [confirm, setConfirm] = useState(false);
  // Sorting.
  const [sortId, setSortId] = useState(true);
  const [sortEmail, setSortEmail] = useState(true);
  const [sortRegister, setSortRegister] = useState(true);
  const [sortVerify, setSortVerify] = useState(true);

  // Sorting Functions.
  const sortingSortId = () => {
    setSortId(!sortId);
    if (sortId) {
      getSortingData("decreasing", "id");
    } else {
      getSortingData("increasing", "id");
    }
  };

  const sortingSortEmail = () => {
    setSortEmail(!sortEmail);
    if (sortEmail) {
      getSortingData("decreasing", "email");
    } else {
      getSortingData("increasing", "email");
    }
  };

  const sortingSortRegister = () => {
    setSortRegister(!sortRegister);
    if (sortRegister) {
      getSortingData("decreasing", "registration_date");
    } else {
      getSortingData("increasing", "registration_date");
    }
  };

  const sortingSortVerify = () => {
    setSortVerify(!sortVerify);
    if (sortVerify) {
      getSortingData("decreasing", "date");
    } else {
      getSortingData("increasing", "date");
    }
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue === "") {
      getKyc();
    } else {
      getSearchData(searchValue);
    }
  };

  const onChangeTime = (newValue) => {
    setStartDate(moment(newValue[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newValue[1]).format("YYYY-MM-DD"));
    setValue(newValue);
    getTimeFilter(
      moment(newValue[0]).format("YYYY-MM-DD"),
      moment(newValue[1]).format("YYYY-MM-DD")
    );
  };

  const handleChangePage = (event, newPage) => {
    getKyc(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  // Profile.
  const getPrimission = () => {
    return instance.get("/admin/profile").then((data) => {
      setPrimission(data.data);
      return data;
    });
  };

  // get Savings.
  const getKyc = (page, rowsPerPage) => {
    return instance
      .get("/admin/kyc/all", {
        params: {
          limit: rowsPerPage,
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

  const getTimeFilter = (start_date, end_date, page, rowsPerPage) => {
    return instance
      .get("/admin/kyc/all", {
        params: {
          type: 3,
          start_date: start_date,
          end_date: end_date,
          page: page,
          limit: rowsPerPage,
        },
      })
      .then((data) => {
        setPanding(data.data);
        return data;
      });
  };

  const getSearchData = (search) => {
    return instance
      .get("/admin/kyc/all", {
        params: {
          type: 3,
          search: search,
        },
      })
      .then((data) => {
        setPanding(data.data);
        return data;
      });
  };

  const getSortingData = (sort_type, sort_param) => {
    return instance
      .get("/admin/kyc/all", {
        params: {
          type: 3,
          sort_type: sort_type,
          sort_param: sort_param,
        },
      })
      .then((data) => {
        setPanding(data.data);
        return data;
      });
  };

  // Use Effect.
  useEffect(() => {
    getPrimission();
    getKyc();
    getTimeFilter();
    getSearchData();
    getSortingData();
  }, []);

  const handleVerifed = (user_id) => {
    const status_kyc = 4;
    dispatch(verifyKyc(user_id, status_kyc))
      .then((data) => {
        if (data.success) {
          getKyc();
        }
        getKyc();
      })
      .catch((error) => {
        setErrorMes(error?.response?.data?.message);
      });
  };

  return (
    <Fragment>
      <Card p={4}>
        <Grid container alignItems="center" sx={{ display: "flex" }} gap={4}>
          <Grid item xs={12} md={3}>
            <Box component="div">
              <SearchComponent onChange={(e) => searchItems(e.target.value)} />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <DateRange value={value} onChange={onChangeTime} />
          </Grid>
        </Grid>
      </Card>
      <Paper>
        {!rows?.length ? (
          <NoData />
        ) : (
          <TableContainer component={Paper} mt={5}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      ID
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton onClick={sortingSortId}>
                          {sortId ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Email
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton onClick={sortingSortEmail}>
                          {sortEmail ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Registration Date
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton onClick={sortingSortRegister}>
                          {sortRegister ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Verification Date
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton onClick={sortingSortVerify}>
                          {sortVerify ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>Information</TableCell>
                  <TableCell>Uploaded Documents</TableCell>
                  <TableCell>Verification</TableCell>
                  <TableCell>Send for verification</TableCell>
                </TableRow>
              </TableHead>
              <>
                <TableBody>
                  {rows &&
                    rows.map((row) => (
                      <>
                        <TableRow
                          key={row.user_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{row.user_id}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>
                            {moment(row.registration_date).format(
                              "DD/MM/YYYY HH:mm "
                            )}
                          </TableCell>
                          <TableCell>
                            {moment(row.verification_date).format(
                              "DD/MM/YYYY HH:mm "
                            )}
                          </TableCell>
                          <TableCell>
                            <PandingInformationModal
                              pandingId={row.user_id}
                              name={row.name}
                              surname={row.surname}
                              dateBirthday={row.date_of_birth}
                              contact={row.address}
                              country={row.country}
                              documentType={row.document_type}
                            />
                          </TableCell>
                          <TableCell>
                            <PandingDocumentModal
                              pandingId={row.user_id}
                              documentType={row.document_type}
                              documentBack={row.document_back}
                              documentFront={row.document_front}
                              selfie={row.selfie}
                            />
                          </TableCell>
                          {/* Primission Super Admin. */}
                          <TableCell>
                            {primission.role === 1 && (
                              <PandingVerifyModal user_id={row.user_id} />
                            )}
                          </TableCell>
                          <TableCell>
                            {primission?.role === 1 && (
                              <PandingVerififeyModal
                                subTitle="Send For Verification"
                                kycId={row.user_id}
                                statusKyc={2}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                        {confirm && (
                          <ConfirmationModal
                            onClick={handleVerifed(row.user_id)}
                          />
                        )}
                      </>
                    ))}
                </TableBody>
              </>
            </Table>
            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={panding?.allCount}
              rowsPerPage={panding?.limit}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
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
