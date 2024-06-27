// MUI Imports
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function ProductsPagination({
  products,
  productRange,
  page,
  pageSize,
  handlePageChange,
}) {
  return (
    <div className="mb-12 flex items-center justify-end">
      <p className="mr-2 text-xs font-light text-slate-500">
        {productRange[0] + 1}-
        {productRange[1] >= products?.info?.total_items
          ? products?.info?.total_items
          : productRange[1]}{" "}
        of {products?.info?.total_items}
      </p>
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(products?.info?.total_items / pageSize)}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
}
