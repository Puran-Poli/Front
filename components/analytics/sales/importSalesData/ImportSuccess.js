// Components Imports
import SuccessIcon from "@/components/icons/SuccessIcon";

export default function ImportSuccess() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" mb-8">
        <SuccessIcon height={64} width={64} />
      </div>
      <p className="mb-4 text-xl font-medium text-slate-700">
        Import Completed Successfully
      </p>
      <p className="text-sm text-slate-500">
        Your file has been uploaded to your database.
      </p>
    </div>
  );
}
