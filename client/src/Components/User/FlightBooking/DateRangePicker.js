import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Search from './Logic/Search'

export default function CustomDateRangePicker() {
  const [date, setDate] = React.useState([Date.now(), Date.now()]);
  const { setDepDate, setRetDate } = Search()

  const depDate = new Date(date[0]);
  var depDateFormat = (depDate.getDate()) + "-" + (depDate.getMonth() + 1) + "-" + (depDate.getFullYear())
  if ((depDate.getMonth()) < 10) {
    depDateFormat = (depDate.getDate()) + "-0" + (depDate.getMonth() + 1) + "-" + (depDate.getFullYear())
    if ((depDate.getDate()) < 10) {
      depDateFormat = "0" + (depDate.getDate()) + "-0" + (depDate.getMonth() + 1) + "-" + (depDate.getFullYear())
    }
  }

  const returnDate = new Date(date[1]);
  var returnDateFormat = (returnDate.getDate()) + "-" + (returnDate.getMonth() + 1) + "-" + (returnDate.getFullYear())
  if ((depDate.getMonth()) < 10) {
    returnDateFormat = (returnDate.getDate()) + "-0" + (returnDate.getMonth() + 1) + "-" + (returnDate.getFullYear())
    if ((returnDate.getDate()) < 10) {
      returnDateFormat = "0" + (returnDate.getDate()) + "-0" + (returnDate.getMonth() + 1) + "-" + (returnDate.getFullYear())
    }
  }

  setDepDate(depDateFormat)
  setRetDate(returnDateFormat)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Depart"
        endText="Return"
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} required />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} required />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
