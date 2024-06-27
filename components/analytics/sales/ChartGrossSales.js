import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const series = [
  {
    name: "Jan",
    year: "2023",
    color: "#0ea5e9",
    data: [
      { date: "01", value: 25 },
      { date: "02", value: 66 },
      { date: "03", value: 120 },
    ],
  },
  {
    name: "Dec",
    year: "2022",
    color: "#94a3b8",
    data: [
      { date: "01", value: 35 },
      { date: "02", value: 80 },
      { date: "03", value: 90 },
    ],
  },
];

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

// calculate the increase or decrease in sales
const getSalesDelta = (current, previous) => {
  const change = ((current - previous) / previous) * 100;
  return change.toFixed(2);
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const salesDelta = getSalesDelta(payload[0].value, payload[1].value);

    return (
      <div className="min-w-[150px] bg-white p-2 text-sm text-slate-400 shadow-md">
        <h3 className="heading mb-2 font-medium text-sky-500">Gross sales</h3>
        <p className="label">
          <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-sky-500 leading-none"></span>
          {`${payload[0].name} ${label}, ${series[0].year}`}
        </p>
        <p className="text-xl font-semibold text-slate-800">
          ₹ {`${payload[0].value}`}
        </p>
        <div className="mt-2 flex items-center justify-center text-sm font-light text-slate-400">
          {salesDelta > 0 ? (
            <ArrowUp>{`${salesDelta}%`}</ArrowUp>
          ) : (
            <ArrowDown>{`${salesDelta}%`}</ArrowDown>
          )}
          vs compare
        </div>
        <hr className="my-3" />
        <p className="label">
          <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-slate-400 leading-none"></span>
          {`${payload[1].name} ${label}, ${series[1].year}`}
        </p>
        <p className="mb-2 text-xl font-semibold text-slate-800">
          ₹ {`${payload[1].value}`}
        </p>
      </div>
    );
  }

  return null;
};

export default function ChartGrossSales() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={series}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="value" />
        <Tooltip
          content={<CustomTooltip />}
          wrapperStyle={{
            outline: "1px solid #e5e7eb",
          }}
        />
        <Legend />
        {series.map((s) => (
          <Line
            dataKey="value"
            data={s.data}
            name={s.name}
            key={s.name}
            stroke={s.color}
            strokeWidth={2}
          />
        ))}
        {/* TODO: Fix the chart if there is no comparison */}
        {/* <Line
            dataKey="value"
            data={series[0].data}
            name={series[0].name}
            key={series[0].name}
            stroke={series[0].color}
            strokeWidth={2}
          /> */}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
