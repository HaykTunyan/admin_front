import React, { useState, useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import LocedTable from "../../../components/tables/LocedTable";
import CSVButton from "../../../components/CSVButton";
import { instance } from "../../../services/api";

// Moke Data
export const rowList = [
  {
    id: "1",
    head: "Coin Name",
    align: "",
  },
  {
    id: "2",
    head: "Duretion ( day / % ) ",
    align: "",
  },
  {
    id: "3",
    head: "Max",
    align: "",
  },
  {
    id: "4",
    head: "Min",
    align: "",
  },
  {
    id: "6",
    head: "Actions",
    align: "right",
  },
];

const Locked = () => {
  // hooks.
  const title = "Locked Info";
  const [locked, setLocked] = useState([]);

  // get Locked.
  const getLocked = (coinIds, coinName) => {
    let coinIdsString = coinIds ? coinIds.toString() : null;

    let params = {
      type: "locked",
      coin_ids: coinIdsString,
      coin_name: coinName ? coinName : null,
    };

    Object.keys(params).map((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    return instance
      .get("/admin/saving-settings", { params: params })
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

  return (
    <>
      <LocedTable
        title={title}
        rowList={rowList}
        rowBody={locked}
        getLocked={getLocked}
      />
      {locked && (
        <Box m={4} display="flex" justifyContent="flex-end" alignItems="center">
          <Typography variant="subtitle1" color="inherit" component="div">
            Export Data
          </Typography>
          <CSVButton data={locked} />
        </Box>
      )}
    </>
  );
};

export default Locked;
