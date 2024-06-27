// Hook imports
import { useInit } from "@/hooks/useInit";

export default function Signin() {
  const { isLoading, isAuthenticated, userFullName, message } = useInit();

  if (isAuthenticated && !isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-center text-4xl font-bold">Redirecting...</h1>
        <p className="text-center text-2xl">{userFullName}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-center text-4xl font-bold">Signing In</h1>
      <p className="text-center text-2xl">{userFullName}</p>
      <p className="text-center text-lg">{message}</p>
    </div>
  );
}
