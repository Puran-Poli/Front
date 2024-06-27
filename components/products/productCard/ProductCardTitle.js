export default function ProductCardTitle({ options }) {
  return (
    <p className="mb-1 text-sm font-semibold leading-5 text-slate-800">
      {options?.style_id}
    </p>
  );
}
