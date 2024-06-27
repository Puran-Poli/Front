// Components imports
import ImportDropZone from "@/components/analytics/sales/importSalesData/ImportDropZone";

// MUI Imports
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function ImportSalesData({
  templateOptions,
  selectedTemplate,
  handleChange,
  handleSelectedFileChange,
}) {
  return (
    <>
      <p className="mb-8">Select the record you want to update</p>
      <div className="w-[340px] min-w-[340px]">
        <FormControl fullWidth className="mb-5">
          <InputLabel id="filter-by-label">Filter by</InputLabel>
          <Select
            labelId="filter-by-label"
            id="filter-by"
            value={selectedTemplate}
            label="Filter by"
            onChange={handleChange}
          >
            {templateOptions?.map((template, i) => (
              <MenuItem key={i} value={template.value}>
                {template.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ImportDropZone
          selectedTemplate={selectedTemplate}
          handleChange={handleSelectedFileChange}
        />
      </div>
    </>
  );
}
