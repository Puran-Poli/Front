// MUI Imports
import Modal from "@mui/material/Modal";

// Components Imports
import ImportSuccess from "@/components/analytics/sales/importSalesData/ImportSuccess";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import ImportSalesDataError from "@/components/analytics/sales/importSalesData/ImportSalesDataError";
import ImportSalesData from "@/components/analytics/sales/importSalesData/ImportSalesData";
import ImportSalesDataActions from "@/components/analytics/sales/importSalesData/ImportSalesDataActions";

export default function ImportSalesDataModal(props) {
  const { importProps } = props;
  const {
    open,
    handleClose,
    handleSave,
    importStatus,
    fetchError,
    isLoading,
    templateOptions,
    selectedTemplate,
    handleSelectedTemplateChange,
    handleSelectedFileChange,
  } = importProps;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-sales-data-import"
      aria-describedby="modal-sales-data-import-description"
    >
      <div className="absolute top-[50%] left-[50%] flex min-h-[70vh] w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-center bg-white p-6 shadow-md">
        <div className="fixed top-0 left-0 right-0 mb-8 py-6">
          <h2
            id="child-modal-title"
            className="mb-6 flex items-center gap-2 px-6 text-xl font-medium leading-6 text-slate-700"
          >
            Import Sales Data
          </h2>
          <hr />
        </div>
        <div className="my-16 flex flex-col overflow-y-scroll">
          {importStatus ? (
            <ImportSuccess />
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <LoadingScreen />
            </div>
          ) : (
            <>
              <ImportSalesDataError error={fetchError} />
              <ImportSalesData
                templateOptions={templateOptions}
                selectedTemplate={selectedTemplate}
                handleChange={handleSelectedTemplateChange}
                handleSelectedFileChange={handleSelectedFileChange}
              />
              <ImportSalesDataActions
                handleClose={handleClose}
                handleSave={handleSave}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
