// MUI Imports
import Skeleton from "@mui/material/Skeleton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Map unique values from Data Frame to menu items
function columnMapped(uniqueValues) {
  let values = uniqueValues.map((value) => {
    return (
      <MenuItem key={value} value={value}>
        {value}
      </MenuItem>
    );
  });
  return values;
}

export default function ProductHierarchyField({ details, disabled }) {
  !details && <Skeleton variant="rectangular" width={360} height={40} />;

  return (
    <div className="mb-6">
      <FormControl size="small" className="w-[360px] min-w-[360px]">
        <InputLabel id={details.id}>{details.label} *</InputLabel>
        <Select
          labelId={details.id}
          id={details.id}
          name={details.id}
          value={details.value}
          label={details.label}
          onChange={details.onChange}
          disabled={disabled ? disabled : false}
          required
        >
          {columnMapped(details.options)}
        </Select>
      </FormControl>
    </div>
  );
}
