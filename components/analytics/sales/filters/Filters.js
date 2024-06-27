import { useEffect, useState } from "react";
import dayjs from "dayjs";

// Skeleton imports
import FiltersSkeleton from "@/components/analytics/sales/filters/FiltersSkeleton";

// MUI imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { PrimaryButton, SimpleButton } from "@/components/base/Buttons";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Slider from "@mui/material/Slider";

// Hook Imports
import { useOptions } from "@/hooks/products/useProducts";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const formatFilterName = (filterName) => {
  return filterName
    .replace(/_/g, " ")
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

export default function Filters({ filteredData }) {
  const {
    filters: filterValues,
    mrp: mrpRange,
    cost: costRange,
  } = useOptions();
  // STATES
  const [filters, setFilters] = useState({
    gender: [],
    vertical: [],
    fabric_category: [],
    brand: [],
    usage: [],
    brick: [],
    product: [],
    sub_product: [],
    // story: [],
    target_audience: [],
    fit: [],
    // channel: [],
    colour_family: [],
    mrp: [],
    cost: [],
    t_from: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    t_to: dayjs().format("YYYY-MM-DD"),
  });
  const [inputValue, setInputValue] = useState({
    gender: "",
    vertical: "",
    fabric_category: "",
    brand: "",
    usage: "",
    brick: "",
    product: "",
    sub_product: "",
    // story: "",
    target_audience: "",
    fit: "",
    // channel: "",
    colour_family: "",
    mrp: "",
    cost: "",
    t_from: "",
    t_to: "",
  });

  // Default shows current date and 30 days before
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(30, "day").format("DD-MM-YYYY"),
    dayjs().format("DD-MM-YYYY"),
  ]);

  const [minMRP, setMinMRP] = useState(0);
  const [maxMRP, setMaxMRP] = useState(200);

  const [mrp, setMrp] = useState([minMRP, maxMRP]);

  useEffect(() => {
    async function setMinMaxMrpCost() {
      if (mrpRange && costRange) {
        setMinMRP(mrpRange.min);
        setMaxMRP(mrpRange.max);
        setMrp([mrpRange.min, mrpRange.max]);
        setMinCost(costRange.min);
        setMaxCost(costRange.max);
        setCost([costRange.min, costRange.max]);
        // setFilters((prev) => ({
        //   ...prev,
        //   mrp: [mrpRange.min, mrpRange.max],
        //   cost: [costRange.min, costRange.max],
        // }));
      }
    }
    setMinMaxMrpCost();
  }, [mrpRange, costRange]);

  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(200);
  const [cost, setCost] = useState([minCost, maxCost]);

  if (!filterValues)
    return (
      <section className="product_filters relative min-h-screen min-w-[224px] bg-slate-100 px-3 pt-7">
        <h2 className="fixed top-0 left-[86px] min-w-[200px] border-b pb-5 pt-7 text-xl font-medium leading-6 tracking-wide text-slate-800">
          Filters
        </h2>
        <FiltersSkeleton />
      </section>
    );

  const filterOptions = {
    gender: filterValues?.primary.gender,
    vertical: filterValues?.primary.vertical,
    fabric_category: filterValues?.primary.fabric_category,
    brand: filterValues?.primary.brand,
    usage: filterValues?.primary.usage,
    brick: filterValues?.primary.brick,
    product: filterValues?.primary.product,
    sub_product: filterValues?.primary.sub_product,
    // story: filterValues?.primary.story,
    target_audience: filterValues?.primary.target_audience,
    fit: filterValues?.primary.fit,
    // channel: filterValues?.channel || "TEMP_CHANNEL",
    colour_family: filterValues?.primary.colour_family,
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
      brand: [],
      gender: [],
      vertical: [],
      fabric_category: [],
      usage: [],
      brick: [],
      product: [],
      sub_product: [],
      // story: [],
      target_audience: [],
      fit: [],
      channel: [],
      colour_family: [],
      // mrp: [minMRP, maxMRP],
      // cost: [minCost, maxCost],
      mrp: [],
      cost: [],
      t_from: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
      t_to: dayjs().format("YYYY-MM-DD"),
    });
    setInputValue({
      brand: "",
      gender: "",
      vertical: "",
      fabric_category: "",
      usage: "",
      brick: "",
      product: "",
      sub_product: "",
      // story: "",
      target_audience: "",
      fit: "",
      channel: "",
      colour_family: "",
    });
    setMrp([minMRP, maxMRP]);
    setCost([minCost, maxCost]);
    setDateRange([
      dayjs().subtract(30, "day").format("DD-MM-YYYY"),
      dayjs().format("DD-MM-YYYY"),
    ]);
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

  const handleDateChange = (date) => {
    setFilters((prev) => ({
      ...prev,
      t_from: dayjs(date[0]).format("YYYY-MM-DD"),
      t_to: dayjs(date[1]).format("YYYY-MM-DD"),
    }));
  };

  return (
    <section className="product_filters relative min-h-screen min-w-[224px] bg-slate-100 px-3 pt-7">
      <h2 className="fixed top-0 left-[86px] min-w-[200px] border-b pb-5 pt-7 text-xl font-medium leading-6 tracking-wide text-slate-800">
        Filters
      </h2>
      {/* <hr className="my-5 border" /> */}
      <div className="fixed left-[74px] my-12 h-screen min-w-[224px] overflow-y-scroll px-3 pb-24">
        <div className="mb-12 mt-6">
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

          {/* MRP */}
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
          {/* MRP END. */}

          {/* COST */}
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
          {/* COST END. */}

          {/* TIME from and to */}
          <div className="mb-4">
            <p className="mb-4 text-sm text-slate-600">Time</p>
            <div className="w-[200px] justify-between gap-2">
              <div className="mb-4">
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
                        t_from: dayjs(newValue).format("YYYY-MM-DD"),
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
              <div className="mb-4">
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
                        t_to: dayjs(newValue).format("YYYY-MM-DD"),
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
            </div>
          </div>
          {/* TIME from and to END. */}
        </div>
      </div>
      <div className="fixed left-[74px] bottom-0 flex min-w-[224px] justify-between gap-4 bg-slate-100 px-3 py-3">
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
    </section>
  );
}
