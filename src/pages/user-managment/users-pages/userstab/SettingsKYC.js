import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import { spacing } from "@material-ui/system";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  IconButton,
  Grid as MuiGrid,
  Alert as MuiAlert,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  TextField as MuiTextField,
  Avatar as MuiAvatar,
  Tab,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Box,
  Chip as MuiChip,
} from "@material-ui/core";

// Spacing.
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const Avatar = styled(MuiAvatar)``;
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const SettingsKYC = () => {
  return (
    <>
      <Card mb={6}>
        <CardContent>
          <Spacer mb={4} />

          <Grid container direction="row" alignItems="center" mb={2}>
            <Grid item item sx={6} md={2}>
              <Typography variant="subtitle1"> User Name </Typography>
            </Grid>
            <Spacer mx={4} />
            <Grid item item sx={6} md={2}>
              <Chip label="Verify" color="success" />
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="center" mb={2}>
            <Grid item sx={6} md={2}>
              <Typography variant="inherit" fontWeight="bold">
                Phone
              </Typography>
            </Grid>
            <Spacer mx={4} />
            <Grid item item sx={6} md={2}>
              <Typography variant="subtitle1">+11 11 00 00 00</Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="center" mb={2}>
            <Grid item item sx={6} md={2}>
              <Typography variant="inherit" fontWeight="bold">
                Date Registration
              </Typography>
            </Grid>
            <Spacer mx={4} />
            <Grid item item sx={6} md={2}>
              <Typography variant="subtitle1"> 01/09/21 </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="center" mb={2}>
            <Grid item item sx={6} md={2}>
              <Button variant="contained"> To approve </Button>
            </Grid>
            <Spacer mx={4} />
            <Grid item item sx={6} md={2}>
              <Button variant="contained"> Отклонить </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default SettingsKYC;
