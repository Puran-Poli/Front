import { useState, useEffect } from "react";
import { useFetcher } from "@/context/useFetcher";

// Lib imports
import { removeEmptyArrFromObj } from "@/lib/nullify";
import { pageSize, defaultSort } from "@/lib/constants";
import { getLocalStorage } from "@/lib/utils";

import { useIndexedDB } from "@/hooks/useIndexedDB";

/**
 *
 * Fetch products hook
 *
 * @returns {Object} products - The products data and pagination state and handlers
 *
 */
export const useFetchProducts = () => {
  const { fetcher } = useFetcher();

  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState(null);
  const [sort, setSort] = useState(defaultSort);
  const [page, setPage] = useState(1);
  const [productRange, setProductRange] = useState([0, pageSize]);
  const [productIsLoading, setProductIsLoading] = useState(false);

  // Fetch Products Function
  const fetchProducts = async (filters, sort, range) => {
    setProductIsLoading(true);
    const res = fetcher(`${process.env.NEXT_PUBLIC_PRODUCTS_API}/search/`, {
      method: "POST",
      body: {
        filters: {
          ...removeEmptyArrFromObj(filters),
        },
        range: range,
        sort: sort,
      },
    });

    const data = await res;

    return data;
  };

  // Handle page change
  const handlePageChange = async (event, value) => {
    setPage(value);
    setProductRange([(value - 1) * pageSize, value * pageSize]);
  };

  useEffect(() => {
    const fetchedProducts = async () => {
      const data = await fetchProducts(filters, sort, productRange);
      setProductIsLoading(false);
      setProducts(data);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    fetchedProducts();
  }, [filters, sort, productRange]);

  return {
    filters,
    setFilters,
    products,
    setProducts,
    productRange,
    setProductRange,
    sort,
    setSort,
    page,
    setPage,
    pageSize,
    handlePageChange,
    productIsLoading,
  };
};

/**
 *
 * Fetch One Product Hook
 *
 * @returns {Object} product - The product data
 *
 */

export const useFetchOneItem = (id) => {
  const { fetcher } = useFetcher();

  // TODO: Refactor Product Modal
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);

  // Handler FIx the user Effect
  const handleOpen = () => {
    setOpen(true);
    fetchItem();
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetcher(
        `${process.env.NEXT_PUBLIC_PRODUCTS_API}/products/${id}/`,
        {
          method: "GET",
        }
      );

      const data = await res;

      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  return { product, handleOpen, open, setOpen };
};

/**
 * @function useHierarchy
 * @description A custom hook that fetches the product hierarchy from localstorage
 * @returns {Object} - Returns an object with hierarchy measurements and field options
 * @example const { hierarchy, fieldOptions } = useHierarchy();
 */

export const useHierarchy = () => {
  const [hierarchy, setHierarchy] = useState(null);
  const [fieldOptions, setFieldOptions] = useState(null);
  const { data } = useIndexedDB("init-db", ["product-hierarchy-store"]);

  useEffect(() => {
    const hierarchyObj = data[0];
    const { field_options, hierarchy_and_default_measurements } =
      hierarchyObj || {};
    const setStates = () => {
      setHierarchy(hierarchy_and_default_measurements);
      setFieldOptions(field_options);
    };
    setStates();
  }, [data]);

  return { hierarchy, fieldOptions };
};

/**
 * @function useOptions
 * @description A custom hook that fetches the product options and filters from localstorage
 * @returns {Object} - Returns an object with options and filters
 * @example const { colors, cost, mrp, filters } = useOptions();
 */

export const useOptions = () => {
  const [colors, setColors] = useState(null);
  const [cost, setCost] = useState(null);
  const [mrp, setMrp] = useState(null);
  const [channels, setChannels] = useState(null);
  const [filters, setFilters] = useState(null);
  const [productOptions, setProductOptions] = useState(null);
  const { data } = useIndexedDB("init-db", ["init-store"]);

  useEffect(() => {
    const setStates = () => {
      const info = data[0]?.info;
      const { colors, cost, mrp, channels, filters } = info || {};
      setColors(colors);
      setCost(cost);
      setMrp(mrp);
      setChannels(channels);
      setFilters(filters);
      setProductOptions(info);
    };

    setStates();
  }, [data]);

  return { colors, cost, mrp, channels, filters, productOptions };
};

/**
 * @function useVersion
 * @description A custom hook that fetches the product version from localstorage
 * @returns {Object} - Returns an object with version
 * @example const { version } = useVersion();
 */

export const useVersion = () => {
  const checkVersion = async () => {
    const localVersion = getLocalStorage("version");

    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_API}/`, {
      method: "GET",
    });
    const data = await res.json();

    const isCurrentVersion = data.version === localVersion ? true : false;

    if (!isCurrentVersion) {
      window.location.href = "/user/signout";
    } else {
      return;
    }
  };

  useEffect(() => {
    checkVersion();
  }, []);

  return;
};
