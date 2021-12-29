import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { Search as SearchIcon } from "react-feather";
import { darken } from "polished";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { spacing } from "@material-ui/system";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import { instance } from "../../../services/api";
// import { useDispatch } from "react-redux";
import moment from "moment";
import {
  Box,
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  InputBase,
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
  Button,
} from "@material-ui/core";
import Loader from "../../../components/Loader";
import EditAffiliateModal from "../../../modal/EditAffiliateUser";
import DateRange from "../../../components/date-picker/DateRange";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Spacer = styled.div(spacing);

// Custom Style.
const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
    overflowX: "auto",
  },
});

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  // width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 160px;
  }
`;

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const UsersList = ({ affiliate }) => {
  console.log("Affiliate==>", affiliate);
  // hooks
  const { t } = useTranslation();
  const classes = useStyles();
  const navigate = useNavigate();
  const [rowUserList, setRowUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortModel, setSortModel] = useState([
    {
      field: "commodity",
      sort: "asc",
    },
  ]);

  const rowList = rowUserList?.users;

  const onChangeTime = (newValue) => {
    setStartDate(moment(newValue[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newValue[1]).format("YYYY-MM-DD"));
    setValue(newValue);
  };

  const openUser = (id) => {
    navigate("/view-user", { state: { id } });
    console.log(" open profile  id ", id);
  };

  const handleChangePage = (event, newPage) => {
    getUserList_req(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUserList_req = (page, rowsPerPage) => {
    return instance
      .get("/admin/user/all", {
        mode: "no-cors",
        params: {
          isAffiliate: affiliate,
          page: page,
          limit: rowsPerPage,
        },
      })
      .then((data) => {
        console.log("DATA of USERS ==>", data);
        setRowUserList(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getUserList_req();
  }, [affiliate]);

  return (
    <Fragment>
      {affiliate ? (
        <Helmet title="Affiliate Users" />
      ) : (
        <Helmet title="Users" />
      )}

      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {affiliate ? <span> Affiliate Users </span> : <span> Users </span>}
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />

      <Grid container display="flex" alignItems="center">
        <Grid item md={2}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Input placeholder={t("searchList")} />
          </Search>
        </Grid>
        <Spacer mx={5} />
        <Grid item md={4}>
          <DateRange value={value} onChange={onChangeTime} />
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {rowUserList ? (
            <Fragment>
              <Paper>
                <TableContainer component={Paper} className={classes.rootTable}>
                  <Table
                    aria-label="sticky table"
                    sortModel={sortModel}
                    onSortModelChange={(model) => setSortModel(model)}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Balance</TableCell>
                        <TableCell align="center">
                          Flexible
                          <Breadcrumbs
                            aria-label="breadcrumb"
                            display="flex"
                            justifyContent="space-around"
                            align="center"
                          >
                            <Typography color="text.primary">active</Typography>
                            <Typography color="text.primary">
                              finished
                            </Typography>
                          </Breadcrumbs>
                        </TableCell>
                        <TableCell align="center">
                          Locked
                          <Breadcrumbs
                            aria-label="breadcrumb"
                            display="flex"
                            justifyContent="space-around"
                            align="center"
                          >
                            <Typography color="text.primary">active</Typography>
                            <Typography color="text.primary">
                              finished
                            </Typography>
                          </Breadcrumbs>
                        </TableCell>
                        <TableCell align="center">Received</TableCell>
                        <TableCell align="center">Status KYC</TableCell>
                        <TableCell align="center">Date Register</TableCell>
                        <TableCell align="center">Geo Position</TableCell>
                        <TableCell align="center">Sent</TableCell>
                        <TableCell align="center">Referral</TableCell>
                        <TableCell align="center">Currency</TableCell>
                        <TableCell align="right">View</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowList &&
                        rowList.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="center">
                              <Button onClick={() => openUser(row.id)}>
                                {row.email}
                              </Button>
                            </TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">{row.balance}</TableCell>
                            <TableCell align="center">
                              <Breadcrumbs
                                aria-label="breadcrumb"
                                display="flex"
                                justifyContent="space-around"
                                align="center"
                              >
                                <Typography color="text.primary">
                                  {row?.flexible?.active}
                                </Typography>
                                <Typography color="text.primary">
                                  {row?.flexible?.finished}
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
                                  {row?.locked?.active}
                                </Typography>
                                <Typography color="text.primary">
                                  {row?.locked?.finished}
                                </Typography>
                              </Breadcrumbs>
                            </TableCell>
                            <TableCell align="center">{row.receive}</TableCell>
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
                              {row.geoPosition}
                            </TableCell>
                            <TableCell align="center">
                              {row.send} <span>&#36;</span>{" "}
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
                                    userId={row.id}
                                  />
                                )}
                                <IconButton
                                  aria-label="details"
                                  size="large"
                                  onClick={() => openUser(row.id)}
                                >
                                  <RemoveRedEyeIcon />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {/* Pagination */}
                  <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={rowUserList?.allUsers}
                    rowsPerPage={rowUserList?.limit}
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
                {/* <CSVButton data={rowsPerPage?.users} /> */}
              </Box>
            </Fragment>
          ) : (
            <Loader />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UsersList;
