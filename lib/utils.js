import dayjs from "dayjs";

const ORDER = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
  "4XL",
  "5XL",
  "6XL",
  "UK 6/ 24.1 CM",
  "UK 7/ 24.8 CM",
  "UK 8/ 25.7 CM",
  "UK 9/ 26.7 CM",
  "UK 10/ 27.3 CM",
  "UK 11/ 27.9 CM",
];

/**
 * Sorts an array of sizes based on the ORDER array.
 * @param {Array} arr - Array of sizes
 * @returns {Array} - Sorted array of sizes
 */

export const sortSizesFunc = (arr, apiKey) => {
  return arr.sort((a, b) => {
    const aIndex = apiKey ? ORDER.indexOf(a[apiKey]) : ORDER.indexOf(a);
    const bIndex = apiKey ? ORDER.indexOf(b[apiKey]) : ORDER.indexOf(b);
    if (aIndex === -1 && bIndex === -1) {
      return a - b;
    } else if (aIndex === -1) {
      return 1;
    } else if (bIndex === -1) {
      return -1;
    } else {
      return aIndex - bIndex;
    }
  });
};

/**
 *
 * @param {Number} value - Number to be formatted in En-IN format
 * @returns {String} - Formatted number
 */

export const formatNumberToIn = (value) => {
  if (Math.abs(value) < 1000) {
    return value.toString();
  } else if (Math.abs(value) < 100000) {
    return (value / 1000).toFixed(2) + "K";
  } else if (Math.abs(value) < 10000000) {
    return (value / 100000).toFixed(2) + "L";
  } else {
    return (value / 10000000).toFixed(2) + "Cr";
  }
};

/**
 *
 * @param {Number} week - Week number
 * @param {Number} year - Year number
 * @returns {Date} - Date of the first day of the week
 */

export const getDateOfISOWeek = (week, year) => {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
};

/**
 * Sets a key value pair in local storage
 * @param {String} key - Key to be set
 * @param {String} value - Value to be set
 * @returns {void}
 * @example setLocalStorage("user", {name: "John Doe"})
 */

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Gets a value from local storage
 * @param {String} key - Key to be fetched
 * @returns {String} - Value fetched from local storage
 * @example getLocalStorage("user")
 * @example getLocalStorage("user").name
 */

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// write a function to change 2023-02 to Feb 23

/**
 *
 * @param {String} date - Date in YYYY-MM format
 * @returns {String} - Date in MMM YY format
 * @example formatYearMonthDate("2023-02")
 */

export const formatYearMonthDate = (date) => {
  return dayjs(date).format("MMM YY");
};
