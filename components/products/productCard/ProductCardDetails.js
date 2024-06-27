// Lib Imports
import { sortSizesFunc } from "@/lib/utils";

// Hook Imports
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";

export default function ProductCardDetails({ options, hexCodes }) {
  const { userRole, userDepartment, userIsLoading } = useUserRole();
  const sortedSizes = sortSizesFunc(options?.sizes);

  if (userIsLoading) return null;

  const canReadMrp = getFeature(userRole, "product mrp")?.read;
  const canReadCost = getFeature(userRole, "product cost")?.read;

  const bgColor = hexCodes[options?.colour_family];

  return (
    <>
      <div className="card_cost-container mb-5 ml-2 flex">
        {canReadMrp && (
          <div className="card_cost-container__inner min-w-[100px]">
            <p className="text-[11px] font-normal leading-[14px] text-slate-500">
              MRP
            </p>
            <p className="text-sm text-slate-800">
              ₹ {options?.mrp ? options?.mrp : "-"}
            </p>
          </div>
        )}
        {canReadCost && (
          <div className="card_cost-container__inner">
            <p className=" text-[11px] font-normal leading-[14px] text-slate-500">
              Cost
            </p>
            <p className="text-sm text-slate-800">
              ₹ {options?.cost ? options?.cost : "-"}
            </p>
          </div>
        )}
      </div>

      <div>
        <div className="card_details-container ml-2 mb-2 flex">
          <div>
            <p className=" min-w-[100px] text-[11px] font-normal leading-[14px] text-slate-500">
              Color
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-800">
              <span
                className="mr-1 inline-block h-4 w-4 rounded-full border align-middle"
                style={{
                  backgroundColor: bgColor,
                }}
              ></span>
              {options?.colour_family}
            </p>
          </div>
        </div>

        <div className="card_details-container ml-2 mb-3 flex">
          <div>
            <p className=" min-w-[100px] text-[11px] font-normal leading-[14px] text-slate-500">
              Sizes
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {sortedSizes.map((size, i) => (
              <p
                key={i}
                className="rounded-[3px] bg-slate-200 px-1 text-[11px] font-bold uppercase leading-4 tracking-tight text-slate-600"
              >
                {size}
              </p>
            ))}
          </div>
        </div>

        {/* TODO: Uncomment and Replace with a thought through date when it is available */}
        {/* <div className="card_details-container ml-2 mb-2 flex">
          <div>
            <p className=" min-w-[100px] text-[11px] font-normal leading-[14px] text-slate-500">
              Launch date
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-800">
              {options?.launch_date !== null && options?.launch_date}
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
}
