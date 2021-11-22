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

const EditAdminModal = ({ key }) => {
  const [open, setOpen] = useState(false);
  const [verify, setVerify] = useState("");

  console.log("row Id", key);

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
            variant="outlined"
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
            variant="outlined"
            fullWidth
            my={8}
          />
          <TextField
            tabIndex={2}
            margin="dense"
            id="password"
            label="Admin password"
            type="password"
            variant="outlined"
            fullWidth
            my={8}
          />
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
