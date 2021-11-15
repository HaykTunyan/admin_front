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
import { UserPlus } from "react-feather";

const AddAffiliateUser = () => {
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
        <UserPlus />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Affiliate User</DialogTitle>
        <DialogContent>
          <Paper mt={3}></Paper>

          <TextField
            tabIndex={1}
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
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
            label="User Email"
            type="email"
            variant="standard"
            fullWidth
            my={8}
          />
          <TextField
            tabIndex={2}
            autoFocus
            margin="dense"
            id="phone"
            label="User Phone"
            type="phone"
            variant="standard"
            fullWidth
            my={8}
          />
          <Box my={8}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User Verify</InputLabel>
              <Select
                tabIndex={3}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={verify}
                label="Verify Type"
                onChange={handleChange}
              >
                <MenuItem value={10}>Verified</MenuItem>
                <MenuItem value={20}>Unverified</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", m: 5 }}>
            <FormControlLabel label="FSend" control={<Checkbox {...label} />} />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ width: "120px" }}>
            Cancel
          </Button>
          <Button onClick={handleClose} sx={{ width: "120px" }}>
            Create Affiliate User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAffiliateUser;
