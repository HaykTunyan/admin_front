import React, { useRef, Fragment } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Box } from "@material-ui/core";

const TinymceNew = ({ textBody, editorRef, onSave, content, contentError }) => {
  return (
    <Fragment>
      <Box my={2}>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={textBody}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        {contentError && !content && (
          <div>
            <span style={{ color: "red" }}>{"Field is required"}</span>
          </div>
        )}
        <Box display="flex" justifyContent="flex-end" mt={5}>
          <Button variant="contained" onClick={onSave} type="button">
            Save Text
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default TinymceNew;
