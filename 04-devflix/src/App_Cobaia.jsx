import { useState } from "react";
import "./App.css";

import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";
import Rodape from "./components/Rodape/Rodape";

const App = () => {
   const [filmes] = useState([
    {
      id: 1,
      titulo: "Série JavaScript",
      sinopse: "Aprenda JavaScript do zero",
      genero: "Educação",
      duracao: 120,
      imagem: ""
    },
    {
      id: 2,
      titulo: "React Avançado",
      sinopse: "Domine React em produção",
      genero: "Educação",
      duracao: 180,
      imagem: ""
    },
    {
      id: 3,
      titulo: "Web Design Moderno",
      sinopse: "Crie interfaces incríveis",
      genero: "Design",
      duracao: 90,
      imagem: ""
    }
  ]);

  return (
    <div id="App">
      <img
        id="logo"
        src={logo}
        alt="Logotipo do serviço de streaming DEVFLIX com letras vermelhas em fundo preto, representando uma plataforma de entretenimento digital."
      />

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes e séries..." />
        <img
          role="button"
          src={lupa}
          onClick={(e) => e.stopPropagation}
          alt="Botão de ação para pesquisa!"
        />
      </div>

{filmes.map((filme, index) => (

<div key={index}>
  <h2>{filme.titulo}</h2>
  <h3>{filme.duracao}</h3>
  <h4>{filme.sinopse}</h4>
  <br/>
  <br/>
  <br/>
</div>
))}

  <Rodape link={"https://github.com/NatallieAmadeu22"} > Natallie </Rodape>
    </div>
  );
};

export default App;
