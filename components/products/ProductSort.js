import { useState } from "react";

// MUI Imports
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ProductSort({ sorting }) {
  const [sortValue, setSortValue] = useState(["updated_at", "desc"]);

  const handleSortChange = (event) => {
    sorting(event.target.value);
    setSortValue(event.target.value);
  };

  return (
    <div className="mb-5 flex gap-2 self-end">
      <FormControl sx={{ minWidth: 240 }} size="small">
        <InputLabel id="sorting-select">Sort By</InputLabel>
        <Select
          labelId="sorting-select"
          id="sorting-select"
          value={sortValue}
          label="Sort By"
          onChange={handleSortChange}
          renderValue={(value) => {
            switch (value[0]) {
              case "created_at":
                return value[1] === "desc"
                  ? "Created at - Descending"
                  : "Created at - Ascending";
              case "updated_at":
                return value[1] === "desc"
                  ? "Updated at - Descending"
                  : "Updated at - Ascending";
              default:
                return "Created at - Descending";
            }
          }}
        >
          <MenuItem value={["created_at", "desc"]}>
            Create at - Descending
          </MenuItem>
          <MenuItem value={["created_at", "asc"]}>
            Created at - Ascending
          </MenuItem>
          <MenuItem value={["updated_at", "desc"]}>
            Updated at - Descending
          </MenuItem>
          <MenuItem value={["updated_at", "asc"]}>
            Updated at - Ascending
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
