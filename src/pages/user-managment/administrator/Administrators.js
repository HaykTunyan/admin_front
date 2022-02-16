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
  TablePagination,
} from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import AddAdminModal from "../../../modal/AddAdminModal";
import EditAdminModal from "../../../modal/EditAdminModal";
import { instance } from "../../../services/api";
import NoData from "../../../components/NoData";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Card = styled(MuiCard)(spacing);

// Custom Style.

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const Administrators = () => {
  // Hooks.
  const [rowAdmin, getRowAdmin] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [primission, setPrimission] = useState("");

  const handleChangePage = (event, newPage) => {
    getAdminUsers(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  // Get Admins.
  const getAdminUsers = (page, rowsPerPage) => {
    return instance
      .get("/admin/all", {
        params: {
          limit: rowsPerPage,
          page: page,
          type: "savings",
        },
      })
      .then((data) => {
        getRowAdmin(data.data);
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
      .finally(() => {});
  };

  const getPrimission = () => {
    return instance.get("/admin/profile").then((data) => {
      setPrimission(data.data);
      return data;
    });
  };

  // use Effect.
  useEffect(() => {
    getAdminUsers();
    getPrimission();
  }, []);

  if (!rowAdmin?.admins) {
    return <NoData />;
  }

  return (
    <>
      <Helmet title="Administrators" />
      <Grid container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Administrators
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card mb={6}>
            <CardContent>
              <Card mb={6}>
                <Grid display="flex" justifyContent="flex-end">
                  <Grid item>
                    <AddAdminModal
                      getAdminUsers={getAdminUsers}
                      primission={primission}
                    />
                  </Grid>
                </Grid>
                <Paper>
                  <TableWrapper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Admin Name</TableCell>
                          <TableCell align="center">Email</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowAdmin?.admins &&
                          rowAdmin?.admins.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="center">{row.email}</TableCell>
                              <TableCell align="center">
                                <Box mr={2}>
                                  <EditAdminModal
                                    email={row.email}
                                    name={row.name}
                                    id={row.id}
                                    permissions={row.permissions}
                                    role={row.role}
                                    getAdminUsers={getAdminUsers}
                                  />
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
                rowsPerPageOptions={[10]}
                component="div"
                count={rowAdmin?.allCount}
                rowsPerPage={rowAdmin?.limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Administrators;
