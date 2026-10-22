import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const STORED_TOKEN = "authToken";
  const STORED_USER = "authUser";
  const [user, setUser] = useState(null); // All the user info.
  const [token, setToken] = useState(null); // Saves the JWT auth token.
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORED_TOKEN);
    const storedUser = localStorage.getItem(STORED_USER);

    if (storedToken && storedUser) {
      setToken(storedToken);

      setUser(JSON.parse(storedUser));
    }
    setIsAuthLoading(false);
  }, []);

  const handleLogin = async (userData) => {
    try {
      const data = await loginUser(userData);
      if (data && data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem(STORED_TOKEN, data.token);
        localStorage.setItem(STORED_USER, JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (newUserData) => {
    try {
      const data = await registerUser(newUserData);
      if (data && data.token) {
        setToken(data.token);
        setUser(data.user);

        localStorage.setItem(STORED_TOKEN, data.token);
        localStorage.setItem(STORED_USER, JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORED_TOKEN);
    localStorage.removeItem(STORED_USER);
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleRegister, handleLogout, user, isAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
