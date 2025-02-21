const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const FILE_PATH = "./games.json";

// Função para garantir que o arquivo existe antes de ler ou escrever
function ensureFileExists(){
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
  }
};

// Função para ler o arquivo JSON
function readGames(){
  ensureFileExists();
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

// Função para escrever no arquivo JSON
function writeGames(games){
  ensureFileExists();
  fs.writeFileSync(FILE_PATH, JSON.stringify(games, null, 2));
};

// Rota para listar todos os jogos
app.get("/games", (req, res) => {
  res.json(readGames());
});

// Rota para buscar um jogo por ID
app.get("/games/:id", (req, res) => {
  const games = readGames();
  const game = games.find((g) => g.id === parseInt(req.params.id));
  if (!game) return res.status(404).json({ error: "Jogo não encontrado" });
  res.json(game);
});

// Rota para adicionar um novo jogo
app.post("/games", (req, res) => {
  const games = readGames();
  const newGame = {
    id: games.length ? games[games.length - 1].id + 1 : 1,
    title: req.body.title,
    genre: req.body.genre,
    price: req.body.price,
  };
  games.push(newGame);
  writeGames(games);
  res.status(201).json(newGame);
});

// Rota para atualizar um jogo
app.put("/games/:id", (req, res) => {
  let games = readGames();
  const index = games.findIndex((g) => g.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Jogo não encontrado" });

  games[index] = { ...games[index], ...req.body };
  writeGames(games);
  res.json(games[index]);
});

// Rota para deletar um jogo
app.delete("/games/:id", (req, res) => {
  let games = readGames();
  const newGames = games.filter((g) => g.id !== parseInt(req.params.id));
  if (newGames.length === games.length) return res.status(404).json({ error: "Jogo não encontrado" });

  writeGames(newGames);
  res.json({ message: "Jogo removido com sucesso" });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
