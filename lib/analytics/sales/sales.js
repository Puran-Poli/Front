import * as data from "@/lib/sales-data.json";

// convert and combile data to sales and soh based on month and exclude keys (array), and sort by values high to low
//  format -> {name: "Blazer", sales: 597,soh: 2092}

const combineData = (data, excludeKeys) => {
  let combined = {};

  for (let salesData of data.info.sales) {
    for (let key in salesData) {
      if (!excludeKeys.includes(key) && key !== "name" && key !== "target") {
        if (!combined[key]) combined[key] = { name: key, sales: 0, soh: 0 };
        combined[key].sales += salesData[key];
      }
    }
  }

  for (let sohData of data.info.soh) {
    for (let key in sohData) {
      if (!excludeKeys.includes(key) && key !== "name") {
        if (!combined[key]) combined[key] = { name: key, sales: 0, soh: 0 };
        combined[key].soh += sohData[key];
      }
    }
  }

  let combinedArray = Object.values(combined);
  combinedArray.sort((a, b) => b.sales - a.sales);

  return combinedArray;
};

let excludeKeys = [];

export const salesSohData = combineData(data, excludeKeys);

// filter by keys and values

export const filterArrayByValues = (arr, key, values) => {
  return arr.filter((obj) => values.includes(obj[key]));
};

// calculate the total profit, revenue, stock value of all item

export const calculateTotal = (arr, key) => {
  return arr.reduce((acc, curr) => acc + curr[key], 0);
};

export const totalData = {
  profit: calculateTotal(data.info.details, "profit_sales"),
  revenue: calculateTotal(data.info.details, "revenue_sales"),
  stockValue: calculateTotal(data.info.details, "qty_soh"),
  sales: calculateTotal(data.info.details, "qty_sales"),
};

// calculate the profit%, revenue%, stock value% of the filtered items
