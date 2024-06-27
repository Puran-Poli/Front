// Component Imports
import ProductImage from "@/components/products/productModal/ProductImage";
import ProductExclusive from "@/components/products/productModal/ProductExclusive";
import ProductTag from "@/components/products/productModal/ProductTag";
import ProductSummaryFields from "@/components/products/productModal/ProductSummaryFields";

export default function ProductSummary({ info, colorFamilies, hexCodes }) {
  return (
    <div className="grid grid-cols-3 gap-8" id="parent-modal-description">
      <div className="relative max-w-xs">
        <ProductExclusive info={info} />
        <ProductImage info={info} />
        <ProductTag info={info} />
      </div>
      <ProductSummaryFields
        info={info}
        colorFamilies={colorFamilies}
        hexCodes={hexCodes}
      />
      <div className="mb-24 h-[1px] w-full">
        <p className="mb-4 pb-2 text-lg font-medium tracking-wide text-slate-700 border-b">Product Description</p>
        <p className="mb-2 text-sm leading-5 text-slate-700">
          {info?.product_description}
        </p>
      </div>
      
    </div>
  );
}
