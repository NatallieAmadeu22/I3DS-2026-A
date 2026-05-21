# I3DS-2026-A — Coleção de projetos React + Vite

Este repositório reúne várias aplicações e exercícios em React usando Vite (e alguns templates). Cada pasta numerada contém um projeto independente com seu próprio `package.json` e instruções de execução.

**Visão Geral**

- Este repositório é uma coleção de projetos didáticos e templates React + Vite usados para estudos e atividades.

**Estrutura**

- `01-intro-react` — template mínimo React com Create React App/CRA (exemplo básico).
- `02-react-vite` — template React com Vite (JSX/React).
- `03-devlinks` — aplicação com componentes de links/perfil (exercício de componentes).
- `04-devflix`, `04-devflixAtividade`, `04-devflixTranslate` — variações de um projeto de catálogo de filmes (cartões, descrição, tradução).
- `05-react-router` — exemplo usando roteamento com React Router (páginas Home e Sobre).
- `06-devChat` — app com duas pastas: `client` (frontend React/Vite) e `server` (backend Node). Cliente e servidor rodam separadamente.
- `07-devSteam` — projeto maior (ex.: loja/jogo) com componentes reutilizáveis e páginas.

Repositório completo:

- Veja os projetos nas pastas listadas acima; cada uma contém um `README.md` próprio quando aplicável.

**Requisitos**

- Node.js (recomendo >= 16) e npm ou yarn instalados.

**Como executar qualquer projeto (guia geral)**

1. Abra o terminal e navegue até a pasta do projeto, por exemplo:

   `cd 02-react-vite`

2. Instale dependências:

   `npm install` ou `yarn`

3. Inicie o servidor de desenvolvimento (Vite):

   `npm run dev` ou `yarn dev`

4. Abra o navegador em `http://localhost:5173` (porta padrão do Vite) — verifique o terminal para a porta exata.

Observação: alguns projetos podem usar scripts diferentes (por exemplo `start` ou `serve`). Consulte o `package.json` de cada pasta.

**Execução específica: `06-devChat` (client + server)**

1. Cliente:

   `cd 06-devChat/client`
   `npm install`
   `npm run dev`

2. Servidor:

   `cd 06-devChat/server`
   `npm install`
   `npm start` (ou `node index.js` — verifique `package.json`)

O cliente se comunica com o servidor via API/WebSocket; verifique variáveis de ambiente ou portas nos arquivos de configuração.

**Dicas e boas práticas**

- Sempre checar `package.json` do projeto para scripts e dependências.
- Para rodar múltiplos projetos ao mesmo tempo, use terminais separados ou um gerenciador de monorepo (não incluído aqui).
- Use `npm run build` para gerar a versão de produção quando disponível.

**Contribuição**

- Abra uma issue descrevendo a sugestão ou correção.
- Faça um branch com alterações, crie PRs pequenos e explicativos.

**Licença**

- Adicione a licença desejada no repositório se for distribuir o conteúdo. Atualmente não há arquivo `LICENSE` incluído.

---

Se quiser, eu atualizo cada subpasta com um `README.md` individual detalhado (com comandos exatos e capturas de tela). Deseja que eu gere os READMEs por projeto agora ou prefira primeiro que eu verifique `package.json` de cada pasta e extraia scripts automaticamente?
