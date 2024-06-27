import Image from "next/image";

export default function ServerError() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Image
        src="/images/500error.jpg"
        alt="500 Error"
        width={500}
        height={500}
      />
      <div>
        <h2 className="text-center text-2xl font-medium">
          This should not have happened. Please try again later.
        </h2>
        <p className="mt-2 text-center">
          If the problem persists, please inform the admin
        </p>
      </div>
    </div>
  );
}
