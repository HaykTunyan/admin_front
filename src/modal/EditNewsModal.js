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
import { editNews_req } from "../api/newsAPI";
import ConfirmationNotice from "../components/ConfirmationNotice";

const EditNewsModal = ({ news, getNews }) => {
  const editorRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [initialState, setInitialState] = useState({
    title: news.title,
    description: news.description,
  });
  const [content, setContent] = useState(news.content);
  const [images, setImages] = useState([
    { data_url: `data:image/png;base64,${news.image}` },
  ]);

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    content: "",
    images: [],
  });

  const editNewsSchema = yup.object().shape({
    title: yup.string(),
    description: yup.string(),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setInitialValues({
      ...initialValues,
      images: imageList,
    });
  };

  function saveContent() {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setInitialValues({
        ...initialValues,
        content: editorRef.current.getContent(),
      });
    }
  }

  async function editNews(values) {
    setSuccess(false);
    console.log("Initial Values ==>", initialValues, ".....", values);
    const formData = new FormData();

    formData.append("_id", news._id);

    if (values && values.title) {
      formData.append("title", values.title);
    }

    if (values && values.description) {
      formData.append("description", values.description);
    }

    if (initialValues.content) {
      formData.append("content", initialValues.content);
    }

    if (initialValues.images.length) {
      formData.append("image", initialValues.images[0].file);
    }

    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await editNews_req(formData);
      if (response) {
        setOpen(false);
        getNews();
        setSuccess(true);
      }
    } catch (e) {
      setOpen(false);
    }
  }

  return (
    <Fragment>
      {success === true && (
        <ConfirmationNotice title="News successfully edited" />
      )}
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Formik
        validateOnChange={true}
        initialValues={{ ...initialValues }}
        validationSchema={editNewsSchema}
        onSubmit={(values) => editNews(values)}
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
                <DialogTitle>Edit Information for News</DialogTitle>
                <DialogContent>
                  <TextField
                    margin="dense"
                    id="title-one"
                    label="Title H1"
                    type="text"
                    fullWidth
                    defaultValue={initialState.title}
                    onChange={handleChange("title")}
                  />
                  <TextField
                    margin="dense"
                    id="description"
                    label="Description One"
                    type="text"
                    fullWidth
                    defaultValue={initialState.description}
                    onChange={handleChange("description")}
                  />
                  <Box my={5}>
                    <Typography
                      variant="subtitle1"
                      children="Editor Text for Description"
                    />
                    <TinymceNew
                      textBody={content}
                      editorRef={editorRef}
                      onSave={saveContent}
                      content={initialValues.content}
                    />
                  </Box>
                  <Divider my={5} />
                  <div>
                    <ImageUploading
                      //multiple
                      //maxNumber={maxNumber}
                      value={initialValues.images}
                      onChange={onChange}
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
                          {/* <div className="image-item">
                            <img src={NewsImage} width="100" />
                          </div> */}
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
                            <Button
                              variant="contained"
                              onClick={onImageRemoveAll}
                            >
                              Remove All
                            </Button>
                          </Box>
                          <Divider my={5} />

                          {(imageList.length ? imageList : images).map(
                            (image, index) => (
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
                            )
                          )}
                        </div>
                      )}
                    </ImageUploading>
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
                      handleSubmit();
                    }}
                    sx={{ width: "120px" }}
                  >
                    Save News
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

export default EditNewsModal;
