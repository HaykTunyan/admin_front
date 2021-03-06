import React, { useState, useRef, Fragment } from "react";
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
import TinymceNew from "../components/TinymceNew";
import { Formik } from "formik";
import * as yup from "yup";
import { addNews_req } from "../api/newsAPI";
import ConfirmationNotice from "../components/ConfirmationNotice";

const AddNewsModal = ({ getNews }) => {
  //  Hooks.
  const editorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });
  const [content, setContent] = useState(null);
  const [contentError, setContentError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList);
    setImages(imageList);
  };

  async function addNews(values) {
    setSuccess(false);
    const formData = new FormData();
    const status = false;
    let content = "";

    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      content = editorRef.current.getContent();
      setContent(editorRef.current.getContent());
    }

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("content", content);
    formData.append("image", images[0].file);
    formData.append("published", status);

    try {
      const response = await addNews_req(formData);
      if (response) {
        setOpen(false);
        setImagesError(false);
        setContentError(false);
        getNews();
        setSuccess(true);
      }
    } catch (e) {
      setOpen(false);
      setImagesError(false);
      setContentError(false);
    }
  }

  const addNewsSchema = yup.object().shape({
    title: yup.string().required("Field is required"),
    description: yup.string().required("Field is required"),
  });

  return (
    <Fragment>
      {success && <ConfirmationNotice title="News Added" />}
      <Button variant="contained" onClick={handleClickOpen}>
        Add News
      </Button>
      <Formik
        validateOnChange={true}
        initialValues={{ ...initialValues }}
        validationSchema={addNewsSchema}
        onSubmit={(values) => addNews(values)}
      >
        {({ errors, touched, handleSubmit, handleChange }) => {
          return (
            <>
              <Dialog
                open={open}
                onClose={() => {
                  setOpen(false);
                }}
              >
                <DialogTitle>Information for News</DialogTitle>
                <DialogContent>
                  <TextField
                    margin="dense"
                    id="title-one"
                    label="Title H1"
                    type="text"
                    fullWidth
                    onChange={handleChange("title")}
                    error={touched.title && errors.title}
                    helperText={touched.title && errors.title}
                  />
                  <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    onChange={handleChange("description")}
                    error={touched.description && errors.description}
                    helperText={touched.description && errors.description}
                  />
                  <Box my={5}>
                    <Typography
                      variant="subtitle1"
                      children="Editor Text for Description"
                      color={contentError && !content ? "red" : "#FFFFF"}
                    />
                    <TinymceNew
                      editorRef={editorRef}
                      content={content}
                      contentError={contentError}
                    />
                  </Box>
                  <Divider my={5} />
                  <div>
                    <ImageUploading
                      value={images}
                      onChange={onChange}
                      dataURLKey="data_url"
                      acceptType={["jpg", "png"]}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        errors,
                      }) => (
                        <>
                          {errors && (
                            <div>
                              {errors.acceptType && (
                                <span>
                                  Your selected file type is not allow
                                </span>
                              )}
                            </div>
                          )}
                          <div className="upload__image-wrapper">
                            <Box py={5}>
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                onClick={onImageUpload}
                                style={
                                  isDragging ? { color: "red" } : undefined
                                }
                                {...dragProps}
                              >
                                <CloudUpload mr={2} /> Upload
                              </Button>
                              &nbsp; &nbsp;
                              <Button
                                variant="contained"
                                onClick={onImageRemoveAll}
                              >
                                Remove All
                              </Button>
                            </Box>
                            <Divider my={5} />
                            {imageList.map((image, index) => (
                              <div key={index} className="image-item">
                                <img
                                  src={image["data_url"]}
                                  alt=""
                                  width="100"
                                />
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
                        </>
                      )}
                    </ImageUploading>
                    {imagesError && !images.length && (
                      <div>
                        <span style={{ color: "red" }}>
                          {"You must upload 1 picture"}
                        </span>
                      </div>
                    )}
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpen(false)}
                    sx={{ width: "120px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      if (!images.length) {
                        setImagesError(true);
                      }

                      if (!content) {
                        setContentError(true);
                      }

                      handleSubmit();
                    }}
                    sx={{ width: "120px" }}
                  >
                    Create News
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default AddNewsModal;
