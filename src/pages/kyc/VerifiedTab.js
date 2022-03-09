import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@mui/styles";
import { instance } from "../../services/api";
import { spacing } from "@material-ui/system";
import moment from "moment";
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
  Card as MuiCard,
  Grid,
  IconButton,
} from "@material-ui/core";
import CSVButton from "../../components/CSVButton";
import PendingInformationModal from "../../modal/PendingInformationModal";
import PendingDocumentModal from "../../modal/PendingDocumentModal";
import PendingVerifyModal from "../../modal/PendingVerifyModal";
import NoData from "../../components/NoData";
import DateRange from "../../components/date-picker/DateRange";
import { ArrowDown, ArrowUp } from "react-feather";
import SearchComponent from "../../components/SearchComponent";

// Spacing.
const Paper = styled(MuiPaper)(spacing);
const Card = styled(MuiCard)(spacing);

// Custom Style.
const useStyles = makeStyles({
  rootTable: {
    margin: "10px",
  },
});

export const cellList = [
  {
    id: "1",
    head: "ID",
    sortable: true,
    param: "id",
  },
  {
    id: "2",
    head: "Email",
    sortable: true,
    param: "email",
  },
  {
    id: "3",
    head: "Registration Date",
    sortable: true,
    param: "registration_date",
  },
  {
    id: "4",
    head: "Verification Date",
    sortable: true,
    param: "verification_date",
  },
  {
    id: "5",
    head: "Information",
    sortable: false,
  },
  {
    id: "6",
    head: "Uploaded Documents",
    sortable: false,
  },
  {
    id: "7",
    head: "Send for Verification",
    sortable: false,
  },
];

const VerifiedTable = () => {
  // Hooks.
  const classes = useStyles();
  const [rowVerified, setRowVerified] = useState([]);
  const rows = rowVerified?.kyc;

  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //Search
  const [searchInput, setSearchInput] = useState("");
  //Filters
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //Sorting
  const [sort, setSort] = useState({
    type: "decreasing",
    param: "",
  });
  //Permissions
  const [permission, setPermission] = useState("");

  //Handling Search
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    getKyc(
      1,
      rowsPerPage,
      searchValue === "" ? null : searchValue,
      startDate,
      endDate
    );
  };

  //Handling Calendar
  const onChangeTime = (newValue) => {
    setStartDate(moment(newValue[0]).format("YYYY-MM-DD"));
    setEndDate(moment(newValue[1]).format("YYYY-MM-DD"));
    setValue(newValue);

    if (newValue[1]) {
      getKyc(
        1,
        rowsPerPage,
        searchInput,
        moment(newValue[0]).format("YYYY-MM-DD"),
        moment(newValue[1]).format("YYYY-MM-DD")
      );
    }
  };

  //Handling Sorting
  const handleSorting = (id, param) => {
    setSort({
      [`sorted_${id}`]: true,
      type: sort.type === "decreasing" ? "increasing" : "decreasing",
      param: param,
    });

    getKyc(
      page,
      rowsPerPage,
      searchInput,
      startDate,
      endDate,
      sort.type === "decreasing" ? "increasing" : "decreasing",
      param
    );
  };

  const handleChangePage = (event, newPage) => {
    getKyc(
      newPage + 1,
      rowsPerPage,
      searchInput,
      startDate,
      endDate,
      sort.type,
      sort.param
    );
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  // Profile.
  const getPermission = () => {
    return instance.get("/admin/profile").then((data) => {
      setPermission(data.data);
      return data;
    });
  };

  // get Savings.
  const getKyc = (
    page,
    rowsPerPage,
    search,
    start_date,
    end_date,
    sort_type,
    sort_param
  ) => {
    let params = {
      type: 4,
      page: page,
      limit: rowsPerPage,
      search: search,
      start_date: start_date,
      end_date: end_date,
      sort_type: sort_type,
      sort_param: sort_param,
    };

    let result = Object.keys(params).filter(
      (key) => !params[key] || params[key] === ""
    );

    for (let item of result) {
      delete params[`${item}`];
    }

    console.log("PARAMS ==>", params);
    return instance
      .get("/admin/kyc/all", {
        params: params,
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
    getPermission();
    getKyc();
  }, []);

  return (
    <Fragment>
      <Card p={4}>
        <Grid container alignItems="center" gap={4}>
          <Grid item xs={12} md={3}>
            <Box component="div">
              <SearchComponent onChange={(e) => searchItems(e.target.value)} />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <DateRange value={value} onChange={onChangeTime} />
          </Grid>
        </Grid>
      </Card>
      <Paper>
        {!rows ? (
          <NoData />
        ) : (
          <TableContainer component={Paper} className={classes.rootTable}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {cellList?.map((item) => (
                    <TableCell key={item.id} align="left">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        onMouseOver={() =>
                          setSort({ ...sort, [`show_${item.id}`]: true })
                        }
                        onMouseLeave={() =>
                          setSort({ ...sort, [`show_${item.id}`]: false })
                        }
                        onClick={() =>
                          handleSorting(Number(item.id), item.param)
                        }
                      >
                        {item.head}

                        {item.sortable === true &&
                          (sort[`sorted_${item.id}`] === true ||
                            sort[`show_${item.id}`] === true) && (
                            <Box sx={{ display: "flex" }}>
                              <IconButton
                                onClick={() =>
                                  handleSorting(Number(item.id), item.param)
                                }
                              >
                                {sort.type === "increasing" ? (
                                  <ArrowUp size={16} />
                                ) : (
                                  <ArrowDown size={16} />
                                )}
                              </IconButton>
                            </Box>
                          )}
                      </Box>
                    </TableCell>
                  ))}
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
                        <PendingInformationModal
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
                        <PendingDocumentModal
                          pandingId={row.user_id}
                          documentType={row.document_type}
                          documentBack={row.document_back}
                          documentFront={row.document_front}
                          selfie={row.selfie}
                        />
                      </TableCell>
                      <TableCell>
                        {permission?.role === 1 && (
                          <PendingVerifyModal
                            subTitle="Verifiy Again"
                            user_id={row.user_id}
                            statusKyc={2}
                            from={"verified"}
                            getKYC={getKyc}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* Pagination */}
            {rows && (
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={rowVerified?.allCount}
                rowsPerPage={rowVerified?.limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </TableContainer>
        )}
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
