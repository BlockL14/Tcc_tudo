const express = require("express");
const cors = require("cors");

const pool = require("./database/connection");

const produtoRoutes = require("./routes/produtoRoutes");

const usuarioRoutes = require("./routes/usuarioRoutes");

const armazemRoutes = require("./routes/armazemRoutes");

const movimentacaoRoutes = require("./routes/movimentacaoRoutes");

const entregaRoutes = require("./routes/entregaRoutes");

const rastreamentoRoutes = require("./routes/rastreamentoRoutes");

const transportadoraRoutes = require("./routes/transportadoraRoutes");

const veiculoRoutes = require("./routes/veiculoRoutes");


const app = express();

app.use(express.json());
app.use(cors());


app.use("/produtos", produtoRoutes);

app.use("/usuarios", usuarioRoutes);

app.use("/armazens", armazemRoutes);

app.use("/movimentacoes", movimentacaoRoutes);

app.use("/entregas", entregaRoutes);

app.use("/rastreamento", rastreamentoRoutes);

app.use("/transportadoras", transportadoraRoutes);

app.use("/veiculos", veiculoRoutes);

app.get("/", (req, res) => {
    res.json({ mensagem: "Sistema de Logística funcionando!" });
});

// Confere se a API alcança o banco e se as tabelas existem (útil depois do deploy).
app.get("/saude", async (req, res) => {
    if (!process.env.DATABASE_URL) {
        return res.status(500).json({ api: "ok", banco: "DATABASE_URL não configurada" });
    }

    try {
        const resultado = await pool.query("SELECT to_regclass('public.usuarios') AS tabela");

        if (!resultado.rows[0].tabela) {
            return res.status(500).json({
                api: "ok",
                banco: "conectado, mas sem tabelas: rode backend/sql/schema.sql"
            });
        }

        res.json({ api: "ok", banco: "conectado" });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ api: "ok", banco: "sem conexão", detalhe: erro.message });
    }
});

module.exports = app;