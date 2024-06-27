import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function ProductLog({ info }) {
  return (
    <>
      <hr className="mb-0" />
      <div className="flex gap-3 py-4 text-xs text-slate-500">
        <p>
          Last updated at:{" "}
          {dayjs.utc(info.updated_at).local().format("MMM DD, YYYY h:mm a")} by{" "}
          {info?.updated_by}
        </p>{" "}
        |{" "}
        <p>
          Created at:{" "}
          {dayjs.utc(info.created_at).local().format("MMM DD, YYYY h:mm a")} by{" "}
          {info?.created_by}
        </p>
      </div>
    </>
  );
}
