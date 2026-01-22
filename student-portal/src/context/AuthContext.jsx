import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    if (token) localStorage.setItem("jwtToken", token);
    else localStorage.removeItem("jwtToken");

    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [token, role]);

  const logout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, role, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
