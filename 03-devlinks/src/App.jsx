
import './App.css'
import Link from './assets/components/Link/Link';
import Perfil from './assets/components/Perfil/Perfil';
import SocialLink from './assets/components/SocialLink/SocialLink';
import Rodape from './assets/components/Rodape/Rodape';
import Switch from './assets/components/Switch/Switch';
import { useState } from 'react';


function App() {
const [isLight, setIsLight] = useState(true);

const troca = () => {
  setIsLight(!isLight);
}



  return (
   <div id= "App" className={isLight ? "light" : ""}>
 <Perfil fotoPerfil={"https://placehold.co/100"}>Natallie</Perfil>

<Switch troca={troca} isLight={isLight} />

<div id= "Link">
      <ul>
        <Link url={""}>Inscreva-se</Link>
        <Link url={""}>Minha Playlist</Link>
        <Link url={""}>Me pague um lanche</Link>
        <Link url={""}>Conheça o curso de DEV</Link>
      </ul>
      </div>

      <div id='SocialLinks'>
       <SocialLink url={"https://github.com"} icon = {"logo-github"} />
       <SocialLink url={"https://instagram.com"} icon = {"logo-instagram"} />
       <SocialLink url={"https://youtube.com"} icon = {"logo-youtube"} />
       <SocialLink url={"https://br.linkedin.com/"} icon = {"logo-linkedin"} />
       </div>

      <Rodape>Natallie</Rodape>
    </div>
  );
}

export default App;
