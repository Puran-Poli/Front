import dayjs from "dayjs";

export const initFiltersValues = {
  channels: [
    "Ajio SOR",
    "Ajio B2B",
    "Marketplace",
    "Fashion Factory",
    "Flipkart SOR",
    "Shopify",
  ],
  month_start: dayjs().subtract(6, "month").format("YYYY-MM"),
  month_end: dayjs().format("YYYY-MM"),
};

export const charts = [
  {
    metric: "grn",
    label: "GRN",
    dataKey: "name",
    type: "bar",
  },
  {
    metric: "wip",
    label: "WIP",
    dataKey: "name",
    type: "bar",
  },
  {
    metric: "soh",
    label: "SOH",
    dataKey: "name",
    type: "bar",
  },
  {
    metric: "sales",
    label: "Sales",
    dataKey: "name",
    type: "line",
  },
  {
    metric: "returns",
    label: "Returns",
    dataKey: "name",
    type: "line",
  },
  {
    metric: "return_ratio",
    label: "Return Ratio",
    dataKey: "name",
    type: "line",
  },
  {
    metric: "instock",
    label: "In-stock %",
    dataKey: "name",
    type: "line",
  },
  {
    metric: "stock_turn",
    label: "Stock Turn Ratio",
    dataKey: "name",
    type: "line",
  },
  {
    metric: "sell_though",
    label: "Sell Through Rate",
    dataKey: "name",
    type: "line",
  },
  {
    metric: "sale_revenue",
    label: "Revenue",
    dataKey: "name",
    type: "line",
  },
  {
    metric: "net_sales",
    label: "Net Sales",
    dataKey: "name",
    type: "line",
  },
  {
    metric: "sale_profit",
    label: "Profit",
    dataKey: "name",
    type: "line",
  },
  {
    metric: "rate_of_return",
    label: "Rate of Return",
    dataKey: "name",
    type: "line",
  },
  {
    metric: "rate_of_sales",
    label: "Rate of Sales",
    dataKey: "name",
    type: "line",
  },
];
