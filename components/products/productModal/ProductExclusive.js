export default function ProductExclusive({ info }) {
  return (
    <>
      {info?.exclusive !== "Regular" && (
        <div className="pointer-events-none absolute left-2 top-2 z-50 rounded-[3px] bg-violet-200 px-1 text-[10px] font-bold leading-4 tracking-tight text-violet-700">
          {info?.exclusive}
        </div>
      )}
    </>
  );
}
