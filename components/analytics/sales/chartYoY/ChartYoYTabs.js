import cn from "classnames";

export default function ChartYoYTabs({ active, children, onClick }) {
  return (
    <button
      className={cn(
        "mx-[2px] rounded-md bg-slate-50 p-1 px-[6px] text-xs font-medium text-gray-500 hover:border-gray-300 hover:bg-slate-200 hover:text-gray-700",
        active && "tab-active"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
