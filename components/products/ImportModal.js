// React Imports
import { useState, Fragment } from "react";

// MUI Imports
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Components Imports
import {
  PrimaryButton,
  SubtleButton,
  SimpleButton,
} from "@/components/base/Buttons";
import SuccessIcon from "@/components/icons/SuccessIcon";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import DangerIcon from "@/components/icons/DangerIcon";

// Hook Imports
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";
import { useFetcher } from "@/context/useFetcher";

function SuccessImport() {
  // show success message with the download link
  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" mb-8">
        <SuccessIcon height={64} width={64} />
      </div>
      <p className="mb-4 text-xl font-medium text-slate-700">
        Import Completed Successfully
      </p>
      <p className="text-sm text-slate-500">
        Your file has been uploaded to your database.
      </p>
    </div>
  );
}

function MyDropZone({ handleChange }) {
  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
}

export default function ImportModal() {
  const { fetchError, setFetchError, fetcher } = useFetcher();
  const { userRole, userDepartment, userIsLoading } = useUserRole();
  const [open, setOpen] = useState(false);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

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
    for (const [key, value] of Object.entries(data?.info)) {
      options.push({ label: key, value: value });
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

    setLoading(true);
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/import/`,
      {
        method: "POST",
        body: formData,
      }
    );

    // if success, show success message
    if (res) {
      setLoading(false);
      setImportStatus(true);
    } else {
      setLoading(false);
      setImportStatus(false);
    }
  };

  // HANDLERS END

  if (userIsLoading) {
    return (
      <SimpleButton>
        <p className="text-sm font-medium leading-5">Loading</p>
      </SimpleButton>
    );
  }

  // User Roles for Import
  const importProducts = getFeature(userRole, "import ean, mrp, cost")?.create;
  const importImages = getFeature(userRole, "import images")?.create;
  const importId = getFeature(userRole, "import ids")?.create;
  const importGRN = getFeature(userRole, "import grn")?.create;

  const depRole = [
    {
      department: ["admin"],
      value: [
        "bulk_update_ean_mrp_cost",
        "bulk_update_cost",
        "bulk_update_ids",
        "bulk_update_dates",
        "bulk_update_images",
      ],
    },
    {
      department: ["catalog"],
      value: ["bulk_update_images", "bulk_update_ids"],
    },
    {
      department: ["merchandise"],
      value: ["bulk_update_ean_mrp_cost", "bulk_update_cost"],
    },
  ];

  // create a function that takes Department and option string as parameters.
  const departmentCheck = (department, option) => {
    const dep = depRole.find((dep) => dep.department.includes(department));
    if (dep?.value.includes(option)) {
      return true;
    } else {
      return false;
    }
  };

  if (importProducts || importImages || importId || importGRN)
    return (
      <Fragment>
        <SimpleButton onClick={handleOpen}>
          <p className=" text-sm font-medium leading-5">Import</p>
        </SimpleButton>
        <Modal
          showBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <div className="absolute left-[50%] top-[50%] flex min-h-[70vh] w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-center bg-white p-6 shadow-md">
            <div className="fixed left-0 right-0 top-0 mb-8 py-6">
              <h2
                id="child-modal-title"
                className="mb-6 flex items-center gap-2 px-6 text-xl font-medium leading-6 text-slate-700"
              >
                Import Files
              </h2>
              <hr />
            </div>
            <div className="my-16 flex flex-col overflow-y-scroll">
              {importStatus ? (
                <SuccessImport />
              ) : loading === true ? (
                <>
                  <div className="flex flex-col items-center justify-center">
                    <LoadingScreen />
                  </div>
                </>
              ) : (
                <>
                  {fetchError && (
                    <div className="alert-container mb-5 rounded-md bg-red-500 shadow-lg transition">
                      <div className="flex items-center px-4 py-5">
                        <div className="mr-4">
                          <DangerIcon fill="#FFF" />
                        </div>
                        <div className="mr-4 flex flex-col ">
                          <p className="mb-1 text-sm font-semibold leading-5 text-white antialiased">
                            Something went wrong
                          </p>
                          <p className=" text-sm font-normal text-slate-50 antialiased">
                            {fetchError}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="mb-8">Select the record you want to update</p>
                  <div className="w-[340px] min-w-[340px]">
                    <FormControl fullWidth className="mb-5">
                      <InputLabel id="filter-by-label">Filter by</InputLabel>
                      <Select
                        labelId="filter-by-label"
                        id="filter-by"
                        value={selectedTemplate}
                        label="Filter by"
                        onChange={handleSelectedTemplateChange}
                      >
                        {templateOptions?.map((template, i) => (
                          <MenuItem
                            key={i}
                            value={template.value}
                            disabled={
                              departmentCheck(userDepartment, template.label)
                                ? false
                                : true
                            }
                          >
                            {template.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {selectedTemplate && (
                      <div className="mt-3">
                        <p>
                          Download this{" "}
                          <a
                            href={
                              selectedTemplate ? selectedTemplate?.file : ""
                            }
                            download
                            className="font-medium text-blue-500"
                          >
                            template
                          </a>{" "}
                          and upload it here after filling the data.
                        </p>
                        <div className="mt-8">
                          <MyDropZone handleChange={handleSelectedFileChange} />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 flex w-full flex-col justify-end bg-white">
              <hr />
              <div className="flex justify-end gap-2 px-6 py-6">
                <SubtleButton onClick={handleClose}>Cancel</SubtleButton>
                <PrimaryButton onClick={handleSave}>Upload</PrimaryButton>
              </div>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  else return null;
}
