// Lib Imports
import { getNumberPocketsOptionLabel } from "@/lib/products/utilsCreateProduct";
import { productDesignFields, getFields } from "@/lib/products/productFields";

export default function ProductDesign({ info }) {
  const fields = getFields(productDesignFields, info?.hierarchy.brick, info?.hierarchy.gender,info?.hierarchy.product);

  return (
    <>
      <h2 className="mb-8 mt-16 border-b pb-2 text-lg font-medium tracking-wide text-slate-700">
        Product Design Details
      </h2>
      <div className="mb-14 grid grid-cols-3 gap-x-8">
        {fields.map((field) => (
          <div className="mb-5" key={field.id}>
            <p className="mb-1 text-xs leading-3 text-slate-500">
              {field.label}
            </p>
            <p className="mb-2 text-sm leading-5 text-slate-700">
              {info.design[field.apiKey]
                ? field.apiKey === "number_of_pockets"
                  ? getNumberPocketsOptionLabel(info.design[field.apiKey])
                  : info.design[field.apiKey]
                : "-"}
            </p>
            <div className=" h-[1px] w-full bg-slate-200"></div>
          </div>
        ))}
      </div>
    </>
  );
}
