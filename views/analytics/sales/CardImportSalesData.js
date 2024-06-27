// React Imports
import { useState, Fragment } from "react";

// Components Imports
import { SimpleButton } from "@/components/base/Buttons";
import ImportSalesDataModal from "@/components/analytics/sales/importSalesData/ImportSalesDataModal";

// Hook Imports
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";
import { useImportSalesData } from "@/hooks/analytics/sales/useSales";

export default function CardImportSalesData() {
  const importProps = useImportSalesData();
  const user = useUserRole();
  const { handleOpen } = importProps;

  return (
    <div>
      <SimpleButton onClick={handleOpen}>
        <p className=" text-sm font-medium leading-5">Import</p>
      </SimpleButton>
      <ImportSalesDataModal importProps={importProps} user={user} />
    </div>
  );
}
