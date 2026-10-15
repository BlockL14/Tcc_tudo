import { useState } from "react";
import SignupForm from "./Cadastro";
import LoginScreen from "./login";

function App() {
  const [tela, setTela] = useState("cadastro");

  if (tela === "login") {
    return <LoginScreen onGoToSignup={() => setTela("cadastro")} />;
  }

  return <SignupForm onGoToLogin={() => setTela("login")} />;
}

export default App;