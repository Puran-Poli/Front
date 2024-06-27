export const getHexCode = (
  productPrimaryColor,
  allColorFamilies,
  allHexCodes
) => {
  let productColorFamily = Object.keys(allColorFamilies).find((key) =>
    allColorFamilies[key].includes(productPrimaryColor)
  );

  return {
    hexCode: allHexCodes[productColorFamily],
    colorFamily: productColorFamily,
  };
};
