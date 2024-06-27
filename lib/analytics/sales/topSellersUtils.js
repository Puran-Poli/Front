import dayjs from "dayjs";

// Init Filter values
export const initFiltersValues = {
  // mrp: [0, 999999],
  // cost: [0, 999999],
  t_from: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
  t_to: dayjs().format("YYYY-MM-DD"),

  // t_from: "2022-09-19",
  // t_to: "2022-09-20",
};
