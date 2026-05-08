import "../styles/GameModal.css";

export default function GameModal({ game, onClose }) {
  if (!game) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <img className="modal-image" src={game.image} alt={game.title} />

        <h2>{game.title}</h2>

        <div className="modal-info">
          <p>
            <strong>Classificação:</strong> {game.classification}
          </p>
          <p>
            <strong>Gênero:</strong> {game.genre}
          </p>
          <p>
            <strong>Requisitos:</strong> {game.requirements}
          </p>
        </div>
      </div>
    </div>
  );
}
