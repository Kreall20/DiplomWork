// context/AuthProvider.jsx
import React, { createContext, useState } from "react";

// Create the context with default values
const AuthContext = createContext({
  isAuthenticated: false,
  setAuth: () => {},
});

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context
export default AuthContext;