import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserList_req } from "../../../redux/actions/users";
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
} from "@material-ui/core";
import CSVButton from "../../components/CSVButton";

const Typography = styled(MuiTypography)(spacing);

const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const UsersListTable = ({ rowUserList }) => {
  // hooks
  const dispatch = useDispatch();
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getUserList_req());
  }, []);

  return (
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
                <TableCell>Account Number</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Balance</TableCell>
                <TableCell align="center">Flexible Saving</TableCell>
                <TableCell align="center">Locked Saving</TableCell>
                <TableCell align="center">Total Profile</TableCell>
                <TableCell align="center">Status KYC</TableCell>
                <TableCell align="center">Date Register</TableCell>
                <TableCell align="center">Geo Position</TableCell>
                <TableCell align="center">View Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowUserList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.balance}</TableCell>
                    <TableCell align="center">{row.flexible_saving}</TableCell>
                    <TableCell align="center">{row.locked_saving}</TableCell>
                    <TableCell align="center">{row.total_profile}</TableCell>
                    <TableCell align="center">{row.status_kyc}</TableCell>
                    <TableCell align="center">{row.date_register}</TableCell>
                    <TableCell align="center">{row.geo_positon}</TableCell>
                    <TableCell padding="none" align="center">
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
            count={rowUserList.length}
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
        <CSVButton data={rowUserList} />
      </Box>
    </Fragment>
  );
};

export default UsersListTable;
