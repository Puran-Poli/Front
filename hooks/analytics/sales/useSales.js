import { useState, useEffect } from "react";
import { useFetcher } from "@/context/useFetcher";

// Lib Imports
import { removeEmptyArrFromObj } from "@/lib/nullify";
import { initFiltersValues } from "@/lib/analytics/sales/topSellersUtils";

/**
 *
 * Get top sellers sales data hook
 *
 * @returns {Object} topSellersData - The top sellers sales data and handlers
 *
 */

export const useTopSellersData = () => {
  const { isLoading, fetcher } = useFetcher();

  // States
  const [filters, setFilters] = useState(initFiltersValues);
  const [topSellersData, setTopSellersData] = useState({});

  // Fetch top sellers sales data function
  const fetchTopSellersData = async (filters) => {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/sales/top-sellers`,
      {
        method: "POST",
        body: {
          ...removeEmptyArrFromObj(filters),
        },
      }
    );

    const data = await res;

    return data;
  };

  useEffect(() => {
    const fetchedTopSellersData = async () => {
      const data = await fetchTopSellersData(filters);

      setTopSellersData(data);
    };

    fetchedTopSellersData();
  }, [filters]);

  return {
    filters,
    setFilters,
    topSellersData,
    isLoading,
  };
};

/**
 *
 * Get YoY sales data hook
 *
 * @returns {Object} yoyData - The YoY sales data and handlers
 *
 */

function convertData(data, resolution, metric) {
  let result = [];
  let years = [];

  data.forEach((item) => {
    if (!years.includes(item.year)) {
      years.push(item.year);
    }
  });

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // months.forEach((month) => {
  //   let obj = {
  //     name: month,
  //   };
  //   years.forEach((year) => {
  //     obj[year] = null;
  //   });
  //   result.push(obj);
  // });

  // data.forEach((item) => {
  //   result.forEach((obj) => {
  //     if (obj.name === item.month) {
  //       obj[item.year] = item[metric];
  //     }
  //   });
  // });
  if (resolution === "month") {
    months.forEach((month) => {
      let obj = {
        name: month,
      };
      years.forEach((year) => {
        obj[year] = null;
      });
      result.push(obj);
    });

    data.forEach((item) => {
      result.forEach((obj) => {
        if (obj.name === item.month) {
          obj[item.year] = item[metric];
        }
      });
    });
  } else if (resolution === "week") {
    let weeks = [];
    data.forEach((item) => {
      if (!weeks.includes(item.week)) {
        weeks.push(item.week);
      }
    });

    weeks.forEach((week) => {
      let obj = {
        name: week,
      };
      years.forEach((year) => {
        obj[year] = null;
      });
      result.push(obj);
    });

    data.forEach((item) => {
      result.forEach((obj) => {
        if (obj.name === item.week) {
          obj[item.year] = item[metric];
        }
      });
    });

    // sort result by week number
    result.sort((a, b) => {
      return a.name - b.name;
    });
  }

  return result;
}

export const useYoYData = (filters, metric, resolution) => {
  const { isLoading, fetcher } = useFetcher();

  // States
  const [yoyData, setYoYData] = useState({});

  // Fetch YoY sales data function
  const fetchYoYData = async (filters) => {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/sales/yoy`,
      {
        method: "POST",
        body: {
          ...removeEmptyArrFromObj(filters),
          metric: metric,
          resolution: resolution,
        },
      }
    );

    const data = await res;

    return data;
  };

  useEffect(() => {
    const fetchedYoYData = async () => {
      const data = await fetchYoYData(filters);

      const dataConverted = convertData(data.info.items, resolution, metric);

      setYoYData(dataConverted);
    };

    fetchedYoYData();
  }, [filters, metric, resolution]);

  return {
    yoyData,
    isLoading,
  };
};

/**
 *
 * Import sales data hook
 *
 * @returns {Object} importSalesData - The import sales data and handlers
 *
 */

export const useImportSalesData = () => {
  const { fetchError, setFetchError, isLoading, fetcher } = useFetcher();
  const [open, setOpen] = useState(false);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [importStatus, setImportStatus] = useState(null);

  // Get Sales Template Options Function
  const getTemplateOptions = async () => {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/sales/upload`,
      {
        method: "GET",
      }
    );
    const data = await res;
    // iterate data?.info object and push to templateOptions
    const options = [];
    for (const [key, value] of Object.entries(data?.info)) {
      options.push({ label: key, value: value });
    }
    setTemplateOptions(options);
    return data;
  };

  // Handlers
  const handleOpen = () => {
    getTemplateOptions();
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTemplate("");
    setSelectedFile(null);
    setImportStatus(null);
    setOpen(false);
    setFetchError(null);
  };

  const handleSelectedTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const handleSelectedFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSave = async () => {
    // handle upload file to /import
    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/sales/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res) {
      setImportStatus(true);
    } else {
      setImportStatus(false);
    }
  };

  return {
    open,
    templateOptions,
    selectedTemplate,
    selectedFile,
    importStatus,
    isLoading,
    fetchError,
    handleOpen,
    handleClose,
    handleSelectedTemplateChange,
    handleSelectedFileChange,
    handleSave,
  };
};
