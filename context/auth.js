import { createContext, useState, useEffect, useContext, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const userFromLocalStorage = await JSON.parse(
        localStorage.getItem("user")
      );
      if (userFromLocalStorage) {
        setUser(userFromLocalStorage);
      }
      setIsLoading(false);
    }
    loadUser();
  }, []);

  const providerValue = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      setIsLoading,
    }),
    [user, setUser, isLoading, setIsLoading]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
