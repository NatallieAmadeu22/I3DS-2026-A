import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState({});
  const [translatedPlot, setTranslatedPlot] = useState("");

  // Tradução via Google Translate API pública (sem limites, 100% funcional)
  const translateText = async (text) => {
    if (!text || text === "N/A" || text.trim() === "") return text;

    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();

      // Extrai a tradução do formato de resposta do Google
      let translated = "";
      if (data && data[0]) {
        data[0].forEach((item) => {
          if (item[0]) translated += item[0];
        });
      }

      console.log("✅ Traduzido com sucesso!");
      return translated || text;
    } catch (error) {
      console.error("❌ Erro na tradução:", error);
      return text;
    }
  };

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const response = await fetch(`${props.apiUrl}&i=${props.movieID}`);
        const data = await response.json();
        setMovieDesc(data);

        // Traduz a sinopse
        if (data.Plot && data.Plot !== "N/A") {
          console.log("🔄 Traduzindo sinopse...");
          const translated = await translateText(data.Plot);
          setTranslatedPlot(translated);
        }
      } catch (error) {
        console.error("Erro ao carregar filme:", error);
      }
    };

    loadMovie();
  }, [props.apiUrl, props.movieID]);

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button className={styles.btnClose} onClick={props.click}>
            X
          </button>

          <div className={styles.movieType}>
            <div>
              <img src="/favicon.png" alt="" />
              {movieDesc.Type}
              <h1>{movieDesc.Title}</h1>
              <a
                href={`https://google.com/search?q=${encodeURIComponent(movieDesc.Title)}`}
                target="_blank"
              >
                ▶️ Assistir
              </a>
            </div>
          </div>
        </div>
        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            Avaliação: {movieDesc.imdbRating} | Duração: {movieDesc.Runtime} |{" "}
            {movieDesc.Released}
          </div>
          <div className={styles.containerFlex}>
            <p>Elenco: {movieDesc.Actors}</p>
            <p>Gênero: {movieDesc.Genre}</p>
          </div>
        </div>
        <div className={styles.desc}>
          <p>Sinopse: {translatedPlot || movieDesc.Plot || "Não disponível"}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
