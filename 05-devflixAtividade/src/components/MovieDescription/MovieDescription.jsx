import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState({});
  const [translatedData, setTranslatedData] = useState({
    title: "",
    type: "",
    runtime: "",
    released: "",
    actors: "",
    genre: "",
    plot: "",
  });

  // Tradução via Google Translate API pública
  const translateText = async (text) => {
    if (!text || text === "N/A" || text.trim() === "") return text;

    try {
      if (props.selectedLanguage === "en") return text;

      const targetLanguage = props.selectedLanguage || "pt";
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();

      // Extrai a tradução do formato de resposta do Google
      let translated = "";
      if (data && data[0]) {
        data[0].forEach((item) => {
          if (item[0]) translated += item[0];
        });
      }

      return translated || text;
    } catch (error) {
      console.error("Erro na tradução:", error);
      return text;
    }
  };

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const response = await fetch(`${props.apiUrl}&i=${props.movieID}`);
        const data = await response.json();
        setMovieDesc(data);
      } catch (error) {
        console.error("Erro ao carregar filme:", error);
      }
    };

    loadMovie();
  }, [props.apiUrl, props.movieID]);

  useEffect(() => {
    const translateAll = async () => {
      if (!movieDesc || Object.keys(movieDesc).length === 0) {
        setTranslatedData({
          title: "",
          type: "",
          runtime: "",
          released: "",
          actors: "",
          genre: "",
          plot: "",
        });
        return;
      }

      const [title, type, runtime, released, actors, genre, plot] =
        await Promise.all([
          translateText(movieDesc.Title),
          translateText(movieDesc.Type),
          translateText(movieDesc.Runtime),
          translateText(movieDesc.Released),
          translateText(movieDesc.Actors),
          translateText(movieDesc.Genre),
          translateText(movieDesc.Plot),
        ]);

      setTranslatedData({
        title,
        type,
        runtime,
        released,
        actors,
        genre,
        plot,
      });
    };

    translateAll();
  }, [movieDesc, props.selectedLanguage]);

  const labelsByLanguage = {
    pt: {
      watch: "▶️ Assistir",
      rating: "Avaliação",
      duration: "Duração",
      cast: "Elenco",
      genre: "Gênero",
      synopsis: "Sinopse",
      notAvailable: "Não disponível",
    },
    en: {
      watch: "▶️ Watch",
      rating: "Rating",
      duration: "Duration",
      cast: "Cast",
      genre: "Genre",
      synopsis: "Synopsis",
      notAvailable: "Not available",
    },
    es: {
      watch: "▶️ Ver",
      rating: "Valoración",
      duration: "Duración",
      cast: "Reparto",
      genre: "Género",
      synopsis: "Sinopsis",
      notAvailable: "No disponible",
    },
    fr: {
      watch: "▶️ Regarder",
      rating: "Note",
      duration: "Durée",
      cast: "Distribution",
      genre: "Genre",
      synopsis: "Synopsis",
      notAvailable: "Non disponible",
    },
    it: {
      watch: "▶️ Guarda",
      rating: "Valutazione",
      duration: "Durata",
      cast: "Cast",
      genre: "Genere",
      synopsis: "Sinossi",
      notAvailable: "Non disponibile",
    },
    de: {
      watch: "▶️ Ansehen",
      rating: "Bewertung",
      duration: "Dauer",
      cast: "Besetzung",
      genre: "Genre",
      synopsis: "Inhalt",
      notAvailable: "Nicht verfügbar",
    },
    ja: {
      watch: "▶️ 観る",
      rating: "評価",
      duration: "上映時間",
      cast: "キャスト",
      genre: "ジャンル",
      synopsis: "あらすじ",
      notAvailable: "利用できません",
    },
    ko: {
      watch: "▶️ 보기",
      rating: "평점",
      duration: "상영 시간",
      cast: "출연",
      genre: "장르",
      synopsis: "줄거리",
      notAvailable: "사용할 수 없음",
    },
    "zh-CN": {
      watch: "▶️ 观看",
      rating: "评分",
      duration: "时长",
      cast: "演员",
      genre: "类型",
      synopsis: "剧情简介",
      notAvailable: "不可用",
    },
    ru: {
      watch: "▶️ Смотреть",
      rating: "Рейтинг",
      duration: "Длительность",
      cast: "Актёры",
      genre: "Жанр",
      synopsis: "Сюжет",
      notAvailable: "Недоступно",
    },
    ar: {
      watch: "▶️ مشاهدة",
      rating: "التقييم",
      duration: "المدة",
      cast: "طاقم التمثيل",
      genre: "النوع",
      synopsis: "الملخص",
      notAvailable: "غير متاح",
    },
  };

  const labels =
    labelsByLanguage[props.selectedLanguage] || labelsByLanguage.pt;

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
              {translatedData.type || movieDesc.Type}
              <h1>{translatedData.title || movieDesc.Title}</h1>
              <a
                href={`https://google.com/search?q=${encodeURIComponent(movieDesc.Title)}`}
                target="_blank"
              >
                {labels.watch}
              </a>
            </div>
          </div>
        </div>
        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            {labels.rating}: {movieDesc.imdbRating} | {labels.duration}:{" "}
            {translatedData.runtime || movieDesc.Runtime} |{" "}
            {translatedData.released || movieDesc.Released}
          </div>
          <div className={styles.containerFlex}>
            <p>
              {labels.cast}: {translatedData.actors || movieDesc.Actors}
            </p>
            <p>
              {labels.genre}: {translatedData.genre || movieDesc.Genre}
            </p>
          </div>
        </div>
        <div className={styles.desc}>
          <p>
            {labels.synopsis}:{" "}
            {translatedData.plot || movieDesc.Plot || labels.notAvailable}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
