import { useState } from "react";
import { useFetcher } from "@/context/useFetcher";

/**
 *
 * Import Data Hook
 *
 * @returns {Object} importData - The import data and handlers
 *
 */

export const useImportProducts = () => {
  const { fetcher } = useFetcher();

  const [open, setOpen] = useState(false);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get Template Options
  const getTemplateOptions = async () => {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/import/`,
      {
        method: "GET",
      }
    );
    const data = await res;
    // iterate data?.info object and push to templateOptions
    const options = [];
    if (data) {
      for (const [key, value] of Object.entries(data?.info)) {
        options.push({ label: key, value: value });
      }
    }
    setTemplateOptions(options);
  };

  // HANDLERS
  const handleOpen = () => {
    getTemplateOptions();
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTemplate("");
    setSelectedFile(null);
    setImportStatus(null);
    setLoading(false);
    setOpen(false);
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

    setLoading(true);
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/import/`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res;
    // if success, show success message
    if (res) {
      setLoading(false);
      setImportStatus(true);
    }
  };
  // HANDLERS END

  return {
    open,
    templateOptions,
    selectedTemplate,
    importStatus,
    loading,
    handleOpen,
    handleClose,
    handleSelectedTemplateChange,
    handleSelectedFileChange,
    handleSave,
  };
};
