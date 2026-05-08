import { Link } from "react-router-dom";

function Header({
  user,
  logout,
  isAdmin,
  isLoggedIn,
  openCart,
  cartItems,
  searchTerm,
  setSearchTerm,
}) {

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

      <input
        type="text"
        placeholder="Buscar jogo"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <nav className="nav-menu">
        {!isLoggedIn ? (
          <Link to="/login" className="btn-login-header">
            Login
          </Link>
        ) : (
          <>
            <button
              type="button"
              className="nav-link nav-cart-button"
              onClick={openCart}
            >
              <img src="/src/assets/cart-variant 1.png" alt="carrinho" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </button>
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
