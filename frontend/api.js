// Comunicação das telas com o backend (pasta backend/).
// No npm run dev o backend roda à parte, na porta 3000; na Vercel ele responde
// no mesmo site, em /api. Em outro endereço, defina VITE_API_URL no arquivo frontend/.env.
const API_URL =
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:3000" : "/api");

async function enviar(caminho, corpo) {
  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo),
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
  }

  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    const erro = new Error(dados.erro || "Erro inesperado no servidor.");
    erro.status = resposta.status;
    throw erro;
  }
  return dados;
}

// O email do cadastro é gravado na coluna "login" da tabela usuarios.
export function cadastrarUsuario({ nome, cnpj, email, senha }) {
  return enviar("/usuarios", { login: email, senha, nome, cnpj });
}

export function entrar({ email, senha }) {
  return enviar("/usuarios/login", { login: email, senha });
}
