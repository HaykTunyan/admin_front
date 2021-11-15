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
  Typography,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import ImageUploading from "react-images-uploading";
import NewsImage from "../assets/images/news_one.jpg";
import TinymceNew from "../components/TinymceNew";

const EditNewsModal = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  const maxNumber = 69;

  const [textBody, setTextBody] = useState(
    "“The intent is to improve the usability of Hyperledger for all users,” said Christopher Ferris, CTO at IBM."
  );

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
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Information for News</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title-one"
            label="Title H1"
            type="text"
            fullWidth
            variant="standard"
            defaultValue="IBM Donates Code Improvements to Open Source Hyperledger"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description One"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={textBody}
          />
          <Box my={5}>
            <Typography
              variant="subtitle1"
              children="Editor Text for Description"
            />
            <TinymceNew textBody={textBody} />
          </Box>
          <Divider my={5} />
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
                  <div className="image-item">
                    <img src={NewsImage} width="100" />
                  </div>
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
          <Button onClick={handleClose} sx={{ width: "120px" }}>
            Cancel
          </Button>
          <Button onClick={handleClose} sx={{ width: "120px" }}>
            Save News
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditNewsModal;
