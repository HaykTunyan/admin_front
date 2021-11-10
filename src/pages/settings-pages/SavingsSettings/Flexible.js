import React, { useState } from "react";
import FlexibleTable from "../../../components/tables/FlexibleTable";
import CSVButton from "../../../components/CSVButton";
import { Typography, Box, Radio } from "@material-ui/core";
import { useSelector } from "react-redux";

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

const Flexible = () => {
  const title = "Flexible Info";

  const callRow = useSelector((state) => state.settings);

  const rowBody = callRow.flexibleSettingsRow;

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
