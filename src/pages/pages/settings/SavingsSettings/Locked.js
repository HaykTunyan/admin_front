import React from "react";
import styled from "styled-components/macro";
import { darken } from "polished";
import {
  Typography,
  Box,
  InputBase,
  IconButton as MuiIconButton,
} from "@material-ui/core";
import DashboardTable from "../../../components/LocedTable";
import CSVButton from "../../../components/CSVButton";

// Moke Data
export const rowList = [
  {
    id: "1",
    head: "Coin Name",
  },
  {
    id: "2",
    head: "Period",
  },
  {
    id: "3",
    head: "AIR %",
  },
  {
    id: "4",
    head: "Main Amount",
  },
  {
    id: "5",
    head: "Status",
  },
  {
    id: "6",
    head: "Bonus",
  },
  {
    id: "7",
    head: "Actions",
  },
];

// Moke Data
export const rowBody = [
  {
    id: 0,
    coin_name: "BIT",
    period: "1.3 - 1.12",
    air: "35",
    min_amount: "4 mounth",
    status: "active",
    bonus: "120 $",
  },
  {
    id: 1,
    coin_name: "BIT",
    period: "1.3 - 1.12",
    air: "35",
    min_amount: "4 mounth",
    status: "active",
    bonus: "120 $",
  },
  {
    id: 2,
    coin_name: "BIT",
    period: "1.3 - 1.12",
    air: "35",
    min_amount: "4 mounth",
    status: "active",
    bonus: "120 $",
  },
  {
    id: 3,
    coin_name: "BIT",
    period: "1.3 - 1.12",
    air: "35",
    min_amount: "4 mounth",
    status: "active",
    bonus: "120 $",
  },
  {
    id: 4,
    coin_name: "BIT",
    period: "1.3 - 1.12",
    air: "35",
    min_amount: "4 mounth",
    status: "active",
    bonus: "120 $",
  },
  {
    id: 5,
    coin_name: "BIT",
    period: "1.3 - 1.12",
    air: "35",
    min_amount: "4 mounth",
    status: "active",
    bonus: "120 $",
  },
  {
    id: 6,
    coin_name: "BIT",
    period: "1.3 - 1.12",
    air: "35",
    min_amount: "4 mounth",
    status: "active",
    bonus: "120 $",
  },
];

const Locked = () => {
  const title = "Locked Info";

  return (
    <>
      <DashboardTable title={title} rowList={rowList} rowBody={rowBody} />
      <Box m={4} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={rowBody} />
      </Box>
    </>
  );
};

export default Locked;
