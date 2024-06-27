export default function SignIn() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="border border-slate-100 p-12 shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-slate-700">
          Sign in to your account
        </h1>
        <div className="flex w-full items-center justify-center p-3">
          <div>
            <a
              href={`/api/auth/google`}
              className="block rounded-md border border-blue-700 bg-blue-700 p-3 text-white"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
