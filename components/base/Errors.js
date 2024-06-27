import Image from "next/image";

export const AccessDenied = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Image
        src="/images/access-denied.svg"
        alt="Access Denied"
        width={300}
        height={300}
      />
      <h2 className="mt-6 text-2xl font-semibold text-slate-700">
        Access Denied
      </h2>
      <p className="text-slate-500">
        You don&apos;t have permission to access this page.
      </p>
    </div>
  );
};
