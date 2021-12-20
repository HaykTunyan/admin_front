import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  Grid as MuiGrid,
  Alert as MuiAlert,
  Button as MuiButton,
  TextField as MuiTextField,
  Avatar as MuiAvatar,
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
  Typography,
  Slider,
} from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
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
    head: "Amount & Date",
  },
  {
    id: "3",
    head: "Annualaized Interest",
  },
  {
    id: "4",
    head: "Duretion (days)",
  },
  {
    id: "5",
    head: "Subscription progress",
  },
  {
    id: "6",
    head: "ReSaving",
  },
  {
    id: "7",
    head: "Status",
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
    id: "2",
    head: "Accuring Interest",
  },
  {
    id: "3",
    head: "Aveilable Interest",
  },
  {
    id: "4",
    head: "Redeeming",
  },
  {
    id: "5",
    head: "Comulative Interest",
  },
  {
    id: "6",
    head: "7-Day APY",
  },
  {
    id: "7",
    head: "Operation",
  },
];

const Deposits = () => {
  // hooks.
  const titleLocked = "Locked Info";
  const titleFlexible = "Flexible Info";
  const { t } = useTranslation();
  const [tab, setTab] = useState("1");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const callRow = useSelector((state) => state.userCard);
  const rowBodyLocked = callRow.lockedData;
  const rowBodyFlexible = callRow.flexibleData;
  const [alignment, setAlignment] = useState("");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Flexible" value="1" />
              <Tab label="Locked" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
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
                      {rowBodyFlexible
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.coin}</TableCell>
                            <TableCell>
                              {item.total_balance} <span>BTC</span>{" "}
                              <Spacer my={2} />
                              <Typography variant="subtitle2">
                                {item.total_time}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {item.accounring_interest} <span>BTC</span>{" "}
                            </TableCell>
                            <TableCell>
                              {item.aveilible_interest} <span>BTC</span>{" "}
                            </TableCell>
                            <TableCell>
                              {item.redeeming} <span>BTC</span>{" "}
                            </TableCell>
                            <TableCell sx={{ color: "green", font: "bold" }}>
                              {item.cumulative_interest} <span>BTC</span>{" "}
                            </TableCell>
                            <TableCell>
                              {item.apy} <span>BTC</span>{" "}
                            </TableCell>
                            <TableCell>
                              {!item.operation ? (
                                <Chip label="Closed" color="error" />
                              ) : (
                                <Chip label="Redeem" color="primary" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {/* Pagination */}
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rowBodyFlexible.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableWrapper>
              </Paper>
            </Card>
          </TabPanel>
          <TabPanel value="2">
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
                      {rowBodyLocked
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.coin}</TableCell>
                            <TableCell>
                              {item.amount_data} <span>BTC</span>
                              <Spacer my={2} />
                              <Typography variant="subtitle2">
                                {item.total_time}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ color: "green" }}>
                              {item.annaulized_rate} <span>%</span>{" "}
                            </TableCell>
                            <TableCell>
                              {item.duretion_day} <span>Day</span>{" "}
                            </TableCell>
                            <TableCell sx={{ color: "green" }}>
                              <Box>
                                <Slider
                                  aria-label="Always visible"
                                  defaultValue={item.subscription_progress}
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
                                {item.total_time}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={
                                        item.ra_saving ? "true" : "false"
                                      }
                                    />
                                  }
                                  label="ReSaving"
                                />
                              </FormGroup>
                            </TableCell>
                            <TableCell>
                              {!item.status ? (
                                <Chip label="Done" color="info" />
                              ) : (
                                <Chip label="In Progress" color="success" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {/* Pagination */}
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rowBodyLocked.length}
                    rowsPerPage={rowsPerPage}
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
