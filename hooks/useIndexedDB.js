import { useState, useEffect } from "react";
import { openDB } from "idb";

/**
 *
 * @function useIndexedDB
 * @description A custom hook that returns the data from multiple object stores in IndexedDB
 * @param {*} dbName
 * @param {*} storeNames - An array of store names
 * @returns {Array} - Returns an array of objects
 * @example const data = useIndexedDB("db-name", ["store-name-1", "store-name-2"]);
 */
export const useIndexedDB = (dbName, storeNames) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Open a connection to the database
    const openDatabase = async () => {
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          // Create multiple object stores if they do not exist
          for (const storeName of storeNames) {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName);
            }
          }
        },
      });

      // Get all the records from the object stores
      const tx = db.transaction(storeNames, "readonly");
      const records = [];
      for (const storeName of storeNames) {
        const store = tx.objectStore(storeName);
        const data = await store.getAll();
        records.push(...data);
      }

      // Set the data state variable with the records
      setData(records);

      // Close the connection
      db.close();
    };

    openDatabase();
  }, []);

  return { data };
};
