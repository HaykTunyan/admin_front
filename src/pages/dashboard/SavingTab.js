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
import {
  getDashboardSavingsList_req,
  getDashboardSavings_req,
} from "../../api/dashboardAPI";
import { getCoins_req } from "../../api/userWalletsAPI";
import { ArrowDown, ArrowUp } from "react-feather";

// Spacing and Style .
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const SavingTab = ({ startDate, endDate }) => {
  // Hooks.
  const [panel, setPanel] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [pageLocked, setLockedPage] = useState(0);
  const [rowsLockedPage, setRowsLockedPage] = useState(5);
  const [savings, setSavings] = useState([]);
  const [savingsList, setSavingsList] = useState({});
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [open, setOpen] = useState({});
  const [sortBy, setSortBy] = useState("increasing");

  const handleCellClick = (sortType) => {
    setSortBy(sortBy === "increasing" ? "decreasing" : "increasing");
    getSavings(
      panel === 1 ? "locked" : "flexible",
      Number(selectedCoin),
      selectedStatus,
      "popularity",
      sortType
    );
  };

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
    getSavings(
      panel === 1 ? "locked" : "flexible",
      Number(event.target.value),
      selectedStatus !== "all" ? selectedStatus : "",
      "popularity",
      sortBy
    );
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    getSavings(
      panel === 1 ? "locked" : "flexible",
      Number(selectedCoin),
      event.target.value,
      "popularity",
      sortBy
    );
  };

  const handleChangePanel = (event, newPanel) => {
    setPanel(newPanel);
    getSavings(newPanel === 1 ? "locked" : "flexible");
  };

  // Pagination.
  const handleLockedPage = (event, newLockedPage) => {
    setLockedPage(newLockedPage);
  };

  const handleRowsLockedPage = (event) => {
    setRowsLockedPage(+event.target.value);
    setLockedPage(0);
  };

  const handleExpand = (e, coinId) => {
    if (
      open[`${e.currentTarget.id}`] === undefined ||
      open[`${e.currentTarget.id}`] === false
    ) {
      getSavingsList(
        panel === 1 ? "locked" : "flexible",
        coinId,
        selectedStatus
      );
    }
    setOpen({
      ...open,
      [`${e.currentTarget.id}`]: !open[`${e.currentTarget.id}`],
    });
  };

  async function getSavings(type, coinId, status, sortParam, sortType) {
    setOpen(false);
    let data = {
      start_date: startDate,
      end_date: endDate,
      coin_id: coinId,
      status: status,
      sort_param: sortParam,
      sort_type: sortType,
    };
    try {
      const response = await getDashboardSavings_req(type, data);
      if (response) {
        setSavings(response.result);
      }
    } catch (e) {}
  }

  async function getSavingsList(type, coinId, status) {
    let data = {
      start_date: startDate,
      end_date: endDate,
      coin_id: coinId,
      status: status,
      limit: 10,
      page: 1,
    };
    try {
      const response = await getDashboardSavingsList_req(type, data);
      if (response) {
        setSavingsList({ ...savingsList, [`${coinId}`]: response.savings });
      }
    } catch (e) {}
  }

  async function getCoins() {
    try {
      const response = await getCoins_req();
      if (response) {
        setCoins(response);
      }
    } catch (e) {}
  }

  useEffect(() => {
    getCoins();
  }, []);

  useEffect(() => {
    getSavings(
      panel === 1 ? "locked" : "flexible",
      Number(selectedCoin),
      selectedStatus,
      "popularity",
      sortBy
    );
  }, [startDate, endDate]);

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
                  <Toolbar sx={{ display: { xs: "grid", sm: "flex" } }}>
                    <Grid item xs={12} sm={4} md={2} m={2}>
                      <Box component="div">
                        <FormControl fullWidth>
                          <InputLabel id="coin-label">Coin</InputLabel>
                          <Select
                            labelId="coin-label"
                            id="coin-label"
                            value={selectedCoin}
                            onChange={handleCoinChange}
                            label="Coin"
                          >
                            <MenuItem value="all">
                              <em>From All</em>
                            </MenuItem>
                            {coins.map((coin) => (
                              <MenuItem value={coin.id}>{coin.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2} m={2}>
                      <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                          labelId="status-label"
                          id="status-label"
                          value={selectedStatus}
                          onChange={handleStatusChange}
                          label="From"
                        >
                          <MenuItem value="all">All</MenuItem>
                          <MenuItem value={"active"}>Active</MenuItem>
                          <MenuItem value={"finished"}>
                            {panel === 1 ? "Closed" : "Redeemed"}
                          </MenuItem>
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
                        <TableCell
                          align="center"
                          onClick={() =>
                            handleCellClick(
                              sortBy === "decreasing"
                                ? "increasing"
                                : "decreasing"
                            )
                          }
                        >
                          <Typography variant="h6">
                            Popularity
                            <IconButton
                              onClick={() =>
                                handleCellClick(
                                  sortBy === "decreasing"
                                    ? "increasing"
                                    : "decreasing"
                                )
                              }
                            >
                              {sortBy === "increasing" ? (
                                <ArrowUp size={16} />
                              ) : (
                                <ArrowDown size={16} />
                              )}
                            </IconButton>
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
                      {savings.map((row, key) => (
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
                              {`${row.popularity ? row.popularity : 0}%`}
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
                                    {(savingsList[`${row.coin_id}`] || []).map(
                                      (row, key) => (
                                        <TableRow
                                          key={String(key + row.coin_id)}
                                          sx={{
                                            "&:last-child td, &:last-child th":
                                              {
                                                border: 0,
                                              },
                                          }}
                                        >
                                          <TableCell component="th" scope="row">
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
                                      )
                                    )}
                                  </TableBody>
                                </Table>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={savings?.length}
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
                  <CSVButton data={savings} />
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
