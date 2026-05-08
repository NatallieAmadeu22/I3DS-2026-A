export default function GameCard({ game, onClick, onAddCarrinho }) {
  const handleAdd = (event) => {
    event.stopPropagation();
    onAddCarrinho?.(game);
  };

  return (
    <div className="game-card game-card-clickable" onClick={onClick}>
      <img src={game.image} alt={game.title} />

      <div className="game-info">
        <h2>{game.title}</h2>
        <p>{game.genre ?? game.category}</p>

        <strong>{game.price}</strong>
      </div>

      <button type="button" onClick={handleAdd}>
        Adicionar ao carrinho
      </button>
    </div>
  );
}
