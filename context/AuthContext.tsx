import { createContext, useContext, useState, useEffect } from 'react';
import { logout as doLogout, isTokenValid } from '../services/authService';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await isTokenValid();
      setIsAuthenticated(valid);
    };
    checkAuth();
  }, []);

  const loginSuccess = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await doLogout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
