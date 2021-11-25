import React, { useEffect, useState } from "react";
import {
  Box,
  CardContent,
  Divider as MuiDivider,
  Grid,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card as MuiCard,
  Typography,
  Chip as MuiChip,
  TablePagination,
  InputBase,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import AddAdminModal from "../../../modal/AddAdminModal";
import EditAdminModal from "../../../modal/EditAdminModal";
import { Search as SearchIcon } from "react-feather";
import CSVButton from "../../../components/CSVButton";
import { darken } from "polished";
import { useSelector } from "react-redux";
import instance from "../../../services/api";
import Loader from "../../../components/Loader";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Card = styled(MuiCard)(spacing);

// Custom Style.
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

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

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const Administrators = () => {
  // hooks.
  const adminUser = useSelector((state) => state.userData);
  const rows = adminUser.adminList;
  const [rowAdmin, getRowAdmin] = useState([]);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(" row Admin ", rowAdmin);

  const getAdminUsers = () => {
    return instance
      .get("/admin/all", { mode: "no-cors" })
      .then((data) => {
        console.log("Admin Users", data);
        getRowAdmin(data.data);
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getAdminUsers();
  }, []);

  return (
    <>
      <Helmet title="Administrators" />
      {!rowAdmin ? (
        <Loader />
      ) : (
        <>
          <Grid justifyContent="space-between" container spacing={10}>
            <Grid item>
              <Typography variant="h3" gutterBottom display="inline">
                Administrators
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
          <Divider my={6} />

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card mb={6}>
                <CardContent>
                  <Card mb={6}>
                    <Grid display="flex" justifyContent="space-between">
                      <Grid item>
                        <Search>
                          <SearchIconWrapper>
                            <SearchIcon />
                          </SearchIconWrapper>
                          <Input placeholder={t("searchList")} />
                        </Search>
                      </Grid>
                      <Grid item>
                        <AddAdminModal />
                      </Grid>
                    </Grid>

                    <Paper>
                      <TableWrapper>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Admin Name</TableCell>
                              <TableCell align="center">Email</TableCell>
                              {/* <TableCell align="center">Admin Satus</TableCell> */}
                              <TableCell align="center">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rowAdmin.admins &&
                              rowAdmin.admins
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => (
                                  <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                      {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                      {row.email}
                                    </TableCell>
                                    {/* <TableCell align="center">
                                      {row.status ? (
                                        <Chip label="Active" color="success" />
                                      ) : (
                                        <Chip label="Passive" color="warning" />
                                      )}
                                    </TableCell> */}
                                    <TableCell align="center">
                                      <Box mr={2}>
                                        <EditAdminModal key={row.id} />
                                      </Box>
                                    </TableCell>
                                  </TableRow>
                                ))}
                          </TableBody>
                        </Table>
                      </TableWrapper>
                    </Paper>
                  </Card>
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
                </CardContent>
              </Card>
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
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Administrators;
