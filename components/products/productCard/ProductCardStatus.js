export default function ProductCardStatus({ options }) {
  return (
    <>
      {options?.status === "Approved" && (
        <div className=" absolute right-1 bottom-1 rounded-[3px] bg-green-100 px-1 text-[10px] font-bold uppercase leading-4 tracking-tight text-teal-600">
          {options?.status}
        </div>
      )}
      {options?.status === "Commercial" && (
        <div className=" absolute right-1 bottom-1 rounded-[3px] bg-yellow-100 px-1 text-[10px] font-bold uppercase leading-4 tracking-tight text-yellow-600">
          {options?.status}
        </div>
      )}
      {options?.status === "Catalog" && (
        <div className=" absolute right-1 bottom-1 rounded-[3px] bg-purple-200 px-1 text-[10px] font-bold uppercase leading-4 tracking-tight text-purple-600">
          {options?.status}
        </div>
      )}
      {options?.status === "Merchandise" && (
        <div className=" absolute right-1 bottom-1 rounded-[3px] bg-stone-200 px-1 text-[10px] font-bold uppercase leading-4 tracking-tight text-stone-600">
          {options?.status}
        </div>
      )}
      {options?.status === "Design" && (
        <div className=" absolute right-1 bottom-1 rounded-[3px] bg-blue-200 px-1 text-[10px] font-bold uppercase leading-4 tracking-tight text-blue-600">
          {options?.status}
        </div>
      )}
    </>
  );
}
