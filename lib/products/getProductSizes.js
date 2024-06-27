/**
 *
 * @param {*} dataframe
 * @returns rows for the AG Grid @/components/products/createModal/ProductSizeGrid.js
 */

export const defRows = (dataframe) => {
  return dataframe?.map((size) => {
    return {
      standard_size: size.standard_size,
      barcode_size: size.barcode_size,
      chest: size.chest,
      front_length: size.front_length,
      across_shoulder: size.across_shoulder,
      garment_waist: size.garment_waist,
      inseam_length: size.inseam_length,
      to_fit_waist: size.to_fit_waist,
      shoe_weight: size.shoe_weight,
      to_fit_foot_length: size.to_fit_foot_length,
      ean: size.ean,
      myntra_id: size.myntra_id,
      ajio_id: size.ajio_id,
      ajio_ean: size.ajio_ean,
      outseam_length: size.outseam_length,
      sleeve_length: size.design?.sleeve_length ,
      bust: size.bust,
      to_fit_bust: size.to_fit_bust,
      hip: size.hip
    };
  });
};


// Column Definitions for the AG Grid AG Grid @/components/products/createModal/ProductSizeGrid.js
export const columns = [
  {
    field: "standard_size",
    headerName: "Sizes",
    width: 200,
    minWidth: 160,
    //TODO: add sorting to the sizes
    brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
    hide: false,
  },
  {
    field: "barcode_size",
    headerName: "Barcode Size",
    minWidth: 160,
    brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
    hide: false,
  },
  {
    field:"chest",
    headerName: "Chest (in)",
    editable: true,
    brick: ["Topwear", "Coordinates"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.chest !== null) {
        return params.data.chest;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.chest !== newValInt;
      if (valueChanged) {
        params.data.chest = newValInt;
      }
      return valueChanged;
    },
  },
  {
    field:"front_length",
    headerName: "Front Length (in)",
    editable: true,
    brick: ["Topwear", "Coordinates","Bottomwear"],
    product: ["Coordinates","Dress","Jacket","Shirt","Skirt","Sweatshirt","Top"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.front_length !== null) {
        return params.data.front_length;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.front_length !== newValInt;
      if (valueChanged) {
        params.data.front_length = newValInt;
      }
      return valueChanged;
    },
  },
  {
    field:"across_shoulder",
    headerName: "Across Shoulder (in)",
    editable: true,
    brick: ["Topwear", "Coordinates"],
    product: ["Coordinates","Dress","Jacket","Jumpsuit","Shirt","Sweatshirt","Top"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.across_shoulder !== null) {
        return params.data.across_shoulder;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.across_shoulder !== newValInt;
      if (valueChanged) {
        params.data.across_shoulder = newValInt;
      }
      return valueChanged;
    },
  },
  { 
    field:"sleeve_length",
    headerName: "Sleeve Length",
    editable: true,
    brick: ["Topwear", "Coordinates", "Dugree", "Jumpsuit"],
    product: ["Coordinates","Dress","Jacket","Jumpsuit","Shirt","Sweatshirt","Top"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.sleeve_length !== null) {
        return params.data.sleeve_length;
      }
    }, 
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.sleeve_length !== newValInt;
      if (valueChanged) {
        params.data.sleeve_length = newValInt;
      }
      return valueChanged;
    },
  },
  {
    field:"garment_waist",
    headerName: "Garment Waist",
    editable: true,
    brick: ["Coordinates", "Bottomwear"],
    product: ["Coordinates","Dungaree","Jeans","Jeggings","Trousers","Shorts","Skirt"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.garment_waist !== null) {
        return params.data.garment_waist;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.garment_waist !== newValInt;
      if (valueChanged) {
        params.data.garment_waist = newValInt;
      }
      return valueChanged;
    },
  },
  {
    field:"inseam_length",
    headerName: "Inseam Length",
    editable: true,
    brick: ["Coordinates", "Bottomwear"],
    product: ["Coordinates","Dungaree","Jeans","Jeggings","Jumpsuit","Trousers","Shorts"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.inseam_length !== null) {
        return params.data.inseam_length;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.inseam_length !== newValInt;
      if (valueChanged) {
        params.data.inseam_length = newValInt;
      }
      return valueChanged;
    },
  },
  {
    field: "outseam_length",
    headerName: "Outseam Length",
    editable: true,
    brick: ["Bottomwear", "Coordinates"],
    product: ["Coordinates","Dungaree","Jeans","Jeggings","Jumpsuit","Trousers","Shorts"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.outseam_length !== null) {
        return params.data.outseam_length;
      }
    }, 
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.outseam_length !== newValInt;
      if (valueChanged) {
        params.data.outseam_length = newValInt;
      }
      return valueChanged;
    },
  },
  {
    field:"to_fit_waist",
    headerName: "To Fit Waist",
    editable: true,
    brick: ["Coordinates", "Bottomwear","Topwear"],
    product: ["Coordinates","Dress","Dungaree","Jeans","Jeggings","Jumpsuit","Trousers","Shorts","Skirt"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.to_fit_waist !== null) {
        return params.data.to_fit_waist;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.to_fit_waist !== newValInt;
      if (valueChanged) {
        params.data.to_fit_waist = newValInt;
      }
      return valueChanged;
    },
  },
  {
    field:"shoe_weight",
    headerName: "Shoe Weight",
    editable: true,
    brick: ["Footwear"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.shoe_weight !== null) {
        return params.data.shoe_weight;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.shoe_weight !== newValInt;
      if (valueChanged) {
        params.data.shoe_weight = newValInt;
      }
      return valueChanged;
    },
  },
  {
    field:"to_fit_foot_length",
    headerName: "To Fit Foot Length",
    editable: true,
    brick: ["Footwear"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.to_fit_foot_length !== null) {
        return params.data.to_fit_foot_length;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.to_fit_foot_length !== newValInt;
      if (valueChanged) {
        params.data.to_fit_foot_length = newValInt;
      }
      return valueChanged;
    },
  },
  {
    field:"hip",
    headerName: "Hip",
    editable: true,
    brick: ["Topwear","Bottomwear"],
    product: ["Dress","Shorts","Skirt"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.hip !== null) {
        return params.data.hip;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.hip !== newValInt;
      if (valueChanged) {
        params.data.hip = newValInt;
      }
      return valueChanged;
    },
  },
  {
    headerName: "EAN",
    editable: false,
    brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
    hide: false,
    valueGetter: (params) => {
      if (params.data.ean !== null) {
        return params.data.ean;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.ean !== newValInt;
      if (valueChanged) {
        params.data.ean = newValInt;
      }
      return valueChanged;
    },
  },
  {
    field:"bust",
    headerName: "Bust",
    editable: true,
    brick: ["Topwear", "Coordinates"],
    product: ["Coordinates","Dress","Jacket","Jumpsuit","Shirt","Sweatshirt","Top"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.bust !== null) {
        return params.data.bust;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.bust !== newValInt;
      if (valueChanged) {
        params.data.bust = newValInt;
      }
      return valueChanged;
    },
  },
  {
    field: "to_fit_bust",
    headerName: "To Fit Bust",
    editable: true,
    brick: ["Coordinates"],
    product: ["Coordinates","Jumpsuit"],
    hide: true,
    valueGetter: (params) => {
      if (params.data.to_fit_bust !== null) {
        return params.data.to_fit_bust;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.to_fit_bust !== newValInt;
      if (valueChanged) {
        params.data.to_fit_bust = newValInt;
      }
      return valueChanged;
    },
  },
  
  {
    headerName: "Myntra ID",
    editable: false,
    brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
    hide: false,
    valueGetter: (params) => {
      if (params.data.myntra_id !== null) {
        return params.data.myntra_id;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.myntra_id !== newValInt;
      if (valueChanged) {
        params.data.myntra_id = newValInt;
      }
      return valueChanged;
    },
  },
  {
    headerName: "Ajio ID",
    editable: false,
    brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
    hide: false,
    valueGetter: (params) => {
      if (params.data.ajio_id !== null) {
        return params.data.ajio_id;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.ajio_id !== newValInt;
      if (valueChanged) {
        params.data.ajio_id = newValInt;
      }
      return valueChanged;
    },
  },
  {
    headerName: "Ajio EAN",
    editable: false,
    brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
    hide: false,
    valueGetter: (params) => {
      if (params.data.ajio_ean !== null) {
        return params.data.ajio_ean;
      }
    },
    valueSetter: (params) => {
      var newValInt = parseFloat(params.newValue);
      var valueChanged = params.data.ajio_ean !== newValInt;
      if (valueChanged) {
        params.data.ajio_ean = newValInt;
      }
      return valueChanged;
    },
  },
];

export function changeHideKey(columns, brick, gender, product) {
  console.log('Brick:', brick);
  console.log('Gender:', gender);
  console.log('Product:', product);
  const updatedColumns = columns.map((column) => {
    if (gender === 'Men' && (brick === 'Topwear' || brick === 'Coordinates' )) {
      if (column.field === 'sleeve_length') {
        console.log(column.field)
        return { ...column, hide: false };
      }
      if (column.field === 'across_shoulder') {
        console.log(column.field)
        return { ...column, hide: false };
      }
      if (column.field === 'front_length') {
        console.log(column.field)
        return { ...column, hide: false };
      }
      if (column.field === 'chest') {
        console.log(column.field)
        return { ...column, hide: false };
      }
    }


    if (gender === 'Men' && (brick === 'Bottomwear' || brick === 'Coordinates' )) {
      if (column.field === 'outseam_length') {
        return { ...column, hide: false };
      }
      if (column.field === 'garment_waist') {
        return { ...column, hide: false };
      }
      if (column.field === 'inseam_length') {
        return { ...column, hide: false };
      }
    }
    
    if (gender === 'Women' && brick === 'Topwear' ) {
      if (column.field === 'front_length' && (product === "Coordinates" || product === "Dress" || product === "Jacket" || product === "Shirt" || product === "Skirt" || product === "Sweatshirt" || product === "Top")) {
        return { ...column, hide: false };
      }
      if (column.field === 'across_shoulder' && (product === "Coordinates" || product === "Dress" || product === "Jacket" || product === "Jumpsuit" || product === "Shirt" || product === "Sweatshirt" || product === "Top")) {
        return { ...column, hide: false };
      }
      if (column.field === 'to_fit_waist' && (product === "Coordinates" || product === "Dress" || product === "Dungaree" || product === "Jeans" || product === "Jeggings" || product === "Jumpsuit"  || product === "Trousers" || product === "Shorts" || product === "Skirt")) {
        return { ...column, hide: false };
      }
      if (column.field === 'bust' && (product === "Coordinates" || product === "Dress" || product === "Jacket" || product === "Jumpsuit" || product === "Shirt" || product === "Sweatshirt" || product === "Top")) {
        return { ...column, hide: false };
      }
      if (column.field === 'hip' && (product === "Dress" || product === "Shorts" || product === "Skirt")) {
        return { ...column, hide: false };
      }
      if (column.field === 'sleeve_length' && (product === "Coordinates" || product === "Dress" || product === "Jacket" || product === "Jumpsuit" || product === "Shirt" || product ==="Sweatshirt" || product === "Top")) {
        return { ...column, hide: false };
      }
    }
    
    if (gender === "Women" && brick === "Coordinates"){
      if (column.field === 'across_shoulder' && (product === "Coordinates" || product === "Dress" || product === "Jacket" || product === "Jumpsuit" || product === "Shirt" || product === "Sweatshirt" || product === "Top")) {
        return { ...column, hide: false };
      }
      if (column.field === 'bust' && (product === "Coordinates" || product === "Dress" || product === "Jacket" || product === "Jumpsuit" || product === "Shirt" || product === "Sweatshirt" || product === "Top")) {
        return { ...column, hide: false };
      }
      if (column.field === 'front_length' && (product === "Coordinates" || product === "Dress" || product === "Jacket" || product === "Shirt" || product === "Skirt" || product === "Sweatshirt" || product === "Top")) {
        return { ...column, hide: false };
      }
      if (column.field === 'to_fit_bust' && (product === "Coordinates" || product === "Jumpsuit")) {
        return { ...column, hide: false };
      }
      if (column.field === 'sleeve_length' && (product === "Coordinates" || product === "Dress" || product === "Jacket" || product === "Jumpsuit" || product === "Shirt" || product ==="Sweatshirt" || product === "Top")) {
        return { ...column, hide: false };
      }
      if (column.field === 'inseam_length' && (product === "Coordinates" || product === "Dungaree" || product === "Jeans" || product === "Jeggings" || product === "Jumpsuit" || product === "Trousers" || product === "Shorts")) {
        return { ...column, hide: false };
      }
      if (column.field === 'to_fit_waist' && (product === "Coordinates" || product === "Dress" || product === "Dungaree" || product === "Jeans" || product === "Jeggings" || product === "Jumpsuit"  || product === "Trousers" || product === "Shorts" || product === "Skirt")) {
        return { ...column, hide: false };
      }
      if (column.field === 'outseam_length' && (product === "Coordinates" || product === "Dungaree" || product === "Jeans" || product === "Jeggings" || product === "Jumpsuit" || product === "Trousers" || product === "Shorts")) {
        return { ...column, hide: false };
      }
      if (column.field === 'garment_waist' && (product === "Coordinates" || product === "Dungaree" || product === "Jeans" || product === "Jeggings" || product === "Trousers" || product === "Shorts" || product === "Skirt")) {
        return { ...column, hide: false };
      }
    }

    if (gender === "Women" && brick === "Bottomwear"){
      if (column.field === 'front_length' && (product === "Coordinates" || product === "Dress" || product === "Jacket" || product === "Shirt" || product === "Skirt" || product === "Sweatshirt" || product === "Top")) {
        return { ...column, hide: false };
      }
      if (column.field === 'hip' && (product === "Dress" || product === "Shorts" || product === "Skirt")) {
        return { ...column, hide: false };
      }
      if (column.field === 'to_fit_waist' && (product === "Coordinates" || product === "Dress" || product === "Dungaree" || product === "Jeans" || product === "Jeggings" || product === "Jumpsuit"  || product === "Trousers" || product === "Shorts" || product === "Skirt")) {
        return { ...column, hide: false };
      }
      if (column.field === 'inseam_length' && (product === "Coordinates" || product === "Dungaree" || product === "Jeans" || product === "Jeggings" || product === "Jumpsuit" || product === "Trousers" || product === "Shorts")) {
        return { ...column, hide: false };
      }
      if (column.field === 'outseam_length' && (product === "Coordinates" || product === "Dungaree" || product === "Jeans" || product === "Jeggings" || product === "Jumpsuit" || product === "Trousers" || product === "Shorts")) {
        return { ...column, hide: false };
      }
      if (column.field === 'garment_waist' && (product === "Coordinates" || product === "Dungaree" || product === "Jeans" || product === "Jeggings" || product === "Trousers" || product === "Shorts" || product === "Skirt")) {
        return { ...column, hide: false };
      }
    }
    return column;
  });

  return updatedColumns;
}

