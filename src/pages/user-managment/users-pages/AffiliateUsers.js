import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import { useHistory, useNavigate } from "react-router-dom";
import moment from "moment";
import instance from "../../../services/api";
import {
  Box,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Paper as MuiPaper,
  Breadcrumbs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  InputBase,
  Chip as MuiChip,
} from "@material-ui/core";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import CSVButton from "../../../components/CSVButton";
import { Search as SearchIcon } from "react-feather";
import AddAffiliateUser from "../../../modal/AddAffiliateUser";
import Loader from "../../../components/Loader";
import EditAffiliateModal from "../../../modal/EditAffiliateUser";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);

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

const AffiliateUsers = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // const history = useHistory()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowAffiliate, setRowAffiliate] = useState([]);
  const affiliateList = rowAffiliate.users;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const openProfile = (id) => {
    navigate("/view-affiliate", { state: { id } });
    console.log(" open profile  id ", id);
  };

  const getAffiliate = () => {
    return instance
      .get("/admin/user/all", { params: { isAffiliate: true } })
      .then((data) => {
        setRowAffiliate(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getAffiliate();
  }, []);

  if (!affiliateList) {
    return <Loader />;
  }

  console.log(" affiliateList ", affiliateList);
  return (
    <Fragment>
      <Helmet title="Affilate Users" />
      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Affilate Users
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Fragment>
            <Paper>
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
              <TableContainer>
                <Table
                  aria-labelledby="tableTitle"
                  size={"medium"}
                  aria-label="enhanced table"
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
                    {affiliateList &&
                      affiliateList
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
                                <EditAffiliateModal
                                  email={row.email}
                                  phone={row.phone}
                                  password={row.password}
                                  userId={row.id}
                                />
                                <IconButton
                                  aria-label="details"
                                  size="large"
                                  // onClick={() => navigate("/view-affiliate")}
                                  onClick={() => openProfile(row.id)}
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={affiliateList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
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
              <CSVButton data={affiliateList} />
            </Box>
          </Fragment>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AffiliateUsers;
