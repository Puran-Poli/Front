export default function ProductCardHeadline({ options }) {
  return (
    <p className="text-[11px] font-normal leading-[14px] text-slate-500">
      {options?.gender} {options?.colour_family} {options?.fit} {options?.usage}{" "}
      {options?.product}
    </p>
  );
}
