// React Imports
import { useMemo, useRef, useState } from "react";

// AG Grid Imports
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Lib Imports
import {
  defRows,
  columns,
  changeHideKey,
} from "@/lib/products/getProductSizes";
import { sortSizesFunc } from "@/lib/utils";

export default function ProductSize({ info }) {
  const [columnDefs, setColumnDefs] = useState(columns);
  const productBrick = info?.hierarchy?.brick;
  const genderField = info?.hierarchy?.gender;
  const productField = info?.hierarchy?.product;


  useMemo(() => {
    setColumnDefs(changeHideKey(columns, productBrick, genderField, productField ));
  }, [productBrick, genderField, productField]);

  const gridRef = useRef();

  const rows = useMemo(() => {
    return sortSizesFunc(defRows(info?.sizes), "standard_size");
  }, [info?.sizes]);

  return (
    <>
      <h2 className="mb-8 mt-12 border-b pb-2 text-lg font-medium tracking-wide text-slate-700">
        Product Size Chart
      </h2>
      <div className="mb-14 w-full">
        <div className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rows}
            columnDefs={columnDefs}
            detailRowAutoHeight={true}
            enableCellTextSelection={true}
            domLayout="autoHeight"
          ></AgGridReact>
        </div>
      </div>
    </>
  );
}
