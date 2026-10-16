// Entrada do backend na Vercel: tudo o que começa com /api chega aqui (veja vercel.json).
// As rotas do Express em backend/ não têm o /api (/usuarios, /produtos...),
// então o prefixo é tirado antes de repassar a requisição.
import app from "../backend/src/app.js";

export default function handler(req, res) {
  const caminho = req.url.replace(/^\/api/, "");
  req.url = caminho.startsWith("/") ? caminho : `/${caminho}`;
  return app(req, res);
}
