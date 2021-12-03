import React, { useState, useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import LocedTable from "../../../components/tables/LocedTable";
import CSVButton from "../../../components/CSVButton";
import { useSelector } from "react-redux";
import instance, { setInstance } from "../../../services/api";

// Moke Data
export const rowList = [
  {
    id: "1",
    head: "Number",
  },
  {
    id: "2",
    head: "Coin Name",
  },
  {
    id: "3",
    head: "Duretion",
  },
  {
    id: "4",
    head: "Max",
  },
  {
    id: "5",
    head: "Min",
  },
  {
    id: "6",
    head: "Type",
  },
  {
    id: "7",
    head: "Actions",
  },
];

const Locked = () => {
  // hooks.
  const title = "Locked Info";
  const [locked, setLocked] = useState([]);
  const callRow = useSelector((state) => state.settings);
  const rowBody = callRow.lockedSettingsRow;

  // get Locked.
  const getLocked = () => {
    return instance
      .get("/admin/saving-settings", { params: { type: "locked" } })
      .then((data) => {
        setLocked(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  // Use Effect.
  useEffect(() => {
    getLocked();
  }, []);

  console.log("locked", locked);

  return (
    <>
      <LocedTable title={title} rowList={rowList} rowBody={locked} />
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
