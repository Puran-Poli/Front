import { useState } from "react";
import ChartYoYTabs from "@/components/analytics/sales/chartYoY/ChartYoYTabs";
import YoYChartTypesTabs from "@/views/analytics/sales/YoYChartTypesTabs";

const RESTYPES = [
  {
    name: "Monthly",
    keyNmae: "month",
  },
  {
    name: "Weekly",
    keyNmae: "week",
  },
];

export default function CardYoY({ filters }) {
  const [cardRes, setCardRes] = useState(RESTYPES[0].keyNmae);

  return (
    <div className="relative col-span-12 row-span-2 flex h-full flex-col border p-4">
      <div>
        <h2 className="mb-5 text-2xl text-slate-700">YoY Analysis</h2>
      </div>
      <div className="absolute right-4 top-4 flex">
        {RESTYPES.map((type) => (
          <ChartYoYTabs
            key={type.name}
            active={cardRes === type.keyNmae}
            onClick={() => setCardRes(type.keyNmae)}
          >
            {type.name}
          </ChartYoYTabs>
        ))}
      </div>
      <div className="mt-4 h-full w-full">
        <YoYChartTypesTabs filters={filters} resolution={cardRes} />
      </div>
    </div>
  );
}
