import LogisticsHero from "../components/landing/LogisticsHero";
import VantagensSection from "../components/landing/Vantagens";
import ComoFuncionaSection from "../components/landing/ComoFunciona";
import PlanosSection from "../components/landing/Planos";
import FooterSection from "../components/landing/Footer";

// Página inicial (landing): as seções em sequência.
// "Entrar" leva ao login; "Começar agora" e "Escolher Plano" levam ao cadastro.
export default function InicioScreen({ onEntrar, onComecar }) {
  return (
    <>
      <LogisticsHero onEntrar={onEntrar} onComecar={onComecar} />
      <VantagensSection />
      <ComoFuncionaSection />
      <PlanosSection onEscolherPlano={onComecar} />
      <FooterSection />
    </>
  );
}
