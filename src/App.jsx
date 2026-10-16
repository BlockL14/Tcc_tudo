import { useState } from "react";
import InicioScreen from "./pages/Inicio";
import SignupForm from "./pages/Cadastro";
import LoginScreen from "./pages/Login";
import DashboardScreen from "./pages/Dashboard";

// Fluxo entre as telas:
// início (landing) -> cadastro <-> login -> dashboard -> sair (volta ao login)
function App() {
  const [tela, setTela] = useState("inicio");
  const [usuario, setUsuario] = useState(null);
  const [emailLogin, setEmailLogin] = useState("");

  function irParaLogin(email = "") {
    setEmailLogin(email);
    setTela("login");
  }

  function irParaCadastro() {
    setTela("cadastro");
  }

  function entrarNoSistema(dadosUsuario) {
    setUsuario(dadosUsuario);
    setTela("dashboard");
  }

  function sair() {
    setUsuario(null);
    irParaLogin();
  }

  if (tela === "dashboard" && usuario) {
    return <DashboardScreen usuario={usuario} onSair={sair} />;
  }

  if (tela === "login") {
    return (
      <LoginScreen
        emailInicial={emailLogin}
        onGoToSignup={irParaCadastro}
        onLogin={entrarNoSistema}
      />
    );
  }

  if (tela === "cadastro") {
    return <SignupForm onGoToLogin={irParaLogin} />;
  }

  return <InicioScreen onEntrar={() => irParaLogin()} onComecar={irParaCadastro} />;
}

export default App;