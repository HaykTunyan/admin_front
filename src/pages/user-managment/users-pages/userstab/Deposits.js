import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { instance } from "../../../../services/api";
import {
  Typography as MuiTypography,
  Tab,
  Card as MuiCard,
  Chip as MuiChip,
  CardHeader,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputBase,
  TablePagination,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Slider,
  Select,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Button,
  TextField,
  CardContent,
  IconButton,
} from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import {
  deleteAffiliateSaving_req,
  editUserSavings_req,
  getUserSavings_req,
} from "../../../../api/userSavingsAPI";
import moment from "moment";
import { getCoins_req } from "../../../../api/userWalletsAPI";
import { ArrowDown, ArrowUp } from "react-feather";
import AddAffiliateSaving from "../../../../modal/AddAffiliateSaving";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Spacer = styled.div(spacing);

// Custom Style.
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

// Moke Data
export const rowListLocked = [
  {
    id: "1",
    head: "Coin",
  },
  {
    id: "2",
    head: "Amount",
  },
  {
    id: "3",
    head: "Date",
  },
  {
    id: "4",
    head: "Annualaized Interest",
  },
  {
    id: "5",
    head: "Duration (days)",
  },
  {
    id: "6",
    head: "Subscription progress",
  },
  {
    id: "7",
    head: "ReSaving",
  },
  {
    id: "8",
    head: "Status",
  },
  {
    id: "9",
    head: "Action",
  },
];

// Moke Data.
export const rowListFlexible = [
  {
    id: "1",
    head: "Coin Name",
  },
  {
    id: "2",
    head: "Total Balance",
  },
  {
    id: "3",
    head: "Accuring Interest",
  },
  {
    id: "4",
    head: "Available Interest",
  },
  {
    id: "5",
    head: "Redeeming",
  },
  {
    id: "6",
    head: "Cumulative Interest",
  },
  {
    id: "7",
    head: "7-Day APY",
  },
  {
    id: "8",
    head: "Status",
  },
  {
    id: "9",
    head: "Action",
  },
];

const Deposits = () => {
  // hooks.
  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;
  const { t } = useTranslation();
  const { affiliate } = location.state;
  const titleLocked = "Locked Info";
  const titleFlexible = "Flexible Info";
  const [tab, setTab] = useState(1);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [savings, setSavings] = useState([]);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [allCount, setAllCount] = useState({});
  const [error, setError] = useState("");
  const [primission, setPrimission] = useState("");

  const [sortBy, setSortBy] = useState("increasing");

  const [changeAPY, setChangeAPY] = useState({
    fromPercent: null,
    toPercent: null,
  });

  const [changeDays, setChangeDays] = useState({
    days: null,
    ai: null,
  });

  const handleCellClick = (sortType) => {
    setSortBy(sortBy === "increasing" ? "decreasing" : "increasing");
    getUserSavings(
      tab === 1 ? "flexible" : "locked",
      1,
      rowsPerPage,
      selectedStatus === "all" ? null : selectedStatus,
      Number(selectedCoin),
      `${tab === 1 ? "total_amount" : "amount"}`,
      sortType
    );
  };

  const handleChangePage = (event, newPage) => {
    getUserSavings(
      tab === 1 ? "flexible" : "locked",
      newPage + 1,
      rowsPerPage,
      selectedStatus === "all" ? null : selectedStatus,
      Number(selectedCoin),
      `${tab === 1 ? "total_amount" : "amount"}`,
      sortBy
    );
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
    getUserSavings(
      newTab === 1 ? "flexible" : "locked",
      1,
      rowsPerPage,
      selectedStatus === "all" ? null : selectedStatus,
      Number(selectedCoin),
      `${tab === 1 ? "total_amount" : "amount"}`,
      sortBy
    );
  };

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
    getUserSavings(
      tab === 1 ? "flexible" : "locked",
      1,
      rowsPerPage,
      selectedStatus === "all" ? null : selectedStatus,
      Number(event.target.value),
      `${tab === 1 ? "total_amount" : "amount"}`,
      sortBy
    );
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    getUserSavings(
      tab === 1 ? "flexible" : "locked",
      1,
      rowsPerPage,
      event.target.value === "all" ? null : event.target.value,
      Number(selectedCoin),
      `${tab === 1 ? "total_amount" : "amount"}`,
      sortBy
    );
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  async function saveEditedData(item) {
    let type;
    let data = {
      saving_id: item.saving_id,
    };

    if (tab === 1) {
      type = "flexible";

      data["from_percent"] = Number(changeAPY.fromPercent);
      data["to_percent"] = Number(changeAPY.toPercent);

      setChangeAPY({ ...changeAPY, [`editing_${item.saving_id}`]: false });
    } else {
      type = "locked";

      if (changeDays.ai) {
        data["percent"] = Number(changeDays.ai);
      }

      if (changeDays.days) {
        data["days"] = Number(changeDays.days);
      }
      setChangeDays({ ...changeDays, [`editing_${item.saving_id}`]: false });
    }

    console.log("Data ==>", data);

    try {
      const response = await editUserSavings_req(userId, data);
      if (response) {
        console.log("EDIT USER SAVINGS RESPONSE ==>", response);
        getUserSavings(
          type,
          1,
          rowsPerPage,
          selectedStatus === "all" ? null : selectedStatus,
          Number(selectedCoin),
          `${tab === 1 ? "total_amount" : "amount"}`,
          sortBy
        );
      }
    } catch (e) {
      console.log("EDIT USER SAVINGS ERROR ==>", e.response);
    }
  }

  async function deleteSaving(savingId) {
    try {
      const response = await deleteAffiliateSaving_req(userId, savingId);
      if (response) {
        console.log("DELETE AFFILIATE SAVING RESPONSE ==>", response);
        getUserSavings(
          tab === 1 ? "flexible" : "locked",
          1,
          rowsPerPage,
          selectedStatus === "all" ? null : selectedStatus,
          Number(selectedCoin),
          `${tab === 1 ? "total_amount" : "amount"}`,
          sortBy
        );
      }
    } catch (e) {
      console.log("DELETE AFFILIATE SAVING ERROR ==>", e.response);
    }
  }

  async function getUserSavings(
    type,
    page,
    rowsPerPage,
    status,
    coinId,
    sortParam,
    sortType
  ) {
    let data = {
      status: status,
      coin_id: coinId,
      sort_param: sortParam,
      sort_type: sortType,
    };

    try {
      const response = await getUserSavings_req(
        userId,
        type,
        page,
        rowsPerPage,
        data
      );
      if (response) {
        console.log("GET USER SAVINGS RESPONSE ==>", response);
        setSavings(response);
        setAllCount(response.allCount);
      }
    } catch (e) {
      console.log("GET USER SAVINGS ERROR ==>", e.response);
    }
  }

  async function getCoins() {
    try {
      const response = await getCoins_req();
      if (response) {
        console.log("GET COINS RESPONSE ==>", response);
        setCoins(response);
      }
    } catch (e) {
      console.log("GET COINS ERROR ==>", e.response);
    }
  }

  // Profile.
  const getPrimission = () => {
    return instance.get("/admin/profile").then((data) => {
      setPrimission(data.data);
      return data;
    });
  };

  useEffect(() => {
    getUserSavings(
      "flexible",
      page,
      rowsPerPage,
      selectedStatus === "all" ? null : selectedStatus,
      Number(selectedCoin),
      `${tab === 1 ? "total_amount" : "amount"}`,
      sortBy
    );
    getCoins();
    getPrimission();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <Tab label="Flexible" value={1} />
              <Tab label="Locked" value={2} />
            </TabList>
          </Box>
          <Spacer my={6} />
          <Card>
            <CardContent>
              <Grid container display="flex" flexDirection="column">
                <Grid item container direction="row" alignItems="center">
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: { xs: "flex" },
                        justifyContent: { xs: "space-between" },
                      }}
                    >
                      <Typography variant="inherit" fontWeight="bold">
                        {`Active ${
                          tab === 1 ? "Flexible" : "Locked"
                        } Deposits Amount`}
                      </Typography>
                      <Box>{savings?.activeDeposits}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={2} sx={{ mx: "50px" }}>
                    <Box
                      sx={{
                        display: { xs: "flex" },
                        justifyContent: { xs: "space-between" },
                      }}
                    >
                      <Typography variant="inherit" fontWeight="bold">
                        Profit
                      </Typography>
                      <Box>{savings?.activeProfit}</Box>
                    </Box>
                  </Grid>
                </Grid>
                <Spacer my={3} />
                <Grid item container direction="row" alignItems="center">
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: { xs: "flex" },
                        justifyContent: { xs: "space-between" },
                      }}
                    >
                      <Typography variant="inherit" fontWeight="bold">
                        {`Closed ${
                          tab === 1 ? "Flexible" : "Locked"
                        } Deposits Amount`}
                      </Typography>
                      <Box>{savings?.closedDeposits}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={2} sx={{ mx: "50px" }}>
                    <Box
                      sx={{
                        display: { xs: "flex" },
                        justifyContent: { xs: "space-between" },
                      }}
                    >
                      <Typography variant="inherit" fontWeight="bold">
                        Profit
                      </Typography>
                      <Box>{savings?.closedProfit}</Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Spacer my={6} />
          {/*Filters  */}
          <Card
            mb={6}
            p={2}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
            }}
          >
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="select-coin">Coin</InputLabel>
                <Select
                  labelId="select-coin"
                  id="select-coin"
                  label="Coin"
                  value={selectedCoin}
                  onChange={handleCoinChange}
                >
                  <MenuItem value="all">
                    <em>All</em>
                  </MenuItem>
                  {coins.map((coin) => (
                    <MenuItem value={coin.id}>{coin.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Spacer my={2} mx={2} />
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="select-status">Status</InputLabel>
                <Select
                  labelId="select-status"
                  id="select-status"
                  label="Status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="all">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value="finished">
                    {tab === 1 ? "Closed" : "Done"}
                  </MenuItem>
                  <MenuItem value="active">
                    {tab === 1 ? "Redeem" : "In progress"}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {affiliate && (
              <>
                <Spacer my={2} mx={2} />
                <Grid item xs={12} md={3}>
                  <AddAffiliateSaving
                    tab={tab}
                    userId={userId}
                    getUserSavings={getUserSavings}
                  />
                </Grid>
              </>
            )}
          </Card>

          {/* Tab One */}
          <TabPanel value={1}>
            <Card mb={6}>
              <CardHeader title={titleFlexible} />
              <Paper>
                <TableWrapper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {rowListFlexible?.map((item) => (
                          <TableCell
                            key={item.id}
                            sx={{ font: "bold" }}
                            onClick={() => {
                              console.log("ITEM ==>", item, selectedStatus);
                              if (
                                Number(item.id) === 2 &&
                                selectedStatus === "finished"
                              ) {
                                handleCellClick(
                                  sortBy === "decreasing"
                                    ? "increasing"
                                    : "decreasing"
                                );
                              }
                            }}
                          >
                            {Number(item.id) === 2 &&
                            selectedStatus === "finished" ? (
                              <Button color="inherit">
                                {item.head}
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
                              </Button>
                            ) : (
                              item.head
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {savings.savings &&
                        savings.savings.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.coinName}</TableCell>
                            <TableCell>
                              {item.total_balance} <span>{item.coin}</span>{" "}
                            </TableCell>
                            <TableCell>
                              {item.accruing_interest} <span>{item.coin}</span>{" "}
                            </TableCell>
                            <TableCell>
                              {item.available_interest} <span>{item.coin}</span>{" "}
                            </TableCell>
                            <TableCell>
                              {item.redeeming} <span>{item.coin}</span>{" "}
                            </TableCell>
                            <TableCell sx={{ color: "green", font: "bold" }}>
                              {item.cumulative_interest}{" "}
                              <span>{item.coin}</span>{" "}
                            </TableCell>
                            <TableCell>
                              {changeAPY[`editing_${item.saving_id}`] &&
                              changeAPY[`editing_${item.saving_id}`] ===
                                true ? (
                                <Grid item container>
                                  <Grid item>
                                    <TextField
                                      margin="dense"
                                      id="fromPercent"
                                      name="fromPercent"
                                      type="number"
                                      placeholder="From Percent"
                                      onChange={(e) =>
                                        setChangeAPY({
                                          ...changeAPY,
                                          fromPercent: e.target.value,
                                        })
                                      }
                                      sx={{ width: "150px" }}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <TextField
                                      margin="dense"
                                      id="toPercent"
                                      name="toPercent"
                                      type="number"
                                      fullWidth
                                      placeholder="To Percent"
                                      onChange={(e) =>
                                        setChangeAPY({
                                          ...changeAPY,
                                          toPercent: e.target.value,
                                        })
                                      }
                                      sx={{ width: "150px" }}
                                    />
                                  </Grid>
                                </Grid>
                              ) : (
                                <span>{item.apy}%</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {item.status === "active" ? (
                                <Chip label="Redeem" color="primary" />
                              ) : (
                                <Chip label="Closed" color="error" />
                              )}
                            </TableCell>
                            {/* Primission Super Admin */}
                            {primission.role === 1 && (
                              <TableCell>
                                {item.status === "active" && (
                                  <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    mb={2}
                                  >
                                    <Button
                                      variant="contained"
                                      onClick={() => {
                                        if (
                                          changeAPY[`editing_${item.saving_id}`]
                                        ) {
                                          saveEditedData(item);
                                        } else {
                                          setChangeAPY({
                                            ...changeAPY,
                                            [`editing_${item.saving_id}`]: true,
                                          });
                                        }
                                      }}
                                      sx={{ width: "150px" }}
                                    >
                                      {changeAPY[`editing_${item.saving_id}`] &&
                                      changeAPY[`editing_${item.saving_id}`] ===
                                        true
                                        ? "Save 7-Day APY"
                                        : "Change 7-Day APY"}
                                    </Button>
                                  </Grid>
                                )}
                              </TableCell>
                            )}
                            {affiliate && (
                              <TableCell>
                                <Button
                                  variant="contained"
                                  sx={{ width: "50px", mx: "15px" }}
                                  onClick={() => {
                                    deleteSaving(item.saving_id);
                                  }}
                                >
                                  {"Delete"}
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {/* Pagination */}
                  <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={savings?.allCount}
                    rowsPerPage={savings?.limit}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableWrapper>
              </Paper>
            </Card>
          </TabPanel>
          {/* Tab Two */}
          <TabPanel value={2}>
            <Card mb={6}>
              <CardHeader title={titleLocked} />
              <Paper>
                <TableWrapper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {rowListLocked?.map((item) => (
                          <TableCell
                            key={item.id}
                            sx={{ font: "bold", alignItems: "center" }}
                            onClick={() => {
                              if (
                                Number(item.id) === 2 &&
                                selectedStatus === "active"
                              ) {
                                handleCellClick(
                                  sortBy === "decreasing"
                                    ? "increasing"
                                    : "decreasing"
                                );
                              }
                            }}
                          >
                            {Number(item.id) === 2 &&
                            selectedStatus === "active" ? (
                              <Button color="inherit">
                                {item.head}
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
                              </Button>
                            ) : (
                              item.head
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {savings.savings &&
                        savings.savings.map((item) => (
                          <TableRow key={item.saving_id}>
                            <TableCell>{item.coinName}</TableCell>
                            <TableCell>
                              {item.amount} <span>{item.coin}</span>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle2">
                                {`${moment(item.start_date).format(
                                  "DD/MM/YYYY"
                                )} -
                                  ${moment(item.end_date).format(
                                    "DD/MM/YYYY"
                                  )}`}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ color: "green" }}>
                              {changeDays[`editing_${item.saving_id}`] &&
                              changeDays[`editing_${item.saving_id}`] ===
                                true ? (
                                <TextField
                                  type="ai"
                                  defaultValue={item.air}
                                  fullWidth
                                  error={error}
                                  //helperText={touched.email && errors.email}
                                  onChange={(e) =>
                                    setChangeDays({
                                      ...changeDays,
                                      ai: e.target.value,
                                    })
                                  }
                                  my={3}
                                />
                              ) : (
                                <span>{item.air}%</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {changeDays[`editing_${item.saving_id}`] &&
                              changeDays[`editing_${item.saving_id}`] ===
                                true ? (
                                <TextField
                                  type="duration"
                                  defaultValue={item.duration}
                                  fullWidth
                                  //error={Boolean(touched.email && errors.email)}
                                  //helperText={touched.email && errors.email}
                                  onChange={(e) =>
                                    setChangeDays({
                                      ...changeDays,
                                      days: e.target.value,
                                    })
                                  }
                                  my={3}
                                />
                              ) : (
                                <span>{item.duration}day(s)</span>
                              )}
                            </TableCell>
                            {/* Primission Super Admin. */}
                            <TableCell sx={{ color: "green" }}>
                              <Box>
                                <Slider
                                  aria-label="Always visible"
                                  defaultValue={
                                    item.subscriptionProgress &&
                                    item.subscriptionProgress.earn_amount
                                      ? item.subscriptionProgress.earn_amount
                                      : 0
                                  }
                                  getAriaValueText={valuetext}
                                  step={1}
                                  valueLabelDisplay="on"
                                  disabled={
                                    primission.role === 1 ? "false" : "true"
                                  }
                                />
                              </Box>
                              <Spacer my={2} />
                              <Typography
                                variant="subtitle2"
                                textAlign="center"
                              >
                                {moment(item.end_date).format("DD/MM/YYYY")}
                              </Typography>
                            </TableCell>
                            {/* Peimission Super Admin. */}
                            <TableCell>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={item.resaving}
                                      disabled={
                                        primission.role === 1 ? "false" : "true"
                                      }
                                    />
                                  }
                                  label="ReSaving"
                                />
                              </FormGroup>
                            </TableCell>
                            <TableCell>
                              {item.status === "active" ? (
                                <Chip label="In Progress" color="success" />
                              ) : (
                                <Chip label="Done" color="info" />
                              )}
                            </TableCell>
                            {/* Primission Super Admin. */}
                            {primission.role === 1 && (
                              <TableCell>
                                {item.status === "active" && (
                                  <Grid
                                    container
                                    direction="column"
                                    alignItems="center"
                                    mb={2}
                                  >
                                    <Button
                                      variant="contained"
                                      onClick={() => {
                                        if (
                                          changeDays[
                                            `editing_${item.saving_id}`
                                          ]
                                        ) {
                                          saveEditedData(item);
                                        } else {
                                          setChangeDays({
                                            ...changeDays,
                                            [`editing_${item.saving_id}`]: true,
                                          });
                                        }
                                      }}
                                    >
                                      {changeDays[
                                        `editing_${item.saving_id}`
                                      ] &&
                                      changeDays[
                                        `editing_${item.saving_id}`
                                      ] === true
                                        ? "Save Duration/AI"
                                        : "Change Duration/AI"}
                                    </Button>
                                  </Grid>
                                )}
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {/* Pagination */}
                  <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={savings?.allCount}
                    rowsPerPage={savings?.limit}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableWrapper>
              </Paper>
            </Card>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Deposits;
