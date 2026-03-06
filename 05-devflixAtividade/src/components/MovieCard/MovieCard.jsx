import { useEffect, useState } from "react";
import styles from "./MovieCard.module.css";
import MovieDescription from "../MovieDescription/MovieDescription";

const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translatedTitle, setTranslatedTitle] = useState(props.Title || "");
  const [translatedType, setTranslatedType] = useState(props.Type || "");
  // console.log(isModalOpen);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const translateText = async (text) => {
    if (!text || text === "N/A" || text.trim() === "") return text;

    try {
      if (props.selectedLanguage === "en") return text;

      const targetLanguage = props.selectedLanguage || "pt";
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();

      let translated = "";
      if (data && data[0]) {
        data[0].forEach((item) => {
          if (item[0]) translated += item[0];
        });
      }

      return translated || text;
    } catch (error) {
      console.error("Erro na tradução do card:", error);
      return text;
    }
  };

  useEffect(() => {
    const translateCardData = async () => {
      const [newTitle, newType] = await Promise.all([
        translateText(props.Title),
        translateText(props.Type),
      ]);

      setTranslatedTitle(newTitle || props.Title);
      setTranslatedType(newType || props.Type);
    };

    translateCardData();
  }, [props.Title, props.Type, props.selectedLanguage]);

  return (
    <>
      <div className={styles.movie} onClick={toggleModal}>
        <div>
          <p>{props.Year}</p>
        </div>

        <div>
          <img src={props.Poster} alt={translatedTitle || props.Title} />
        </div>

        <div>
          <span>{translatedType || props.Type}</span>
          <h3>{translatedTitle || props.Title}</h3>
        </div>
      </div>

      {isModalOpen && (
        <MovieDescription
          apiUrl={props.apiUrl}
          movieID={props.imdbID}
          selectedLanguage={props.selectedLanguage}
          click={toggleModal}
        />
      )}
    </>
  );
};

export default MovieCard;
