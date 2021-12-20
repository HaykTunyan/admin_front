import React, { useState, useEffect } from "react";
import FlexibleTable from "../../../components/tables/FlexibleTable";
import CSVButton from "../../../components/CSVButton";
import { Typography, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { instance, setInstance } from "../../../services/api";

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

  const callRow = useSelector((state) => state.settings);

  const rowBody = callRow.flexibleSettingsRow;

  const getFelexible = () => {
    return instance
      .get("/admin/saving-settings", { params: { type: "flexible" } })
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
    getFelexible();
  }, []);

  console.log("flexible", flexible);

  return (
    <>
      <FlexibleTable title={title} rowList={rowList} rowBody={flexible} />
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
