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

const AddNotificationModal = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [send, setSend] = useState("");

  const handleChange = (event) => {
    setSend(event.target.value);
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
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Notification
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add New Notification</DialogTitle>
        <DialogContent>
          <Box my={8}>
            <FormControl fullWidth my={8} variant="outlined">
              <InputLabel id="simple-select">Select issuers(users) </InputLabel>
              <Select
                labelId="simple-select"
                id="simple-select"
                value={send}
                label="Select issuers(users)"
                onChange={handleChange}
              >
                <MenuItem value={10}>Send to all</MenuItem>
                <MenuItem value={20}>User One</MenuItem>
                <MenuItem value={30}>User Two</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box my={8}>
            <FormControl fullWidth my={8} variant="outlined">
              <TextField
                id="titleNotification"
                label="Title Notification"
                defaultValue="titleNotification"
                variant="outlined"
                fullWidth
                my={3}
              />
            </FormControl>
          </Box>
          <FormControl fullWidth my={8} variant="outlined">
            <TextField
              label="Notification Info"
              id="info"
              multiline={true}
              rows={3}
              maxRows={4}
              variant="outlined"
              defaultValue=" Send Notification for Users "
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create Notification</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNotificationModal;
