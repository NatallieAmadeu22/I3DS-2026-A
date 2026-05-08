import { useState } from "react";
import "../styles/AdminPanel.css";

export default function AdminPanel() {
  const [games, setGames] = useState(["Minecraft", "GTA V", "Valorant"]);

  const [newGame, setNewGame] = useState("");

  const handleAddGame = (e) => {
    e.preventDefault();

    if (newGame.trim()) {
      setGames([...games, newGame.trim()]);
      setNewGame("");
    }
  };

  const deleteGame = (title) => {
    setGames(games.filter((game) => game !== title));
  };

  return (
    <div className="admin-container">
      <h1>Painel Administrativo</h1>

      <div className="admin-section">
        <h2>Adicionar jogo</h2>
        <form onSubmit={handleAddGame} className="add-game-form">
          <input
            type="text"
            placeholder="Nome do jogo"
            value={newGame}
            onChange={(e) => setNewGame(e.target.value)}
            required
          />
          <button type="submit">Adicionar</button>
        </form>
      </div>

      <div className="admin-section">
        <h2>Jogos</h2>
        <ul className="games-list-admin">
          {games.map((game) => (
            <li key={game} className="game-item-admin">
              <span>{game}</span>
              <button onClick={() => deleteGame(game)} className="btn-delete">
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
