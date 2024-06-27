import Head from "next/head";
import { useEffect, useState } from "react";

// Hook Imports
import { useTopSellersData } from "@/hooks/analytics/sales/useSales";
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";

// Component imports
import Grid from "@/components/base/Grid";
// import ChartGrossSales from "@/components/analytics/sales/ChartGrossSales";
import SalesDatagrid from "@/components/analytics/sales/SalesDatagrid";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import { AccessDenied } from "@/components/base/Errors";

// View imports
import CardYoY from "@/views/analytics/sales/CardYoY";
import Filters from "@/components/analytics/sales/filters/Filters";
import CardImportSalesData from "@/views/analytics/sales/CardImportSalesData";

export default function Sales() {
  const {
    isLoading: topSellerIsLoading,
    filters,
    setFilters,
    topSellersData,
  } = useTopSellersData();
  const { userRole, userIsLoading, userDepartment } = useUserRole();

  if (userIsLoading) {
    return <LoadingScreen />;
  }

  const canReadSales = getFeature(userRole, "sales analytics")?.read;

  if (!canReadSales) {
    return <AccessDenied />;
  }

  return (
    <>
      <Head>
        <title>Chanakya - Sales Analytics</title>
        <meta name="description" content="Chanakya - By Techtact.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen max-h-screen w-full overflow-y-scroll">
        <Filters filteredData={setFilters} />
        <Grid className="h-full w-full grid-rows-4 gap-4 px-6 py-4">
          {/* <div className="col-span-6 row-span-2 flex h-full flex-col border p-4"> */}
          {/* Info */}
          {/* <div>
              <h2 className="mb-5 text-2xl text-slate-700">Gross Sales</h2>
              <div className="flex items-center gap-3">
                <p className="text-4xl font-semibold text-slate-800">
                  <span className="mr-1 align-middle text-xl font-light">
                    ₹
                  </span>
                  456.66k
                </p>
                <div className="inline-flex items-center rounded-md bg-green-200 p-1 pr-2">
                  <span className="text-sm font-bold text-green-700">
                    ▲ 12.5%
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm">
                <p className="text-slate-500">compared to ₹ 387.2k</p>
                <div className="block items-center rounded-md bg-slate-200 px-1">
                  <span className="text-xs font-medium text-slate-500">
                    01 Jan - 31 Jan
                  </span>
                </div>
              </div>
            </div> */}
          {/* Info END. */}
          {/* <div className="mt-4 h-full w-full"> */}
          {/* <ChartGrossSales /> */}
          {/* </div> */}
          {/* </div> */}
          <div className="col-span-12 row-span-2 flex h-full flex-col border p-4">
            <div className="flex justify-between">
              <h2 className="mb-5 text-2xl text-slate-700">
                Sales Item Data Grid
              </h2>
              <CardImportSalesData />
            </div>
            <div className="mt-4 h-full w-full">
              {topSellerIsLoading ? (
                <div className="relative flex h-full items-center justify-center">
                  <LoadingScreen />
                </div>
              ) : (
                <SalesDatagrid data={topSellersData} />
              )}
            </div>
          </div>
          <CardYoY filters={filters} />
          {/* <div className="col-span-6 row-span-2 flex h-full flex-col border p-4">
            <div>
              <h2 className="mb-5 text-2xl text-slate-700">
                Channel Performance
              </h2>
            </div>
          </div> */}
        </Grid>
      </main>
    </>
  );
}
