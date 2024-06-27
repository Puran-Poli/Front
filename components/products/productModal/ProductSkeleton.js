import Skeleton from "@mui/material/Skeleton";

export default function ProductSkeleton() {
  return (
    <div className="w-full bg-white px-4 pt-6">
      <div>
        <Skeleton width="100%" height={46} animation="wave" />
        <div className="-my-11 grid grid-cols-3 gap-8">
          <div className="relative max-w-xs">
            <Skeleton height={390} animation="wave" />
          </div>
          <div className="mt-16">
            <div>
              <Skeleton height={100} animation="wave" />
            </div>

            <div>
              <Skeleton height={100} animation="wave" />
            </div>

            <div>
              <Skeleton height={100} animation="wave" />
            </div>

            <div>
              <Skeleton height={100} animation="wave" />
            </div>
          </div>
          <div className="mt-16">
            <div>
              <Skeleton height={100} animation="wave" />
            </div>

            <div>
              <Skeleton height={100} animation="wave" />
            </div>

            <div>
              <Skeleton height={100} animation="wave" />
            </div>

            <div>
              <Skeleton height={100} animation="wave" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Skeleton width="100%" height={400} animation="wave" />
      </div>
    </div>
  );
}
