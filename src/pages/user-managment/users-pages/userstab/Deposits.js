import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
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
} from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import {
  editUserSavings_req,
  getUserSavings_req,
} from "../../../../api/userSavingsAPI";
import moment from "moment";

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
  const titleLocked = "Locked Info";
  const titleFlexible = "Flexible Info";
  const [tab, setTab] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [alignment, setAlignment] = useState("");
  const [savings, setSavings] = useState([]);
  const [allCount, setAllCount] = useState({});
  const [error, setError] = useState("");

  const [changeAPY, setChangeAPY] = useState({
    fromPercent: null,
    toPercent: null,
  });

  const [changeDays, setChangeDays] = useState({
    days: null,
    ai: null,
  });

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChangePage = (event, newPage) => {
    getUserSavings(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
    getUserSavings(newTab === 1 ? "flexible" : "locked");
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
        getUserSavings(type);
      }
    } catch (e) {
      console.log("EDIT USER SAVINGS ERROR ==>", e.response);
    }
  }

  async function getUserSavings(type, page, rowsPerPage) {
    try {
      const response = await getUserSavings_req(
        userId,
        type,
        page,
        rowsPerPage
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

  useEffect(() => {
    getUserSavings("flexible");
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
          <Card p={4}>
            <CardContent>
              <Grid container>
                <Grid sx={12} md={3}>
                  <Typography variant="inherit" fontWeight="bold">
                    {`Active ${
                      tab === 1 ? "Flexible" : "Locked"
                    } deposits Amount`}
                  </Typography>
                  <Spacer mx={6} />
                  <Typography variant="subtitle1">
                    {savings?.activeDeposits}
                  </Typography>
                </Grid>
                <Grid sx={12} md={3}>
                  <Typography variant="inherit" fontWeight="bold">
                    {`Active ${tab === 1 ? "Flexible" : "Locked"} Profit`}
                  </Typography>
                  <Spacer mx={6} />
                  <Typography variant="subtitle1">
                    {savings?.activeProfit}
                  </Typography>
                </Grid>
                <Grid sx={12} md={3}>
                  <Typography variant="inherit" fontWeight="bold">
                    {`Closed ${
                      tab === 1 ? "Flexible" : "Locked"
                    } deposits Amount`}
                  </Typography>
                  <Spacer mx={6} />
                  <Typography variant="subtitle1">
                    {savings?.closedDeposits}
                  </Typography>
                </Grid>
                <Grid sx={12} md={3}>
                  <Typography variant="inherit" fontWeight="bold">
                    {`Closed ${tab === 1 ? "Flexible" : "Locked"} Profit`}
                  </Typography>
                  <Spacer mx={6} />
                  <Typography variant="subtitle1">
                    {savings?.closedProfit}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Spacer my={6} />
          {/*Filters  */}
          <Card mb={6} p={2} sx={{ display: "flex" }}>
            <Grid item md={2}>
              <FormControl fullWidth>
                <InputLabel id="select-coin">Coin</InputLabel>
                <Select
                  labelId="select-coin"
                  id="select-coin"
                  //value={operationType}
                  //onChange={handleOperationType}
                  label="Coin"
                >
                  <MenuItem value="all">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value="receive">Bitcoin</MenuItem>
                  <MenuItem value="send">Beincoin</MenuItem>
                  <MenuItem value="send">Ripple</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Spacer mx={2} />
            <Grid item md={2}>
              <FormControl fullWidth>
                <InputLabel id="select-status">Status</InputLabel>
                <Select
                  labelId="select-status"
                  id="select-status"
                  //value={coinAll}
                  //onChange={handleCoinAll}
                  label="Status"
                >
                  <MenuItem value="all">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value="statusCLosed">
                    {tab === 1 ? "Closed" : "Done"}
                  </MenuItem>
                  <MenuItem value="statusRedeem">
                    {tab === 1 ? "Redeem" : "In progress"}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Card>

          {/* Tab One */}
          <TabPanel value={1}>
            <Card mb={6}>
              <CardHeader
                action={
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <Input placeholder={t("Search")} />
                  </Search>
                }
                title={titleFlexible}
              />
              <Paper>
                <TableWrapper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {rowListFlexible?.map((item) => (
                          <TableCell key={item.id} sx={{ font: "bold" }}>
                            {item.head}
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
                                      fullWidth
                                      placeholder="From Percent"
                                      onChange={(e) =>
                                        setChangeAPY({
                                          ...changeAPY,
                                          fromPercent: e.target.value,
                                        })
                                      }
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
              <CardHeader
                action={
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <Input placeholder={t("Search")} />
                  </Search>
                }
                title={titleLocked}
              />
              <Paper>
                <TableWrapper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {rowListLocked?.map((item) => (
                          <TableCell key={item.id} sx={{ font: "bold" }}>
                            {item.head}
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
                            <TableCell>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Switch checked={item.resaving} />}
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
                                        changeDays[`editing_${item.saving_id}`]
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
                                    {changeDays[`editing_${item.saving_id}`] &&
                                    changeDays[`editing_${item.saving_id}`] ===
                                      true
                                      ? "Save Duration/AI"
                                      : "Change Duration/AI"}
                                  </Button>
                                </Grid>
                              )}
                            </TableCell>
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
