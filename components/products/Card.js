// Component Imports
import ProductCard from "@/components/products/productCard/ProductCard";
import Link from "next/link";

export default function Card({
  options,
  // hierarchy,
  colorFamilies,
  hexCodes,
  // allowedValues,
  // fieldOptions,
  checkboxed,
  setCheckboxed,
}) {
  return (
    <>
      <div className="
        card_container
        flex
        flex-col
        overflow-hidden
        rounded-md
        border
        border-slate-200
        hover:cursor-pointer relative">
        <input className="absolute top-2 left-2 z-[100] w-[20px] h-[20px]" type="checkbox" checked={
          checkboxed.includes(options?.product_id)
        } onChange={() => {
          if (checkboxed.includes(options?.product_id)) {
            setCheckboxed(checkboxed.filter((id) => id !== options?.product_id));
          } else {
            setCheckboxed([...checkboxed, options?.product_id]);
          }
        }
        } />
        <Link
          href={`/products/${options?.product_id}`}
          className="
        card_container
        flex
        flex-col
        overflow-hidden
        rounded-md
        border
        border-slate-200
        hover:cursor-pointer"
          target="_blank"
        >
          <ProductCard
            options={options}
            colorFamilies={colorFamilies}
            hexCodes={hexCodes}
          />
        </Link>
      </div>
    </>
  );
}
