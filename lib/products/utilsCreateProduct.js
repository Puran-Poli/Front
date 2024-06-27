// MUI Imports
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

// return multipocket as option instead of -1
export const getNumberPocketsOptionLabel = (option) => {
  if (option === -1) {
    return "Multipocket";
  } else {
    return option.toString();
  }
};

// Get value and send -1 if multipocket
export const getNumberPocketsValue = (value) => {
  if (value === "Multipocket") {
    return -1;
  } else {
    return value;
  }
};

// Create Fields for Create/edit Modal
export const createField = (field) => {
  switch (field.fieldType) {
    case "Autocomplete":
      return (
        <Autocomplete
          options={field.options}
          getOptionLabel={
            field.getOptionLabel
              ? field.getOptionLabel
              : (option) => option.toString()
          }
          getOptionDisabled={
            field.getOptionDisabled ? field.getOptionDisabled : null
          }
          id={field.id}
          key={field.id}
          value={field.value}
          onChange={field.onChange}
          disabled={field.disabled ? field.disabled : false}
          renderInput={(params) => (
            <TextField
              {...params}
              label={field.label}
              variant="standard"
              required={field.required ? field.required : false}
            />
          )}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(option, inputValue, { insideWords: true });
            const parts = parse(option, matches);
            return (
              <li {...props}>
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{ fontWeight: part.highlight ? 900 : 400 }}
                    >
                      {field.id === "noPockets"
                        ? getNumberPocketsOptionLabel(part.text)
                        : part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          }}
        />
      );
    case "TextField":
      return (
        <TextField
          id={field.id}
          label={field.label}
          name={field.name}
          variant="standard"
          key={field.id}
          type={field.type ? field.type : "text"}
          value={field.value}
          size={field.size ? field.size : "medium"}
          onChange={field.onChange}
          inputProps={field.inputProps ? field.inputProps : ""}
          required={field.required ? field.required : false}
          disabled={field.disabled ? field.disabled : false}
        />
      );
    default:
      return null;
  }
};

// Required Fields for create/edit Modal
const requiredFields = [
  "styleId",
  "genderField",
  "verticalField",
  "fabricCategoryField",
  "brandField",
  "usageField",
  "brickField",
  "productField",
  "subProductField",
  "story",
  "targetAudienceField",
  "fitField",
  "sizes",
  "season",
  "primaryColor",
  "colorFamily",
  "fabricCode",
  "fabricComposition",
];

// Check if required fields are filled or not
export const checkRequiredFields = (item) => {
  // return false if any required field is empty or null
  return requiredFields.every((field) => {
    if (!item[field]) {
      return false;
    } else {
      return true;
    }
  });
};
