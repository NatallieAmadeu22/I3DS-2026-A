import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Carrinho.css";

export default function Carrinho({
  cartItems,
  removeFromCart,
  updateCart,
  formatarMoeda,
  finalizePurchase,
  lastOrder,
}) {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState({
    nome: "",
    email: "",
    endereco: "",
    pagamento: "PIX",
  });
  const [feedback, setFeedback] = useState("");

  const total = cartItems.reduce(
    (acc, item) =>
      acc + (item.preco - (item.preco * item.desconto) / 100) * item.quantidade,
    0,
  );

  useEffect(() => {
    if (lastOrder) {
      setFeedback(
        `Compra finalizada com sucesso. Pedido #${lastOrder.id} criado para ${lastOrder.customer.nome}.`,
      );
      setCheckoutData({
        nome: "",
        email: "",
        endereco: "",
        pagamento: "PIX",
      });
    }
  }, [lastOrder]);

  const handleCheckoutSubmit = (event) => {
    event.preventDefault();

    if (!checkoutData.nome || !checkoutData.email || !checkoutData.endereco) {
      setFeedback("Preencha nome, email e endereço para finalizar a compra.");
      return;
    }

    const result = finalizePurchase(checkoutData);

    if (!result.success) {
      setFeedback(result.message);
      return;
    }

    setFeedback(
      `Compra concluída. Total: ${formatarMoeda(result.order.total)}.`,
    );
  };

  return (
    <div className="carrinho-container">
      <h1>Meu Carrinho</h1>
      {cartItems.length === 0 ? (
        <>
          <p className="empty-cart">Seu carrinho está vazio</p>
          {feedback && <p className="checkout-feedback">{feedback}</p>}
          {lastOrder && (
            <button
              type="button"
              className="btn-checkout secondary"
              onClick={() => navigate("/")}
            >
              Voltar para a loja
            </button>
          )}
        </>
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

          <form className="checkout-box" onSubmit={handleCheckoutSubmit}>
            <h2>Finalizar compra</h2>

            <div className="checkout-grid">
              <label>
                Nome completo
                <input
                  type="text"
                  value={checkoutData.nome}
                  onChange={(event) =>
                    setCheckoutData((current) => ({
                      ...current,
                      nome: event.target.value,
                    }))
                  }
                  placeholder="Seu nome"
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={checkoutData.email}
                  onChange={(event) =>
                    setCheckoutData((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="seu@email.com"
                  required
                />
              </label>

              <label className="checkout-full">
                Endereço de entrega
                <input
                  type="text"
                  value={checkoutData.endereco}
                  onChange={(event) =>
                    setCheckoutData((current) => ({
                      ...current,
                      endereco: event.target.value,
                    }))
                  }
                  placeholder="Rua, número, cidade"
                  required
                />
              </label>

              <label>
                Pagamento
                <select
                  value={checkoutData.pagamento}
                  onChange={(event) =>
                    setCheckoutData((current) => ({
                      ...current,
                      pagamento: event.target.value,
                    }))
                  }
                >
                  <option value="PIX">PIX</option>
                  <option value="Cartão">Cartão</option>
                  <option value="Boleto">Boleto</option>
                </select>
              </label>
            </div>

            <div className="carrinho-footer">
              <div className="total">
                <strong>Total:</strong>
                <span>{formatarMoeda(total)}</span>
              </div>
              <button type="submit" className="btn-checkout">
                Finalizar Compra
              </button>
            </div>

            {feedback && <p className="checkout-feedback">{feedback}</p>}
          </form>
        </>
      )}
    </div>
  );
}
