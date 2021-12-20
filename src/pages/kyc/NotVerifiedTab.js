import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { instance } from "../../services/api";
import {
  Box,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableHead,
  TablePagination,
  Button,
} from "@material-ui/core";
import moment from "moment";
import { spacing } from "@material-ui/system";
import CSVButton from "../../components/CSVButton";
import Loader from "../../components/Loader";
import PandingVerififeyModal from "../../modal/PandingVerififeyModal";
import SuccessModal from "../../modal/SuccessModal";

// Spacing.
const Paper = styled(MuiPaper)(spacing);

// Custom Style.
const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const NotVerifiedTable = () => {
  // hooks.
  const classes = useStyles();
  const [rowVerified, setRowVerified] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = rowVerified?.kyc;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getKyc = () => {
    return instance
      .get("/admin/kyc/all", {
        params: {
          limit: null,
          page: page,
          type: 1,
        },
      })
      .then((data) => {
        setRowVerified(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  // Use Effect.
  useEffect(() => {
    getKyc();
  }, []);

  // Loader.
  if (!rows?.length) {
    return <Loader />;
  }

  console.log("rowVerified", rowVerified);

  return (
    <Fragment>
      <Paper>
        <TableContainer component={Paper} className={classes.rootTable}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Registration Date</TableCell>
                <TableCell>Verification</TableCell>
                <TableCell align="right">Send For Verification</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.user_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.user_id}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        {moment(row.registration_date).format(
                          "DD/MM/YYYY HH:mm "
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="contained">Verifiy</Button>
                      </TableCell>
                      <TableCell align="right">
                        <PandingVerififeyModal
                          subTitle="Verified"
                          kycId={row.user_id}
                          statusKyc={4}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
      {rows && (
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
      )}
    </Fragment>
  );
};

export default NotVerifiedTable;
