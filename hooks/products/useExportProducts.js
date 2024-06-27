import { useState } from "react";
import { useFetcher } from "@/context/useFetcher";

/**
 *
 * Export Data Hook
 *
 * @returns {Object} exportData - The export data and handlers
 *
 */

export const useExportProducts = () => {
  const { fetcher } = useFetcher();

  const [open, setOpen] = useState(false);

  // Forms States
  const [fabricCode, setFabricCode] = useState("");
  const [gender, setGender] = useState("");
  const [vertical, setVertical] = useState("");
  const [fabricCategory, setFabricCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [brick, setBrick] = useState("");
  const [product, setProduct] = useState("");
  const [subProduct, setSubProduct] = useState("");  
  const [columnFilter, setColumnFilter] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // HANDLERS
  // Add handlers for the new state variables

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setColumnFilter("");
    setStatus("");
    setFromDate(null);
    setEndDate(null);
    setDownloadLink(null);
    setLoading(false);
    setOpen(false);
  };

  const handleColumnFilterChange = (event) => {
    setColumnFilter(event.target.value);
  };

  const handleFabricCodeChange = (event) => {
    setFabricCode(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleVerticalChange = (event) => {
    setVertical(event.target.value);
  }
  
  const handleFabricCategoryChange = (event) => {
    setFabricCategory(event.target.value);
  };
  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleBrickChange = (event) => {
    setBrick(event.target.value);
  };

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  const handleSubProductChange = (event) => {
    setSubProduct(event.target.value);
  };
  

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSave = async () => {
    const data = {
      export_params : {
      date_type: columnFilter,
      start_date: fromDate.format('YYYY-MM-DD'),
      end_date: endDate.format('YYYY-MM-DD'),
      },
      edit_hierarchy: {
        gender: gender,
        vertical: vertical,
        fabric_category: fabricCategory,
        brand: brand,
        brick: brick,
        product: product,
        sub_product: subProduct
      },
      read_fabric:{
        fabric_code: fabricCode
      },
      edit_product:{
        status:status
      }
    };
    
    setLoading(true);
    setDownloadLink(null);

    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/export/`,
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res;

    // if status is 200, set download link
    if (res) {
      setLoading(false);
      if (!("info" in json)) {
        setNotFound(true);
      } else {
        setNotFound(false);
        setDownloadLink(json?.info.file);
      }
    }
  };
  // HANDLERS END

  return {
    open,
    fabricCode,
    setFabricCode,
    status,
    setStatus,
    gender,
    setGender,
    vertical,
    setVertical,
    fabricCategory,
    setFabricCategory,
    brand,
    setBrand,
    brick,
    setBrick,
    product,
    setProduct,
    subProduct,
    setSubProduct,
    handleFabricCodeChange,
    handleGenderChange,
    handleVerticalChange,
    handleFabricCategoryChange,
    handleBrandChange,
    handleBrickChange,
    handleProductChange,
    handleSubProductChange,
    columnFilter,
    fromDate,
    setFromDate,
    endDate,
    setEndDate,
    downloadLink,
    loading,
    notFound,
    handleOpen,
    handleClose,
    handleColumnFilterChange,
    handleStatusChange,
    handleSave,
  };
};

