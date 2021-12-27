import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { spacing } from "@material-ui/system";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  IconButton,
  Typography as MuiTypography,
  TablePagination,
  Breadcrumbs,
  Chip as MuiChip,
  Button,
} from "@material-ui/core";
import CSVButton from "../../../components/CSVButton";
import moment from "moment";
import Loader from "../../../components/Loader";
import EditAffiliateModal from "../../../modal/EditAffiliateUser";

// Spacing.
const Typography = styled(MuiTypography)(spacing);

// Custom Style.
const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
    overflowX: "auto",
  },
});

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const UsersListTable = ({ rowUserList, affiliate }) => {
  // hooks
  const classes = useStyles();
  const navigate = useNavigate();
  const [sortModel, setSortModel] = useState([
    {
      field: "commodity",
      sort: "asc",
    },
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rowList = rowUserList.users;

  const openUser = (id) => {
    navigate("/view-user", { state: { id } });
    console.log(" open profile  id ", id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!rowList) {
    return <Loader />;
  }

  return (
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
                    <Typography color="text.primary">finished</Typography>
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
                    <Typography color="text.primary">finished</Typography>
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
                rowList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                      <TableCell align="center">{row.geoPosition}</TableCell>
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
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rowList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
      <Box mt={8} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={rowList} />
      </Box>
    </Fragment>
  );
};

export default UsersListTable;
