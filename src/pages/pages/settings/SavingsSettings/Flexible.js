import React from "react";
import FlexibleTable from "../../../components/FlexibleTable";
import CSVButton from "../../../components/CSVButton";
import { Typography, Box } from "@material-ui/core";

// Moke Data.
export const rowList = [
  {
    id: "1",
    head: "Coin Name",
  },
  {
    id: "2",
    head: "Week Price",
  },
  {
    id: "2",
    head: "Main Amount",
  },
  {
    id: "3",
    head: "Status",
  },
  {
    id: "4",
    head: "Actions",
  },
];

// Moke Data.
export const rowBody = [
  {
    id: 0,
    coin_name: "BIT",
    week_price: "1.3 - 1.12",
    min_amount: "4 mounth",
    status: "active",
  },
  {
    id: 1,
    coin_name: "BIT",
    week_price: "1.3 - 1.12",
    min_amount: "4 mounth",
    status: "active",
  },
  {
    id: 2,
    coin_name: "BIT",
    week_price: "1.3 - 1.12",
    min_amount: "4 mounth",
    status: "active",
  },
  {
    id: 3,
    coin_name: "BIT",
    week_price: "1.3 - 1.12",
    min_amount: "4 mounth",
    status: "active",
  },
  {
    id: 4,
    coin_name: "BIT",
    week_price: "1.3 - 1.12",
    min_amount: "4 mounth",
    status: "active",
  },
  {
    id: 5,
    coin_name: "BIT",
    week_price: "1.3 - 1.12",
    min_amount: "4 mounth",
    status: "active",
  },
  {
    id: 6,
    coin_name: "BIT",
    week_price: "1.3 - 1.12",
    min_amount: "4 mounth",
    status: "active",
  },
];

const Flexible = () => {
  const title = "Flexible Info";

  return (
    <>
      <FlexibleTable title={title} rowList={rowList} rowBody={rowBody} />
      <Box m={4} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle1" color="inherit" component="div">
          Export Data
        </Typography>
        <CSVButton data={rowBody} />
      </Box>
    </>
  );
};

export default Flexible;
