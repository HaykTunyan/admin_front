import React, { Fragment } from "react";
import styled from "styled-components/macro";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Grid,
  TextField as MuiTextField,
  Box,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);
const TextField = styled(MuiTextField)(spacing);

const AdminManager = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Fragment>
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item md={8}>
              <TextField
                id="username"
                label="Admin Name"
                defaultValue=""
                variant="outlined"
                fullWidth
                my={2}
              />

              <Box sx={{ display: "flex", flexDirection: "column", m: 5 }}>
                <FormControlLabel
                  label="FSend"
                  control={<Checkbox {...label} />}
                />
                <FormControlLabel
                  label="Real Send"
                  control={<Checkbox {...label} />}
                />
                <FormControlLabel
                  label="Permission for changes on deposits"
                  control={<Checkbox {...label} />}
                />
                <FormControlLabel
                  label="Permissions to change KYC status"
                  control={<Checkbox {...label} />}
                />
                <FormControlLabel
                  label="Permission to send notifications"
                  control={<Checkbox {...label} />}
                />
                <FormControlLabel
                  label="Permission to download the user base"
                  control={<Checkbox {...label} />}
                />
              </Box>
            </Grid>
          </Grid>

          <Button variant="contained" color="primary">
            Save changes
          </Button>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default AdminManager;
