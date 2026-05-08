import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CarrinhoOffCanvas from "./components/CarrinhoOffCanvas";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Perfil from "./Pages/Perfil";
import Carrinho from "./Pages/Carrinho";
import AdminPanel from "./Pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <CarrinhoOffCanvas />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/carrinho"
            element={
              <ProtectedRoute>
                <Carrinho />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredLevel="ADMIN">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
