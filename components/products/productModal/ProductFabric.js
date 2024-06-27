import { productFabricFields, getFields } from "@/lib/products/productFields";

export default function ProductFabric({ info }) {
  const fields = getFields(productFabricFields, info?.hierarchy.brick, info?.hierarchy.gender,info?.hierarchy.product);
  return (
    <>
      <h2 className="mb-8 mt-16 border-b pb-2 text-lg font-medium tracking-wide text-slate-700">
        Product Fabric Details
      </h2>
      <div className="mb-24 grid grid-cols-3 gap-x-8">
        {fields.map((field) => (
          <div className="mb-5" key={field.id}>
            <p className="mb-1 text-xs leading-3 text-slate-500">
              {field.label}
            </p>
            <p className="mb-2 text-sm leading-5 text-slate-700">
              {info.fabric[field.apiKey] ? info.fabric[field.apiKey] : "-"}
            </p>
            <div className=" h-[1px] w-full bg-slate-200"></div>
          </div>
        ))}
      </div>
    </>
  );
}
