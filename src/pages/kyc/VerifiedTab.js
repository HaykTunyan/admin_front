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
} from "@material-ui/core";
import moment from "moment";
import { spacing } from "@material-ui/system";
import CSVButton from "../../components/CSVButton";
import PandingInformationModal from "../../modal/PandingInformationModal";
import PandingDocumentModal from "../../modal/PandingDocumentModal";
import PandingVerififeyModal from "../../modal/PandingVerififeyModal";
import NoData from "../../components/NoData";

// Spacing.
const Paper = styled(MuiPaper)(spacing);

// Custom Style.
const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const VerifiedTable = () => {
  // hooks.
  const classes = useStyles();
  const [rowVerified, setRowVerified] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = rowVerified?.kyc;

  const handleChangePage = (event, newPage) => {
    getKyc(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  // get Savings.
  const getKyc = (page, rowsPerPage) => {
    return instance
      .get("/admin/kyc/all", {
        params: {
          limit: rowsPerPage,
          page: page,
          type: 4,
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
  useEffect(() => getKyc(), []);

  // Loader.
  if (!rows?.length) {
    return <NoData />;
  }

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
                <TableCell>Verification Date</TableCell>
                <TableCell>Information</TableCell>
                <TableCell>Uploaded Documents</TableCell>
                <TableCell>Send for verification</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row) => (
                  <TableRow
                    key={row.user_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.user_id}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      {moment(row.registration_date).format(
                        "DD/MM/YYYY HH:mm "
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(row.verification_date).format(
                        "DD/MM/YYYY HH:mm "
                      )}
                    </TableCell>
                    <TableCell>
                      <PandingInformationModal
                        pandingId={row.user_id}
                        name={row.name}
                        surname={row.surname}
                        dateBirthday={row.date_of_birth}
                        contact={row.address}
                        country={row.country}
                        documentType={row.document_type}
                      />
                    </TableCell>
                    <TableCell>
                      <PandingDocumentModal
                        pandingId={row.user_id}
                        documentType={row.document_type}
                        documentBack={row.document_back}
                        documentFront={row.document_front}
                        selfie={row.selfie}
                      />
                    </TableCell>
                    <TableCell>
                      <PandingVerififeyModal
                        subTitle="Verifiy Again"
                        kycId={row.user_id}
                        statusKyc={2}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={rowVerified?.allCount}
            rowsPerPage={rowVerified?.limit}
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

export default VerifiedTable;
