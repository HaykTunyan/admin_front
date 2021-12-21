import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { DatePicker } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";

const DatePickerFilter = () => {
  const [result, setResult] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Calendar"
        value={result}
        onChange={(newResult) => {
          setResult(newResult);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerFilter;
