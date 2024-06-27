import { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Component Imports
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";

// Hook Imports
import { useYoYData } from "@/hooks/analytics/sales/useSales";

// Lib Imports
import { getDateOfISOWeek, formatNumberToIn } from "@/lib/utils";

// Arrow up or down
const ArrowUp = ({ children }) => (
  <div className="mr-1 rounded-sm bg-green-200 px-1">
    <span className="text-xs font-bold text-green-600">▲ {children}</span>
  </div>
);

const ArrowDown = ({ children }) => (
  <div className="mr-1 rounded-sm bg-red-200 px-1">
    <span className="text-xs font-bold text-red-600">▼ {children}</span>
  </div>
);

const COLORS = ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"];

export default function ChartOG({ filters, metric, resolution }) {
  const { isLoading, yoyData } = useYoYData(filters, metric, resolution);

  if (isLoading) {
    return (
      <div className="relative flex h-full items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  if (!isLoading && yoyData) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={yoyData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {resolution === "month" ? (
            <XAxis dataKey="name" />
          ) : (
            <XAxis
              dataKey="name"
              tickFormatter={(value) => {
                if (value % 4 === 0) {
                  const date = getDateOfISOWeek(
                    value,
                    new Date().getFullYear()
                  );
                  return date.toLocaleString("default", { month: "short" });
                } else {
                  return "";
                }
              }}
            />
          )}
          <YAxis tickFormatter={(number) => formatNumberToIn(number)} />
          <Tooltip
            wrapperStyle={{
              outline: "1px solid #e5e7eb",
            }}
            formatter={(value) => formatNumberToIn(value)}
            labelFormatter={(label) => {
              if (resolution === "week") {
                const date = getDateOfISOWeek(label, new Date().getFullYear());
                return date.toLocaleString("default", {
                  month: "short",
                  day: "numeric",
                });
              } else {
                return label;
              }
            }}
          />
          <Legend />
          {yoyData[0] &&
            Object.keys(yoyData[0]).map((key, index) => {
              if (key !== "name") {
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={COLORS[index]}
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                );
              }
            })}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
