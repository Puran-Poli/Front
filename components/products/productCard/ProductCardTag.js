export default function ProductCardTag({ options }) {
  return (
    <>
      {options?.exclusive !== "Regular" && (
        <div className="absolute left-1 bottom-1 rounded-[3px] bg-violet-200 px-1 text-[10px] font-bold leading-4 tracking-tight text-violet-700">
          {options?.exclusive}
        </div>
      )}
    </>
  );
}
