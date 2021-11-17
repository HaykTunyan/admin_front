import React, { Fragment } from "react";
import styled from "styled-components/macro";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@material-ui/system";

// Spacing.
const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);

const DataGridTable = ({ columns, rowColums }) => {
  return (
    <Fragment>
      <Typography variant="h3" gutterBottom display="inline">
        Data Grid Table
      </Typography>

      <Divider my={6} />

      <Card mb={6}>
        <CardContent pb={1}>
          <Typography variant="h6" gutterBottom>
            Data Grid
          </Typography>
          <Typography variant="body2" gutterBottom>
            A fast and extendable data table and data grid for React, made by
            Material-UI.{" "}
            <Link
              href="https://material-ui.com/components/data-grid/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Official docs
            </Link>
            .
          </Typography>
        </CardContent>
        <Paper>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              rows={rowColums}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </Paper>
      </Card>
    </Fragment>
  );
};

export default DataGridTable;
