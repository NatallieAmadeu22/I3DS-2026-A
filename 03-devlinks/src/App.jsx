
import './App.css'
import Link from './assets/components/Link/Link';
import Perfil from './assets/components/Perfil/Perfil';
import SocialLink from './assets/components/SocialLink/SocialLink';
import Rodape from './assets/components/Rodape/Rodape';


function App() {

  return (
   <div id= "App">
 <Perfil fotoPerfil={"https://placehold.co/100"}>Natallie</Perfil>


       <div className="switch">botão switch</div>

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
