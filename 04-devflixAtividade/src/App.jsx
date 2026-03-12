import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import logo from "./assets/Gemini_Generated_Image_tyxns3tyxns3tyxn-removebg-preview.png";
import lupa from "./assets/search-heart-fill.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "pt";
  });
  const [theme, setTheme] = useState(() => {
    // Carrega o tema salvo ou usa o padrão do sistema
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef(null);

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  // Função para alternar o tema
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    setIsLanguageMenuOpen(false);
  };

  // Aplica o tema ao body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //Criando a conexão com a API e trazendo informações
  const searchMovies = useCallback(
    async (title) => {
      const response = await fetch(`${apiUrl}&s=${title}`);
      const data = await response.json();

      //Alimentando a variavel movies
      setMovies(data.Search);
    },
    [apiUrl],
  );

  useEffect(() => {
    const fetchInitialMovies = async () => {
      await searchMovies("Barbie"); // termo para pesquina ao carregar o site
    };
    fetchInitialMovies();
  }, [searchMovies]);

  const appTexts = {
    pt: {
      searchPlaceholder: "Pesquise por filmes",
      notFound: "😢 Filme não encontrado 😢",
    },
    en: {
      searchPlaceholder: "Search for movies",
      notFound: "😢 Movie not found 😢",
    },
    es: {
      searchPlaceholder: "Busca películas",
      notFound: "😢 Película no encontrada 😢",
    },
    fr: {
      searchPlaceholder: "Rechercher des films",
      notFound: "😢 Film introuvable 😢",
    },
    it: {
      searchPlaceholder: "Cerca film",
      notFound: "😢 Film non trovato 😢",
    },
    de: {
      searchPlaceholder: "Filme suchen",
      notFound: "😢 Film nicht gefunden 😢",
    },
    ja: {
      searchPlaceholder: "映画を検索",
      notFound: "😢 映画が見つかりません 😢",
    },
    ko: {
      searchPlaceholder: "영화 검색",
      notFound: "😢 영화를 찾을 수 없습니다 😢",
    },
    "zh-CN": {
      searchPlaceholder: "搜索电影",
      notFound: "😢 未找到电影 😢",
    },
    ru: {
      searchPlaceholder: "Искать фильмы",
      notFound: "😢 Фильм не найден 😢",
    },
    ar: {
      searchPlaceholder: "ابحث عن الأفلام",
      notFound: "😢 لم يتم العثور على الفيلم 😢",
    },
  };

  const languageOptions = [
    {
      value: "pt",
      label: "Português",
      countryCode: "pt",
      alt: "Bandeira de Portugal",
    },
    {
      value: "en",
      label: "English",
      countryCode: "gb",
      alt: "Bandeira do Reino Unido",
    },
    {
      value: "es",
      label: "Español",
      countryCode: "es",
      alt: "Bandeira da Espanha",
    },
    {
      value: "fr",
      label: "Français",
      countryCode: "fr",
      alt: "Bandeira da França",
    },
    {
      value: "it",
      label: "Italiano",
      countryCode: "it",
      alt: "Bandeira da Itália",
    },
    {
      value: "de",
      label: "Deutsch",
      countryCode: "de",
      alt: "Bandeira da Alemanha",
    },
    {
      value: "ja",
      label: "日本語",
      countryCode: "jp",
      alt: "Bandeira do Japão",
    },
    {
      value: "ko",
      label: "한국어",
      countryCode: "kr",
      alt: "Bandeira da Coreia do Sul",
    },
    {
      value: "zh-CN",
      label: "中文 (简体)",
      countryCode: "cn",
      alt: "Bandeira da China",
    },
    {
      value: "ru",
      label: "Русский",
      countryCode: "ru",
      alt: "Bandeira da Rússia",
    },
    {
      value: "ar",
      label: "العربية",
      countryCode: "ae",
      alt: "Bandeira dos Emirados Árabes Unidos",
    },
  ];

  const getFlagUrl = (countryCode) =>
    `https://flagcdn.com/w40/${countryCode}.png`;

  const currentLanguageOption =
    languageOptions.find((option) => option.value === language) ||
    languageOptions[0];

  const currentTexts = appTexts[language] || appTexts.pt;
  const darkLogoPath =
    "/Gemini_Generated_Image_mort8pmort8pmort-removebg-preview.png";

  return (
    <div id="App">
      <div className="controls-top-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Alternar tema"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <div className="language-dropdown" ref={languageMenuRef}>
          <button
            className="language-select"
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            title="Selecionar idioma"
            type="button"
          >
            <img
              className="language-flag"
              src={getFlagUrl(currentLanguageOption.countryCode)}
              alt={currentLanguageOption.alt}
            />
            <span>{currentLanguageOption.label}</span>
          </button>

          {isLanguageMenuOpen && (
            <ul className="language-menu">
              {languageOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className="language-menu-item"
                    onClick={() => handleLanguageChange(option.value)}
                  >
                    <img
                      className="language-flag"
                      src={getFlagUrl(option.countryCode)}
                      alt={option.alt}
                    />
                    <span>{option.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <img
        id="Logo"
        src={theme === "dark" ? darkLogoPath : logo}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = logo;
        }}
        alt="Logotipo do serviço de streaming Natflix, com letras rosa e fundo branco, promovendo conteúdo de séries, filmes e entretenimento online."
      />

      <div className="search">
        <input
          onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder={currentTexts.searchPlaceholder}
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
            <MovieCard
              key={index}
              {...movie}
              apiUrl={apiUrl}
              selectedLanguage={language}
            />
          ))}
        </div>
      ) : (
        <h2 className="empty">{currentTexts.notFound}</h2>
      )}

      <Rodape link={"https://github.com/NatallieAmadeu22"}>Natallie</Rodape>
    </div>
  );
};

export default App;
