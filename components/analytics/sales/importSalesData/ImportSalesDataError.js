// Components Imports
import DangerIcon from "@/components/icons/DangerIcon";

export default function ImportSalesDataError({ error }) {
  if (!error) return;

  return (
    <div className="alert-container mb-5 rounded-md bg-red-500 shadow-lg transition">
      <div className="flex items-center py-5 px-4">
        <div className="mr-4">
          <DangerIcon fill="#FFF" />
        </div>
        <div className="mr-4 flex flex-col ">
          <p className="mb-1 text-sm font-semibold leading-5 text-white antialiased">
            Something went wrong
          </p>
          <p className=" text-sm font-normal text-slate-50 antialiased">
            {error}
          </p>
        </div>
      </div>
    </div>
  );
}
