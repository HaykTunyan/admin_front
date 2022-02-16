import React, { useState, Fragment } from "react";
import { TextField } from "@material-ui/core";
import { DateRangePicker } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import moment from "moment";

const DateFilterPicker = () => {
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onChangeTime = (newValue) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setValue(newValue);
  };

  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Calendar"
          endText="Calendar"
          label="Calendar"
          maxDate={endDate}
          minDate={startDate}
          value={value}
          onChange={onChangeTime}
          renderInput={(startProps, endProps) => (
            <Fragment>
              <TextField {...startProps} fullWidth />
              <TextField {...endProps} fullWidth />
            </Fragment>
          )}
        />
      </LocalizationProvider>
    </Fragment>
  );
};

export default DateFilterPicker;
