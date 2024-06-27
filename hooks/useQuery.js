import { useState, useEffect } from "react";
import { removeEmptyArrFromObj } from "@/lib/nullify";

export const useQuery = (queryOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const deletedEmptyArr = await removeEmptyArrFromObj(queryOptions);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCTS_API}/sales/top-sellers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...deletedEmptyArr,
          }),
        }
      );
      const json = await res.json();
      setData(json);
      setIsLoading(false);
    }
    fetchData();
  }, [queryOptions]);

  return { isLoading, data };
};
