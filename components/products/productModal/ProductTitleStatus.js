// Component Imports
import ProductStatus from "@/components/products/productModal/ProductStatus";

export default function ProductTitleStatus({ info }) {
  return (
    <div className="flex items-center gap-2">
      {/* <h2
        className="text-lg font-medium leading-4 tracking-wide text-slate-700"
        id="parent-modal-title"
      >
        Product Info{" "}
        <span className="text-xs font-light tracking-normal text-slate-500">
          - {info?.product_id}
        </span>
      </h2> */}
      <ProductStatus info={info} />
    </div>
  );
}
