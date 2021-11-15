import React, { Fragment, useState } from "react";
import styled from "styled-components/macro";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Grid,
  Select,
  IconButton as MuiIconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";

const EditSwapModal = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [curency, setCurency] = useState("");

  const [curencySecound, setCurencySecound] = useState("");

  const IconButton = styled(MuiIconButton)`
    svg {
      width: 22px;
      height: 22px;
    }
  `;

  const handleSecoundCurency = (event) => {
    setCurencySecound(event.target.value);
  };

  const handleCurency = (event) => {
    setCurency(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Fragment>
      <IconButton aria-label="done" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" color="inherit" component="div">
            Edit Swap Item
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container pt={6} spacing={6}>
            <Grid display="flex" item md={4} alignItems="center">
              <Typography variant="subtitle1" color="inherit" component="div">
                Ticker root
              </Typography>
            </Grid>
            <Grid item md={8}>
              <TextField
                autoFocus
                margin="dense"
                id="ticket"
                label="Ticket Root"
                type="text"
                fullWidth
                tabIndex={1}
              />
            </Grid>

            <Grid display="flex" alignItems="center" item md={4}>
              <Typography variant="subtitle1" color="inherit" component="div">
                Fess
              </Typography>
            </Grid>
            <Grid item md={8}>
              <TextField
                margin="dense"
                id="fess"
                label="Fess"
                type="text"
                fullWidth
                tabIndex={2}
              />
            </Grid>

            <Grid display="flex" alignItems="center" item md={4}>
              <Typography variant="subtitle1" color="inherit" component="div">
                First Currency
              </Typography>
            </Grid>
            <Grid item md={8}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Curency</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={curency}
                  label="Curency"
                  onChange={handleCurency}
                  tabIndex={3}
                >
                  <MenuItem value={10}>BTC</MenuItem>
                  <MenuItem value={20}>BTC 1</MenuItem>
                  <MenuItem value={30}>BTC 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid display="flex" alignItems="center" item md={4}>
              <Typography variant="subtitle1" color="inherit" component="div">
                Secound currency
              </Typography>
            </Grid>
            <Grid item md={8}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Secound Curency
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={curencySecound}
                  label="Secound Curency"
                  onChange={handleSecoundCurency}
                  tabIndex={4}
                >
                  <MenuItem value={10}>BTC</MenuItem>
                  <MenuItem value={20}>BTC 1</MenuItem>
                  <MenuItem value={30}>BTC 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid display="flex" alignItems="center" item md={4}>
              <Typography variant="subtitle1" color="inherit" component="div">
                Max Limit
              </Typography>
            </Grid>
            <Grid item md={8}>
              <TextField
                margin="dense"
                id="maxLimit"
                label="maxLimit"
                type="number"
                fullWidth
                tabIndex={5}
              />
            </Grid>
            <Grid display="flex" alignItems="center" item md={4}>
              <Typography variant="subtitle1" color="inherit" component="div">
                Min Limit
              </Typography>
            </Grid>
            <Grid item md={8}>
              <TextField
                margin="dense"
                id="minLimit"
                label="minLimit"
                type="number"
                fullWidth
                tabIndex={6}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider my={2} />
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ width: "120px" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ width: "120px" }}
          >
            Save Swap
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditSwapModal;
