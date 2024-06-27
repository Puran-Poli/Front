import { Fragment } from "react";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  PrimaryButton,
  SubtleButton,
  SimpleButton,
} from "@/components/base/Buttons";
import SuccessIcon from "@/components/icons/SuccessIcon";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import { useExportProducts } from "@/hooks/products/useExportProducts";
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";

function successExport({ link }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" mb-8">
        <SuccessIcon width={64} height={64} />
      </div>
      <p className="mb-4 text-xl font-medium text-slate-700">
        Export Successful
      </p>
      <p className="text-sm text-slate-500">
        Click the link below to begin your download.
      </p>
      <div className="mt-4 flex flex-col">
        <SubtleButton>
          <a href={link} download>
            Download
          </a>
        </SubtleButton>
      </div>
    </div>
  );
}

export default function ExportModal() {
  const {
    open,
    columnFilter,
    status,
    fromDate,
    setFromDate,
    endDate,
    setEndDate,
    downloadLink,
    loading,
    notFound,
    handleOpen,
    handleClose,
    handleColumnFilterChange,
    handleStatusChange,
    handleSave,
    fabricCode,
    gender,
    vertical,
    fabricCategory,
    brand,
    brick,
    product,
    subProduct,
    handleFabricCodeChange,
    handleGenderChange,
    handleVerticalChange,
    handleFabricCategoryChange,
    handleBrandChange,
    handleBrickChange,
    handleProductChange,
    handleSubProductChange,
  } = useExportProducts();

  const { userRole, userDepartment, userIsLoading } = useUserRole();

  if (userIsLoading) {
    return (
      <SimpleButton>
        <p className="text-sm font-medium leading-5">Loading</p>
      </SimpleButton>
    );
  }

  const exportItems = getFeature(userRole, "export")?.create;

  if (!exportItems) {
    return null;
  }

  return (
    <Fragment>
      <SimpleButton onClick={handleOpen}>
        <p className=" text-sm font-medium leading-5">Export</p>
      </SimpleButton>
      <Modal
        showBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        
        <div className="absolute top-[50%] left-[50%] flex min-h-[70vh] max-h-[90vh] w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-center bg-white p-6 shadow-md">
          <div className="fixed top-0 left-0 right-0 mb-8 py-6">
            <h2
              id="child-modal-title"
              className="mb-6 flex items-center gap-2 px-6 text-xl font-medium leading-6 text-slate-700"
            >
              Export files for channels
            </h2>
            <hr />
          </div>
          <div className="my-16 flex flex-col overflow-y-auto">
            {downloadLink ? (
              successExport({ link: downloadLink })
            ) : loading === true ? (
              <>
                <div className="flex flex-col items-center justify-center">
                  <LoadingScreen />
                </div>
              </>
            ) : (
              <>
                {notFound && (
                  <h2 className="mb-4 text-lg font-medium text-red-600">
                    No products found in the selected date range, please try
                    again.
                  </h2>
                )}
                <p className="mb-8">
                  Choose the products based on the date range to export them for
                  the selected channels.
                </p>
       
                <div className="flex w-[340px] min-w-[340px] flex-col gap-5">
                <FormControl fullWidth className="mb-5">
                    {/* <InputLabel id="filter-by-fabric-code-input">Fabric Code</InputLabel> */}
                    <TextField
                      labelId="filter-by-fabric-code"
                      id="filter-by-fabric-code"
                      value={fabricCode}
                      disabled={
                        userDepartment === "design"
                          ? false
                          : true
                      }
                      label="Fabric Code"
                      onChange={handleFabricCodeChange}
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl fullWidth className="mb-5">
                    <InputLabel id="filter-by-gender-input">Gender</InputLabel>
                    <Select
                      labelId="filter-by-gender"
                      id="filter-by-gender"
                      value={gender}
                      label="Gender"
                      onChange={handleGenderChange}
                    >
                      <MenuItem value={"Men"}>Men</MenuItem>
                      <MenuItem value={"Women"}>Women</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mb-5">
                    <InputLabel id="filter-by-vertical-input">Vertical</InputLabel>
                    <Select
                      labelId="filter-by-vertical"
                      id="filter-by-vertical"
                      value={vertical}
                      label="Vertical"
                      onChange={handleVerticalChange}
                    >
                      <MenuItem value={"Apparel"}>Apparel</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mb-5">
                    <InputLabel id="filter-by-fabric-category-input">Fabric Category </InputLabel>
                    <Select
                      labelId="filter-by-fabric-category"
                      id="filter-by-fabric-category"
                      value={fabricCategory}
                      label="Fabric Category"
                      onChange={handleFabricCategoryChange}
                    >
                      <MenuItem value={"Knitted"}>Knitted</MenuItem>
                      <MenuItem value={"Woven"}>Woven</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mb-5">
                    <InputLabel id="filter-by-brand-input">Brand</InputLabel>
                    <Select
                      labelId="filter-by-brand"
                      id="filter-by-brand"
                      value={brand}
                      label="Brand"
                      onChange={handleBrandChange}
                    >
                      <MenuItem value={"Freehand"}>Freehand</MenuItem>
                      <MenuItem value={"Hardsoda"}>Hardsoda</MenuItem>
                      <MenuItem value={"The Indian Garage Co"}>The Indian Garage Co</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mb-5">
                    <InputLabel id="filter-by-brick-input">Brick</InputLabel>
                    <Select
                      labelId="filter-by-brick"
                      id="filter-by-brick"
                      value={brick}
                      label="Brick"
                      onChange={handleBrickChange}
                    >
                      <MenuItem value={"Bottomwear"}>Bottomwear</MenuItem>
                      <MenuItem value={"Coordinates"}>Coordinates</MenuItem>
                      <MenuItem value={"Topwear"}>Topwear</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mb-5">
                    <InputLabel id="filter-by-product-input">Product</InputLabel>
                    <Select
                      labelId="filter-by-product"
                      id="filter-by-product"
                      value={product}
                      label="Product"
                      onChange={handleProductChange}
                    >
                      <MenuItem value={"Blazer"}>Blazer</MenuItem>
                      <MenuItem value={"Bodysuit"}>Bodysuit</MenuItem>
                      <MenuItem value={"Boxers"}>Boxers</MenuItem>
                      <MenuItem value={"Cargo"}>Cargo</MenuItem>
                      <MenuItem value={"Chinos"}>Chinos</MenuItem>
                      <MenuItem value={"Coordinates"}>Coordinates</MenuItem>
                      <MenuItem value={"Dress"}>Dress</MenuItem>
                      <MenuItem value={"Dungaree"}>Dungaree</MenuItem>
                      <MenuItem value={"Jacket"}>Jacket</MenuItem>
                      <MenuItem value={"Jeans"}>Jeans</MenuItem>
                      <MenuItem value={"Jeggings"}>Jeggings</MenuItem>
                      <MenuItem value={"Joggers"}>Joggers</MenuItem>
                      <MenuItem value={"Jumpsuit"}>Jumpsuit</MenuItem>
                      <MenuItem value={"Kurta"}>Kurta</MenuItem>
                      <MenuItem value={"Kurta Set"}>Kurta Set</MenuItem>
                      <MenuItem value={"Lounge Pants"}>Lounge Pants</MenuItem>
                      <MenuItem value={"Lounge Set"}>Lounge Set</MenuItem>
                      <MenuItem value={"Lounge Shorts"}>Lounge Shorts</MenuItem>
                      <MenuItem value={"Nehru Jacket"}>Nehru Jacket</MenuItem>
                      <MenuItem value={"Outerwear"}>Outerwear</MenuItem>
                      <MenuItem value={"Romper"}>Romper</MenuItem>
                      <MenuItem value={"Shirt"}>Shirt</MenuItem>
                      <MenuItem value={"Shorts"}>Shorts</MenuItem>
                      <MenuItem value={"Shrug"}>Shrug</MenuItem>
                      <MenuItem value={"Skirt"}>Skirt</MenuItem>
                      <MenuItem value={"Skorts"}>Skorts</MenuItem>
                      <MenuItem value={"Sports"}>Sports</MenuItem>
                      <MenuItem value={"Sweater"}>Sweater</MenuItem>
                      <MenuItem value={"Sweatshirt"}>Sweatshirt</MenuItem>
                      <MenuItem value={"T-Shirt"}>T-Shirt</MenuItem>
                      <MenuItem value={"Top"}>Top</MenuItem>
                      <MenuItem value={"Trackpants"}>Trackpants</MenuItem>
                      <MenuItem value={"Tracksuits Set"}>Tracksuits Set</MenuItem>
                      <MenuItem value={"Trousers"}>Trousers</MenuItem>
                      <MenuItem value={"Windcheater"}>Windcheater</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mb-5">
                    <InputLabel id="filter-by-sub-product-input">Sub Product</InputLabel>
                    <Select
                      labelId="filter-by-sub-product"
                      id="filter-by-sub-product"
                      value={subProduct}
                      label="Sub Product"
                      onChange={handleSubProductChange}
                    >
                      <MenuItem value={"A Line Skirt"}>A Line Skirt</MenuItem>
                      <MenuItem value={"Asymmetric Dress"}>Asymmetric Dress</MenuItem>
                      <MenuItem value={"Asymmetric Skirt"}>Asymmetric Skirt</MenuItem>
                      <MenuItem value={"Asymmetric Top"}>Asymmetric Top</MenuItem>
                      <MenuItem value={"Babydoll Dress"}>Babydoll Dress</MenuItem>
                      <MenuItem value={"Baseball Neck Sweatshirt"}>Baseball Neck Sweatshirt</MenuItem>
                      <MenuItem value={"Bermuda Shorts"}>Bermuda Shorts</MenuItem>
                      <MenuItem value={"Biker Jacket"}>Biker Jacket</MenuItem>
                      <MenuItem value={"Biker Shorts"}>Biker Shorts</MenuItem>
                      <MenuItem value={"Blazer"}>Blazer</MenuItem>
                      <MenuItem value={"Blazer And Pants"}>Blazer And Pants</MenuItem>
                      <MenuItem value={"Blazer Dress"}>Blazer Dress</MenuItem>
                      <MenuItem value={"Bodycon Dress"}>Bodycon Dress</MenuItem>
                      <MenuItem value={"Bodysuit"}>Bodysuit</MenuItem>
                      <MenuItem value={"Bolero Jacket"}>Bolero Jacket</MenuItem>
                      <MenuItem value={"Bomber Jacket"}>Bomber Jacket</MenuItem>
                      <MenuItem value={"Bootcut Trousers"}>Bootcut Trousers</MenuItem>
                      <MenuItem value={"Boxers"}>Boxers</MenuItem>
                      <MenuItem value={"Bubble Skirt"}>Bubble Skirt</MenuItem>
                      <MenuItem value={"Button Down Skirt"}>Button Down Skirt</MenuItem>
                      <MenuItem value={"Button Down Top"}>Button Down Top</MenuItem>
                      <MenuItem value={"Cami Top"}>Cami Top</MenuItem>
                      <MenuItem value={"Cami Top And Pants"}>Cami Top And Pants</MenuItem>
                      <MenuItem value={"Cami Top And Shorts"}>Cami Top And Shorts</MenuItem>
                      <MenuItem value={"Cape Top"}>Cape Top</MenuItem>
                      <MenuItem value={"Capri Pants"}>Capri Pants</MenuItem>
                      <MenuItem value={"Cargo"}>Cargo</MenuItem>
                      <MenuItem value={"Cargo Denim Jeans"}>Cargo Denim Jeans</MenuItem>
                      <MenuItem value={"Cargo Joggers"}>Cargo Joggers</MenuItem>
                      <MenuItem value={"Cargo Pants"}>Cargo Pants</MenuItem>
                      <MenuItem value={"Cargo Shorts"}>Cargo Shorts</MenuItem>
                      <MenuItem value={"Chinos"}>Chinos</MenuItem>
                      <MenuItem value={"Cigarette Trousers"}>Cigarette Trousers</MenuItem>
                      <MenuItem value={"Cold Shoulder Top"}>Cold Shoulder Top</MenuItem>
                      <MenuItem value={"Corset Top"}>Corset Top</MenuItem>
                      <MenuItem value={"Crew Neck Sweater"}>Crew Neck Sweater</MenuItem>
                      <MenuItem value={"Crew Neck Sweatshirt"}>Crew Neck Sweatshirt</MenuItem>
                      <MenuItem value={"Crew Neck Sweatshirt And Joggers"}>Crew Neck Sweatshirt And Joggers</MenuItem>
                      <MenuItem value={"Crew Neck Sweatshirt And Shorts"}>Crew Neck Sweatshirt And Shorts</MenuItem>
                      <MenuItem value={"Crew Neck T-Shirt"}>Crew Neck T-Shirt</MenuItem>
                      <MenuItem value={"Crew Neck Tank Top"}>Crew Neck Tank Top</MenuItem>
                      <MenuItem value={"Crewneck Sweatshirt"}>Crewneck Sweatshirt</MenuItem>
                      <MenuItem value={"Crop Boxy Shirt"}>Crop Boxy Shirt</MenuItem>
                      <MenuItem value={"Crop Crewneck Sweatshirt"}>Crop Crewneck Sweatshirt</MenuItem>
                      <MenuItem value={"Crop Hooded Sweatshirt"}>Crop Hooded Sweatshirt</MenuItem>
                      <MenuItem value={"Crop Shirt"}>Crop Shirt</MenuItem>
                      <MenuItem value={"Crop Top"}>Crop Top</MenuItem>
                      <MenuItem value={"Cropped Blazer"}>Cropped Blazer</MenuItem>
                      <MenuItem value={"Cropped Denim Jacket"}>Cropped Denim Jacket</MenuItem>
                      <MenuItem value={"Cropped Jacket"}>Cropped Jacket</MenuItem>
                      <MenuItem value={"Cropped Padded Jacket"}>Cropped Padded Jacket</MenuItem>
                      <MenuItem value={"Cuffed Cargo"}>Cuffed Cargo</MenuItem>
                      <MenuItem value={"Cuffed Joggers"}>Cuffed Joggers</MenuItem>
                      <MenuItem value={"Cullotes"}>Cullotes</MenuItem>
                      <MenuItem value={"Cut Out Dress"}>Cut Out Dress</MenuItem>
                      <MenuItem value={"Cut Out Top"}>Cut Out Top</MenuItem>
                      <MenuItem value={"Denim Coords"}>Denim Coords</MenuItem>
                      <MenuItem value={"Denim Jacket"}>Denim Jacket</MenuItem>
                      <MenuItem value={"Denim Jeggings"}>Denim Jeggings</MenuItem>
                      <MenuItem value={"Denim Joggers"}>Denim Joggers</MenuItem>
                      <MenuItem value={"Denim Shirt"}>Denim Shirt</MenuItem>
                      <MenuItem value={"Denim Shorts"}>Denim Shorts</MenuItem>
                      <MenuItem value={"Double Breasted Blazer"}>Double Breasted Blazer</MenuItem>
                      <MenuItem value={"Draped Dress"}>Draped Dress</MenuItem>
                      <MenuItem value={"Draped Skirt"}>Draped Skirt</MenuItem>
                      <MenuItem value={"Draped Top"}>Draped Top</MenuItem>
                      <MenuItem value={"Drop Shoulder Dress"}>Drop Shoulder Dress</MenuItem>
                      <MenuItem value={"Drop Shoulder Top"}>Drop Shoulder Top</MenuItem>
                      <MenuItem value={"Drop Waist Dress"}>Drop Waist Dress</MenuItem>
                      <MenuItem value={"Duffle Coat"}>Duffle Coat</MenuItem>
                      <MenuItem value={"Dungaree"}>Dungaree</MenuItem>
                      <MenuItem value={"Dungaree Dress"}>Dungaree Dress</MenuItem>
                      <MenuItem value={"Dungaree Shorts"}>Dungaree Shorts</MenuItem>
                      <MenuItem value={"Elasticated Denim Jeggings"}>Elasticated Denim Jeggings</MenuItem>
                      <MenuItem value={"Elasticated Shorts"}>Elasticated Shorts</MenuItem>
                      <MenuItem value={"Elasticated Trousers"}>Elasticated Trousers</MenuItem>
                      <MenuItem value={"Five Pocket Jeans"}>Five Pocket Jeans</MenuItem>
                      <MenuItem value={"Flare Shorts"}>Flare Shorts</MenuItem>
                      <MenuItem value={"Flare Trousers"}>Flare Trousers</MenuItem>
                      <MenuItem value={"Formal Trousers"}>Formal Trousers</MenuItem>
                      <MenuItem value={"Front Open High Neck Sweatshirt"}>Front Open High Neck Sweatshirt</MenuItem>
                      <MenuItem value={"Front Open High Neck Sweatshirt And Joggers"}>Front Open High Neck Sweatshirt And Joggers</MenuItem>
                      <MenuItem value={"Front Open Hooded Sweatshirt"}>Front Open Hooded Sweatshirt</MenuItem>
                      <MenuItem value={"Front Open Hooded Sweatshirt And Joggers"}>Front Open Hooded Sweatshirt And Joggers</MenuItem>
                      <MenuItem value={"Gathered Dress"}>Gathered Dress</MenuItem>
                      <MenuItem value={"Gathered Skirt"}>Gathered Skirt</MenuItem>
                      <MenuItem value={"Gathered Waist Top"}>Gathered Waist Top</MenuItem>
                      <MenuItem value={"Gilet"}>Gilet</MenuItem>
                      <MenuItem value={"Godet Dress"}>Godet Dress</MenuItem>
                      <MenuItem value={"Godet Skirt"}>Godet Skirt</MenuItem>
                      <MenuItem value={"Gore Skirt"}>Gore Skirt</MenuItem>
                      <MenuItem value={"Half Open High Neck Sweater"}>Half Open High Neck Sweater</MenuItem>
                      <MenuItem value={"Half Open High Neck Sweatshirt"}>Half Open High Neck Sweatshirt</MenuItem>
                      <MenuItem value={"Half Open Hooded Sweatshirt"}>Half Open Hooded Sweatshirt</MenuItem>
                      <MenuItem value={"Handkerchief Dress"}>Handkerchief Dress</MenuItem>
                      <MenuItem value={"Handkerchief Skirt"}>Handkerchief Skirt</MenuItem>
                      <MenuItem value={"Handkerchief Top"}>Handkerchief Top</MenuItem>
                      <MenuItem value={"Henley Neck T-Shirt"}>Henley Neck T-Shirt</MenuItem>
                      <MenuItem value={"High Waist Shorts"}>High Waist Shorts</MenuItem>
                      <MenuItem value={"Hooded Shirt"}>Hooded Shirt</MenuItem>
                      <MenuItem value={"Hooded Sweatshirt"}>Hooded Sweatshirt</MenuItem>
                      <MenuItem value={"Hot Pants"}>Hot Pants</MenuItem>
                      <MenuItem value={"Jacket"}>Jacket</MenuItem>
                      <MenuItem value={"Jeans"}>Jeans</MenuItem>
                      <MenuItem value={"Jeggings"}>Jeggings</MenuItem>
                      <MenuItem value={"Jogger Shorts"}>Jogger Shorts</MenuItem>
                      <MenuItem value={"Jogger Trousers"}>Jogger Trousers</MenuItem>
                      <MenuItem value={"Joggers"}>Joggers</MenuItem>
                      <MenuItem value={"Jumpsuit"}>Jumpsuit</MenuItem>
                      <MenuItem value={"Kaftan"}>Kaftan</MenuItem>
                      <MenuItem value={"Knot Dress"}>Knot Dress</MenuItem>
                      <MenuItem value={"Kurta"}>Kurta</MenuItem>
                      <MenuItem value={"Kurta And Pyjama"}>Kurta And Pyjama</MenuItem>
                      <MenuItem value={"Lace Top"}>Lace Top</MenuItem>
                      <MenuItem value={"Long Crewneck Sweatshirt"}>Long Crewneck Sweatshirt</MenuItem>
                      <MenuItem value={"Long Hooded Sweatshirt"}>Long Hooded Sweatshirt</MenuItem>
                      <MenuItem value={"Long Shirt"}>Long Shirt</MenuItem>
                      <MenuItem value={"Long Skirt"}>Long Skirt</MenuItem>
                      <MenuItem value={"Lounge Pants"}>Lounge Pants</MenuItem>
                      <MenuItem value={"Lounge Shorts"}>Lounge Shorts</MenuItem>
                      <MenuItem value={"Maxi Dress"}>Maxi Dress</MenuItem>
                      <MenuItem value={"Maxi Skirt"}>Maxi Skirt</MenuItem>
                      <MenuItem value={"Midi Dress"}>Midi Dress</MenuItem>
                      <MenuItem value={"Midi Skirt"}>Midi Skirt</MenuItem>
                      <MenuItem value={"Mini Dress"}>Mini Dress</MenuItem>
                      <MenuItem value={"Mini Skirt"}>Mini Skirt</MenuItem>
                      <MenuItem value={"Mullet Skirt"}>Mullet Skirt</MenuItem>
                      <MenuItem value={"Nehru Jacket"}>Nehru Jacket</MenuItem>
                      <MenuItem value={"Off Shoulder Top"}>Off Shoulder Top</MenuItem>
                      <MenuItem value={"One Shoulder Dress"}>One Shoulder Dress</MenuItem>
                      <MenuItem value={"One Shoulder Top"}>One Shoulder Top</MenuItem>
                      <MenuItem value={"Open Bottom Joggers"}>Open Bottom Joggers</MenuItem>
                      <MenuItem value={"Overhead Crew Neck Sweatshirt And Joggers"}>Overhead Crew Neck Sweatshirt And Joggers</MenuItem>
                      <MenuItem value={"Overhead Hooded Sweatshirt"}>Overhead Hooded Sweatshirt</MenuItem>
                      <MenuItem value={"Overhead Hooded Sweatshirt And Joggers"}>Overhead Hooded Sweatshirt And Joggers</MenuItem>
                      <MenuItem value={"Overhead Hooded Sweatshirt And Shorts"}>Overhead Hooded Sweatshirt And Shorts</MenuItem>
                      <MenuItem value={"Overshirt"}>Overshirt</MenuItem>
                      <MenuItem value={"Oversized Shirt"}>Oversized Shirt</MenuItem>
                      <MenuItem value={"Padded Jacket"}>Padded Jacket</MenuItem>
                      <MenuItem value={"Palazzo"}>Palazzo</MenuItem>
                      <MenuItem value={"Paper Bag Trouser"}>Paper Bag Trouser</MenuItem>
                      <MenuItem value={"Parka Jacket"}>Parka Jacket</MenuItem>
                      <MenuItem value={"Peg Trousers"}>Peg Trousers</MenuItem>
                      <MenuItem value={"Pencil Skirt"}>Pencil Skirt</MenuItem>
                      <MenuItem value={"Peplum Dress"}>Peplum Dress</MenuItem>
                      <MenuItem value={"Peplum Skirt"}>Peplum Skirt</MenuItem>
                      <MenuItem value={"Peplum Top"}>Peplum Top</MenuItem>
                      <MenuItem value={"Pinafore Dress"}>Pinafore Dress</MenuItem>
                      <MenuItem value={"Pleated Dress"}>Pleated Dress</MenuItem>
                      <MenuItem value={"Pleated Flare Trousers"}>Pleated Flare Trousers</MenuItem>
                      <MenuItem value={"Pleated Shorts"}>Pleated Shorts</MenuItem>
                      <MenuItem value={"Pleated Skirt"}>Pleated Skirt</MenuItem>
                      <MenuItem value={"Pleated Top"}>Pleated Top</MenuItem>
                      <MenuItem value={"Polo Sweater"}>Polo Sweater</MenuItem>
                      <MenuItem value={"Polo T-Shirt"}>Polo T-Shirt</MenuItem>
                      <MenuItem value={"Quilted Jacket"}>Quilted Jacket</MenuItem>
                      <MenuItem value={"Regular Shorts"}>Regular Shorts</MenuItem>
                      <MenuItem value={"Regular Top"}>Regular Top</MenuItem>
                      <MenuItem value={"Romper"}>Romper</MenuItem>
                      <MenuItem value={"Ruched Dress"}>Ruched Dress</MenuItem>
                      <MenuItem value={"Ruffle Dress"}>Ruffle Dress</MenuItem>
                      <MenuItem value={"Ruffled Skirt"}>Ruffled Skirt</MenuItem>
                      <MenuItem value={"Ruffled Top"}>Ruffled Top</MenuItem>
                      <MenuItem value={"Safari Jacket"}>Safari Jacket</MenuItem>
                      <MenuItem value={"Sailor Trousers"}>Sailor Trousers</MenuItem>
                      <MenuItem value={"Sarong Skirt"}>Sarong Skirt</MenuItem>
                      <MenuItem value={"Sheath Dress"}>Sheath Dress</MenuItem>
                      <MenuItem value={"Shift Dress"}>Shift Dress</MenuItem>
                      <MenuItem value={"Shirred Top"}>Shirred Top</MenuItem>
                      <MenuItem value={"Shirt"}>Shirt</MenuItem>
                      <MenuItem value={"Shirt And Boxers"}>Shirt And Boxers</MenuItem>
                      <MenuItem value={"Shirt And Pants"}>Shirt And Pants</MenuItem>
                      <MenuItem value={"Shirt And Shorts"}>Shirt And Shorts</MenuItem>
                      <MenuItem value={"Shirt And Trousers"}>Shirt And Trousers</MenuItem>
                      <MenuItem value={"Shirt Dress"}>Shirt Dress</MenuItem>
                      <MenuItem value={"Short Kurta"}>Short Kurta</MenuItem>
                      <MenuItem value={"Shorts"}>Shorts</MenuItem>
                      <MenuItem value={"Shrug"}>Shrug</MenuItem>
                      <MenuItem value={"Single Breasted Blazer"}>Single Breasted Blazer</MenuItem>
                      <MenuItem value={"Skater Dress"}>Skater Dress</MenuItem>
                      <MenuItem value={"Skater Skirt"}>Skater Skirt</MenuItem>
                      <MenuItem value={"Skorts"}>Skorts</MenuItem>
                      <MenuItem value={"Slip Dress"}>Slip Dress</MenuItem>
                      <MenuItem value={"Spaghetti Top"}>Spaghetti Top</MenuItem>
                      <MenuItem value={"Straight Trousers"}>Straight Trousers</MenuItem>
                      <MenuItem value={"Strapless Dress"}>Strapless Dress</MenuItem>
                      <MenuItem value={"Strapless Top"}>Strapless Top</MenuItem>
                      <MenuItem value={"Sweater"}>Sweater</MenuItem>
                      <MenuItem value={"Sweatshirt"}>Sweatshirt</MenuItem>
                      <MenuItem value={"T-Shirt And Pants"}>T-Shirt And Pants</MenuItem>
                      <MenuItem value={"T-Shirt And Shorts"}>T-Shirt And Shorts</MenuItem>
                      <MenuItem value={"T-Shirt Dress"}>T-Shirt Dress</MenuItem>
                      <MenuItem value={"Tank Top"}>Tank Top</MenuItem>
                      <MenuItem value={"Tapered Jumpsuit"}>Tapered Jumpsuit</MenuItem>
                      <MenuItem value={"Tapered Trousers"}>Tapered Trousers</MenuItem>
                      <MenuItem value={"Tiered Dress"}>Tiered Dress</MenuItem>
                      <MenuItem value={"Tiered Skirt"}>Tiered Skirt</MenuItem>
                      <MenuItem value={"Top And Pants"}>Top And Pants</MenuItem>
                      <MenuItem value={"Top And Shorts"}>Top And Shorts</MenuItem>
                      <MenuItem value={"Top And Skirt"}>Top And Skirt</MenuItem>
                      <MenuItem value={"Top and Pants"}>Top and Pants</MenuItem>
                      <MenuItem value={"Trackpants"}>Trackpants</MenuItem>
                      <MenuItem value={"Trench Coat"}>Trench Coat</MenuItem>
                      <MenuItem value={"Trousers"}>Trousers</MenuItem>
                      <MenuItem value={"Trucker Jacket"}>Trucker Jacket</MenuItem>
                      <MenuItem value={"Trumpet Skirt"}>Trumpet Skirt</MenuItem>
                      <MenuItem value={"Tube Dress"}>Tube Dress</MenuItem>
                      <MenuItem value={"Tube Top"}>Tube Top</MenuItem>
                      <MenuItem value={"Tulip Dress"}>Tulip Dress</MenuItem>
                      <MenuItem value={"Tulip Skirt"}>Tulip Skirt</MenuItem>
                      <MenuItem value={"Tunic"}>Tunic</MenuItem>
                      <MenuItem value={"Turtle Neck Sweater"}>Turtle Neck Sweater</MenuItem>
                      <MenuItem value={"Twist Dress"}>Twist Dress</MenuItem>
                      <MenuItem value={"Twist Top"}>Twist Top</MenuItem>
                      <MenuItem value={"Utility Jacket"}>Utility Jacket</MenuItem>
                      <MenuItem value={"V-Neck T-Shirt"}>V-Neck T-Shirt</MenuItem>
                      <MenuItem value={"Varsity Jacket"}>Varsity Jacket</MenuItem>
                      <MenuItem value={"Vest Top"}>Vest Top</MenuItem>
                      <MenuItem value={"Waterfall Jacket"}>Waterfall Jacket</MenuItem>
                      <MenuItem value={"Wide Leg Trousers"}>Wide Leg Trousers</MenuItem>
                      <MenuItem value={"Windcheater"}>Windcheater</MenuItem>
                      <MenuItem value={"Wrap Dress"}>Wrap Dress</MenuItem>
                      <MenuItem value={"Wrap Skirt"}>Wrap Skirt</MenuItem>
                      <MenuItem value={"Wrap Top"}>Wrap Top</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mb-5">
                    <InputLabel id="filter-by-status-input">Status</InputLabel>
                    <Select
                      labelId="filter-by-status"
                      id="filter-by-status"
                      value={status}
                      label="Status"
                      onChange={handleStatusChange}
                    >
                      <MenuItem
                        value={"Approved"}
                        disabled={userDepartment === "design" ? false : true}
                      >
                        Approved
                      </MenuItem>
                      <MenuItem
                        value={"Commercial"}
                        disabled={
                          userDepartment === "commercial" ||
                          userDepartment === "admin" ||
                          userDepartment === "design"
                            ? false
                            : true
                        }
                      >
                        Commercial
                      </MenuItem>
                      <MenuItem
                        value={"Catalog"}
                        disabled={
                          userDepartment === "catalog" ||
                          userDepartment === "admin"   ||
                          userDepartment === "design"
                            ? false
                            : true
                        }
                      >
                        Catalog
                      </MenuItem>
                      <MenuItem
                        value={"Merchandise"}
                        disabled={
                          userDepartment === "merchandise" ||
                          userDepartment === "admin"    ||
                          userDepartment === "design"
                            ? false
                            : true
                        }
                      >
                        Merchandise
                      </MenuItem>
                      <MenuItem
                        value={"Design"}
                        disabled={
                          userDepartment === "design" ||
                          userDepartment === "admin"
                            ? false
                            : true
                        }
                      >
                        Design
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="mb-5">
                    <InputLabel id="filter-by-label">Filter by</InputLabel>
                    <Select
                      labelId="filter-by-label"
                      id="filter-by"
                      value={columnFilter}
                      label="Filter by"
                      onChange={handleColumnFilterChange}
                    >
                      <MenuItem value={"created_at"}>Created At</MenuItem>
                      <MenuItem value={"updated_at"}>Updated At</MenuItem>
                      <MenuItem value={"first_grn_date"}>
                        First GRN Date
                      </MenuItem>
                      <MenuItem value={"first_sold_date"}>
                        First Sold Date
                      </MenuItem>
                      <MenuItem value={"first_live_date"}>
                        First Live Date
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From Date"
                      value={fromDate}
                      onChange={(newValue) => setFromDate(newValue)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </>
            )}
          </div>
          
          <div className="fixed bottom-0 left-0 right-0 py-6">
            <div className="flex justify-start px-7">
              <PrimaryButton onClick={handleSave} className="mr-2">Save</PrimaryButton>
              <SubtleButton onClick={handleClose}>Cancel</SubtleButton>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

