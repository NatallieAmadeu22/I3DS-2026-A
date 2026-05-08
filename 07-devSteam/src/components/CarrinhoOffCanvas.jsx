import { useNavigate } from "react-router-dom";

export default function CarrinhoOffCanvas({
  cartItems,
  isCartOpen,
  closeCart,
  removeFromCart,
  updateCart,
  formatarMoeda,
}) {
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) =>
      acc + (item.preco - (item.preco * item.desconto) / 100) * item.quantidade,
    0,
  );

  const goToCheckout = () => {
    closeCart();
    navigate("/carrinho");
  };

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="carrinho-overlay" onClick={closeCart}>
      <aside
        id="carrinhoOffCanvas"
        className="carrinho-drawer"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="carrinho-header">
          <h5>Carrinho</h5>
          <button type="button" className="carrinho-close" onClick={closeCart}>
            ×
          </button>
        </div>

        <div className="carrinho-body">
          {cartItems.length === 0 ? (
            <p className="carrinho-empty">Seu carrinho está vazio.</p>
          ) : (
            <>
              <ul className="carrinho-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="carrinho-item">
                    <img src={item.imagem} alt={item.titulo} />

                    <div className="carrinho-item-info">
                      <div className="carrinho-item-top">
                        <h6>{item.titulo}</h6>
                        <button
                          type="button"
                          className="carrinho-trash"
                          onClick={() => removeFromCart(item)}
                        >
                          Excluir
                        </button>
                      </div>

                      <div className="carrinho-item-bottom">
                        <div className="carrinho-qty">
                          <button
                            type="button"
                            disabled={item.quantidade === 1}
                            onClick={() =>
                              updateCart(item, item.quantidade - 1)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantidade}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateCart(item, item.quantidade + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <div className="carrinho-precos">
                          <span className="preco-original">
                            {formatarMoeda(item.preco)}
                          </span>
                          <span className="preco-final">
                            {formatarMoeda(
                              item.preco - (item.preco * item.desconto) / 100,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <hr />

              <div className="carrinho-total">
                <strong>Total:</strong>
                <strong>{formatarMoeda(total)}</strong>
              </div>

              <button
                type="button"
                className="btn-checkout"
                onClick={goToCheckout}
              >
                Finalizar Compra
              </button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
