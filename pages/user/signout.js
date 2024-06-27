import { useEffect } from "react";
import { useRouter } from "next/router";
import { useFetcher } from "@/context/useFetcher";
import { toast } from "react-toastify";
import { deleteDB } from "idb";

export default function SignOutPage() {
  const { fetcher, fetchError } = useFetcher();
  const router = useRouter();

  useEffect(() => {
    const signOut = async () => {
      const res = fetcher(
        `${process.env.NEXT_PUBLIC_PRODUCTS_API}/user/logout`,
        {
          method: "GET",
        }
      );

      const data = await res;

      if (data) {
        localStorage.clear();
        deleteDB("init-db");
        router.reload(window.location.pathname);
      }
      if (fetchError) {
        toast.error("Something went wrong, please try again!", {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      }
    };

    signOut();
  }, []);

  return (
    <div>
      <h1>Signing Out...</h1>
    </div>
  );
}
