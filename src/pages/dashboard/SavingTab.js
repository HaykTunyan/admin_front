import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Typography as MuiTypography,
  Card as MuiCard,
  CardContent,
  Box,
  Tab,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  InputBase,
  Toolbar,
  Grid,
  Chip as MuiChip,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  TablePagination,
  IconButton,
  Collapse,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import CSVButton from "../../components/CSVButton";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import { darken } from "polished";
import {
  getDashboardSavingsList_req,
  getDashboardSavings_req,
} from "../../api/dashboardAPI";
import moment from "moment";

// Spacing.
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Spacer = styled.div(spacing);

// Custom Style.
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

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

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

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const SavingTab = ({ rowLocked, rowFlexible, startDate, endDate }) => {
  // hooks.
  const { t } = useTranslation();
  const [panel, setPanel] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [popularity, setPopularity] = useState("");
  // Locked Pages.
  const [pageLocked, setLockedPage] = useState(0);
  const [rowsLockedPage, setRowsLockedPage] = useState(5);
  // Flexible.
  const [pageFlexible, setFlexiblePage] = useState(0);
  const [rowsFlexiblePage, setRowsFlexiblePage] = useState(5);

  const [savings, setSavings] = useState([]);
  const [savingsList, setSavingsList] = useState({});
  const [open, setOpen] = useState({});

  const handleChangeFrom = (event) => {
    setFrom(event.target.value);
  };

  const handleChangeTo = (event) => {
    setTo(event.target.value);
  };

  const handlePopularityChange = (event) => {
    setPopularity(event.target.value);
  };

  const handleChangePanel = (event, newPanel) => {
    console.log("NEW PANEL ==>", newPanel);
    setPanel(newPanel);
    getSavings(newPanel === 1 ? "locked" : "flexible");
  };

  // Locked Pagination.
  const handleLockedPage = (event, newLockedPage) => {
    setLockedPage(newLockedPage);
  };

  const handleRowsLockedPage = (event) => {
    setRowsLockedPage(+event.target.value);
    setLockedPage(0);
  };

  // Flexible Pagination.
  const handleFlexiblePage = (event, newFlexiblePage) => {
    setFlexiblePage(newFlexiblePage);
  };

  const handleRowsFlexiblePage = (event) => {
    setRowsFlexiblePage(+event.target.value);
    setFlexiblePage(0);
  };

  const handleExpand = (e, coinId) => {
    if (
      open[`${e.currentTarget.id}`] === undefined ||
      open[`${e.currentTarget.id}`] === false
    ) {
      getSavingsList(panel === 1 ? "locked" : "flexible", coinId);
    }
    setOpen({
      ...open,
      [`${e.currentTarget.id}`]: !open[`${e.currentTarget.id}`],
    });
  };

  async function getSavings(type) {
    console.log("TYPE ==>", type);
    try {
      const response = await getDashboardSavings_req(type, startDate, endDate);
      if (response) {
        console.log("GET SAVINGS RESPONSE ==>", response);
        setSavings(response.result);
      }
    } catch (e) {
      console.log("GET SAVINGS ERROR ==>", e);
    }
  }

  async function getSavingsList(type, coinId) {
    console.log("TYPE ==>", type);
    console.log("Coin ID ==>", coinId);
    try {
      const response = await getDashboardSavingsList_req(
        type,
        startDate,
        endDate,
        coinId,
        10,
        1
      );
      if (response) {
        console.log("GET SAVINGS LIST RESPONSE ==>", response);
        setSavingsList({ ...savingsList, [`${coinId}`]: response.savings });
      }
    } catch (e) {
      console.log("GET SAVINGS LIST ERROR ==>", e.response);
    }
  }

  console.log("Savings ==>", savingsList);

  useEffect(() => {
    getSavings("locked");
  }, []);

  return (
    <Fragment>
      <Card mb={6}>
        <CardContent>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={panel}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangePanel}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Locked" value={1} />
                  <Tab label="Flexible" value={2} />
                </TabList>
              </Box>
              <TabPanel value={panel}>
                <TableContainer component={Paper}>
                  <Toolbar alignItems="center">
                    <Grid item md={3}>
                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <Input placeholder={t("Search")} />
                      </Search>
                    </Grid>
                    <Spacer mx={5} />
                    <Grid item md={1}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        sx={{ minWidth: 120 }}
                      >
                        <InputLabel id="select-from-label">Status</InputLabel>
                        <Select
                          labelId="select-from-label"
                          id="select-from-label"
                          value={from}
                          onChange={handleChangeFrom}
                          label="From"
                        >
                          <MenuItem value="all">All</MenuItem>
                          <MenuItem value={10}>Active</MenuItem>
                          <MenuItem value={20}>
                            {panel === 1 ? "Closed" : "Redeemed"}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Spacer mx={5} />
                    <Grid item md={1}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        sx={{ minWidth: 120 }}
                      >
                        <InputLabel id="select-from-label">
                          Popularity
                        </InputLabel>
                        <Select
                          labelId="select-from-label"
                          id="select-from-label"
                          value={popularity}
                          onChange={handlePopularityChange}
                          label="From"
                        >
                          <MenuItem value="all">
                            <em>No Filter</em>
                          </MenuItem>
                          <MenuItem value={10}>Ascending</MenuItem>
                          <MenuItem value={20}>Descending</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Toolbar>
                  <Table aria-label="simple table" mt={6}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="">
                          <Typography variant="h6" gutterBottom>
                            Coin Name
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" gutterBottom>
                            Balance
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" gutterBottom>
                            Amount
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" gutterBottom>
                            Popularity
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" gutterBottom>
                            {""}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        // .slice(
                        //   pageLocked * rowsLockedPage,
                        //   pageLocked * rowsLockedPage + rowsLockedPage
                        // )
                        savings.map((row, key) => (
                          <>
                            <TableRow
                              key={key}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="center">
                                {`${row.total_balance} ${row.coin}`}
                              </TableCell>
                              <TableCell align="center">
                                {`$${row.total_balance_usd}`}
                              </TableCell>
                              <TableCell align="center">
                                {`${row.popularity}%`}
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  id={`${row.coin_id}`}
                                  aria-label="expand row"
                                  size="small"
                                  onClick={(e) => handleExpand(e, row.coin_id)}
                                >
                                  {open[`${row.coin_id}`] ? (
                                    <KeyboardArrowUpIcon />
                                  ) : (
                                    <KeyboardArrowDownIcon />
                                  )}
                                </IconButton>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ paddingBottom: 0, paddingTop: 0 }}
                                colSpan={6}
                              >
                                <Collapse
                                  in={open[`${row.coin_id}`]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <Table aria-label="simple table" mt={6}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell align="">
                                          <Typography variant="h6" gutterBottom>
                                            Saving ID
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography variant="h6" gutterBottom>
                                            Amount
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography variant="h6" gutterBottom>
                                            Amount in $
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography variant="h6" gutterBottom>
                                            Status
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {
                                        // .slice(
                                        //   pageLocked * rowsLockedPage,
                                        //   pageLocked * rowsLockedPage + rowsLockedPage
                                        // )
                                        (
                                          savingsList[`${row.coin_id}`] || []
                                        ).map((row, key) => (
                                          <TableRow
                                            key={String(key + row.coin_id)}
                                            sx={{
                                              "&:last-child td, &:last-child th":
                                                {
                                                  border: 0,
                                                },
                                            }}
                                          >
                                            <TableCell
                                              component="th"
                                              scope="row"
                                            >
                                              {row.saving_id}
                                            </TableCell>
                                            <TableCell align="center">
                                              {`${row.amount} ${row.coin}`}
                                            </TableCell>
                                            <TableCell align="center">
                                              {`$${row.amount_usd}`}
                                            </TableCell>
                                            <TableCell align="center">
                                              {row.status === "active" ? (
                                                <Chip
                                                  label="Active"
                                                  color="success"
                                                />
                                              ) : (
                                                <Chip
                                                  label="Completed"
                                                  color="primary"
                                                />
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        ))
                                      }
                                    </TableBody>
                                  </Table>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </>
                        ))
                      }
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rowLocked.length}
                    rowsPerPage={rowsLockedPage}
                    page={pageLocked}
                    onPageChange={handleLockedPage}
                    onRowsPerPageChange={handleRowsLockedPage}
                  />
                </TableContainer>
                <Box
                  mt={8}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    component="div"
                  >
                    Export Data
                  </Typography>
                  <CSVButton data={rowLocked} />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SavingTab;
