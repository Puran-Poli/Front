import Head from "next/head";
import { useEffect, useState } from "react";

// Hook Imports
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";

// Component imports
import Grid from "@/components/base/Grid";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import { AccessDenied } from "@/components/base/Errors";

// Lib imports
import * as data from "@/lib/sales-data.json";
import {
  LineChart,
  Line,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { salesSohData } from "@/lib/analytics/sales/sales";

function sortObjectByValues(data, exclude) {
  let pairs = Object.entries(data);

  pairs = pairs.filter((pair) => !exclude.includes(pair[0]));

  pairs.sort((a, b) => b[1] - a[1]);

  let result = pairs.map((pair) => ({ name: pair[0], value: pair[1] }));

  return result;
}

// function to sum all the values from the sortObjectByValues function
function sumObjectValues(data, exclude) {
  let pairs = Object.entries(data);

  pairs = pairs.filter((pair) => !exclude.includes(pair[0]));

  let result = pairs.reduce((acc, curr) => acc + curr[1], 0);

  return result;
}

// Lib Imports
import { formatYearMonthDate, formatNumberToIn } from "@/lib/utils";
const COLORS = ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"];

export default function Sales() {
  const { userRole, userIsLoading, userDepartment } = useUserRole();

  // Chart
  const dataKey = "name";
  const excludeKeys = ["name", "target"];
  const [sortedData, setSortedData] = useState(
    sortObjectByValues(data.info.sales[0], excludeKeys)
  );

  // const totalSales = sumObjectValues(data.info.sales[0], excludeKeys);

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
        {/* <Filters filteredData={setFilters} /> */}
        <Grid className="h-full w-full grid-rows-4 gap-4 px-6 py-4">
          <div className="col-span-12 row-span-4 flex h-full flex-col border p-4">
            <div className="flex justify-between">
              <h2 className="mb-5 text-2xl text-slate-700">
                Sales Item Data Grid
              </h2>
            </div>
            <div className="flex items-center">
              <div className="mr-4 flex flex-col">
                <span className="text-sm text-slate-700">Total Sales</span>
                <span className="text-2xl text-slate-700">
                  {/* {formatNumberToIn(totalSales)} */}
                </span>
              </div>
            </div>
            <div className="mt-4 h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={salesSohData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 60,
                    bottom: 5,
                  }}
                  stackOffset="sign"
                  layout="vertical"
                  barGap={5}
                >
                  <CartesianGrid strokeDasharray="4 4" />
                  <YAxis
                    dataKey={dataKey}
                    type="category"
                    interval={0}
                    tick={{ fontSize: 11 }}
                  />
                  <XAxis type="number" />
                  <Tooltip
                    wrapperStyle={{
                      outline: "1px solid #e5e7eb",
                    }}
                    formatter={(value) => formatNumberToIn(value)}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" barSize={20} stackId="a">
                    {/* <LabelList
                      dataKey="sales"
                      position="right"
                      formatter={(value) => formatNumberToIn(value)}
                      offset={10}
                    /> */}
                  </Bar>
                  <Bar dataKey="soh" fill="#82ca9d" barSize={20} stackId="a">
                    {/* <LabelList
                      dataKey="soh"
                      position="right"
                      formatter={(value) => formatNumberToIn(value)}
                    /> */}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Grid>
      </main>
    </>
  );
}
