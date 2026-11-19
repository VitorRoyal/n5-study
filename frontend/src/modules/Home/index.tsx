import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Card } from "../../components/Card";
import { LogoutButton } from "../../components/LogoutButton";
import { PageWrapper, ContentArea, Title, Subtitle } from "../../styles/GlobalStyles";
import { CardsRow, Eyebrow } from "./style";

export function Home() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Navbar title="N5 Study" right={<LogoutButton />} />
      <ContentArea>
        <Eyebrow>Preparação JLPT</Eyebrow>
        <Title>Escolha como quer estudar hoje</Title>
        <Subtitle>Flashcards para memorização rápida ou a área de estudo livre.</Subtitle>
        <CardsRow>
          <Card
            stamp="字"
            title="Flashcards"
            description="Katakana, Hiragana e Kanjis para revisão rápida."
            onClick={() => navigate("/flashcards")}
          />
          <Card
            stamp="学"
            title="Estudo"
            description="Área de estudo livre para o conteúdo do N5."
            onClick={() => navigate("/study")}
          />
        </CardsRow>
      </ContentArea>
    </PageWrapper>
  );
}
