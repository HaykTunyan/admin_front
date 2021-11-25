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

const AddAffiliateUser = () => {
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
            margin="dense"
            id="email"
            label="Admin Email"
            type="email"
            variant="standard"
            fullWidth
            my={8}
          />

          <TextField
            tabIndex={2}
            margin="dense"
            id="full_name"
            label="Full Name"
            type="text"
            variant="standard"
            fullWidth
            my={8}
          />

          <TextField
            tabIndex={3}
            margin="dense"
            id="phone"
            label="Phone"
            type="number"
            variant="standard"
            fullWidth
            my={8}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create Affiliate</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAffiliateUser;
