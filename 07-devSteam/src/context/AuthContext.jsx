import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

const USERS = [
  {
    id: 1,
    nome: "Cliente",
    email: "cliente@devsteam.com",
    password: "cliente123",
    level: "CLIENTE",
  },
  {
    id: 2,
    nome: "Admin",
    email: "admin@devsteam.com",
    password: "admin123",
    level: "ADMIN",
  },
];

const STORAGE_KEY = "devsteam:user";

function loadStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = window.localStorage.getItem(STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadStoredUser());

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  const login = useCallback((email, password) => {
    const userFound = USERS.find(
      (account) => account.email === email && account.password === password,
    );

    if (!userFound) {
      return {
        success: false,
        message: "Email ou senha inválidos.",
      };
    }

    const userData = {
      id: userFound.id,
      email: userFound.email,
      nome: userFound.nome,
      level: userFound.level,
    };

    setUser(userData);

    return {
      success: true,
      user: userData,
    };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isAdmin = user?.level === "ADMIN";
  const isClient = user?.level === "CLIENTE";
  const isLoggedIn = !!user;

  const value = {
    user,
    login,
    logout,
    isAdmin,
    isClient,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
