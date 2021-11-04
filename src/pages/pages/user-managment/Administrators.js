import React, { useState } from "react";
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
  Button as MuiButton,
  Card as MuiCard,
  FormControl as MuiFormControl,
  TextField as MuiTextField,
  Typography,
  CardHeader,
  Chip as MuiChip,
  TablePagination,
} from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import AddAdminModal from "../../modal/AddAdminModal";
import EditAdminModal from "../../modal/EditAdminModal";
import CSVButton from "../../components/CSVButton";
import { useSelector } from "react-redux";

const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Card = styled(MuiCard)(spacing);

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

const Administrators = () => {
  // hooks.
  const adminUser = useSelector((state) => state.user);
  const rows = adminUser.adminList;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Helmet title="Administrators" />

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
                <CardHeader
                  action={<AddAdminModal />}
                  title="Admin User List"
                />
                <Paper>
                  <TableWrapper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Admin Name</TableCell>
                          <TableCell align="center">Email</TableCell>
                          <TableCell align="center">Admin Type</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="center">{row.email}</TableCell>
                              <TableCell align="center">
                                <Chip label={row.type} color="success" />
                              </TableCell>
                              <TableCell align="center">
                                <Box mr={2}>
                                  <EditAdminModal />
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
  );
};

export default Administrators;
