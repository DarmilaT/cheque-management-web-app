import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FilterListIcon from "@mui/icons-material/FilterList";

function FilterSection({
  onFilter,
  sendDataToChequeList,
  totalAmountOfPending,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilter = async () => {
    // You can pass the selected dates to the parent component for filtering
    console.log(startDate + " - " + endDate);
    const response = await onFilter(startDate, endDate);
    console.log(response.data);
    const res = await totalAmountOfPending(startDate, endDate);
    console.log(res);
    sendDataToChequeList(response.data, res.data);
  };

  return (
    <div className="flex gap-2 shrink-0">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startDate}
          format="YYYY-MM-DD"
          size="small"
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          format="YYYY-MM-DD"
          size="small"
          onChange={(date) => setEndDate(date)}
        />
      </LocalizationProvider>

      <Button
        onClick={handleFilter}
        className="flex items-center gap-3"
        size="sm"
      >
        <FilterListIcon />
        Filter
      </Button>
    </div>
  );
}

export default FilterSection;
