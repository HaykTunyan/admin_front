import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { useNavigate, useLocation } from "react-router-dom";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

export const cellList = [
  {
    id: "1",
    head: "ID",
    sortable: false,
  },
  {
    id: "2",
    head: "Email",
    sortable: true,
    param: "email",
  },
  {
    id: "3",
    head: "Phone",
    sortable: false,
  },
  {
    id: "4",
    head: "Balance",
    sortable: true,
    param: "total_balance",
  },
  {
    id: "5",
    head: "Flexible",
    sortable: true,
    param: "flexible",
  },
  {
    id: "6",
    head: "Locked",
    sortable: true,
    param: "locked",
  },
  {
    id: "7",
    head: "Received",
    sortable: true,
    param: "total_receive",
  },
  {
    id: "8",
    head: "Status KYC",
    sortable: false,
  },
  {
    id: "9",
    head: "Date Register",
    sortable: true,
    param: "registration_date",
  },
  {
    id: "10",
    head: "Geo Position",
    sortable: true,
    param: "geo_position",
  },
  {
    id: "11",
    head: "Sent",
    sortable: true,
    param: "total_sent",
  },
  {
    id: "12",
    head: "Referral",
    sortable: false,
  },
  {
    id: "13",
    head: "Currency",
    sortable: false,
  },
  {
    id: "14",
    head: "View",
    sortable: false,
  },
];

const UsersList = ({ affiliate }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [rowUserList, setRowUserList] = useState([]);
  const rowList = rowUserList?.users;

  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //Search
  const [searchEmail, setSearchEmail] = useState(null);
  // Filters
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(
    state && state.status ? state.status : ""
  );
  // Sorting
  const [depositSort, setDepositSort] = useState("");
  const [sort, setSort] = useState({
    type: "decreasing",
    param: "",
  });

  // Handling Search
  const handleSearch = (searchValue, page, rowPerPage) => {
    setSearchEmail(searchValue);

    getUserList_req(
      1,
      rowsPerPage,
      startDate,
      endDate,
      Number(selectedStatus),
      searchValue === "" ? null : searchValue
    );
  };

  // Handling Calendar
  const onChangeTime = (newValue) => {
    setStartDate(moment(newValue[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newValue[1]).format("YYYY-MM-DD"));
    setValue(newValue);

    if (newValue[1]) {
      getUserList_req(
        1,
        rowsPerPage,
        moment(newValue[0]).format("YYYY-MM-DD"),
        moment(newValue[1]).format("YYYY-MM-DD"),
        Number(selectedStatus),
        searchEmail
      );
    }
  };

  // Status KYC Filter
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    getUserList_req(
      page,
      rowsPerPage,
      startDate,
      endDate,
      Number(event.target.value),
      searchEmail
    );
  };

  //Handle Sorting
  const handleSorting = (id, param) => {
    setSort({
      [`sorted_${id}`]: true,
      type: sort.type === "decreasing" ? "increasing" : "decreasing",
      param: id === 5 || id === 6 ? `${param}_${depositSort}` : param,
    });

    getUserList_req(
      page,
      rowsPerPage,
      startDate,
      endDate,
      Number(selectedStatus),
      searchEmail,
      sort.type === "decreasing" ? "increasing" : "decreasing",
      id === 5 || id === 6 ? `${param}_${depositSort}` : param
    );
  };

  const handleDepositChange = (id, param) => {
    setSort({
      [`sorted_${id}`]: true,
      type: sort.type,
      param: `${param}_${depositSort === "active" ? "finished" : "active"}`,
    });
    setDepositSort(depositSort === "active" ? "finished" : "active");

    getUserList_req(
      page,
      rowsPerPage,
      startDate,
      endDate,
      Number(selectedStatus),
      searchEmail,
      sort.type,
      `${param}_${depositSort === "active" ? "finished" : "active"}`
    );
  };

  const openUser = (id) => {
    navigate("/view-user", { state: { id, affiliate } });
  };

  const handleChangePage = (event, newPage) => {
    getUserList_req(
      newPage + 1,
      rowsPerPage,
      startDate,
      endDate,
      Number(selectedStatus),
      searchEmail
    );
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const getUserList_req = (
    page,
    rowsPerPage,
    createdFrom,
    createdTo,
    status,
    email,
    sort_type,
    sort_param
  ) => {
    let params = {
      isAffiliate: affiliate,
      page: page,
      limit: rowsPerPage,
      createdFrom: createdFrom,
      createdTo: createdTo,
      status_kyc: status,
      email: email,
      sort_type: sort_type,
      sort_param: sort_param,
    };

    let result = Object.keys(params).filter(
      (key) => !params[key] || params[key] === ""
    );

    for (let item of result) {
      delete params[`${item}`];
    }

    return instance
      .get(`/admin/user/all`, {
        mode: "no-cors",
        params: params,
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

  // Use Effect.
  useEffect(() => {
    getUserList_req(
      1,
      10,
      startDate,
      endDate,
      Number(selectedStatus),
      searchEmail
    );
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
        <Grid container>
          <Grid item xs={12} sm={4} md={3}>
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
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={{
              paddingX: "10px",
            }}
          >
            <DateRange value={value} onChange={onChangeTime} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={{
              paddingX: "10px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="select-status">Status</InputLabel>
              <Select
                labelId="select-status"
                id="select-status"
                label="Status"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                <MenuItem value={"4"}>{"Verification passed"}</MenuItem>
                <MenuItem value={"1"}>{"Pending"}</MenuItem>
                <MenuItem value={"2"}>{"Rejected"}</MenuItem>
                <MenuItem value={"0"}>{"Unverified"}</MenuItem>
              </Select>
            </FormControl>
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
                      {cellList?.map((item) => (
                        <TableCell key={item.id} align="center">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onMouseOver={() =>
                              setSort({ ...sort, [`show_${item.id}`]: true })
                            }
                            onMouseLeave={() =>
                              setSort({ ...sort, [`show_${item.id}`]: false })
                            }
                            onClick={() =>
                              handleSorting(Number(item.id), item.param)
                            }
                          >
                            {item.head}

                            {item.sortable === true &&
                              (sort[`sorted_${item.id}`] === true ||
                                sort[`show_${item.id}`] === true) && (
                                <Box sx={{ display: "flex" }}>
                                  <IconButton
                                    onClick={() =>
                                      handleSorting(Number(item.id), item.param)
                                    }
                                  >
                                    {sort.type === "increasing" ? (
                                      <ArrowUp size={16} />
                                    ) : (
                                      <ArrowDown size={16} />
                                    )}
                                  </IconButton>
                                </Box>
                              )}
                          </Box>
                          {(Number(item.id) === 5 || Number(item.id) === 6) && (
                            <RadioGroup
                              aria-labelledby={`radio-group`}
                              name={`radio-group`}
                              value={
                                sort[`sorted_${item.id}`] === true &&
                                depositSort
                              }
                              onChange={() =>
                                handleDepositChange(item.id, item.param)
                              }
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
                                <Box>
                                  <FormControlLabel
                                    value="active"
                                    control={<Radio size="small" />}
                                    label="active"
                                    labelPlacement="top"
                                  />
                                </Box>
                                <Box>
                                  <FormControlLabel
                                    value="finished"
                                    control={<Radio size="small" />}
                                    label="finished"
                                    labelPlacement="top"
                                  />
                                </Box>
                              </Breadcrumbs>
                            </RadioGroup>
                          )}
                        </TableCell>
                      ))}
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
                            {row.status_kyc === 1 || row.status_kyc === 3 ? (
                              <Chip label="Pending" color="warning" />
                            ) : row.status_kyc === 4 ? (
                              <Chip label="Verified" color="success" />
                            ) : row.status_kyc === 2 ? (
                              <Chip label="Rejected" color="error" />
                            ) : (
                              <Chip label="Unverified" color="error" />
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {/* {row.registrationDate} */}
                            {moment(row.registration_date).format(
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
