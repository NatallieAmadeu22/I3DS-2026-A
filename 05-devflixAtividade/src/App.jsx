import { useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/Gemini_Generated_Image_tyxns3tyxns3tyxn-removebg-preview.png";
import lupa from "./assets/search-heart-fill.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(() => {
    // Carrega o tema salvo ou usa o padrão do sistema
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  // Função para alternar o tema
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Aplica o tema ao body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  //Criando a conexão com a API e trazendo informações
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    //Alimentando a variavel movies
    setMovies(data.Search);
  };

  useEffect(() => {
    const fetchInitialMovies = async () => {
      await searchMovies("Barbie"); // termo para pesquina ao carregar o site
    };
    fetchInitialMovies();
  }, []);

  return (
    <div id="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        title="Alternar tema"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <img
        id="Logo"
        src={logo}
        alt="Logotipo do serviço de streaming Natflix, com letras rosa e fundo branco, promovendo conteúdo de séries, filmes e entretenimento online."
      />

      <div className="search">
        <input
          onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Pesquise por filmes"
        />
        <img
          onClick={() => searchMovies(search)}
          src={lupa}
          alt="Botão de ação para pesquisa!"
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} {...movie} apiUrl={apiUrl} />
          ))}
        </div>
      ) : (
        <h2 className="empty">😢 Filme não encontrado 😢</h2>
      )}

      <Rodape link={"https://github.com/NatallieAmadeu22"}>Natallie</Rodape>
    </div>
  );
};

export default App;
