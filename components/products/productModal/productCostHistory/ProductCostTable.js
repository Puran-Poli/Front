import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

// MUI Imports
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "date", label: "Date" },
  { id: "cost", label: "Cost" },
  { id: "updated_by", label: "Updated By" },
];

const rowsMock = [
  {
    date: "2021-10-01",
    cost: 100,
    updated_by: "John Doe",
  },
  {
    date: "2021-10-10",
    cost: 120,
    updated_by: "John Doe",
  },
  {
    date: "2021-10-01",
    cost: 100,
    updated_by: "John Doe",
  },
  {
    date: "2021-10-10",
    cost: 120,
    updated_by: "John Doe",
  },

  {
    date: "2021-10-01",
    cost: 100,
    updated_by: "John Doe",
  },
  {
    date: "2021-10-10",
    cost: 120,
    updated_by: "John Doe",
  },
];

export default function ProductCostTable({ info }) {
  // States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows =
    info?.cost_history.map((cost) => {
      return {
        date: dayjs.utc(cost.date).format("DD MMM YYYY"),
        cost: cost.cost,
        updated_by: cost.updated_by,
      };
    }) || rowsMock;

  // Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="cost history">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: 100 }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
