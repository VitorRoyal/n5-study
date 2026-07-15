import { Navbar } from "../../components/Navbar";
import { BackButton } from "../../components/BackButton";
import { PageWrapper, ContentArea, Subtitle } from "../../styles/GlobalStyles";

export function Study() {
  return (
    <PageWrapper>
      <Navbar title="Estudo" left={<BackButton />} />
      <ContentArea>
        <Subtitle>Conteudo de estudo em construcao.</Subtitle>
      </ContentArea>
    </PageWrapper>
  );
}
