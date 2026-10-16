// Backend na Vercel: as chamadas a /api/... chegam aqui (ver "rewrites" no
// vercel.json) e seguem para a API Express de backend/, sem o prefixo /api.
// Ex.: /api/usuarios/login -> /usuarios/login
import app from "../backend/src/app.js";

export default function handler(req, res) {
  const caminho = req.url.replace(/^\/api/, "");
  req.url = caminho.startsWith("/") ? caminho : `/${caminho}`;
  return app(req, res);
}
