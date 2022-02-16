import React, { Fragment } from "react";
import { Card, Typography } from "@material-ui/core";

const NoData = () => {
  return (
    <Fragment>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          marginY: "50px",
          padding: "20px",
          alignItems: "center",
        }}
      >
        <Typography component="h2" fontWeight="bold" textAlign="center">
          No available data
        </Typography>
      </Card>
    </Fragment>
  );
};

export default NoData;
