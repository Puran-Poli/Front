// React Imports
import { useCallback, useMemo, useRef, useState } from "react";

// AG Grid Imports
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Component Imports
import SectionTitle from "@/components/products/createModal/SectionTitle";

// Lib Imports
import {
  defRows,
  columns,
  changeHideKey,
} from "@/lib/products/getProductSizes";
import { sortSizesFunc } from "@/lib/utils";

export default function ProductSizeGrid(props) {
  const { dataframe, setItem, item, sizes, mode, isDuplicate } = props;
  const productBrick = item.brickField;
  const genderField = item.genderField;
  const productField = item.productField;

  const [columnDefs, setColumnDefs] = useState(columns);

  useMemo(() => {
    setColumnDefs(changeHideKey(columns, productBrick, genderField, productField ));
  }, [productBrick, genderField, productField]);

  const gridRef = useRef();

  const rows = useMemo(() => {
    if (mode === "create" && isDuplicate) {
      return sortSizesFunc(sizes, "standard_size");
    } else if (mode === "create" && !isDuplicate) {
      return sortSizesFunc(defRows(dataframe), "standard_size");
    } else {
      return sortSizesFunc(sizes, "standard_size");
    }
  }, [dataframe, sizes, isDuplicate, mode]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      minWidth: 140,
    };
  }, []);

  const onCellValueChanged = useCallback(
    (event) => {
      let sizeArray = [...sizes];
      let index = sizeArray.findIndex(
        (x) => x.standard_size === event.data.standard_size
      );
      sizeArray[index] = event.data;
      setItem((prev) => ({ ...prev, sizes: sizeArray }));
    },
    [sizes, setItem]
  );

  const onGridReady = () => {
    setItem((prev) => ({ ...prev, sizes: rows }));
  };

  return (
    <>
      <SectionTitle title="Product Size Chart" />
      <div className="mb-14 w-full">
        {rows.length === 0 && (
          <div>
            <p className="text-center text-gray-500">
              You need to fill all the fields above to see the size chart
            </p>
          </div>
        )}
        {rows.length > 0 && (
          <div>
            <div className="ag-theme-alpine">
              <AgGridReact
                ref={gridRef}
                rowData={rows}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onCellValueChanged={onCellValueChanged}
                onGridReady={onGridReady}
                detailRowAutoHeight={true}
                domLayout="autoHeight"
              ></AgGridReact>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

