import { useEffect, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function SalesDatagrid({ data }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // get column headers from the api response and create a new array of objects with the same structure as the columns array

  const getColumns = (data) => {
    if (!data?.info?.items?.length) return [];
    const columnHeaders = Object.keys(data?.info?.items[0]);
    const newColumns = columnHeaders.map((header) => {
      if (header === "product_id") {
        return {
          field: header,
          headerName: header,
          hide: true,
        };
      }
      return {
        field: header,
        headerName: header,
        width: 130,
      };
    });
    return newColumns;
  };

  const columns = getColumns(data);

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(0);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.info?.items !== undefined
        ? data?.info?.items?.length
        : prevRowCountState
    );
  }, [data?.info?.items, setRowCountState]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {data?.info?.items?.length > 0 ? (
        <DataGrid
          rows={data.info.items}
          getRowId={(row) => row.ean}
          rowCount={rowCountState}
          onRowClick={(row) => console.log(row)}
          rowsPerPageOptions={[10]}
          page={page}
          pageSize={pageSize}
          paginationMode="client"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          columns={columns}
          density="compact"
          disableSelectionOnClick
        />
      ) : data?.info?.items?.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">No data to display</p>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
    </div>
  );
}
