import { useState } from "react";
import { useRouter } from "next/router";

export const useFetcher = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetcher = async (url, options = {}, unauthorizedRetries = 0) => {
    setIsLoading(true);

    const headers = options.headers || {};

    if (localStorage.getItem("session")) {
      const session = JSON.parse(localStorage.getItem("session"));
      headers.Authorization = `Bearer ${session.access_token}`;
    }

    const requestOptions = {
      ...options,
      headers: {
        ...headers,
      },
    };

    if (options.body) {
      
      if (options.body instanceof FormData) {
        requestOptions.body = options.body;
      } else {
        requestOptions.body = JSON.stringify(options.body);
        requestOptions.headers["Content-Type"] = "application/json";
      }
    }
    //console.log('Request Options:', requestOptions); // Log the request options

    
    //console.log('Request Options:', requestOptions);

    try {
      const response = await fetch(url, requestOptions);
      console.log('Response Status:', response.status); // Log the response status
      console.log('Response Headers:', response.headers); // Log the response headers

      if (response.ok) {
        const data = await response.json();
        setData(data);
        setIsLoading(false);
        console.log(data)
        return data;
      } else if (response.status === 401) {
        // access token is expired, try to refresh
        if (unauthorizedRetries < 1) {
          const session = JSON.parse(localStorage.getItem("session"));
          console.log("session if access token exp before refresh sent", session);
          const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_PRODUCTS_API}/user/refresh`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${session.refresh_token}`,
              },
            }
          );

          if (refreshResponse.ok) {
            const session = JSON.parse(localStorage.getItem("session"));
            console.log("session if access token exp after refresh", session);

            const refreshData = await refreshResponse.json();
            session.access_token = refreshData.access_token;
            localStorage.setItem("session", JSON.stringify(session));

            requestOptions.headers.Authorization = `Bearer ${session.access_token}`;

            try {
              const retryResponse = await fetch(url, requestOptions);

              if (retryResponse.ok) {
                const retryData = await retryResponse.json();
                setData(retryData);
                setIsLoading(false);
              } else {
                setFetchError("After refresh, the original request failed.");
                unauthorizedRetries++;
                setIsLoading(false);
              }
            } catch (error) {
              console.error(error);
              setFetchError(error);
              setIsLoading(false);
              return error;
            }
          } else {
            // refresh token is expired, log out
            setIsLoading(false);
            localStorage.clear();
            router.push("/user/sign-in");
          }
        }
      } else if (response.status === 422 || response.status === 400) {
        const data = await response.json();
        setFetchError(data.detail);
        setIsLoading(false);
        return;
      } else if (response.status === 500 || response.status === 503) {
        setFetchError("Server error. Please try again later.");
        setIsLoading(false);
        // redirect to error page
        router.push("/error/server-error");
        return;
      }
      // Todo: handle other errors here e.g. 403, 422, 500, Use Toast component
    } catch (error) {
      console.error(error);
      setFetchError(error);
      setIsLoading(false);
      return error;
    }
  };

  return { data, isLoading, fetchError, setFetchError, fetcher };
};
