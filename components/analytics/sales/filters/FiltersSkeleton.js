import { PrimaryButton, SimpleButton } from "@/components/base/Buttons";
import Skeleton from "@mui/material/Skeleton";

export default function FilterSkeleton() {
  return (
    <>
      <div className="fixed left-[74px] my-12 h-screen min-w-[224px] overflow-y-scroll px-3 pb-24">
        <div className="mb-12 mt-4">
          {Array(12)
            .fill()
            .map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width="100%"
                height={60}
                className="mb-4"
              />
            ))}
        </div>
      </div>
      <div className="fixed left-[74px] bottom-0 flex min-w-[224px] justify-between gap-4 bg-slate-100 px-3 py-3">
        <SimpleButton disabled={true}>Clear</SimpleButton>
        <PrimaryButton disabled={true}>Apply Filters</PrimaryButton>
      </div>
    </>
  );
}
