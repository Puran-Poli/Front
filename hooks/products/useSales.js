import { useEffect, useState } from "react";
import { useFetcher } from "@/context/useFetcher";

// Lib Imports
import { removeEmptyArrFromObj } from "@/lib/nullify";
import { initFiltersValues } from "@/lib/products/productUtils";

/**
 *
 * Get Sales and inventory data for a single product
 *
 * @returns {Object} salesData - The sales data and handlers
 *
 */

export const useSalesSingle = (product_id, metric, resolution) => {
  const { isLoading, fetcher } = useFetcher();

  // States
  const [filters, setFilters] = useState(initFiltersValues);
  const [salesData, setSalesData] = useState({});

  // Fetch sales data function
  const fetchSalesData = async (filters) => {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/sales/${product_id}`,
      {
        method: "POST",
        body: {
          ...removeEmptyArrFromObj(filters),
        },
      }
    );

    const data = await res;
    const info = data?.info;

    return info;
  };

  useEffect(() => {
    const fetchedSalesData = async () => {
      const data = await fetchSalesData(filters);

      setSalesData(data);
    };
    if (product_id) {
      fetchedSalesData();
    }
  }, [filters]);

  return {
    filters,
    setFilters,
    salesData,
    isLoading,
  };
};
