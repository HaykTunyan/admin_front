import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet-async";
import { spacing } from "@material-ui/system";
import { useNavigate } from "react-router-dom";
import { darken } from "polished";
import { useSelector, useDispatch } from "react-redux";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
  Box,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography as MuiTypography,
  InputBase,
  TablePagination,
  Breadcrumbs,
  Chip as MuiChip,
} from "@material-ui/core";
import CSVButton from "../../../components/CSVButton";
import { Search as SearchIcon } from "react-feather";
import AddAffiliateUser from "../../../modal/AddAffiliateUser";
import instance from "../../../services/api";
import Loader from "../../../components/Loader";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Typography = styled(MuiTypography)(spacing);

// Custome Style.

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

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const headCells = [
  { id: "id", alignment: "left", label: "Order ID" },
  { id: "email", alignment: "left", label: "Email" },
  { id: "phone", alignment: "left", label: "Phone" },
  { id: "balance", alignment: "left", label: "Balance" },
  { id: "flexible_saving", alignment: "left", label: "Flexible Saving" },
  { id: "locked_saving", alignment: "left", label: "Locked Saving" },
  { id: "total_profit", alignment: "left", label: "Total Profit" },
  { id: "status_kyc", alignment: "left", label: "Status KYC" },
  { id: "date_register", alignment: "left", label: "Date Register" },
  { id: "action", alignment: "right", label: "Action" },
];

const AffiliateUsers = () => {
  // hooks
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [sortModel, setSortModel] = useState([
    {
      field: "commodity",
      sort: "asc",
    },
  ]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("customer");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowAffiliate, setRowAffiliate] = useState([]);
  const rows = rowAffiliate.users;

  console.log("rowAffiliate  ", rowAffiliate);

  const getAffiliate = () => {
    return instance
      .get("/admin/user/all", { mode: "no-cors" })
      .then((data) => {
        console.log(" affiliate users ", data);
        setRowAffiliate(data.data);
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  useEffect(() => {
    getAffiliate();
  }, []);

  if (!rows) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Helmet title="Affilate Users" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Affilate Users
          </Typography>
        </Grid>
        <Grid item>
          <div>{/* <AddAffiliateUser /> */}</div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Toolbar>
            <Grid container display="flex" justifyContent="space-between">
              <Grid item>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <Input placeholder={t("searchList")} />
                </Search>
              </Grid>
              <Grid item>
                <AddAffiliateUser />
              </Grid>
            </Grid>
          </Toolbar>
          <Fragment>
            <Paper>
              <TableContainer component={Paper} className={classes.rootTable}>
                <Table
                  aria-label="simple table"
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
                          <Typography color="text.primary">finish</Typography>
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
                          <Typography color="text.primary">finish</Typography>
                        </Breadcrumbs>
                      </TableCell>
                      <TableCell align="center">Receive</TableCell>
                      <TableCell align="center">Status KYC</TableCell>
                      <TableCell align="center">Date Register</TableCell>
                      <TableCell align="center">Geo Position</TableCell>
                      <TableCell align="center">Send</TableCell>
                      <TableCell align="center">Referral</TableCell>
                      <TableCell align="center">Currency</TableCell>
                      <TableCell align="right">View</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows &&
                      rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="center">{row.email}</TableCell>
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
                                <IconButton
                                  aria-label="details"
                                  size="large"
                                  onClick={() => navigate("/view-user")}
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
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={rows.length}
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
              <CSVButton data={rows} />
            </Box>
          </Fragment>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AffiliateUsers;
