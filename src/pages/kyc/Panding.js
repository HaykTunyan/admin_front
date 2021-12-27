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
import PandingInformationModal from "../../modal/PandingInformationModal";
import PandingDocumentModal from "../../modal/PandingDocumentModal";
import PandingVerififeyModal from "../../modal/PandingVerififeyModal";
import { useDispatch } from "react-redux";
import { verifyKyc } from "../../redux/actions/kyc";
import SuccessModal from "../../modal/SuccessModal";
import NoData from "../../components/NoData";

// Spacing.
const Paper = styled(MuiPaper)(spacing);

// Custom Style.
const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

const PandingTable = () => {
  // hooks.
  const classes = useStyles();
  const dispatch = useDispatch();
  const [panding, setPanding] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = panding?.kyc;
  const [errorMes, setErrorMes] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  //   get Savings.
  const getKyc = () => {
    return instance
      .get("/admin/kyc/all", {
        params: {
          limit: null,
          page: 1,
          type: 3,
        },
      })
      .then((data) => {
        setPanding(data.data);
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
    return <NoData />;
  }

  const handleVerifed = (user_id) => {
    console.log(" values ", user_id);
    const status_kyc = 4;
    console.log(" status_kyc ", status_kyc);
    dispatch(verifyKyc(user_id, status_kyc))
      .then((data) => {
        if (data.success) {
          return <SuccessModal />;
        }
      })
      .catch((error) => {
        console.log(" error messages ", error?.response?.data);
        setErrorMes(error?.response?.data?.message);
        console.log("errorMes", errorMes);
      });
    return <SuccessModal />;
  };

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
                <TableCell>Verification</TableCell>
                <TableCell>Send for verification</TableCell>
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
                        <Button
                          variant="contained"
                          onClick={() => handleVerifed(row.user_id)}
                        >
                          Verifiy
                        </Button>
                      </TableCell>
                      <TableCell>
                        <PandingVerififeyModal
                          subTitle="Send For Verification"
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

export default PandingTable;
