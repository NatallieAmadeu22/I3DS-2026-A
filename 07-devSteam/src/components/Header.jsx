import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Header() {
  const { user, logout, isAdmin, isLoggedIn } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src="/src/assets/Captura de Tela 2026-05-07 às 14.07.06.png"
            alt="logo"
          />
          <h1>DevSteam</h1>
        </Link>
      </div>

      <input type="text" placeholder="Buscar" />

      <nav className="nav-menu">
        {!isLoggedIn ? (
          <Link to="/login" className="btn-login-header">
            Login
          </Link>
        ) : (
          <>
            <Link to="/carrinho" className="nav-link">
              <img src="/src/assets/cart-variant 1.png" alt="carrinho" />
            </Link>
            <Link to="/perfil" className="nav-link">
              {user?.nome}
            </Link>
            {isAdmin && (
              <Link to="/admin" className="nav-link admin-link">
                Admin
              </Link>
            )}
            <button onClick={logout} className="btn-logout">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
