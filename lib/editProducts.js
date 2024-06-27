// Tags Create Options
export const createOption = (label) => ({
  label,
  value: label,
});

// create a function that takes in array and returns createOption
export const createTagOptions = (tagsArr) => {
  return tagsArr.map((tag) => createOption(tag));
};

export const createTags = (tagsArr) => {
  return tagsArr.map((tag) => tag.value);
};
