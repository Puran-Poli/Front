// Component Imports
import EditModal from "@/components/products/editModal/EditModal";
import DeleteModal from "@/components/products/deleteModal/DeleteModal";
import ProductTitleStatus from "@/components/products/productModal/ProductTitleStatus";
import ProductSummary from "@/components/products/productModal/ProductSummary";
import ProductPriceDate from "@/components/products/productModal/ProductPriceDate";
import ProductSize from "@/components/products/productModal/ProductSize";
import ProductDesign from "@/components/products/productModal/ProductDesign";
import ProductFabric from "@/components/products/productModal/ProductFabric";
import ProductLog from "@/components/products/productModal/ProductLog";
import CreateModal from "@/components/products/createModal/CreateModal";

export default function DesignDetails({
  info,
  hierarchy,
  colors,
  fieldOptions,
}) {
  return (
    <div className="px-5 pt-6">
      <div className="mb-2 flex items-center justify-between gap-2">
        <ProductTitleStatus info={info} />
        <div className="flex gap-2">
          <CreateModal
            hierarchyData={hierarchy}
            colorFamilies={colors.colors}
            hexCodes={colors.hex_codes}
            isDuplicate={true}
            productData={info}
            fieldOptions={fieldOptions}
          />
          <EditModal
            hierarchyData={hierarchy}
            info={info}
            fieldOptions={fieldOptions}
            colorFamilies={colors.colors}
            hexCodes={colors.hex_codes}
          />
          <DeleteModal info={info} />
        </div>
      </div>
      <hr className="mb-9" />
      <ProductSummary
        info={info}
        colorFamilies={colors.colors}
        hexCodes={colors.hex_codes}
      />
      
      <ProductPriceDate info={info} />
      <ProductSize info={info} />
      <ProductDesign info={info} />
      <ProductFabric info={info} />
      <ProductLog info={info} />
    </div>
  );
}
