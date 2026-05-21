import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CarrinhoOffCanvas from "./components/CarrinhoOffCanvas";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Perfil from "./Pages/Perfil";
import Carrinho from "./Pages/Carrinho";
import AdminPanel from "./Pages/AdminPanel";

const ADMIN_ACCOUNT = {
  email: "admin@devsteam.com",
  password: "admin123",
  nome: "Admin",
  level: "ADMIN",
};

const USER_STORAGE_KEY = "devsteam:user";
const CART_STORAGE_KEY = "devsteam:cart";

function loadStoredUser() {
  const storedUser = window.localStorage.getItem(USER_STORAGE_KEY);

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

function App() {
  const [user, setUser] = useState(() => loadStoredUser());
  const [cartItems, setCartItems] = useState(() => loadStoredCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const login = (email, password) => {
    const isAdminAccount =
      email === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password;

    const userData = {
      id: email,
      email,
      nome: isAdminAccount ? ADMIN_ACCOUNT.nome : email.split("@")[0],
      level: isAdminAccount ? ADMIN_ACCOUNT.level : "CLIENTE",
    };

    setUser(userData);

    return {
      success: true,
      user: userData,
    };
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(USER_STORAGE_KEY);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product) => {
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
  };

  const removeFromCart = (product) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== product.id),
    );
  };

  const updateCart = (product, quantidade) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === product.id ? { ...item, quantidade } : item,
      ),
    );
  };

  const finalizePurchase = (checkoutData) => {
    if (cartItems.length === 0) {
      return {
        success: false,
        message: "Seu carrinho está vazio.",
      };
    }

    const total = cartItems.reduce(
      (acc, item) =>
        acc +
        (item.preco - (item.preco * item.desconto) / 100) * item.quantidade,
      0,
    );

    const order = {
      id: Date.now(),
      customer: checkoutData,
      items: cartItems,
      total,
      createdAt: new Date().toISOString(),
    };

    setLastOrder(order);
    setCartItems([]);
    setIsCartOpen(false);

    return {
      success: true,
      order,
    };
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const isAdmin = user?.level === "ADMIN";
  const isLoggedIn = !!user;

  return (
    <BrowserRouter>
      <Header
        user={user}
        logout={logout}
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}
        openCart={openCart}
        cartItems={cartItems}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <CarrinhoOffCanvas
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        closeCart={closeCart}
        removeFromCart={removeFromCart}
        updateCart={updateCart}
        formatarMoeda={formatarMoeda}
      />
      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} searchTerm={searchTerm} />}
        />
        <Route path="/login" element={<Login login={login} />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Perfil user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/carrinho"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Carrinho
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateCart={updateCart}
                formatarMoeda={formatarMoeda}
                finalizePurchase={finalizePurchase}
                lastOrder={lastOrder}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              requiredLevel="ADMIN"
            >
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
