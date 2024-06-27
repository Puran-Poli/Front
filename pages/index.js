import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chanakya - Dashboard</title>
        <meta name="description" content="By techtact.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex h-full w-full items-center justify-center">
          <Image
            src="/images/notfound.jpeg"
            alt="not found"
            width={800}
            height={600}
          />
        </div>
      </main>
    </div>
  );
}
