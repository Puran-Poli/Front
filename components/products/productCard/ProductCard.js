// Component Imports
import ProductCardImage from "@/components/products/productCard/ProductCardImage";
import ProductCardTag from "@/components/products/productCard/ProductCardTag";
import ProductCardStatus from "@/components/products/productCard/ProductCardStatus";
import ProductCardTitle from "@/components/products/productCard/ProductCardTitle";
import ProductCardHeadline from "@/components/products/productCard/ProductCardHeadline";
import ProductCardDetails from "@/components/products/productCard/ProductCardDetails";

export default function ProductCard({ options, colorFamilies, hexCodes }) {
  return (
    <>
      <div className="card_image-container relative flex aspect-[2/2.5] min-w-[240px] flex-col border-b border-b-slate-100 bg-slate-50">
        <ProductCardImage options={options} />
        <ProductCardTag options={options} />
        <ProductCardStatus options={options} />
      </div>
      <div className="card_title-container mt-2 ml-2 mb-4">
        <ProductCardTitle options={options} />
        <ProductCardHeadline options={options} />
      </div>
      <ProductCardDetails
        options={options}
        colorFamilies={colorFamilies}
        hexCodes={hexCodes}
      />
    </>
  );
}
