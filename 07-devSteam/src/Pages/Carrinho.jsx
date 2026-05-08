import { useAuth } from "../hooks/useAuth";
import "../styles/Carrinho.css";

export default function Carrinho() {
  const { cartItems, removeFromCart, updateCart, formatarMoeda } = useAuth();

  const total = cartItems.reduce(
    (acc, item) =>
      acc + (item.preco - (item.preco * item.desconto) / 100) * item.quantidade,
    0,
  );

  return (
    <div className="carrinho-container">
      <h1>Meu Carrinho</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Seu carrinho está vazio</p>
      ) : (
        <>
          <div className="carrinho-items">
            {cartItems.map((item) => (
              <div key={item.id} className="carrinho-item">
                <div className="item-info">
                  <h3>{item.titulo}</h3>
                  <p>{formatarMoeda(item.preco)}</p>
                </div>
                <div className="item-controls">
                  <input
                    type="number"
                    min="1"
                    value={item.quantidade}
                    onChange={(e) =>
                      updateCart(
                        item,
                        Math.max(1, parseInt(e.target.value) || 1),
                      )
                    }
                  />
                  <button
                    onClick={() => removeFromCart(item)}
                    className="btn-remove"
                  >
                    Remover
                  </button>
                </div>
                <p className="item-total">
                  {formatarMoeda(
                    (item.preco - (item.preco * item.desconto) / 100) *
                      item.quantidade,
                  )}
                </p>
              </div>
            ))}
          </div>
          <div className="carrinho-footer">
            <div className="total">
              <strong>Total:</strong>
              <span>{formatarMoeda(total)}</span>
            </div>
            <button className="btn-checkout">Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
}
