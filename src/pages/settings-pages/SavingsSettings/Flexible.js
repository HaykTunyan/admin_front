import React, { useState, useEffect } from "react";
import FlexibleTable from "../../../components/tables/FlexibleTable";
import CSVButton from "../../../components/CSVButton";
import { Typography, Box } from "@material-ui/core";
import { instance } from "../../../services/api";

// Moke Data.
export const rowList = [
  {
    id: "1",
    head: "Coin",
    align: "",
  },
  {
    id: "2",
    head: "From Percent",
    align: "",
  },
  {
    id: "3",
    head: "To Percent",
    align: "",
  },
  {
    id: "4",
    head: "Max",
    align: "",
  },
  {
    id: "5",
    head: "Min",
    align: "",
  },
  {
    id: "6",
    head: "Action",
    align: "right",
  },
];

const Flexible = () => {
  // hooks.
  const title = "Flexible Info";
  const [flexible, setFlexible] = useState([]);

  const getFlexible = (coinIds, coinName) => {
    let coinIdsString = coinIds ? coinIds.toString() : null;

    let params = {
      type: "flexible",
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
        setFlexible(data.data);
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getFlexible();
  }, []);

  return (
    <>
      <FlexibleTable
        title={title}
        rowList={rowList}
        rowBody={flexible}
        getFlexible={getFlexible}
      />
      {flexible && (
        <Box m={4} display="flex" justifyContent="flex-end" alignItems="center">
          <Typography variant="subtitle1" color="inherit" component="div">
            Export Data
          </Typography>
          <CSVButton data={flexible} />
        </Box>
      )}
    </>
  );
};

export default Flexible;
