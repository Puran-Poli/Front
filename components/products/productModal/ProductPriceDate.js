// Component Imports
import ProductCostHistory from "@/components/products/productModal/productCostHistory/ProductCostHistory";

// Hook Imports
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";

export default function ProductPriceDate({ info }) {
  const { userRole, userDepartment, userIsLoading } = useUserRole();

  if (userIsLoading) return null;

  const canReadMrp = getFeature(userRole, "product mrp")?.read;
  const canReadCost = getFeature(userRole, "product cost")?.read;

  return (
    <>
      <h2 className="mb-8 mt-16 border-b pb-2 text-lg font-medium tracking-wide text-slate-700">
        Product Cost
      </h2>
      <div className="mt-8 mb-14 grid grid-cols-3 gap-8">
        {canReadMrp && (
          <div className="mb-5">
            <p className="mb-1 text-xs leading-3 text-slate-500">MRP</p>
            <p className="mb-2 text-sm leading-5 text-slate-700">
              ₹ {info?.mrp ? info?.mrp : "-"}
            </p>
            <div className=" h-[1px] w-full bg-slate-200"></div>
          </div>
        )}
        {canReadCost && (
          <>
            <div className="mb-5">
              <p className="mb-1 text-xs leading-3 text-slate-500">Cost</p>
              <p className="mb-2 text-sm leading-5 text-slate-700">
                ₹ {info?.cost ? info?.cost : "-"}
              </p>
              <div className=" h-[1px] w-full bg-slate-200"></div>
            </div>
            {/* <ProductCostHistory info={info} /> */}
          </>
        )}
      </div>
      <h2 className="mb-8 mt-16 border-b pb-2 text-lg font-medium tracking-wide text-slate-700">
        Product Launch
      </h2>
      <div className="mt-8 mb-14 grid grid-cols-3 gap-8">
        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">
            First GRN Date
          </p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.dates.first_grn_date ? info?.dates.first_grn_date : "-"}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">
            First Live Date
          </p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.dates.first_live_date ? info?.dates.first_live_date : "-"}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs leading-3 text-slate-500">
            First Sold Date
          </p>
          <p className="mb-2 text-sm leading-5 text-slate-700">
            {info?.dates.first_sold_date ? info?.dates.first_sold_date : "-"}
          </p>
          <div className=" h-[1px] w-full bg-slate-200"></div>
        </div>
      </div>
    </>
  );
}
