import React, { Fragment, useState } from "react";
import {
  Button,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  DialogTitle,
  InputLabel,
  MenuItem,
  Box,
  Divider,
  IconButton,
  FormControlLabel,
  Select,
  Checkbox,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import ImageUploading from "react-images-uploading";
import { UserPlus, Edit2 } from "react-feather";

const AddAdminModal = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [verify, setVerify] = useState("");

  const handleChange = (event) => {
    setVerify(event.target.value);
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const maxNumber = 69;
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
    <div>
      <IconButton aria-label="settings" size="large" onClick={handleClickOpen}>
        <UserPlus />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Admin</DialogTitle>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create Admin</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAdminModal;
