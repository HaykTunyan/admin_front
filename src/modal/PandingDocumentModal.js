import React, { useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  IconButton as MuiIconButton,
  Box,
} from "@material-ui/core";
import { Download, XCircle } from "react-feather";

// Custom Style.
const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const PandingDocumentModal = ({
  pandingId,
  documentType,
  documentBack,
  documentFront,
  selfie,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {
      type: mime,
    });
  }

  //Usage example:
  let file = dataURLtoFile(
    "data:text/plain;base64,aGVsbG8gd29ybGQ=",
    "hello.txt"
  );
  console.log(file);

  return (
    <>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Document
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h4" color="inherit" component="div">
              Document Information
            </Typography>
            <IconButton
              aria-label="close"
              color="primary"
              onClick={handleClose}
            >
              <XCircle />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container pt={6} spacing={6} key={pandingId}>
              {/* Dicument Type */}
              <Grid display="flex" item md={4} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  Document Type
                </Typography>
              </Grid>
              <Grid display="flex" item md={8} alignItems="center">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  component="div"
                  textAlign="center"
                >
                  {documentType === 1 && <>Driver's license</>}
                  {documentType === 2 && <>ID card</>}
                  {documentType === 3 && <>Passport</>}
                  {documentType === 4 && <>Residence</>}
                </Typography>
              </Grid>
              {/* Document Back */}
              <Grid display="flex" item md={4} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  Document Back
                </Typography>
              </Grid>
              <Grid display="flex" item md={4} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  {documentBack ? (
                    <img
                      width="70"
                      height="70"
                      src={`data:image/jpeg;base64,${documentBack}`}
                    />
                  ) : (
                    <div> No Document </div>
                  )}
                </Typography>
              </Grid>
              <Grid display="flex" item md={4} alignItems="center">
                {documentBack && (
                  <>
                    <Box display="flex" justifyContent="space-around">
                      <IconButton aria-label="download" variant="contained">
                        <a
                          href={`data:image/jpeg;base64,${documentBack}`}
                          download
                        >
                          <Download />
                        </a>
                      </IconButton>
                    </Box>
                    <Box>
                      <IconButton aria-label="delete">
                        <XCircle />
                      </IconButton>
                    </Box>
                  </>
                )}
              </Grid>
              {/* Document Front */}
              <Grid display="flex" item md={4} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  Document Front
                </Typography>
              </Grid>
              <Grid display="flex" item md={4} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  {documentFront ? (
                    <img
                      width="70"
                      height="70"
                      src={`data:image/jpeg;base64,${documentFront}`}
                    />
                  ) : (
                    <div> No Document </div>
                  )}
                </Typography>
              </Grid>
              <Grid display="flex" item md={4} alignItems="center">
                {documentFront && (
                  <>
                    <Box display="flex" justifyContent="space-around">
                      <IconButton aria-label="download">
                        <a
                          href={`data:image/jpeg;base64,${documentFront}`}
                          download
                        >
                          <Download />
                        </a>
                      </IconButton>
                    </Box>
                    <Box>
                      <IconButton aria-label="delete">
                        <XCircle />
                      </IconButton>
                    </Box>
                  </>
                )}
              </Grid>
              {/* Selfies */}
              <Grid display="flex" item md={4} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  Selfies
                </Typography>
              </Grid>
              <Grid display="flex" item md={4} alignItems="center">
                <Typography variant="subtitle1" color="inherit" component="div">
                  {selfie ? (
                    <img
                      width="70"
                      height="70"
                      src={`data:image/jpeg;base64,${selfie}`}
                    />
                  ) : (
                    <div> No Document </div>
                  )}
                </Typography>
              </Grid>
              <Grid display="flex" item md={4} alignItems="center">
                {selfie && (
                  <>
                    <Box display="flex" justifyContent="space-around">
                      <IconButton aria-label="download">
                        <a href={`data:image/jpeg;base64,${selfie}`} download>
                          <Download />
                        </a>
                      </IconButton>
                    </Box>
                    <Box>
                      <IconButton aria-label="delete">
                        <XCircle />
                      </IconButton>
                    </Box>
                  </>
                )}
              </Grid>
              {/*  */}
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default PandingDocumentModal;
