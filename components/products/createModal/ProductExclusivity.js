// MUI Imports
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

export default function ProductExclusivity(props) {
  const { exclusiveValue, exclusiveOnChange, exclusiveOptions } = props;

  return (
    <div className="col-span-2">
      <FormControl>
        <FormLabel id="exclusive-radio">Exclusivity *</FormLabel>
        <RadioGroup
          row
          aria-labelledby="exclusive-radio"
          name="exclusive-radio"
          value={exclusiveValue}
          onChange={exclusiveOnChange}
          required
        >
          {exclusiveOptions.map((exclusive, i) => (
            <FormControlLabel
              key={i}
              value={exclusive}
              control={<Radio />}
              label={exclusive}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
