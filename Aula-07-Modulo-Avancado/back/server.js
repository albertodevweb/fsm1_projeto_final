const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const PORT = 4000;

// Listar todos os nomes
app.get("/nomes", async (req, res) => {
  try {
    const nomes = await prisma.teste_axios.findMany();
    res.json(nomes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar nomes" });
  }
});

// Adicionar um nome
app.post("/nomes", async (req, res) => {
  try {
    const { nome } = req.body;
    const novoNome = await prisma.teste_axios.create({
      data: { nome },
    });
    res.status(201).json(novoNome);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar nome" });
  }
});

// Editar um nome pelo ID
app.put("/nomes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    const nomeAtualizado = await prisma.teste_axios.update({
      where: { id },
      data: { nome },
    });

    res.json(nomeAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar nome" });
  }
});

// Excluir um nome pelo ID
app.delete("/nomes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.teste_axios.delete({ where: { id } });
    res.json({ message: "Nome excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir nome" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
