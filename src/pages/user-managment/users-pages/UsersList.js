import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { spacing } from "@material-ui/system";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import { instance } from "../../../services/api";
import moment from "moment";
import {
  Box,
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  IconButton,
  TablePagination,
  Breadcrumbs,
  Chip as MuiChip,
  Card as MuiCard,
  FormControlLabel,
  Button,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import Loader from "../../../components/Loader";
import EditAffiliateModal from "../../../modal/EditAffiliateUser";
import DateRange from "../../../components/date-picker/DateRange";
import AddAffiliateUser from "../../../modal/AddAffiliateUser";
import { ArrowDown, ArrowUp } from "react-feather";
import SearchComponent from "../../../components/SearchComponent";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const UsersList = ({ affiliate }) => {
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [rowUserList, setRowUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const rowList = rowUserList?.users;
  // Sorting.
  const [sent, setSent] = useState(true);
  const [received, setRecived] = useState(true);
  const [balance, setBalance] = useState(true);
  const [email, setEmail] = useState(true);
  const [registration, setRegistration] = useState(true);
  const [position, setPosition] = useState(true);
  const [searchEmail, setSearchEmail] = useState(null);
  // Sorting.
  const [flexibleSort, setFlexibleSort] = useState("");
  const [flexibleActive, setFlexibleActive] = useState(true);
  const [flexibleFinished, setFlexibleFinished] = useState(true);
  const [lockedSort, setLockedSort] = useState("");
  const [lockedActive, setLockedActive] = useState(true);
  const [lockedFinished, setLockedFinished] = useState(true);

  // Flexible Sorting.
  const handleChangeFlexible = (event, flexibleSort) => {
    setFlexibleSort(event.target.value);
    if (flexibleSort === "active") {
      handleFlexibleActive(event.target.value);
    } else {
      handleFlexibleFinished(event.target.value);
    }
  };

  const handleFlexibleActive = (radioValue) => {
    setFlexibleActive(!flexibleActive);
    if (flexibleActive) {
      getSorting("decreasing", "flexible_active");
    } else {
      getSorting("increasing", "flexible_active");
    }
  };

  const handleFlexibleFinished = (radioValue) => {
    setFlexibleFinished(!flexibleFinished);
    if (flexibleFinished) {
      getSorting("decreasing", "flexible_finished");
    } else {
      getSorting("increasing", "flexible_finished");
    }
  };

  // Locked Sorting.
  const handleChangeLocked = (event, lockedSort) => {
    setLockedSort(event.target.value);
    if (lockedSort === "active") {
      handleLockedActive(event.target.value);
    } else {
      handleLockedFinish(event.target.value);
    }
  };

  const handleLockedActive = (radioValue) => {
    setLockedActive(!lockedActive);
    if (lockedActive) {
      getSorting("decreasing", "locked_active");
    } else {
      getSorting("increasing", "locked_active");
    }
  };

  const handleLockedFinish = (radioValue) => {
    setLockedFinished(!lockedFinished);
    if (lockedFinished) {
      getSorting("decreasing", "locked_finished");
    } else {
      getSorting("increasing", "locked_finished");
    }
  };

  // Sent Sorting.
  const sortingSent = () => {
    setSent(!sent);
    if (sent) {
      getSorting("decreasing", "total_sent");
    } else {
      getSorting("increasing", "total_sent");
    }
  };

  // Recived Sorting.
  const sortingRecived = () => {
    setRecived(!received);
    if (received) {
      getSorting("decreasing", "total_receive");
    } else {
      getSorting("increasing", "total_receive");
    }
  };

  // Balance Sorting.
  const sortingBalance = () => {
    setBalance(!balance);
    if (balance) {
      getSorting("decreasing", "total_balance");
    } else {
      getSorting("increasing", "total_balance");
    }
  };

  // Registration Sorting.
  const sortingRegistration = () => {
    setRegistration(!registration);
    if (registration) {
      getSorting("decreasing", "registration_date");
    } else {
      getSorting("increasing", "registration_date");
    }
  };

  // Email Sorting.
  const sortingEmail = () => {
    setEmail(!email);
    if (email) {
      getSorting("decreasing", "email");
    } else {
      getSorting("increasing", "email");
    }
  };

  // Postion Sorting.
  const sortingPosition = () => {
    setPosition(!position);
    if (position) {
      getSorting("decreasing", "geo_position");
    } else {
      getSorting("increasing", "geo_position");
    }
  };

  const handleSearch = (searchValue, page, rowPerPage) => {
    setSearchEmail(searchValue);
    if (searchValue === "") {
      getUserList_req();
    } else {
      getUserFilterList(searchValue, page, rowPerPage);
    }
  };

  const onChangeTime = (newValue) => {
    setStartDate(moment(newValue[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newValue[1]).format("YYYY-MM-DD"));
    setValue(newValue);
    getTimeFiltering(
      moment(newValue[0]).format("YYYY-MM-DD"),
      moment(newValue[1]).format("YYYY-MM-DD")
    );
  };

  const openUser = (id) => {
    navigate("/view-user", { state: { id, affiliate } });
  };

  const handleChangePage = (event, newPage) => {
    getUserList_req(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const getUserList_req = (page, rowsPerPage) => {
    return instance
      .get(`/admin/user/all`, {
        mode: "no-cors",
        params: {
          isAffiliate: affiliate,
          page: page,
          limit: rowsPerPage,
        },
      })
      .then((data) => {
        setRowUserList(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  const getUserFilterList = (searchValue) => {
    return instance
      .get(`/admin/user/all`, {
        mode: "no-cors",
        params: {
          isAffiliate: affiliate,
          email: searchValue,
        },
      })
      .then((data) => {
        setRowUserList(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  const getSorting = (sort_type, sort_param, page, rowsPerPage) => {
    return instance
      .get(`/admin/user/all`, {
        mode: "no-cors",
        params: {
          isAffiliate: affiliate,
          sort_type: sort_type,
          sort_param: sort_param,
          page: page,
          limit: rowsPerPage,
        },
      })
      .then((data) => {
        setRowUserList(data.data);
        return data;
      });
  };

  const getTimeFiltering = (createdFrom, createdTo, page, rowsPerPage) => {
    return instance.get(`/admin/user/all`, {
      params: {
        isAffiliate: affiliate,
        createdFrom: createdFrom,
        createdTo: createdTo,
        page: page,
        limit: rowsPerPage,
      },
    });
  };

  // Use Effect.
  useEffect(() => {
    getUserList_req();
    getUserFilterList();
    getSorting();
    getTimeFiltering();
  }, [affiliate]);

  return (
    <Fragment>
      {affiliate ? (
        <Helmet title="Affiliate Users" />
      ) : (
        <Helmet title="Users" />
      )}
      <Grid container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {affiliate ? <span> Affiliate Users </span> : <span> Users </span>}
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Card p={4}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={4} md={2}>
            <Box
              component="div"
              sx={{
                paddingX: "10px",
                marginBottom: { xs: "10px", md: "0" },
              }}
            >
              <SearchComponent
                onChange={(event) => handleSearch(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <DateRange value={value} onChange={onChangeTime} />
          </Grid>
          {affiliate && (
            <>
              <Grid item xs={12} sm={4} md={3}>
                <Box
                  component="div"
                  sx={{
                    mx: "15px",
                    marginY: { xs: "10px", md: "0" },
                    display: "flex",
                    justifyContent: { xs: "center" },
                  }}
                >
                  <AddAffiliateUser getUserList={getUserList_req} />
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Card>
      <Divider my={6} />
      <Grid container spacing={6} className="user-table">
        <Grid item xs={12}>
          {rowUserList ? (
            <>
              <TableContainer component={Paper}>
                <Table
                  sx={{
                    overflowX: "auto",
                  }}
                  aria-label="table"
                >
                  <TableHead>
                    <TableRow>
                      {/* ID */}
                      <TableCell sx={{ padding: "10px" }}>ID</TableCell>
                      {/* Email */}
                      <TableCell align="center">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Email
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <IconButton onClick={sortingEmail}>
                              {email ? (
                                <ArrowUp size={16} />
                              ) : (
                                <ArrowDown size={16} />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                      </TableCell>
                      {/* Phone */}
                      <TableCell align="center">Phone</TableCell>
                      {/* Balance */}
                      <TableCell align="center">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Balance
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <IconButton onClick={sortingBalance}>
                              {balance ? (
                                <ArrowUp size={16} />
                              ) : (
                                <ArrowDown size={16} />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                      </TableCell>
                      {/* Flexible */}
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Flexible
                        </Box>
                        <RadioGroup
                          aria-labelledby="flexible-radio-group"
                          name="flexible-radio-group"
                          value={flexibleSort}
                          onChange={handleChangeFlexible}
                          display="flex"
                          justifyContent="space-between"
                          width="max-content"
                        >
                          <Breadcrumbs
                            aria-label="breadcrumb"
                            display="flex"
                            justifyContent="space-around"
                            width="max-content"
                            align="center"
                          >
                            {/* Flexible Active */}
                            <Box>
                              {flexibleSort === "active" && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <IconButton onClick={handleFlexibleActive}>
                                    {flexibleActive ? (
                                      <ArrowUp size={16} />
                                    ) : (
                                      <ArrowDown size={16} />
                                    )}
                                  </IconButton>
                                </Box>
                              )}

                              <FormControlLabel
                                value="active"
                                control={<Radio size="small" />}
                                label="active"
                                labelPlacement="top"
                              />
                            </Box>
                            {/* Flexible Finished */}
                            <Box>
                              {flexibleSort === "finished" && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <IconButton onClick={handleFlexibleFinished}>
                                    {flexibleFinished ? (
                                      <ArrowUp size={16} />
                                    ) : (
                                      <ArrowDown size={16} />
                                    )}
                                  </IconButton>
                                </Box>
                              )}

                              <FormControlLabel
                                value="finished"
                                control={<Radio size="small" />}
                                label="finished"
                                labelPlacement="top"
                              />
                            </Box>
                          </Breadcrumbs>
                        </RadioGroup>
                      </TableCell>
                      {/* Locked */}
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Locked
                        </Box>
                        <RadioGroup
                          aria-labelledby="locked-radio-group"
                          name="locked-radio-group"
                          value={lockedSort}
                          defaultValue={lockedSort}
                          onChange={handleChangeLocked}
                          display="flex"
                          justifyContent="space-between"
                          width="max-content"
                        >
                          <Breadcrumbs
                            aria-label="breadcrumb"
                            display="flex"
                            justifyContent="space-around"
                            width="max-content"
                            align="center"
                          >
                            {/* Locked Active */}
                            <Box>
                              {lockedSort === "active" && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <IconButton onClick={handleLockedActive}>
                                    {lockedActive ? (
                                      <ArrowUp size={16} />
                                    ) : (
                                      <ArrowDown size={16} />
                                    )}
                                  </IconButton>
                                </Box>
                              )}

                              <FormControlLabel
                                value="active"
                                control={<Radio size="small" />}
                                label="active"
                                labelPlacement="top"
                              />
                            </Box>
                            {/* Locked Finished */}
                            <Box>
                              {lockedSort === "finished" && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <IconButton onClick={handleLockedFinish}>
                                    {lockedFinished ? (
                                      <ArrowUp size={16} />
                                    ) : (
                                      <ArrowDown size={16} />
                                    )}
                                  </IconButton>
                                </Box>
                              )}

                              <FormControlLabel
                                value="finished"
                                control={<Radio size="small" />}
                                label="finished"
                                labelPlacement="top"
                              />
                            </Box>
                          </Breadcrumbs>
                        </RadioGroup>
                      </TableCell>
                      {/* Received */}
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Received
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <IconButton onClick={sortingRecived}>
                              {received ? (
                                <ArrowUp size={16} />
                              ) : (
                                <ArrowDown size={16} />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                      </TableCell>
                      {/* Status KYC */}
                      <TableCell align="center">Status KYC</TableCell>
                      {/* Date Register */}
                      <TableCell align="center">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          Date Register
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <IconButton onClick={sortingRegistration}>
                              {registration ? (
                                <ArrowUp size={16} />
                              ) : (
                                <ArrowDown size={16} />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                      </TableCell>
                      {/* Geo Position */}
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Geo Position
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <IconButton onClick={sortingPosition}>
                              {position ? (
                                <ArrowUp size={16} />
                              ) : (
                                <ArrowDown size={16} />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                      </TableCell>
                      {/* Sent */}
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Sent
                          <Box sx={{ display: "flex" }}>
                            <IconButton onClick={sortingSent}>
                              {sent ? (
                                <ArrowUp size={16} />
                              ) : (
                                <ArrowDown size={16} />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                      </TableCell>
                      {/* Referral */}
                      <TableCell align="center">Referral</TableCell>
                      {/* Currency */}
                      <TableCell align="center">Currency</TableCell>
                      {/* View */}
                      <TableCell align="center">View</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowList &&
                      rowList.map((row) => (
                        <TableRow
                          key={row.user_id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                            padding: "10px",
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.user_id}
                          </TableCell>
                          <TableCell align="center">
                            <Button onClick={() => openUser(row.user_id)}>
                              {row.email}
                            </Button>
                          </TableCell>
                          <TableCell align="center">{row.phone}</TableCell>
                          <TableCell align="center">
                            {/* {row.total_balance} */}
                            {Math.round(
                              (row.total_balance + Number.EPSILON) * 100
                            ) / 100}
                          </TableCell>
                          <TableCell align="center">
                            <Breadcrumbs
                              aria-label="breadcrumb"
                              display="flex"
                              justifyContent="space-around"
                              align="center"
                            >
                              <Typography color="text.primary">
                                {row?.flexible_active}
                              </Typography>
                              <Typography color="text.primary">
                                {row?.flexible_finished}
                              </Typography>
                            </Breadcrumbs>
                          </TableCell>
                          <TableCell align="center">
                            <Breadcrumbs
                              aria-label="breadcrumb"
                              display="flex"
                              justifyContent="space-around"
                              align="center"
                            >
                              <Typography color="text.primary">
                                {row?.locked_active}
                              </Typography>
                              <Typography color="text.primary">
                                {row?.locked_finished}
                              </Typography>
                            </Breadcrumbs>
                          </TableCell>
                          <TableCell align="center">
                            {/* {row.total_receive} */}
                            {Math.round(
                              (row.total_receive + Number.EPSILON) * 100
                            ) / 100}
                          </TableCell>
                          <TableCell align="center">
                            {row.status === "true" ? (
                              <Chip label="Verified" color="success" />
                            ) : (
                              <Chip label="Unverified" color="error" />
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {/* {row.registrationDate} */}
                            {moment(row.registrationDate).format(
                              "DD/MM/YYYY HH:mm "
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {row.geo_position}
                          </TableCell>
                          <TableCell align="center">
                            {/* {row.total_sent}  */}
                            {Math.round(
                              (row.total_sent + Number.EPSILON) * 100
                            ) / 100}{" "}
                            <span>&#36;</span>
                          </TableCell>
                          <TableCell align="center">{row.referral}</TableCell>
                          <TableCell align="center">{row.currency}</TableCell>
                          <TableCell padding="none" align="right">
                            <Box mr={2}>
                              {affiliate === true && (
                                <EditAffiliateModal
                                  email={row.email}
                                  phone={row.phone}
                                  password={row.password}
                                  userId={row.user_id}
                                  getUserList_req={getUserList_req}
                                />
                              )}
                              <IconButton
                                aria-label="details"
                                size="large"
                                onClick={() => openUser(row.user_id)}
                              >
                                <RemoveRedEyeIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer component={Paper}>
                {/* Pagination */}
                {rowList && (
                  <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={rowUserList?.allUsers}
                    rowsPerPage={rowUserList?.limit}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                )}
              </TableContainer>
              <Box
                mt={8}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Typography variant="subtitle1" color="inherit" component="div">
                  Export Data
                </Typography>
              </Box>
            </>
          ) : (
            <Loader />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UsersList;
