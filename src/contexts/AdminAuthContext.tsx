import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (user: AdminUser, token: string) => void;
  logout: () => void;
  token: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("admin_session");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed.user);
        setToken(parsed.token);
      } catch {
        localStorage.removeItem("admin_session");
      }
    }
  }, []);

  const login = (user: AdminUser, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("admin_session", JSON.stringify({ user, token }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("admin_session");
  };

  return (
    <AdminAuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, token }}>
      {children}
    </AdminAuthContext.Provider>
  );
};