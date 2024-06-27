export default function ProductTag({ info }) {
  return (
    <div className="flex flex-wrap gap-2 pt-8">
      {info?.tags?.map((tag, i) => (
        <div
          key={i}
          className="rounded-[3px] bg-slate-200 px-1 text-[11px] font-bold uppercase leading-4 tracking-tight text-slate-600"
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
