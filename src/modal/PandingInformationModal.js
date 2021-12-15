import React, { useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  IconButton as MuiIconButton,
} from "@material-ui/core";
import moment from "moment";
import { XCircle } from "react-feather";

// Spacing.
const Spacer = styled.div(spacing);

// Custom Style.
const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const PandingInformationModal = ({
  pandingId,
  name,
  surname,
  country,
  dateBirthday,
  contact,
  documentType,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Information
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h4" color="inherit" component="div">
              Information
            </Typography>
            <IconButton
              aria-label="close"
              color="primary"
              onClick={handleClose}
            >
              <XCircle />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container pt={6} spacing={6} key={pandingId}>
              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  Name
                </Typography>
              </Grid>
              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  {name}
                </Typography>
              </Grid>

              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  Surename
                </Typography>
              </Grid>
              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  {surname}
                </Typography>
              </Grid>

              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  Birth Date
                </Typography>
              </Grid>
              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  {moment(dateBirthday).format("DD/MM/YYYY HH:mm ")}
                </Typography>
              </Grid>

              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  Contact Info
                </Typography>
              </Grid>
              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  {contact}
                </Typography>
              </Grid>

              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  Country
                </Typography>
              </Grid>
              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  {country}
                </Typography>
              </Grid>

              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  Document Type
                </Typography>
              </Grid>
              <Grid display="flex" item md={6} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  {documentType}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default PandingInformationModal;
