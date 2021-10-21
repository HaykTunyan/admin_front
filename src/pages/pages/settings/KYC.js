import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Grid,
  TextField as MuiTextField,
  Box,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButton)(spacing);

const TextField = styled(MuiTextField)(spacing);

const KYCSettings = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Fragment>
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item md={8}>
              <TextField
                id="username"
                label="Enter userName"
                defaultValue=""
                variant="outlined"
                fullWidth
                my={2}
              />
              <Box sx={{ display: "flex", flexDirection: "column", my: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    KYC change
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="KYC Change"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Settings One</MenuItem>
                    <MenuItem value={20}>Settings Two</MenuItem>
                    <MenuItem value={30}>Settings Three</MenuItem>
                    <MenuItem value={30}>Settings Four</MenuItem>
                    <MenuItem value={30}>Settings Five</MenuItem>
                  </Select>
                </FormControl>
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

export default KYCSettings;
