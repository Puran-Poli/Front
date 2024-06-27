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
} from "recharts";

// Component Imports
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";

// Lib Imports
import { formatYearMonthDate, formatNumberToIn } from "@/lib/utils";

const COLORS = ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"];

function SalesLineChart({ data, dataKey, month_start, month_end }) {
  if (data && data.length > 0) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} tickFormatter={formatYearMonthDate} />
          <YAxis />
          <Tooltip
            wrapperStyle={{
              outline: "1px solid #e5e7eb",
            }}
            labelFormatter={(value) => formatYearMonthDate(value)}
            formatter={(value) => formatNumberToIn(value)}
          />
          <Legend />
          {Object.keys(data[0])
            .filter((key) => key !== dataKey)
            .map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[index]}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    );
  } else {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">No data to display</p>
      </div>
    );
  }
}

function chartPicker(metric, data, dataKey, type, month_start, month_end) {
  if (type === "bar") {
    return <SalesBarChart data={data} dataKey={dataKey} />;
  } else if (type === "line") {
    return (
      <SalesLineChart
        data={data}
        dataKey={dataKey}
        month_start={month_start}
        month_end={month_end}
      />
    );
  }
}

function SalesBarChart({ data, dataKey }) {
  if (data && data.length > 0) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          stackOffset="sign"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} tickFormatter={formatYearMonthDate} />
          <YAxis />
          <Tooltip
            wrapperStyle={{
              outline: "1px solid #e5e7eb",
            }}
            labelFormatter={(value) => formatYearMonthDate(value)}
            formatter={(value) => formatNumberToIn(value)}
          />
          <Legend />
          {Object.keys(data[0])
            .filter((key) => key !== dataKey)
            .map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={COLORS[index]}
                barSize={30}
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    );
  } else {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">No data to display</p>
      </div>
    );
  }
}

export default function ChartSales(props) {
  const { data, metric, dataKey, type, label, filters } = props;
  const { month_start, month_end } = filters;

  return (
    <div className="flex h-full min-h-[500px] w-full flex-col">
      <h3 className="mb-5 text-xl text-slate-700">{label}</h3>
      {chartPicker(metric, data, dataKey, type, month_start, month_end)}
    </div>
  );
}
