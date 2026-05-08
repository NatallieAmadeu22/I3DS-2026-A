import PromoCard from "../components/PromoCard";
import GameCard from "../components/GameCard";
import Rodape from "../components/Rodape/Rodape";

function Home() {
  const promoGames = [
    {
      id: 1,
      title: "Roblox",
      image: "/src/assets/channels4_profile.jpg",
      price: "R$99,90",
    },

    {
      id: 2,
      title: "Hogwarts Legacy",
      image: "/src/assets/Hogwarts_Legacy_capa.jpeg",
      price: "R$99,90",
    },

    {
      id: 3,
      title: "Valorant",
      image: "/src/assets/The sims.avif",
      price: "R$99,90",
    },
  ];

  const otherGames = [
    {
      id: 4,
      title: "Minecraft",
      category: "Ação, Estratégia",
      image: "/src/assets/Minecraft.webp",
      price: "R$99,90",
    },

    {
      id: 5,
      title: "Resident Evil 2",
      category: "Luta",
      image: "/src/assets/Oxr3X0TU9BRhpgweQoq5AGgy.avif",
      price: "R$149,90",
    },

    {
      id: 6,
      title: "GTA V",
      category: "RPG, Mundo Aberto",
      image: "/src/assets/GTALogo.jpg",
      price: "R$149,90",
    },

    {
      id: 7,
      title: "FIFA 2025",
      category: "Futebol",
      image:
        "/src/assets/7e17c704fdb79e5f57be69bb4d8fbc07dda7abb85336b705.avif",
      price: "R$99,90",
    },
  ];

  return (
    <div className="container">
      <section>
        <h1>PROMOÇÕES</h1>

        <div className="promo-grid">
          {promoGames.map((game) => (
            <PromoCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section>
        <h1>OUTROS JOGOS</h1>

        <div className="games-list">
          {otherGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <Rodape />
    </div>
  );
}

export default Home;
