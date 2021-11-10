import React from "react";
import {
  Typography,
  Box,
  IconButton as MuiIconButton,
  TablePagination,
} from "@material-ui/core";
import DashboardTable from "../../../components/tables/LocedTable";
import CSVButton from "../../../components/CSVButton";
import { useSelector } from "react-redux";

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

const Locked = () => {
  const title = "Locked Info";
  const callRow = useSelector((state) => state.settings);
  const rowBody = callRow.lockedSettingsRow;

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
