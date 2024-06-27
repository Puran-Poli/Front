// Next imports
import Head from "next/head";
import { useEffect, useState } from "react";

// Auth imports
import { useAuth } from "@/context/auth";

// Components imports
import Navbar from "@/components/layout/Navbar";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import SignIn from "@/components/auth/SignIn";

export default function Layout({ children }) {
  const { user, isLoading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (
      !isLoading &&
      !user &&
      !isAuthenticated &&
      window.location.pathname !== "/user/sign-in" &&
      window.location.pathname !== "/user/signin"
    ) {
      window.location.href = "/user/sign-in";
    } else if (
      !isLoading &&
      !user &&
      !isAuthenticated &&
      window.location.pathname === "/user/signin"
    ) {
      setIsSigningIn(true);
    } else if (!isLoading && user) {
      setIsAuthenticated(true);
    }
  }, [isLoading, user, isAuthenticated]);

  if (!isAuthenticated && !isLoading && !isSigningIn) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <SignIn />
      </div>
    );
  } else if (!isAuthenticated && !isLoading && isSigningIn) {
    return children;
  } else if (isLoading && !isAuthenticated) {
    return <LoadingScreen />;
  } else if (isAuthenticated) {
    return (
      <div>
        <Head>
          <title>Chanakya</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <>
          <div className="flex min-h-screen">
            <div className="ml-[74px] flex h-full items-center justify-end gap-3">
              <Navbar />
            </div>
            {children}
          </div>
        </>
      </div>
    );
  }
}
