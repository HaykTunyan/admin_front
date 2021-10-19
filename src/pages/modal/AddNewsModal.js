import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Divider,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import ImageUploading from "react-images-uploading";

const AddNewsModal = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
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
      <Button variant="contained" onClick={handleClickOpen}>
        Add News
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Information for News</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title-one"
            label="Title H1"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description One"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title 2"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description Two"
            type="text"
            fullWidth
            variant="standard"
          />
          <div>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper">
                  <Box py={5}>
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      onClick={onImageUpload}
                      style={isDragging ? { color: "red" } : undefined}
                      {...dragProps}
                    >
                      <CloudUpload mr={2} /> Upload
                    </Button>
                    &nbsp; &nbsp;
                    <Button variant="contained" onClick={onImageRemoveAll}>
                      Remove All
                    </Button>
                  </Box>
                  <Divider my={5} />
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <Button
                          onClick={() => onImageUpdate(index)}
                          variant="outlined"
                          mr={1}
                        >
                          Update
                        </Button>
                        &nbsp; &nbsp;
                        <Button
                          onClick={() => onImageRemove(index)}
                          variant="outlined"
                          ml={1}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create News</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewsModal;
