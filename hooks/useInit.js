import { useState, useEffect } from "react";
import { openDB } from "idb";
import pako from "pako";

// Lib imports
import { setLocalStorage } from "@/lib/utils";

// Hook imports
import { useIndexedDB } from "@/hooks/useIndexedDB";

/**
 * @function useInit
 * @description A custom hook that checks if the user is authenticated and initializes the app
 * @returns {Object} - Returns an object with isLoading and isAuthenticated
 * @example const { isLoading, isAuthenticated } = useInit();
 */

export const useInit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [version, setVersion] = useState(false);
  const [init, setInit] = useState(false);
  const [productHierarchy, setProductHierarchy] = useState(false);

  const [userFullName, setUserFullName] = useState("");
  const [message, setMessage] = useState("");

  const data = useIndexedDB("init-db", [
    "init-store",
    "product-hierarchy-store",
  ]);

  // Helper functions
  const clearLocalStorage = () => {
    setIsAuthenticated(false);
    setIsLoading(false);
    window.location.href = "/user/signout";
  };

  const getVersions = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_API}/`, {
        method: "GET",
      });

      const data = await res.json();
      setVersion(true);
      setLocalStorage("version", data.version);
      return data;
    } catch (error) {
      console.log(error);
      clearLocalStorage();
    }
  };

  const getUserToken = async () => {
    try {
      setIsLoading(true);
      setMessage("Hold on...");

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_PRODUCTS_API
        }/user/token?${window.location.search.substring(1)}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      setLocalStorage("session", data);
      return data;
    } catch (error) {
      console.log(error);
      clearLocalStorage();
    }
  };

  const getUserDetails = async (token) => {
    try {
      setMessage(`Loading your account...`);

      const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_API}/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setLocalStorage("user", data);
      setUserFullName(`Welcome ${data.name}`);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      console.log(error);
      clearLocalStorage();
    }
  };

  const getInit = async (token) => {
    try {
      setMessage(`Initializing the application...`);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCTS_API}/products/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      // Open a connection to the database
      const db = await openDB("init-db", 1, {
        upgrade(db) {
          // Create an object store if it does not exist
          if (!db.objectStoreNames.contains("init-store")) {
            db.createObjectStore("init-store");
          }
        },
      });

      // Save the JSON data in the object store
      if (data) {
        const tx = db.transaction("init-store", "readwrite");
        const store = tx.objectStore("init-store");
        await store.put(data, "init");
      }

      // Close the connection
      db.close();
      setInit(true);
    } catch (error) {
      console.log(error);
      clearLocalStorage();
    }
  };

  const getProductHierarchy = async (token) => {
    try {
      setMessage(`Getting the size hierarchy data...`);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCTS_API}/products/?hierarchy=true`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the res is ok
      if (!res.ok) {
        throw new Error(`Error fetching data: ${res.status}`);
      }

      // Get the arrayBuffer from the response
      const arrayBuffer = await res.arrayBuffer();

      // Decompress using pako
      const decompressed = pako.inflate(arrayBuffer, { to: "string" });

      // Parse the JSON
      const data = JSON.parse(decompressed);

      // Open a connection to the database
      const db = await openDB("init-db", 1, {
        upgrade(db) {
          // Create an object store if it does not exist
          if (!db.objectStoreNames.contains("product-hierarchy-store")) {
            db.createObjectStore("product-hierarchy-store");
          }
        },
      });

      // Save the JSON data in the object store
      const tx = db.transaction("product-hierarchy-store", "readwrite");
      const store = tx.objectStore("product-hierarchy-store");
      await store.put(data, "productHierarchy");
      await tx.done;

      // Close the connection
      db.close();

      setProductHierarchy(true);
      setMessage(`You are all set!`);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      clearLocalStorage();
    }
  };

  // fetcher function
  const fetchData = async () => {
    try {
      const setUserData = await getUserToken();
      const token = await setUserData.access_token;
      await getUserDetails(token);
      await getVersions();
      await getInit(token);
      await getProductHierarchy(token);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      clearLocalStorage();
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isLoading && init && productHierarchy && version) {
      window.location.href = "/products";
    } else if (
      !isAuthenticated &&
      !isLoading &&
      !init &&
      !productHierarchy &&
      !version
    ) {
      fetchData();
    }
  }, [isAuthenticated, isLoading, init, productHierarchy, version]);

  return { isLoading, isAuthenticated, userFullName, message };
};
