import cn from "classnames";

export default function Grid({ children, className }) {
  return <div className={cn("grid grid-cols-12", className)}>{children}</div>;
}
