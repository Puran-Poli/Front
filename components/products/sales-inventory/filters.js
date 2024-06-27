import { useState } from "react";
import dayjs from "dayjs";

// Component imports
import { PrimaryButton, SimpleButton } from "@/components/base/Buttons";

// MUI imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// Lib imports
import { initFiltersValues } from "@/lib/products/productUtils";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const formatFilterName = (filterName) => {
  return filterName
    .replace(/_/g, " ")
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

const defaultDateRange = [
  dayjs().subtract(6, "month").format("DD-MM-YYYY"),
  dayjs().format("DD-MM-YYYY"),
];

export default function Filters({ filteredData }) {
  // States
  const [filters, setFilters] = useState({
    ...initFiltersValues,
  });

  const [inputValue, setInputValue] = useState({
    channels: "",
    month_start: "",
    month_end: "",
  });

  // Default shows current date and 30 days before
  const [dateRange, setDateRange] = useState(defaultDateRange);

  const filterOptions = {
    channels: initFiltersValues.channels,
  };

  // Handlers
  const handleFilter = () => {
    filteredData(
      Object.keys(filters).reduce((acc, key) => {
        if (filters[key].length) {
          acc[key] = filters[key];
        }
        return acc;
      }, {})
    );
  };

  const handleClearFilters = () => {
    setFilters({
      ...initFiltersValues,
    });
    setInputValue({
      channels: "",
      month_start: "",
      month_end: "",
    });
    setDateRange(defaultDateRange);
  };

  return (
    <div className="flex justify-end">
      <div className="flex gap-4">
        {/* Channel filter */}
        {Object.keys(filterOptions).map((key) => (
          <div key={key}>
            <Autocomplete
              multiple
              limitTags={1}
              id={key}
              options={filterOptions[key]}
              disableCloseOnSelect
              size="small"
              getOptionLabel={(option) => option}
              value={filters?.[key]}
              onChange={(event, newValue) => {
                setFilters({ ...filters, [key]: newValue });
              }}
              inputValue={inputValue.key}
              onInputChange={(event, newInputValue) => {
                setInputValue({ ...inputValue, [key]: newInputValue });
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              style={{ width: 270 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={formatFilterName(key)}
                  placeholder="Type..."
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                />
              )}
            />
          </div>
        ))}
        {/* Channel filter END. */}

        {/* TIME from and to */}

        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From"
              value={dayjs(dateRange[0], "DD-MM-YYYY")}
              inputFormat="DD-MM-YYYY"
              onChange={(newValue) => {
                setDateRange([
                  dayjs(newValue).format("DD-MM-YYYY"),
                  dateRange[1],
                ]);
                setFilters({
                  ...filters,
                  month_start: dayjs(newValue).format("YYYY-MM"),
                });
              }}
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="To"
              value={dayjs(dateRange[1], "DD-MM-YYYY")}
              inputFormat="DD-MM-YYYY"
              onChange={(newValue) => {
                setDateRange([
                  dateRange[0],
                  dayjs(newValue).format("DD-MM-YYYY"),
                ]);
                setFilters({
                  ...filters,
                  month_end: dayjs(newValue).format("YYYY-MM"),
                });
              }}
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>

        {/* TIME from and to END. */}

        <div className="flex justify-between gap-4">
          <SimpleButton
            onClick={() => handleClearFilters()}
            // disabled={Object.values(filters).every((x) => x.length === 0)}
            // disabled wihen all filters are empty or date range is default (current date and 30 days before)
            disabled={Object.values(filters).every((x) => x.length === 0)}
          >
            Clear
          </SimpleButton>
          <PrimaryButton
            onClick={() => handleFilter()}
            disabled={Object.keys(filters).length ? false : true}
          >
            Apply Filters
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
