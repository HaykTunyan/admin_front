import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { instance } from "../../services/api";
import { spacing } from "@material-ui/system";
import moment from "moment";
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
import NoData from "../../components/NoData";
import DateRange from "../../components/date-picker/DateRange";
import { ArrowDown, ArrowUp } from "react-feather";
import SearchComponent from "../../components/SearchComponent";

// Spacing.
const Paper = styled(MuiPaper)(spacing);
const Card = styled(MuiCard)(spacing);

// Custom Style.
const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const VerifiedTable = () => {
  // Hooks.
  const classes = useStyles();
  const [rowVerified, setRowVerified] = useState([]);
  const [page, setPage] = useState(0);
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [primission, setPrimission] = useState("");
  const rows = rowVerified?.kyc;
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
      getSortingData("decreasing", "verification_date");
    } else {
      getSortingData("increasing", "verification_date");
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

  const handleChangePage = (event, newPage) => {
    getKyc(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
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
          type: 4,
        },
      })
      .then((data) => {
        setRowVerified(data.data);
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
          type: 4,
          start_date: start_date,
          end_date: end_date,
          page: page,
          limit: rowsPerPage,
        },
      })
      .then((data) => {
        setRowVerified(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  const getSearchData = (search) => {
    return instance
      .get("/admin/kyc/all", {
        params: {
          type: 4,
          search: search,
        },
      })
      .then((data) => {
        setRowVerified(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  const getSortingData = (sort_type, sort_param) => {
    return instance
      .get("/admin/kyc/all", {
        params: {
          type: 4,
          sort_type: sort_type,
          sort_param: sort_param,
        },
      })
      .then((data) => {
        setRowVerified(data.data);
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

  return (
    <Fragment>
      <Card p={4}>
        <Grid container alignItems="center" gap={4}>
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
        {!rows ? (
          <NoData />
        ) : (
          <TableContainer component={Paper} className={classes.rootTable}>
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
                  <TableCell>Send for verification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows.map((row) => (
                    <TableRow
                      key={row.user_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                      <TableCell>
                        {primission?.role === 1 && (
                          <PandingVerififeyModal
                            subTitle="Verifiy Again"
                            kycId={row.user_id}
                            statusKyc={2}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* Pagination */}
            {rows && (
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={rowVerified?.allCount}
                rowsPerPage={rowVerified?.limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
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

export default VerifiedTable;
