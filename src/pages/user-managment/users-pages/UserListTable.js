import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { RemoveRedEye as RemoveRedEyeIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";
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
  Breadcrumbs,
} from "@material-ui/core";
import CSVButton from "../../../components/CSVButton";

// Spacing.
const Typography = styled(MuiTypography)(spacing);

// Custom Style.
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

  // useEffect(() => {
  //   // POST request using axios inside useEffect React hook
  //   const article = { title: "React Hooks POST Request Example" };
  //   axios
  //     .post("https://reqres.in/api/articles", article)
  //     .then((response) => setArticleId(response.data.id));

  //   // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }, []);

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
                <TableCell>Number</TableCell>
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
                <TableCell align="center">Referal</TableCell>
                <TableCell align="right">View</TableCell>
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
                    <TableCell align="center">
                      <Breadcrumbs
                        aria-label="breadcrumb"
                        display="flex"
                        justifyContent="space-around"
                        align="center"
                      >
                        <Typography color="text.primary">
                          {row.active_flexible}
                        </Typography>
                        <Typography color="text.primary">
                          {row.completed_flexible}
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
                          {row.active_saving}
                        </Typography>
                        <Typography color="text.primary">
                          {row.completed_saving}
                        </Typography>
                      </Breadcrumbs>
                    </TableCell>
                    <TableCell align="center">{row.receive}</TableCell>
                    <TableCell align="center">{row.status_kyc}</TableCell>
                    <TableCell align="center">{row.date_register}</TableCell>
                    <TableCell align="center">{row.geo_positon}</TableCell>
                    <TableCell align="center">
                      {row.send} <span>&#36;</span>{" "}
                    </TableCell>
                    <TableCell align="center">{row.referal}</TableCell>
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
