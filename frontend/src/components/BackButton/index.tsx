import { useNavigate } from "react-router-dom";
import { BackButtonBase } from "./style";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <BackButtonBase type="button" onClick={() => navigate("/")}>
      ← Voltar
    </BackButtonBase>
  );
}
