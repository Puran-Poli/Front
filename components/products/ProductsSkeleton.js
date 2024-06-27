import Skeleton from "@mui/material/Skeleton";

export default function ProductsSkeleton() {
  return (
    <div className="flex flex-col pt-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-medium leading-7">Products</h1>
          <span className="ml-2"> - </span>
          <Skeleton className="ml-2 w-[100px] text-4xl" variant="text" />
        </div>
        <div className="flex gap-2 self-end">
          <Skeleton variant="rectangular" height={40} width={75} />
          <Skeleton variant="rectangular" height={40} width={75} />
          <Skeleton variant="rectangular" height={40} width={75} />
        </div>
      </div>

      <hr className="my-5 mb-8 border" />
      <div className="mb-5 flex gap-2 self-end">
        <Skeleton variant="rectangular" height={45} width={240} />
      </div>
      <div className="products__grid-autoflow grid gap-6">
        {Array(10)
          .fill()
          .map((_, i) => (
            <div key={i} className="border border-slate-100 p-3 shadow-sm">
              <Skeleton variant="rectangular" height={135} />
              <Skeleton className="mt-3 text-4xl" variant="text" />
              <Skeleton className="mt-1 w-4/5 text-3xl" variant="text" />
              <Skeleton className="mt-1 w-4/5 text-xl" variant="text" />
            </div>
          ))}
      </div>
    </div>
  );
}
