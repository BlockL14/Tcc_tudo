// Recusa ids que não sejam inteiros positivos (ex.: /produtos/abc) com 400,
// em vez de deixar o PostgreSQL falhar e a API responder 500.
const MAIOR_ID = 2147483647; // limite do tipo SERIAL/INTEGER

function validarId(req, res, next, valor) {
    if (!/^\d+$/.test(valor) || Number(valor) < 1 || Number(valor) > MAIOR_ID) {
        return res.status(400).json({ erro: "ID inválido" });
    }
    next();
}

module.exports = validarId;
