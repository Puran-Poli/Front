//editmodal
import { useState, Fragment, useMemo } from "react";
import { useRouter } from "next/router";
import { useFetcher } from "@/context/useFetcher";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {
  PrimaryButton,
  SimpleButton,
  SubtleButton,
} from "@/components/base/Buttons";
import SuccessIcon from "@/components/icons/SuccessIcon";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import ProductHierarchy from "@/components/products/createModal/ProductHierarchy";
import ProductSizeGrid from "@/components/products/createModal/ProductSizeGrid";
import ProductLaunchInfo from "@/components/products/createModal/ProductLaunchInfo";
import ProductColor from "@/components/products/createModal/ProductColor";
import ProductDesignDetails from "@/components/products/createModal/ProductDesignDetails";
import ProductFabricDetails from "@/components/products/createModal/ProductFabricDetails";
import ProductTags from "@/components/products/createModal/ProductTags";
import { getHexCode } from "@/lib/getHexCode";
import { createOption, createTags } from "@/lib/editProducts";
import {
  getNumberPocketsOptionLabel,
  getNumberPocketsValue,
} from "@/lib/products/utilsCreateProduct";
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";
import { getFields } from '@/lib/products/productFields';

const itemInitState = (data) => ({
  genderField: data?.hierarchy?.gender,
  verticalField: data?.hierarchy?.vertical,
  fabricCategoryField: data?.hierarchy?.fabric_category,
  brandField: data?.hierarchy?.brand,
  usageField: data?.hierarchy?.usage,
  brickField: data?.hierarchy?.brick,
  productField: data?.hierarchy?.product,
  subProductField: data?.hierarchy?.sub_product,
  targetAudienceField: data?.hierarchy?.target_audience,
  fitField: data?.hierarchy?.fit,
  sizes: data?.sizes,
  story: data?.story,
  styleId: data?.style_id,
  firstGrn: data?.dates?.first_grn_date,
  firstLive: data?.dates?.first_live_date,
  firstSold: data?.dates?.first_sold_date,
  primaryColor: data?.colour?.primary_colour,
  secondaryColor: data?.colour?.secondary_colour ,//add new line
  tertiaryColor: data?.colour?.tertiary_colour,
  colorFamily: data?.colour?.colour_family,
  garmentPattern: data?.design?.garment_pattern,
  patternType: data?.design?.print_pattern_type,
  season: data?.season,
  noPockets: data?.design?.number_of_pockets,
  noComponents: data?.design?.number_of_components,
  neck: data?.design?.neck,
  collar: data?.design?.collar,
  placket: data?.design?.placket,
  length: data?.design?.length,
  sleeveType: data?.design?.sleeve_type,
  sleeveLength: data?.design?.sleeve_length,
  hemline: data?.design?.hemline,
  waistRise: data?.design?.waist_rise,
  closure: data?.design?.closure,
  dresstype: data?.design?.dress_type , //YashBodke
  topStyleType: data?.design?.top_style_type ,
  jacketType: data?.design?.jacket_type ,
  Distress: data?.design?.distress ,
  Fade: data?.design?.fade,
  dungareeBottomType: data?.design?.dungaree_bottom_type,
  pocketType: data?.design?.pocket_type,
  shoeAnkleType: data?.design?.footwear_ankle_type,
  shoeInsole: data?.design?.footwear_insole,
  fabricCode: data?.fabric?.fabric_code,
  fabricHsn: data?.fabric?.fabric_hsn,
  fabricRate: data?.fabric?.fabric_rate,
  fabricStory: data?.fabric?.fabric_story,
  fabricComposition: data?.fabric?.fabric_composition,
  weavePattern: data?.fabric?.fabric_weave_pattern,
  fabricVendor: data?.fabric?.fabric_vendor,
  denimCast: data?.fabric?.denim_cast,
  denimWash: data?.fabric?.denim_wash,
  washCare: data?.fabric?.wash_care,
  upperMaterial: data?.fabric?.footwear_upper_material,
  soleMaterial: data?.fabric?.footwear_sole_material,
  mrp: data?.mrp,
  cost: data?.cost,
  tagInputValue: "",
  tags: data?.tags ? data?.tags.map((tag) => createOption(tag)) : [],
  channelExclusive: data?.exclusive,
  productDescription: data?.product_description || "",  // Add this line
  status: data?.status , //add this line
  deleted: data?.deleted,// add this line
  
  

});

export default function EditModal({
  hierarchyData,
  info,
  colorFamilies,
  hexCodes,
  fieldOptions,
}) {
  const { userRole, userDepartment, userIsLoading } = useUserRole();
  const { fetcher } = useFetcher();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    setErrorMessage(false);
  };
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [item, setItem] = useState(itemInitState(info));

  // HANDLERS
  /*
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value || null}));
  };*/
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => {
      // Start by updating the field normally
      const updatedItem = { ...prev, [name]: value || null };
  
      // Check if the modified field is one of the key fields
      if (['brickField', 'genderField', 'productField'].includes(name)) {
        // Get fields dynamically based on current selections
        const newDesignFields = getFields(productDesignFields, updatedItem.brickField, updatedItem.genderField, updatedItem.productField);
        const newFabricFields = getFields(productFabricFields, updatedItem.brickField, updatedItem.genderField, updatedItem.productField);
  
        const designFieldMap = new Map(newDesignFields.map(field => [field.id, field]));
        const fabricFieldMap = new Map(newFabricFields.map(field => [field.id, field]));
  
        // Reset fields that are not applicable in the new configuration
        productDesignFields.forEach(field => {
          if (!designFieldMap.has(field.id)) updatedItem[field.id] = ""; // Reset fields not included in the new design fields
        });
  
        productFabricFields.forEach(field => {
          if (!fabricFieldMap.has(field.id)) updatedItem[field.id] = ""; // Reset fields not included in the new fabric fields
        });
      }
  
      return updatedItem;
    });
  };

  const handleKeyDown = (event) => {
    if (!item.tagInputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setItem((prev) => ({
          ...prev,
          tags: [...prev.tags, createOption(item.tagInputValue)],
          tagInputValue: "",
        }));
        event.preventDefault();
    }
  };

  const handleTagChange = (newValue) => {
    setItem((prev) => ({
      ...prev,
      tags: newValue,
    }));
  };

  const handleTagInputChange = (newValue) => {
    setItem((prev) => ({
      ...prev,
      tagInputValue: newValue,
    }));
  };

  const handleExclusiveChange = (event) => {
    setItem((prev) => ({
      ...prev,
      channelExclusive: event.target.value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const data = {
      style_id: item.styleId ? item.styleId.toUpperCase() : null,
      hierarchy: {
        gender: item.genderField,
        vertical: item.verticalField,
        fabric_category: item.fabricCategoryField,
        brand: item.brandField,
        usage: item.usageField,
        brick: item.brickField,
        product: item.productField,
        sub_product: item.subProductField,
        target_audience: item.targetAudienceField,
        fit: item.fitField,
      },
      story: item.story,
      sizes: item.sizes,
      colour: {
        colour_family: item.colorFamily ? item.colorFamily : null,
        primary_colour: item.primaryColor ? item.primaryColor : null,
        secondary_colour: item.secondaryColor ,  
        tertiary_colour: item.tertiaryColor ,
      },
      mrp: item.mrp,
      cost: item.cost,
      tags: createTags(item.tags),
      season: item.season,
      exclusive: item.channelExclusive,
      design: {
        garment_pattern: item.garmentPattern,
        print_pattern_type: item.patternType,
        number_of_components: item.noComponents,
        number_of_pockets: item.noPockets,
        pocket_type: item.pocketType,
        neck: item.neck,
        collar: item.collar,
        placket: item.placket,
        length: item.length,
        sleeve_length: item.sleeveLength,
        sleeve_type: item.sleeveType,
        hemline: item.hemline,
        waist_rise: item.waistRise,
        closure: item.closure,
        dress_type: item.dresstype, //YashBodke
        top_style_type: item.topStyleType,
        jacket_type: item.jacketType,
        distress: item.Distress,
        fade: item.Fade,
        dungaree_bottom_type: item.dungareeBottomType,
        footwear_ankle_type: item.shoeAnkleType,
        footwear_insole: item.shoeInsole,
        
      },
      fabric: {
        fabric_code: item.fabricCode ? item.fabricCode : null,
        fabric_rate: item.fabricRate ? item.fabricRate : null,
        fabric_story: item.fabricStory,
        fabric_composition: item.fabricComposition
          ? item.fabricComposition
          : null,
        fabric_hsn: item.fabricHsn ? item.fabricHsn : null,
        fabric_weave_pattern: item.weavePattern,
        fabric_vendor: item.fabricVendor,
        denim_cast: item.denimCast,
        denim_wash: item.denimWash,
        wash_care: item.washCare,
        footwear_upper_material: item.upperMaterial,
        footwear_sole_material: item.soleMaterial,
      },
      dates: {
        first_grn_date: item.firstGrn,
        first_live_date: item.firstLive,
        first_sold_date: item.firstSold,
      },
      status: item.status,  // add this line
      deleted:item.deleted,
      product_description: item.productDescription,  // Add this line
       

    };
    
    console.log('Payload data:', data);  // Debug: check the payload

    // api post to /products/ with data
    
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/products/${info?.product_id}`,
      {
        method: "PUT",
        body: data,
      }
    );
    const json = await res;

    if (!res) {
      setLoading(false);
      // setErrorMessage(true);
      toast.error("Something went wrong, please try again!", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setOpen(true);
    }

    if (res) {
      setOpen(false);
      setLoading(false);
      setErrorMessage(false);
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
        router.reload(window.location.pathname);
      }, 2500);
    }
  };
  
 
 

  // use memo to prevent re-rendering of df
  let df = useMemo(() => {
    return hierarchyData;
  }, [hierarchyData]);

  // Get unique values from a data field
  function getUniqueDfValues(dataFrame, column) {
    let uniqueValues = [];
    dataFrame?.forEach((row) => {
      if (!uniqueValues.includes(row[column])) {
        uniqueValues.push(row[column]);
      }
    });
    return uniqueValues;
  }

  function filterDf(dataFrame, column, value) {
    let filteredDf = [];
    dataFrame?.forEach((row) => {
      if (row[column] === value) {
        filteredDf.push(row);
      }
    });
    return filteredDf;
  }

  // FILTER DATA FIELD
  // 1. GENDER
  const genderUnique = getUniqueDfValues(df, "gender");
  df = filterDf(df, "gender", item.genderField);

  // 2. VERTICAL
  const verticalUnique = getUniqueDfValues(df, "vertical");
  df = filterDf(df, "vertical", item.verticalField);

  // 3. FABRIC CATEGORY
  const fabricCategoryUnique = getUniqueDfValues(df, "fabric_category");
  df = filterDf(df, "fabric_category", item.fabricCategoryField);

  // 4. BRAND
  const brandUnique = getUniqueDfValues(df, "brand");
  df = filterDf(df, "brand", item.brandField);

  // 5. USAGE
  const usageUnique = getUniqueDfValues(df, "usage");
  df = filterDf(df, "usage", item.usageField);

  // 6. BRICK
  const brickUnique = getUniqueDfValues(df, "brick");
  df = filterDf(df, "brick", item.brickField);

  // 7. PRODUCT
  const productUnique = getUniqueDfValues(df, "product");
  df = filterDf(df, "product", item.productField);

  // 8. SUB PRODUCT
  const subProductUnique = getUniqueDfValues(df, "sub_product");
  df = filterDf(df, "sub_product", item.subProductField);

  // 9. TARGET AUDIENCE
  const targetAudienceUnique = getUniqueDfValues(df, "target_audience");
  df = filterDf(df, "target_audience", item.targetAudienceField);

  // 10. FIT
  const fitUnique = getUniqueDfValues(df, "fit");
  df = filterDf(df, "fit", item.fitField);

  if (userIsLoading) {
    return (
      <SimpleButton>
        <p className="text-sm font-medium leading-5">Loading</p>
      </SimpleButton>
    );
  }

  const canEditDesign = getFeature(userRole, "product design details")?.update;
  const canEditCost = getFeature(userRole, "product cost")?.update;
  const canEditGrn = getFeature(userRole, "import grn")?.create;

  // From Create
  const hierarchyFields = [
    {
      id: "genderField",
      label: "Gender",
      value: item.genderField,
      onChange: handleItemChange,
      options: genderUnique,
      disabled: !(info.status === "Design" && canEditDesign),
    },
    {
      id: "verticalField",
      label: "Vertical",
      value: item.verticalField,
      onChange: handleItemChange,
      options: verticalUnique,
      disabled: !(info.status === "Design" && canEditDesign),
    },
    {
      id: "fabricCategoryField",
      label: "Fabric Category",
      value: item.fabricCategoryField,
      onChange: handleItemChange,
      options: fabricCategoryUnique,
      disabled: !(info.status === "Design" && canEditDesign),
    },
    {
      id: "brandField",
      label: "Brand",
      value: item.brandField,
      onChange: handleItemChange,
      options: brandUnique,
      disabled: !(info.status === "Design" && canEditDesign),
    },
    {
      id: "usageField",
      label: "Usage",
      value: item.usageField,
      onChange: handleItemChange,
      options: usageUnique,
      disabled: !(info.status === "Design" && canEditDesign),
    },
    {
      id: "brickField",
      label: "Brick",
      value: item.brickField,
      onChange: handleItemChange,
      options: brickUnique,
      disabled: !(info.status === "Design" && canEditDesign),
    },
    {
      id: "productField",
      label: "Product",
      value: item.productField,
      onChange: handleItemChange,
      options: productUnique,
      disabled: !(info.status === "Design" && canEditDesign),
    },
    {
      id: "subProductField",
      label: "Sub-product",
      value: item.subProductField,
      onChange: handleItemChange,
      options: subProductUnique,
      disabled: !(info.status === "Design" && canEditDesign),
    },
    {
      id: "targetAudienceField",
      label: "Target Audience",
      value: item.targetAudienceField,
      onChange: handleItemChange,
      options: targetAudienceUnique,
      disabled: !(info.status === "Design" && canEditDesign),
    },
    {
      id: "fitField",
      label: "Fit",
      value: item.fitField,
      onChange: handleItemChange,
      options: fitUnique,
      disabled: !(info.status === "Design" && canEditDesign),
    },
  ];

  const launchInfoFields = [
    {
      label: "Style ID",
      id: "styleId",
      fieldType: "TextField",
      type: "text",
      name: "styleId",
      value: item.styleId,
      onChange: handleItemChange,
      options: null,
      size: "small",
      required: true,
      disabled: !(info.status === "Design" && canEditDesign),
    },
    {
      label: "Season",
      id: "season",
      fieldType: "Autocomplete",
      type: "text",
      name: "season",
      value: item.season,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          season: newValue,
        }));
      },
      options: fieldOptions?.season,
      size: "small",
      required: true,
      disabled: false,
    },
    {
      label: "First GRN Date",
      id: "firstGrn",
      fieldType: "TextField",
      type: "text",
      name: "firstGrn",
      value: item.firstGrn,
      onChange: handleItemChange,
      options: null,
      size: "small",
      required: false,
      disabled: canEditGrn ? false : true,
    },
    {
      label: "First Live Date",
      id: "firstLive",
      fieldType: "TextField",
      type: "text",
      name: "firstLive",
      value: item.firstLive,
      onChange: handleItemChange,
      options: null,
      size: "small",
      required: false,
      disabled: canEditGrn ? false : true,
    },
    {
      label: "First Sold Date",
      id: "firstSold",
      fieldType: "TextField",
      type: "text",
      name: "firstSold",
      value: item.firstSold,
      onChange: handleItemChange,
      options: null,
      size: "small",
      required: false,
      disabled: canEditGrn ? false : true,
    },
  ];

  const productColorFields = [
    {
      id: "primaryColor",
      fieldType: "Autocomplete",
      label: "Primary Color",
      name: "primaryColor",
      value: item.primaryColor,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          primaryColor: newValue,
          colorFamily: getHexCode(newValue, colorFamilies, hexCodes)
            .colorFamily,
        }));
      },
      options: fieldOptions?.primary_colour,
      size: null,
      required: true,
    },
    {
      id: "secondaryColor",
      fieldType: "Autocomplete",
      label: "Secondary Color",
      name: "secondaryColor",
      value: item.secondaryColor,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          secondaryColor: newValue ,
        }));
      },
      options: fieldOptions?.primary_colour,
      size: null,
      required: false,
      
    },
    {
      id: "tertiaryColor",
      fieldType: "Autocomplete",
      label: "Tertiary Color",
      name: "tertiaryColor",
      value: item.tertiaryColor,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          tertiaryColor: newValue ,
        }));
      },
      options: fieldOptions?.primary_colour,
      size: null,
      required: false,
    },
  ];

  const productDesignFields = [
    {
      id: "garmentPattern",
      fieldType: "Autocomplete",
      label: "Garment Pattern",
      name: "garmentPattern",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.garmentPattern,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          garmentPattern: newValue,
        }));
      },
      options: fieldOptions?.garment_pattern,
      size: null,
      required: false,
    },
    {
      id: "story",
      fieldType: "Autocomplete",
      label: "Product Story",
      name: "story",
      brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
      gender: ["Men","Women"],
      value: item.story,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          story: newValue,
        }));
      },
      options: fieldOptions?.story,
      size: null,
      required: true,
    },
    {
      id: "patternType",
      fieldType: "Autocomplete",
      label: "Pattern Type",
      name: "patternType",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.patternType,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          patternType: newValue,
        }));
      },
      options: fieldOptions?.print_pattern_type,
      size: null,
      required: false,
    },
    
    {
      id: "noPockets",
      fieldType: "Autocomplete",
      label: "Number of Pockets",
      name: "noPockets",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.noPockets,
      onChange: (event, newValue) => {
        if (newValue === 0) {
          setItem((prev) => ({
            ...prev,
            noPockets: getNumberPocketsValue(newValue),
            pocketType: "Without Pocket",
          }));
        } else {
          setItem((prev) => ({
            ...prev,
            noPockets: getNumberPocketsValue(newValue),
          }));
        }
      },
      options: fieldOptions?.number_of_pockets,
      getOptionLabel: (option) => getNumberPocketsOptionLabel(option),
      size: null,
      required: false,
    },
    {
      id: "pocketType",
      fieldType: "Autocomplete",
      label: "Pocket Type",
      name: "pocketType",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.pocketType,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          pocketType: newValue,
        }));
      },
      options: fieldOptions?.pocket_type,
      getOptionDisabled: (option) =>
        item.noPockets === 0
          ? option !== "Without Pocket"
          : option === "Without Pocket",
      disabled: item.noPockets === 0 ? true : false,
      size: null,
      required: false,
    },
    {
      id: "noComponents",
      fieldType: "Autocomplete",
      label: "Number of Components",
      name: "noComponents",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.noComponents,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          noComponents: newValue,
        }));
      },
      options: fieldOptions?.number_of_components,
      size: null,
      required: false,
    },
    {
      id: "neck",
      fieldType: "Autocomplete",
      label: "Neck",
      name: "neck",
      brick: ["Topwear", "Coordinates"],
      gender: ["Men","Women"],
      value: item.neck,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          neck: newValue,
        }));
      },
      options: fieldOptions?.neck,
      size: null,
      required: false,
    },
    {
      id: "collar",
      fieldType: "Autocomplete",
      label: "Collar",
      name: "collar",
      brick: ["Topwear", "Coordinates"],
      gender: ["Men","Women"],
      value: item.collar,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          collar: newValue,
        }));
      },
      options: fieldOptions?.collar,
      size: null,
      required: false,
    },
    {
      id: "sleeveLength",
      fieldType: "Autocomplete",
      label: "Sleeve Length",
      name: "sleeveLength",
      brick: ["Topwear", "Coordinates"],
      gender: ["Men","Women"],
      value: item.sleeveLength,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          sleeveLength: newValue,
        }));
      },
      options: fieldOptions?.sleeve_length,
      size: null,
      required: false,
    },
    
    {
      id: "placket",
      fieldType: "Autocomplete",
      label: "Placket",
      name: "placket",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.placket,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          placket: newValue,
        }));
      },
      options: fieldOptions?.placket,
      size: null,
      required: false,
    },
    {
      id: "length",
      fieldType: "Autocomplete",
      label: "Length",
      name: "length",
      brick: ["Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.length,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          length: newValue,
        }));
      },
      options: fieldOptions?.length,
      size: null,
      required: false,
    },
    {
      id: "hemline",
      fieldType: "Autocomplete",
      label: "Hemline",
      name: "hemline",
      brick: ["Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.hemline,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          hemline: newValue,
        }));
      },
      options: fieldOptions?.hemline,
      size: null,
      required: false,
    },
    {
      id: "waistRise",
      fieldType: "Autocomplete",
      label: "Waist Rise",
      name: "waistRise",
      brick: ["Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.waistRise,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          waistRise: newValue,
        }));
      },
      options: fieldOptions?.waist_rise,
      size: null,
      required: false,
    },
    {
      id: "closure",
      fieldType: "Autocomplete",
      label: "Closure",
      name: "closure",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.closure,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          closure: newValue,
        }));
      },
      options: fieldOptions?.closure,
      size: null,
      required: false,
    },
    {
      id: "sleeveType",
      fieldType: "Autocomplete",
      label: "Sleeve Type",
      name: "sleeveType",
      brick: ["Topwear"],
      gender: ["Men","Women"],
      value: item.sleeveType,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          sleeveType: newValue,
        }));
      },
      options: fieldOptions?.sleeve_type,
      size: null,
      required: false,
    },
    //new
    {
      id: "dresstype",
      fieldType: "Autocomplete",
      label: "Dress Type",
      name: "dresstype",
      brick: ["Topwear"],
      gender: ["Women"],
      product:["Dress"],
      value: item.dresstype,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          dresstype: newValue,
        }));
      },
      options: fieldOptions?.dress_type,
      size: null,
      required: false,
    },
    
    {
      id: "topStyleType",
      fieldType: "Autocomplete",
      label: "Top Style Type",
      name: "topStyleType",
      brick: ["Topwear"],
      gender: ["Women"],
      product:["Top"],
      value: item.topStyleType,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          topStyleType: newValue,
        }));
      },
      options: fieldOptions?.top_style_type,
      size: null,
      required: false,
    },
    {
      id: "jacketType",
      fieldType: "Autocomplete",
      label: "Jacket Type",
      name: "jacketType",
      brick: ["Topwear"],
      gender: ["Men","Women"],
      product:["Outerwear","Jacket"],
      value: item.jacketType,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          jacketType: newValue,
        }));
      },
      options: fieldOptions?.jacket_type,
      size: null,
      required: false,
    },
    {
      id: "Distress",
      fieldType: "Autocomplete",
      label: "Distress",
      name: "Distress",
      brick: ["Bottomwear"],
      gender: ["Men","Women"],
      value: item.Distress,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          Distress: newValue,
        }));
      },
      options: fieldOptions?.distress,
      size: null,
      required: false,
    },
    {
      id: "Fade",
      fieldType: "Autocomplete",
      label: "Fade",
      name: "Fade",
      brick: ["Bottomwear"],
      gender: ["Men","Women"],
      value: item.Fade,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          Fade: newValue,
        }));
      },
      options: fieldOptions?.fade,
      size: null,
      required: false,
    },
    {
      id: "dungareeBottomType",
      fieldType: "Autocomplete",
      label: "Dungaree Bottom Type",
      name: "dungareeBottomType",
      brick: ["Coordinates"],
      gender: ["Women"],
      product:["Dungaree"],
      value: item.dungareeBottomType,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          dungareeBottomType: newValue,
        }));
      },
      options: fieldOptions?.dungaree_bottom_type,
      size: null,
      required: false,
    },
    {
      id: "shoeAnkleType",
      fieldType: "Autocomplete",
      label: "Footwear Ankle Type",
      name: "shoeAnkleType",
      brick: ["Footwear"],
      gender: ["Men","Women"],
      value: item.shoeAnkleType,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          shoeAnkleType: newValue,
        }));
      },
      options: fieldOptions?.footwear_ankle_type,
      size: null,
      required: false,
    },
    {
      id: "shoeInsole",
      fieldType: "Autocomplete",
      label: "Footwear Insole",
      name: "shoeInsole",
      brick: ["Footwear"],
      gender: ["Men","Women"],
      value: item.shoeInsole,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          shoeInsole: newValue,
        }));
      },
      options: fieldOptions?.footwear_insole,
      size: null,
      required: false,
    },
  ];

  const productFabricFields = [
    {
      id: "fabricCode",
      fieldType: "TextField",
      label: "Fabric Code",
      type: "text",
      name: "fabricCode",
      brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
      gender: ["Men","Women"],
      value: item.fabricCode,
      onChange: handleItemChange,
      options: null,
      size: null,
      required: true,
    },
    {
      id: "fabricHsn",
      fieldType: "TextField",
      label: "Fabric HSN",
      type: "number",
      name: "fabricHsn",
      brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
      gender: ["Men","Women"],
      value: item.fabricHsn,
      onChange: handleItemChange,
      options: null,
      size: null,
      disabled:
        userDepartment === "admin" || userDepartment === "commercial"
          ? false
          : true,
      required: false,
    },
    {
      id: "fabricVendor",
      fieldType: "TextField",
      label: "Fabric Vendor",
      type: "text",
      name: "fabricVendor",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.fabricVendor,
      onChange: handleItemChange,
      options: null,
      size: null,
      required: false,
    },
    {
      id: "fabricRate",
      fieldType: "TextField",
      label: "Fabric Rate",
      type: "number",
      name: "fabricRate",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.fabricRate,
      onChange: handleItemChange,
      options: null,
      size: null,
      required: false,
    },
    {
      id: "fabricStory",
      fieldType: "Autocomplete",
      label: "Fabric Story",
      type: "text",
      name: "fabricStory",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.fabricStory,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          fabricStory: newValue,
        }));
      },
      options: fieldOptions?.fabric_story,
      size: null,
      required: false,
    },
    {
      id: "fabricComposition",
      fieldType: "Autocomplete",
      label: "Fabric Composition",
      name: "fabricComposition",
      brick: ["Topwear", "Coordinates", "Bottomwear", "Footwear"],
      gender: ["Men","Women"],
      value: item.fabricComposition,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          fabricComposition: newValue,
        }));
      },
      options: fieldOptions?.fabric_composition,
      size: null,
      required: true,
    },
    {
      id: "weavePattern",
      fieldType: "Autocomplete",
      label: "Fabric Weave Pattern",
      name: "weavePattern",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.weavePattern,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          weavePattern: newValue,
        }));
      },
      options: fieldOptions?.fabric_weave_pattern,
      size: null,
      required: false,
    },
    {
      id: "washCare",
      fieldType: "Autocomplete",
      label: "Wash Care",
      name: "washCare",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.washCare,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          washCare: newValue,
        }));
      },
      options: fieldOptions?.wash_care,
      size: null,
      required: false,
    },
    {
      id: "denimCast",
      fieldType: "Autocomplete",
      label: "Denim Cast",
      type: "text",
      name: "denimCast",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.denimCast,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          denimCast: newValue,
        }));
      },
      options: fieldOptions?.denim_cast,
      size: null,
      required: false,
    },
    {
      id: "denimWash",
      fieldType: "TextField",
      label: "Denim Wash",
      type: "text",
      name: "denimWash",
      brick: ["Topwear", "Coordinates", "Bottomwear"],
      gender: ["Men","Women"],
      value: item.denimWash,
      onChange: handleItemChange,
      options: null,
      size: null,
      required: false,
    },
    {
      id: "upperMaterial",
      fieldType: "Autocomplete",
      label: "Footware Upper Material",
      name: "upperMaterial",
      brick: ["Footwear"],
      gender: ["Men","Women"],
      value: item.upperMaterial,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          upperMaterial: newValue,
        }));
      },
      options: fieldOptions?.footwear_upper_material,
      size: null,
      required: false,
    },
    {
      id: "soleMaterial",
      fieldType: "Autocomplete",
      label: "Footware Sole Material",
      name: "soleMaterial",
      brick: ["Footwear"],
      gender: ["Men","Women"],
      value: item.soleMaterial,
      onChange: (event, newValue) => {
        setItem((prev) => ({
          ...prev,
          soleMaterial: newValue,
        }));
      },
      options: fieldOptions?.footwear_sole_material,
      size: null,
      required: false,
    },
  ];

  return (
    <Fragment>
      {(info.status === "Design" ||
        info.status === "Approved" ||
        info.status === "Catalog" ||
        (userDepartment === "admin" && info.status === "Merchandise") ||
        info.status === "Commercial") &&
      (userDepartment === "admin" ||
        (info.status === "Design" && userDepartment === "design") ||
        (info.status === "Approved" && userDepartment === "merchandise") ||
        (info.status === "Catalog" && userDepartment === "catalog")) ? (
        <SimpleButton size={"sm"} onClick={handleOpen}>
          <p className=" text-sm font-medium leading-5">Edit</p>
        </SimpleButton>
      ) : (
        <SimpleButton size={"sm"} disabled>
          <p className=" text-sm font-medium leading-5">Edit</p>
        </SimpleButton>
      )}

      <Modal
        showBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="absolute left-[50%] top-[50%] flex h-[90vh] w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col bg-white p-6 shadow-md">
          <div className="fixed left-0 right-0 top-0 mb-8 py-6">
            <h2
              id="child-modal-title"
              className="mb-6 flex items-center gap-2 px-6 text-xl font-medium leading-6 text-slate-700"
            >
              Edit product
            </h2>
            <hr />
          </div>
          <div className="my-16 flex flex-col overflow-y-scroll px-2 pt-4">
            {loading ? (
              <>
                <div className="flex flex-col items-center justify-center">
                  <LoadingScreen />
                </div>
              </>
            ) : errorMessage ? (
              <>
                <div className="flex flex-col items-center justify-center">
                  Something went wrong, please try again later and if the
                  problem persists, contact support.
                </div>
              </>
            ) : (
              <>
                {canEditDesign && (
                  <>
                    {/* PRODUCT HIERARCHY */}
                    <ProductHierarchy
                      fields={hierarchyFields}
                      disabled={!(info.status === "Design" && canEditDesign)}
                    />

                    {/* SIZES INFO  */}
                    <ProductSizeGrid
                      dataframe={df}
                      sizes={item.sizes}
                      setItem={setItem}
                      item={item}
                      isDuplicate={false}
                    />

                    {/* LAUNCH INFO */}
                    <ProductLaunchInfo fields={launchInfoFields} />

                    {/* PRODUCT COLOR */}
                    <ProductColor
                      fields={productColorFields}
                      primaryColor={item.primaryColor}
                      colorFamilies={colorFamilies}
                      hexCodes={hexCodes}
                    />

                    {/* PRODUCT DESIGN DETAILS */}
                    <ProductDesignDetails
                      fields={getFields(productDesignFields, item.brickField, item.genderField,item.productField)}
                      brick={item.brickField}
                    />
                    

                    {/* PRODUCT FABRIC DETAILS */}
                    <ProductFabricDetails
                      fields={productFabricFields}
                      brick={item.brickField}
                    />
                    {/* Product Description Heading */}
                    <h2 className="mb-8 border-b pb-2 text-lg font-medium tracking-wide text-slate-700"> Product Description </h2>

                    <TextField
                      id="productDescription"
                      label="Product Description"
                      type="text"
                      name="productDescription"
                      value={item.productDescription}
                      onChange={handleItemChange}
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                    />

                  </>
                )}

                {canEditCost && (
                  <>
                    <h2 className="mb-8 border-b pb-2 text-lg font-medium tracking-wide text-slate-700">
                      Product Cost
                    </h2>
                    <div className="mb-14 grid grid-cols-2 gap-6">
                      <TextField
                        id="mrp"
                        name="mrp"
                        label="MRP"
                        InputProps={{ inputProps: { min: 0 } }}
                        type="number"
                        value={item.mrp}
                        onChange={handleItemChange}
                        disabled
                      />
                      <TextField
                        id="cost"
                        name="cost"
                        label="Cost"
                        InputProps={{ inputProps: { min: 0 } }}
                        type="number"
                        value={item.cost}
                        onChange={handleItemChange}
                      />
                    </div>
                  </>
                )}

                {canEditDesign && (
                  <>
                    {/* PRODUCT TAGS */}
                    <ProductTags
                      tagInputValue={item.tagInputValue}
                      tagOnChange={handleTagChange}
                      tagOnInputChange={handleTagInputChange}
                      tagOnKeyDown={handleKeyDown}
                      tagValue={item.tags}
                      exclusiveValue={item.channelExclusive}
                      exclusiveOnChange={handleExclusiveChange}
                      exclusiveOptions={fieldOptions?.exclusive}
                    />
                  </>
                )}
              </>
            )}
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-10 flex w-full flex-col justify-end bg-white">
            <hr />
            <div className="flex justify-end gap-2 px-6 py-6">
              <SubtleButton onClick={handleClose}>Cancel</SubtleButton>
              <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
            </div>
          </div>
        </div>
      </Modal>
      {isAlertVisible && (
        <div className="alert-container fixed bottom-12 left-24 z-50 max-w-md rounded-md bg-white shadow-lg transition">
          <div className="flex px-4 py-5">
            <div className="mr-4">
              <SuccessIcon width={24} height={24} />
            </div>
            <div className="mr-4 flex flex-col ">
              <p className="mb-1 text-sm font-semibold leading-5 text-slate-700">
                Product edited successfully
              </p>
              <p className=" text-sm font-normal text-slate-600">
                Changes made to {item.styleId} have been saved.
              </p>
            </div>
            <div
              onClick={() => setIsAlertVisible(false)}
              className="cursor-pointer text-xs text-slate-600 hover:text-slate-800"
            >
              &#x2715;
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
