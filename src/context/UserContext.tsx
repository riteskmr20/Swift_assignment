import React, { createContext, useContext, useState,type ReactNode } from "react";

// Define the shape of context data
interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
}

// Create the context with default empty values
const UserContext = createContext<UserContextType>({
  userName: "",
  setUserName: () => {},
});

// Provider component to wrap your app and provide the context value
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState("");

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to easily access the context anywhere
export const useUser = () => useContext(UserContext);
