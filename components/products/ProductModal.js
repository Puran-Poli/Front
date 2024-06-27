//productmodal

// MUI Imports
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

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
import ProductSkeleton from "@/components/products/productModal/ProductSkeleton";
import CreateModal from "@/components/products/createModal/CreateModal";

export default function ProductModal({
  productData,
  open,
  handleClose,
  colorFamilies,
  hexCodes,
  hierarchyData,
  fieldOptions,
}) {
  if (!open && productData === null) return null;

  const info = productData?.info;

  return (
    <>
      {productData === null && open ? (
        <ProductSkeleton open={open} handleClose={handleClose} />
      ) : (
        <Modal
          open={open && info !== null}
          onClose={() => handleClose(false)}
          aria-labelledby="Product Display Modal"
          aria-describedby="Product details"
          closeAfterTransition
        >
          <Fade in={open && info !== null}>
            <div className="fixed top-0 right-0 bottom-0 min-w-[1024px] overflow-y-auto bg-white px-5 pt-6">
              <div className="mb-2 flex items-center justify-between gap-2">
                <ProductTitleStatus info={info} />
                <div className="flex gap-2">
                  <CreateModal
                    hierarchyData={hierarchyData}
                    colorFamilies={colorFamilies}
                    hexCodes={hexCodes}
                    isDuplicate={true}
                    productData={info}
                    fieldOptions={fieldOptions}
                  />
                  <EditModal
                    info={info}
                    fieldOptions={fieldOptions}
                    colorFamilies={colorFamilies}
                    hexCodes={hexCodes}
                  />
                  <DeleteModal info={info} />
                </div>
              </div>
              <hr className="mb-9" />
              <ProductSummary
                info={info}
                colorFamilies={colorFamilies}
                hexCodes={hexCodes}
              />
              <ProductPriceDate info={info} />
              <ProductSize info={info} />
              <ProductDesign info={info} />
              <ProductFabric info={info} />
              <ProductLog info={info} />
            </div>
          </Fade>
        </Modal>
      )}
    </>
  );
}
