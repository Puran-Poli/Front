import { useEffect, useState } from "react";

// Component imports
import Grid from "@/components/base/Grid";
import ChartSales from "@/components/products/sales-inventory/chart-sales";
import Filters from "@/components/products/sales-inventory/filters";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";

// Hook Imports
import { useSalesSingle } from "@/hooks/products/useSales";

// Lib Imports
import { charts } from "@/lib/products/productUtils";

export default function SalesInventory({ id }) {
  const { salesData, isLoading, setFilters, filters } = useSalesSingle(id);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="px-5 pt-6">
      <Filters filteredData={setFilters} />
      <Grid className="h-full w-full gap-4 py-4">
        <div className="col-span-12">
          <h2 className="text-lg font-medium leading-4 tracking-wide text-slate-700">
            Sales and Inventory Dashboard
          </h2>
        </div>
        {charts.map((chart, index) => (
          <div key={index} className="relative col-span-6 border p-4">
            <ChartSales
              metric={chart.metric}
              type={chart.type}
              label={chart.label}
              data={salesData[chart.metric]}
              dataKey={chart.dataKey}
              filters={filters}
            />
          </div>
        ))}
      </Grid>
    </div>
  );
}
