require("dotenv").config(); // Carregar variáveis de ambiente
const express = require("express");
const cors = require("cors");
const executeQuery = require("./lib/db"); // Importar a função do banco de dados

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());

app.get("/hits", async (req, res) => {
  try {
    const query = `
      SELECT COUNT(*) AS total
      FROM accesslog
    `;

    const results = await executeQuery({ query });

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Nenhum dado encontrado." });
    }

    res.status(200).json({ total: results[0].total });
  } catch (error) {
    console.error("Erro ao buscar a quantidade de acessos:", error);
    res.status(500).json({
      error: "Ocorreu um erro ao buscar a quantidade de acessos.",
    });
  }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
