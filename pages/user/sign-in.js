import Head from "next/head";
import SignIn from "@/components/auth/SignIn";

export default function SignInPage() {
  return (
    <div>
      <Head>
        <title>Chanakya - Sign In</title>
        <meta name="description" content="By techtact.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div className="flex min-h-screen items-center justify-center">
          <SignIn />
        </div>
      </>
    </div>
  );
}
