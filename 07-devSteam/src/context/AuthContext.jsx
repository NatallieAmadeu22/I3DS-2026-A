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
const CART_STORAGE_KEY = "devsteam:cart";

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

function loadStoredCart() {
  if (typeof window === "undefined") {
    return [];
  }

  const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    return JSON.parse(storedCart);
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadStoredUser());
  const [cartItems, setCartItems] = useState(() => loadStoredCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

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

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const addToCart = useCallback((product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, quantidade: 1 }];
    });

    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((product) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== product.id),
    );
  }, []);

  const updateCart = useCallback((product, quantidade) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === product.id ? { ...item, quantidade } : item,
      ),
    );
  }, []);

  const formatarMoeda = useCallback((valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
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
    cartItems,
    isCartOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateCart,
    formatarMoeda,
    searchTerm,
    setSearchTerm,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
