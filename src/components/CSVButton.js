import React from "react";
import { CSVLink } from "react-csv";
import { Download } from "react-feather";
import { IconButton as MuiIconButton } from "@material-ui/core";
import styled from "styled-components/macro";

// Custom Style.
const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const CSVButton = ({ data }) => {
  return (
    <>
      <CSVLink data={data} style={{ color: "inherit", fontSize: "12px" }}>
        <IconButton color="inherit" aria-label="Open drawer" size="large">
          <Download />
        </IconButton>
      </CSVLink>
    </>
  );
};

export default CSVButton;
