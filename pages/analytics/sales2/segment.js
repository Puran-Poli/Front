// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Components Imports
import TableWinners from "@/components/analytics/sales/table-winners";
import TableChasers from "@/components/analytics/sales/table-chasers";
import TableLosers from "@/components/analytics/sales/table-losers";

export default function ProductSegment() {
  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12} md={12}>
        <CardFilters />
      </Grid> */}
      <Grid item xs={12} md={12}>
        <TableWinners />
      </Grid>
      <Grid item xs={12} md={12}>
        <TableChasers />
      </Grid>
      <Grid item xs={12} md={12}>
        <TableLosers />
      </Grid>
    </Grid>
  );
}
