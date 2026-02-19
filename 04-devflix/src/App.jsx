import "./App.css";

import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";
import Rodape from "./components/Rodape/Rodape";

const App = () => {
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

      <Rodape>Natallie </Rodape>
    </div>
  );
};

export default App;
