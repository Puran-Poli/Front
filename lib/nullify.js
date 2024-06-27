export function nullify(arr) {
  arr.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (item[key] === undefined || isNaN(item[key])) {
        item[key] = null;
      }
    });
  });
  return arr;
}

export function removeEmptyArrFromObj(obj) {
  Object.keys(obj).forEach((key) => {
    if (obj[key].length === 0) {
      delete obj[key];
    }
  });
  return obj;
}
