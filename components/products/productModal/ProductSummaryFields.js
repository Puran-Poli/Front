// Lib imports
import { getHexCode } from "@/lib/getHexCode";

export default function ProductSummaryFields({
  info,
  colorFamilies,
  hexCodes,
}) {
  const bgColor = hexCodes[info.colour.colour_family];

  return (
    <>
      <div className="details_column">
        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Style ID</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.style_id}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>
        {/* vertical, brand, brick, subProduct, targetAudience */}
        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Vertical</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.hierarchy.vertical}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Brand</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.hierarchy.brand}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Sub-product</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.hierarchy.sub_product}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">
            Target Audience
          </p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.hierarchy.target_audience}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Season</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.season}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Color Family</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            <span
              className="mr-1 inline-block h-4 w-4 rounded-full border align-middle"
              style={{
                backgroundColor: bgColor,
              }}
            ></span>
            {info?.colour.colour_family}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">
            Garment Pattern
          </p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.design.garment_pattern ? info?.design.garment_pattern : "-"}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>
      </div>

      <div className="details_column">
        {/* gender, fabricCategory, usage, product, story, fit,
         */}
        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Gender</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.hierarchy.gender}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">
            Fabric Category
          </p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.hierarchy.fabric_category}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Usage</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.hierarchy.usage}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Product</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.hierarchy.product}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Story</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">{info?.story}</p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Fit</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.hierarchy.fit}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">Barcode Color</p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.colour.primary_colour}
            {info?.colour.secondary_colour && (
              <span>, {info?.colour.secondary_colour}</span>
            )}
            {info?.colour.tertiary_colour && (
              <span>, {info?.colour.tertiary_colour}</span>
            )}
          </p>
          
        </div>
        <div className="mb-5"></div>
      </div>
    </>
  );
}
