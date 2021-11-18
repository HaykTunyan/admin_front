import React, { useState, Fragment } from "react";
import { TextField, Box } from "@material-ui/core";
import { DateRangePicker } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";

const DateRange = () => {
  const [value, setValue] = useState([null, null]);

  const onChangeTime = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Min Date"
        endText="Max Date"
        value={value}
        onChange={onChangeTime}
        renderInput={(startProps, endProps) => (
          <Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </Fragment>
        )}
      />
    </LocalizationProvider>
  );
};

export default DateRange;
