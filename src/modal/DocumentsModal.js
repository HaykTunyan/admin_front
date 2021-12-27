import React, { useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  DialogTitle,
  CardMedia,
  Typography,
} from "@material-ui/core";

const Spacer = styled.div(spacing);

const DocumentsModal = ({ document }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Downloaded files
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Downloaded files</DialogTitle>
        <DialogContent>
          <FormControl fullWidth my={8} variant="outlined">
            <Typography gutterBottom variant="h5" component="h2">
              {document.document_type === 1
                ? "Driver's license"
                : document.document_type === 2
                ? "ID card"
                : document.document_type === 3
                ? "Passport"
                : document.document_type === 4
                ? "esidence"
                : "Document"}
            </Typography>
          </FormControl>
          <CardMedia
            style={{ height: "220px" }}
            component="img"
            image={`data:image/png;base64,${document.document_front}`}
            title="document_front"
          />
          <Spacer my={3} />
          <CardMedia
            style={{ height: "220px" }}
            component="img"
            image={`data:image/png;base64,${document.document_back}`}
            title="document_back"
          />
          <Spacer my={3} />
          <FormControl fullWidth my={8} variant="outlined">
            <Typography gutterBottom variant="h5" component="h2">
              {"Selfie"}
            </Typography>
          </FormControl>
          <CardMedia
            style={{ height: "220px" }}
            component="img"
            image={`data:image/png;base64,${document.selfie}`}
            title="selfie"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ width: "120px" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DocumentsModal;
