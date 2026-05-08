import { useState } from "react";
import "../styles/Carrinho.css";

export default function Carrinho() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Minecraft",
      price: 99.9,
      quantity: 1,
    },
    {
      id: 2,
      title: "GTA V",
      price: 149.9,
      quantity: 2,
    },
  ]);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  };

  return (
    <div className="carrinho-container">
      <h1>Meu Carrinho</h1>
      {items.length === 0 ? (
        <p className="empty-cart">Seu carrinho está vazio</p>
      ) : (
        <>
          <div className="carrinho-items">
            {items.map((item) => (
              <div key={item.id} className="carrinho-item">
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p>R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="item-controls">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="btn-remove"
                  >
                    Remover
                  </button>
                </div>
                <p className="item-total">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="carrinho-footer">
            <div className="total">
              <strong>Total:</strong>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <button className="btn-checkout">Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
}
