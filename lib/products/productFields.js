/*export const getFields = (fields, brick) => {
  if (!brick) return fields;
  return fields.filter((field) => field.brick.includes(brick));
};*/
/*
export const getFields = (fields, filters) => {
  const { brick, gender, product } = filters;

  return fields.filter((field) => {
    const brickMatch = !brick || (field.brick && field.brick.includes(brick));
    const genderMatch = !field.gender || !gender || field.gender.includes(gender);
    const productMatch = !field.product || !product || field.product.includes(product);

    return brickMatch && genderMatch && productMatch;
  });
};
*/
export const getFields = (fields, brick, gender,product) => {
  if (!brick) return fields;
  return fields.filter((field) => {
    const brickMatch = field.brick.includes(brick);
    const genderMatch = !field.gender || field.gender.includes(gender);
    const productMatch = !field.product || field.product.includes(product);
    return brickMatch && genderMatch && productMatch;
  });
};



export const productDesignFields = [
  {
    id: "garmentPattern",
    label: "Garment Pattern",
    apiKey: "garment_pattern",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "patternType",
    label: "Pattern Type",
    apiKey: "print_pattern_type",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "dresstype",
    label: "Dress Type",
    apiKey: "dress_type",
    brick: ["Topwear"],
    gender: ["Women"],
    product: ["Dress"],
  },
  {
    id: "topStyleType",
    label: "Top Style Type",
    apiKey: "top_style_type",
    brick: ["Topwear"],
    gender: ["Women"],
    product: ["Top"],
  },
  {
    id: "jacketType",
    label: "Jacket Type",
    apiKey: "jacket_type",
    brick: ["Topwear"],
    gender: ["Men","Women"],
    product: ["Outerwear", "Jacket"],
  },
  {
    id: "Distress",
    label: "Distress",
    apiKey: "distress",
    brick: ["Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "Fade",
    label: "Fade",
    apiKey: "fade",
    brick: ["Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "dungareeBottomType",
    label: "Dungaree Bottom Type",
    apiKey: "dungaree_bottom_type",
    brick: ["Coordinates"],
    gender: ["Women"],
    product: ["Dungaree"],
  },
  {
    id: "noPockets",
    label: "Number of Pockets",
    apiKey: "number_of_pockets",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "pocketType",
    label: "Pocket Type",
    apiKey: "pocket_type",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "noComponents",
    label: "Number of Components",
    apiKey: "number_of_components",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "neck",
    label: "Neck",
    apiKey: "neck",
    brick: ["Topwear", "Coordinates"],
    gender: ["Men","Women"],
  },
  {
    id: "collar",
    label: "Collar",
    apiKey: "collar",
    brick: ["Topwear", "Coordinates"],
    gender: ["Men","Women"],
  },
  {
    id: "sleeveLength",
    label: "Sleeve Length",
    apiKey: "sleeve_length",
    brick: ["Topwear", "Coordinates"],
    gender: ["Men","Women"],
  },
  {
    id: "sleeveType",
    label: "Sleeve Type",
    apiKey: "sleeve_type",
    brick: ["Topwear"],
    gender: ["Men","Women"],
  },
  {
    id: "placket",
    label: "Placket",
    apiKey: "placket",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "length",
    label: "Length",
    apiKey: "length",
    brick: ["Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "hemline",
    label: "Hemline",
    apiKey: "hemline",
    brick: ["Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "waistRise",
    label: "Waist Rise",
    apiKey: "waist_rise",
    brick: ["Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "closure",
    label: "Closure",
    apiKey: "closure",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "shoeAnkleType",
    label: "Footwear Ankle Type",
    apiKey: "footwear_ankle_type",
    brick: ["Footwear"],
    gender: ["Men","Women"],
  },
  {
    id: "shoeInsole",
    label: "Footwear Insole",
    apiKey: "footwear_insole",
    brick: ["Footwear"],
    gender: ["Men","Women"],
  },
];

export const productFabricFields = [
  {
    id: "fabricCode",
    label: "Fabric Code",
    apiKey: "fabric_code",
    brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
    gender: ["Men","Women"],
  },
  {
    id: "fabricHsn",
    label: "Fabric HSN",
    apiKey: "fabric_hsn",
    brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
    gender: ["Men","Women"],
  },
  {
    id: "fabricVendor",
    label: "Fabric Vendor",
    apiKey: "fabric_vendor",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "fabricRate",
    label: "Fabric Rate",
    apiKey: "fabric_rate",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "fabricStory",
    label: "Fabric Story",
    apiKey: "fabric_story",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "fabricComposition",
    label: "Fabric Composition",
    apiKey: "fabric_composition",
    brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
    gender: ["Men","Women"],
  },
  {
    id: "weavePattern",
    label: "Fabric Weave Pattern",
    apiKey: "fabric_weave_pattern",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "washCare",
    label: "Wash Care",
    apiKey: "wash_care",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "denimCast",
    label: "Denim Cast",
    apiKey: "denim_cast",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "denimWash",
    label: "Denim Wash",
    apiKey: "denim_wash",
    brick: ["Topwear", "Coordinates", "Bottomwear"],
    gender: ["Men","Women"],
  },
  {
    id: "upperMaterial",
    label: "Footwear Upper Material",
    apiKey: "footwear_upper_material",
    brick: ["Footwear"],
    gender: ["Men","Women"],
  },
  {
    id: "soleMaterial",
    label: "Footwear Sole Material",
    apiKey: "footwear_sole_material",
    brick: ["Footwear"],
    gender: ["Men","Women"],
  },
];
