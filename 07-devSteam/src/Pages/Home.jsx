import { useState } from "react";
import PromoCard from "../components/PromoCard";
import GameCard from "../components/GameCard";
import GameModal from "../components/GameModal";
import Rodape from "../components/Rodape/Rodape";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const { addToCart, searchTerm } = useAuth();
  const promoGames = [
    {
      id: 1,
      title: "Roblox",
      classification: "Livre",
      genre: "Sandbox / Aventura",
      image: "/src/assets/channels4_profile.jpg",
      price: "R$99,90",
      desconto: 50,
      requirements: "Windows 10, 8 GB de RAM, processador dual-core",
    },

    {
      id: 2,
      title: "Hogwarts Legacy",
      classification: "12+",
      genre: "RPG / Ação",
      image: "/src/assets/Hogwarts_Legacy_capa.jpeg",
      price: "R$99,90",
      desconto: 50,
      requirements: "Windows 10, 16 GB de RAM, GTX 960 ou equivalente",
    },

    {
      id: 3,
      title: "Valorant",
      classification: "14+",
      genre: "Tiro em primeira pessoa",
      image: "/src/assets/The sims.avif",
      price: "R$99,90",
      desconto: 50,
      requirements: "Windows 10, 4 GB de RAM, placa de vídeo básica",
    },
  ];

  const otherGames = [
    {
      id: 4,
      title: "Minecraft",
      classification: "Livre",
      genre: "Ação / Estratégia",
      image: "/src/assets/Minecraft.webp",
      price: "R$99,90",
      desconto: 0,
      requirements: "Windows 10, 4 GB de RAM, qualquer placa dedicada",
    },

    {
      id: 5,
      title: "Resident Evil 2",
      classification: "18+",
      genre: "Terror / Ação",
      image: "/src/assets/Oxr3X0TU9BRhpgweQoq5AGgy.avif",
      price: "R$149,90",
      desconto: 0,
      requirements: "Windows 10, 8 GB de RAM, GTX 760 ou superior",
    },

    {
      id: 6,
      title: "GTA V",
      classification: "18+",
      genre: "Mundo aberto / Ação",
      image: "/src/assets/GTALogo.jpg",
      price: "R$149,90",
      desconto: 0,
      requirements: "Windows 10, 8 GB de RAM, GTX 660 ou equivalente",
    },

    {
      id: 7,
      title: "FIFA 2025",
      classification: "Livre",
      genre: "Esporte / Futebol",
      image:
        "/src/assets/7e17c704fdb79e5f57be69bb4d8fbc07dda7abb85336b705.avif",
      price: "R$99,90",
      desconto: 0,
      requirements: "Windows 10, 8 GB de RAM, placa de vídeo intermediária",
    },
  ];

  const [selectedGame, setSelectedGame] = useState(null);

  const parsePreco = (price) =>
    Number(price.replace("R$", "").replaceAll(".", "").replace(",", "."));

  const handleAddToCart = (game) => {
    addToCart({
      id: game.id,
      titulo: game.title,
      imagem: game.image,
      preco: parsePreco(game.price),
      desconto: game.desconto ?? 0,
    });
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredPromoGames = promoGames.filter((game) =>
    game.title.toLowerCase().includes(normalizedSearch),
  );

  const filteredOtherGames = otherGames.filter((game) =>
    game.title.toLowerCase().includes(normalizedSearch),
  );

  return (
    <div className="container">
      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />

      <section>
        <h1>PROMOÇÕES</h1>

        <div className="promo-grid">
          {filteredPromoGames.map((game) => (
            <PromoCard
              key={game.id}
              game={game}
              onClick={() => setSelectedGame(game)}
              onAddCarrinho={handleAddToCart}
            />
          ))}
        </div>
      </section>

      <section>
        <h1>OUTROS JOGOS</h1>

        <div className="games-list">
          {filteredOtherGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => setSelectedGame(game)}
              onAddCarrinho={handleAddToCart}
            />
          ))}
        </div>

        {normalizedSearch &&
          filteredPromoGames.length === 0 &&
          filteredOtherGames.length === 0 && (
            <p className="empty-search">Nenhum jogo encontrado.</p>
          )}
      </section>

      <Rodape />
    </div>
  );
}

export default Home;
