import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { DateRangePicker } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";

const DateRange = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (newValue) => {
    setIsOpen(!isOpen);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        open={isOpen}
        onClose={() => setIsOpen(false)}
        startText={"Calendar"}
        value={value}
        onOpen={() => {
          setIsOpen(true);
        }}
        onChange={onChange}
        renderInput={({ inputProps, ...startProps }, endProps) => {
          const startValue = inputProps.value;
          delete inputProps.value;

          return (
            <TextField
              {...startProps}
              inputProps={inputProps}
              fullWidth
              onClose={() => setIsOpen(false)}
              value={
                startValue === endProps.inputProps.value
                  ? `${startValue}`
                  : `${startValue}-${endProps.inputProps.value}`
              }
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default DateRange;
