// StyleId Create Options
export const createIdOption = (label) => ({
  label,
  value: label,
});

// create a function that takes in array and returns createIdOption
export const createIdOptions = (idsArr) => {
  return idsArr.map((id) => createIdOption(id));
};

export const createIds = (idsArr) => {
  return idsArr.map((id) => id.value);
};
