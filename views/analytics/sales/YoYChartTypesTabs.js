import { useState } from "react";
import ChartYoYVerticalTabs from "@/components/analytics/sales/chartYoY/ChartYoYVerticalTabs";
import ChartOG from "@/components/analytics/sales/ChartOG";
import {
  SalesIcon,
  RevenueIcon,
  CostIcon,
  ProfitIcon,
  ReturnsIcon,
} from "@/components/icons/salesIcons";

const METRICTYPES = [
  {
    name: "Sales",
    keyName: "net_qty",
    icon: <SalesIcon width={16} height={16} />,
  },
  {
    name: "Revenue",
    keyName: "sp",
    icon: <RevenueIcon width={16} height={16} />,
  },
  {
    name: "Cost",
    keyName: "net_cost",
    icon: <CostIcon width={16} height={16} />,
  },
  {
    name: "Profit",
    keyName: "profit",
    icon: <ProfitIcon width={16} height={16} />,
  },
  {
    name: "Returns",
    keyName: "return_rate",
    icon: <ReturnsIcon width={16} height={16} />,
  },
];

export default function YoYChartTypesTabs({ filters, resolution }) {
  const [metric, setMetric] = useState(METRICTYPES[0].keyName);

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col gap-y-2">
          {METRICTYPES.map((type) => (
            <ChartYoYVerticalTabs
              key={type.name}
              active={metric === type.keyName}
              name={type.name}
              icon={type.icon}
              onClick={() => setMetric(type.keyName)}
            />
          ))}
        </div>
        <div className="flex-1">
          <ChartOG filters={filters} metric={metric} resolution={resolution} />
        </div>
      </div>
    </div>
  );
}
