import React, { useState } from "react";
import {
  Button,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  DialogTitle,
  InputLabel,
  MenuItem,
  Box,
  IconButton,
  FormControlLabel,
  Select,
  Checkbox,
} from "@material-ui/core";
import { Edit2 } from "react-feather";

const EditAdminModal = () => {
  const [open, setOpen] = useState(false);
  const [verify, setVerify] = useState("");

  const handleChange = (event) => {
    setVerify(event.target.value);
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <Edit2 />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <Paper mt={3}></Paper>

          <TextField
            tabIndex={1}
            autoFocus
            margin="dense"
            id="name"
            label="Admin Name"
            type="text"
            variant="standard"
            fullWidth
            my={8}
          />
          <TextField
            tabIndex={2}
            autoFocus
            margin="dense"
            id="email"
            label="Admin Email"
            type="email"
            variant="standard"
            fullWidth
            my={8}
          />
          <Box my={8}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Admin Type</InputLabel>
              <Select
                tabIndex={3}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={verify}
                label="Verify Type"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Disconect</em>
                </MenuItem>
                <MenuItem value={10}>Active</MenuItem>
                <MenuItem value={20}>Disabled</MenuItem>
                <MenuItem value={30}>Procesing</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", m: 5 }}>
            <FormControlLabel label="FSend" control={<Checkbox {...label} />} />
            <FormControlLabel
              label="Real Send"
              control={<Checkbox {...label} checked="true" />}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ width: "120px" }}>
            Cancel
          </Button>
          <Button onClick={handleClose} sx={{ width: "120px" }}>
            Save Admin
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditAdminModal;
