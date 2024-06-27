import { useState, useEffect } from "react";

// Component imports
import { PrimaryButton, SimpleButton } from "@/components/base/Buttons";
import FiltersSkeleton from "@/components/analytics/sales/filters/FiltersSkeleton";

// MUI Imports
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

// Lib imports
import { pageSize } from "@/lib/constants";

// Hook imports
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";
import { useOptions } from "@/hooks/products/useProducts";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const formatFilterName = (filterName) => {
  return filterName
    .replace(/_/g, " ")
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

export default function Filters({ paginationData, productRange, productPage }) {
  const { userRole, userIsLoading } = useUserRole();
  const {
    filters: filterValues,
    mrp: mrpRange,
    cost: costRange,
  } = useOptions();
  const [filters, setFilters] = useState({
    style_id: "",
    fabric_code: "",
    product_id: "",
    ean: "",
    gender: [],
    vertical: [],
    fabric_category: [],
    brand: [],
    usage: [],
    brick: [],
    product: [],
    sub_product: [],
    story: [],
    target_audience: [],
    fit: [],
    colour_family: [],
    season: [],
    deleted: false,
    status: [],
    exclusive: [],
    garment_pattern: [],
    print_pattern_type: [],
    number_of_components: [],
    number_of_pockets: [],
    pocket_type: [],
    neck: [],
    collar: [],
    placket: [],
    length: [],
    sleeve_length: [],
    sleeve_type: [],
    hemline: [],
    waist_rise: [],
    closure: [],
    footwear_insole: [],
    fabric_story: [],
    fabric_weave_pattern: [],
    wash_care: [],
    footwear_upper_material: [],
    footwear_sole_material: [],
    mrp: [],
    cost: [],
  });
  const [inputValue, setInputValue] = useState({
    style_id: "",
    fabric_code: "",
    product_id: "",
    ean: "",
    gender: "",
    vertical: "",
    fabric_category: "",
    brand: "",
    usage: "",
    brick: "",
    product: "",
    sub_product: "",
    story: "",
    target_audience: "",
    fit: "",
    colour_family: "",
    season: "",
    status: "",
    exclusive: "",
    garment_pattern: "",
    print_pattern_type: "",
    number_of_components: "",
    number_of_pockets: "",
    pocket_type: "",
    neck: "",
    collar: "",
    placket: "",
    length: "",
    sleeve_length: "",
    sleeve_type: "",
    hemline: "",
    waist_rise: "",
    closure: "",
    footwear_insole: "",
    fabric_story: "",
    fabric_weave_pattern: "",
    wash_care: "",
    footwear_upper_material: "",
    footwear_sole_material: "",
    mrp: "",
    cost: "",
  });
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [minMRP, setMinMRP] = useState(0);
  const [maxMRP, setMaxMRP] = useState(200);
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(200);

  useEffect(() => {
    async function setMinMaxMrpCost() {
      if (mrpRange && costRange) {
        setMinMRP(mrpRange.min);
        setMaxMRP(mrpRange.max);
        setMrp([mrpRange.min, mrpRange.max]);
        setMinCost(costRange.min);
        setMaxCost(costRange.max);
        setCost([costRange.min, costRange.max]);
      }
    }
    setMinMaxMrpCost();
  }, [costRange, mrpRange]);
  const [mrp, setMrp] = useState([minMRP, maxMRP]);
  const [cost, setCost] = useState([minCost, maxCost]);

  if (!filterValues) {
    return (
      <section className="product_filters relative min-h-screen min-w-[224px] bg-slate-100 px-3 pt-7">
        <h2 className="fixed top-0 left-[86px] min-w-[200px] border-b pb-5 pt-7 text-xl font-medium leading-6 tracking-wide text-slate-800">
          Filters
        </h2>
        <FiltersSkeleton />
      </section>
    );
  }

  const filterOptions = {
    gender: filterValues?.primary.gender,
    vertical: filterValues?.primary.vertical,
    fabric_category: filterValues?.primary.fabric_category,
    brand: filterValues?.primary.brand,
    usage: filterValues?.primary.usage,
    brick: filterValues?.primary.brick,
    product: filterValues?.primary.product,
    sub_product: filterValues?.primary.sub_product,
    story: filterValues?.primary.story,
    target_audience: filterValues?.primary.target_audience,
    fit: filterValues?.primary.fit,
    status: filterValues?.primary.status,
  };

  const moreFilterOptions = {
    colour_family: filterValues?.primary.colour_family,
    season: filterValues?.primary.season,
    exclusive: filterValues?.secondary.exclusive,
    garment_pattern: filterValues?.secondary.garment_pattern,
    print_pattern_type: filterValues?.secondary.print_pattern_type,
    number_of_components: filterValues?.secondary.number_of_components,
    number_of_pockets: filterValues?.secondary.number_of_pockets,
    pocket_type: filterValues?.secondary.pocket_type,
    neck: filterValues?.secondary.neck,
    collar: filterValues?.secondary.collar,
    placket: filterValues?.secondary.placket,
    length: filterValues?.secondary.length,
    sleeve_length: filterValues?.secondary.sleeve_length,
    sleeve_type: filterValues?.secondary.sleeve_type,
    hemline: filterValues?.secondary.hemline,
    waist_rise: filterValues?.secondary.waist_rise,
    closure: filterValues?.secondary.closure,
    footwear_insole: filterValues?.secondary.footwear_insole,
    fabric_story: filterValues?.secondary.fabric_story,
    fabric_weave_pattern: filterValues?.secondary.fabric_weave_pattern,
    wash_care: filterValues?.secondary.wash_care,
    footwear_upper_material: filterValues?.secondary.footwear_upper_material,
    footwear_sole_material: filterValues?.secondary.footwear_sole_material,
  };

  // Handlers
  const handleFilter = () => {
    productRange([0, pageSize]);
    productPage(1);
    paginationData({ ...filters });
  };

  const handleDeletedChange = (event) => {
    if (event.target.value === "true") {
      setFilters({ ...filters, deleted: true });
    }
    if (event.target.value === "false") {
      setFilters({ ...filters, deleted: false });
    }
  };

  const handleStyleIdChange = (event) => {
    setFilters({ ...filters, style_id: event.target.value });
  };

  const handleFabricCodeChange = (event) => {
    setFilters({ ...filters, fabric_code: event.target.value });
  };

  const handleProductIdChange = (event) => {
    setFilters({ ...filters, product_id: event.target.value });
  };

  const handleEanChange = (event) => {
    setFilters({ ...filters, ean: Number(event.target.value) });
  };

  const handleClearFilters = () => {
    setFilters({
      style_id: "",
      fabric_code:"",
      product_id: "",
      ean: "",
      gender: [],
      vertical: [],
      fabric_category: [],
      brand: [],
      usage: [],
      brick: [],
      product: [],
      sub_product: [],
      story: [],
      target_audience: [],
      fit: [],
      colour_family: [],
      season: [],
      deleted: false,
      status: [],
      exclusive: [],
      garment_pattern: [],
      print_pattern_type: [],
      number_of_components: [],
      number_of_pockets: [],
      pocket_type: [],
      neck: [],
      collar: [],
      placket: [],
      length: [],
      sleeve_length: [],
      sleeve_type: [],
      hemline: [],
      waist_rise: [],
      closure: [],
      footwear_insole: [],
      fabric_story: [],
      fabric_weave_pattern: [],
      wash_care: [],
      footwear_upper_material: [],
      footwear_sole_material: [],
      mrp: [],
      cost: [],
    });
    setInputValue({
      style_id: "",
      fabric_code: "",
      product_id: "",
      ean: "",
      gender: "",
      vertical: "",
      fabric_category: "",
      brand: "",
      usage: "",
      brick: "",
      product: "",
      sub_product: "",
      story: "",
      target_audience: "",
      fit: "",
      colour_family: "",
      season: "",
      status: "",
      exclusive: "",
      garment_pattern: "",
      print_pattern_type: "",
      number_of_components: "",
      number_of_pockets: "",
      pocket_type: "",
      neck: "",
      collar: "",
      placket: "",
      length: "",
      sleeve_length: "",
      sleeve_type: "",
      hemline: "",
      waist_rise: "",
      closure: "",
      footwear_insole: "",
      fabric_story: "",
      fabric_weave_pattern: "",
      wash_care: "",
      footwear_upper_material: "",
      footwear_sole_material: "",
    });
    productRange([0, pageSize]);
    productPage(1);
    paginationData({});
    setMrp([minMRP, maxMRP]);
    setCost([minCost, maxCost]);
  };

  const handleMrpChange = (event, newValue, activeThumb) => {
    const MINDISTANCE = 500;
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < MINDISTANCE) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxMRP - MINDISTANCE);
        setMrp([clamped, clamped + MINDISTANCE]);
        setFilters((prev) => ({
          ...prev,
          mrp: [clamped, clamped + MINDISTANCE],
        }));
      } else {
        const clamped = Math.max(newValue[1], minMRP + MINDISTANCE);
        setMrp([clamped - MINDISTANCE, clamped]);
        setFilters((prev) => ({
          ...prev,
          mrp: [clamped - MINDISTANCE, clamped],
        }));
      }
    } else {
      setMrp(newValue);
      setFilters((prev) => ({
        ...prev,
        mrp: newValue,
      }));
    }
  };

  const handleCostChange = (event, newValue, activeThumb) => {
    const MINDISTANCE = 200;
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < MINDISTANCE) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxCost - MINDISTANCE);
        setCost([clamped, clamped + MINDISTANCE]);
        setFilters((prev) => ({
          ...prev,
          cost: [clamped, clamped + MINDISTANCE],
        }));
      } else {
        const clamped = Math.max(newValue[1], minCost + MINDISTANCE);
        setCost([clamped - MINDISTANCE, clamped]);
        setFilters((prev) => ({
          ...prev,
          cost: [clamped - MINDISTANCE, clamped],
        }));
      }
    } else {
      setCost(newValue);
      setFilters((prev) => ({
        ...prev,
        cost: newValue,
      }));
    }
  };

  if (userIsLoading) {
    return (
      <section className="product_filters relative min-h-screen min-w-[224px] bg-slate-100 px-3 pt-7">
        Checking user access...
      </section>
    );
  }

  const canReadMrp = getFeature(userRole, "product mrp")?.read;
  const canReadCost = getFeature(userRole, "product cost")?.read;

  return (
    <section className="product_filters relative min-h-screen min-w-[224px] bg-slate-100 px-3 pt-7">
      <h2 className="fixed top-0 left-[86px] min-w-[200px] border-b pb-5 pt-7 text-xl font-medium leading-6 tracking-wide text-slate-800">
        Filters
      </h2>
      {/* <hr className="my-5 border" /> */}
      <div className="fixed left-[74px] my-12 h-screen min-w-[224px] overflow-y-scroll px-3 pb-24">
        <div className="mb-12 mt-6">
          <div className="mb-4">
            <TextField
              id="style_id"
              label="Style ID"
              size="small"
              style={{ width: 200 }}
              value={filters?.style_id}
              onChange={handleStyleIdChange}
              InputLabelProps={{
                style: { fontSize: 14 },
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="fabric_code"
              label="Fabric Code"
              size="small"
              style={{ width: 200 }}
              value={filters?.fabric_code}
              onChange={handleFabricCodeChange}
              InputLabelProps={{
                style: { fontSize: 14 },
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="product_id"
              label="Product ID"
              size="small"
              style={{ width: 200 }}
              value={filters?.product_id}
              onChange={handleProductIdChange}
              InputLabelProps={{
                style: { fontSize: 14 },
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="ean"
              label="EAN"
              size="small"
              type="number"
              style={{ width: 200 }}
              value={filters?.ean}
              onChange={handleEanChange}
              InputLabelProps={{
                style: { fontSize: 14 },
              }}
            />
          </div>
          {/* MUI FILTER */}
          {Object.keys(filterOptions).map((key) => (
            <div key={key} className="mb-4">
              <Autocomplete
                multiple
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
                style={{ width: 200 }}
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

          {canReadMrp && (
            <div className="mb-4">
              <p className="mb-4 text-sm text-slate-600">MRP</p>
              <div className="flex w-[200px] justify-between gap-2">
                <div>
                  <TextField
                    id="mrp_min"
                    label="Min"
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: minMRP,
                        max: maxMRP,
                      },
                    }}
                    size="small"
                    value={mrp[0]}
                    onChange={(e) => {
                      setMrp([Number(e.target.value), mrp[1]]);
                      setFilters({
                        ...filters,
                        mrp: [Number(e.target.value), mrp[1]],
                      });
                    }}
                  />
                </div>
                <div>
                  <TextField
                    id="mrp_max"
                    label="Max"
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: minMRP,
                        max: maxMRP,
                      },
                    }}
                    size="small"
                    value={mrp[1]}
                    onChange={(e) => {
                      setMrp([mrp[0], Number(e.target.value)]);
                      setFilters({
                        ...filters,
                        mrp: [mrp[0], Number(e.target.value)],
                      });
                    }}
                  />
                </div>
              </div>
              <div className="mx-auto w-[90%]">
                <Slider
                  size="small"
                  getAriaLabel={() => "MRP Range"}
                  value={mrp}
                  min={minMRP}
                  max={maxMRP}
                  onChange={handleMrpChange}
                  valueLabelDisplay="auto"
                  disableSwap
                />
              </div>
            </div>
          )}
          {canReadCost && (
            <div className="mb-4">
              <p className="mb-4 text-sm text-slate-600">Cost</p>
              <div className="flex w-[200px] justify-between gap-2">
                <div>
                  <TextField
                    id="cost_min"
                    label="Min"
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: minCost,
                        max: maxCost,
                      },
                    }}
                    size="small"
                    value={cost[0]}
                    onChange={(e) => {
                      setCost([Number(e.target.value), cost[1]]);
                      setFilters({
                        ...filters,
                        cost: [Number(e.target.value), cost[1]],
                      });
                    }}
                  />
                </div>
                <div>
                  <TextField
                    id="cost_max"
                    label="Max"
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: minCost,
                        max: maxCost,
                      },
                    }}
                    size="small"
                    value={cost[1]}
                    onChange={(e) => {
                      setCost([cost[0], Number(e.target.value)]);
                      setFilters({
                        ...filters,
                        cost: [cost[0], Number(e.target.value)],
                      });
                    }}
                  />
                </div>
              </div>
              <div className="mx-auto w-[90%]">
                <Slider
                  size="small"
                  getAriaLabel={() => "Cost Range"}
                  value={cost}
                  min={minCost}
                  max={maxCost}
                  onChange={handleCostChange}
                  valueLabelDisplay="auto"
                  disableSwap
                />
              </div>
            </div>
          )}

          <hr className="my-5 border" />
          <div>
            <span
              onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}
              className="block cursor-pointer pb-4 text-sm text-slate-600"
            >
              {moreFiltersOpen ? "- Less Filters" : "+ More Filters"}
            </span>
            {moreFiltersOpen &&
              Object.keys(moreFilterOptions).map((key) => (
                <div key={key} className="mb-4">
                  {/* Map through the array and display the value */}
                  <Autocomplete
                    multiple
                    id={key}
                    options={moreFilterOptions[key]}
                    size="small"
                    disableCloseOnSelect
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
                    style={{ width: 200 }}
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
            {moreFiltersOpen && (
              <div className="mb-4">
                <FormControl>
                  <FormLabel id="deleted-filter">Deleted</FormLabel>
                  <RadioGroup
                    aria-labelledby="deleted-filter"
                    name="deleted-filter"
                    value={filters?.deleted}
                    onChange={handleDeletedChange}
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio size="small" />}
                      label="Not Deleted"
                      sx={{
                        "& .MuiFormControlLabel-label": { fontSize: "14px" },
                      }}
                      defaultChecked
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio size="small" />}
                      sx={{
                        "& .MuiFormControlLabel-label": { fontSize: "14px" },
                      }}
                      label="Deleted"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed left-[74px] bottom-0 flex min-w-[224px] justify-between gap-4 bg-slate-100 px-3 py-3">
        <SimpleButton
          onClick={() => handleClearFilters()}
          disabled={Object.values(filters).every(
            (x) => x.length === 0 || x === false
          )}
        >
          Clear
        </SimpleButton>
        <PrimaryButton
          onClick={() => handleFilter()}
          disabled={Object.values(filters).every(
            (x) => x.length === 0 || x === false
          )}
        >
          Apply Filters
        </PrimaryButton>
      </div>
    </section>
  );
}

