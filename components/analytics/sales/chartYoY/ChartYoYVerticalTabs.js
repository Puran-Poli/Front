import cn from "classnames";

export default function ChartYoYVerticalTabs({ active, name, icon, onClick }) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-md bg-slate-50 p-3  text-xs font-medium text-gray-500 hover:border-gray-300 hover:bg-slate-200 hover:text-gray-700",
        active && "tab-active"
      )}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </button>
  );
}
