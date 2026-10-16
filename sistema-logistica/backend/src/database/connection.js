const { Pool, types } = require("pg");
require("dotenv").config();

// NUMERIC (preço, capacidade) chega como número, e não como texto "10.50".
types.setTypeParser(types.builtins.NUMERIC, (valor) => parseFloat(valor));
// DATE chega como "AAAA-MM-DD", sem virar data com fuso (evita mostrar o dia anterior).
types.setTypeParser(types.builtins.DATE, (valor) => valor);

// A Neon fornece essa string em "Connection Details" do painel.
// Formato: postgresql://usuario:senha@host/nome_do_banco?sslmode=require
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;
