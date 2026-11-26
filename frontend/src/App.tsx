import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ProvedorAutenticacao } from "./contexts/ProvedorAutenticacao";
import { RotaProtegida } from "./components/RotaProtegida";
import { LayoutPrincipal } from "./components/LayoutPrincipal";
import { Inicio } from "./modules/Inicio";
import { Flashcards } from "./modules/Flashcards";
import { Frases } from "./modules/Frases";
import { Login } from "./modules/Login";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ProvedorAutenticacao>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <RotaProtegida>
                <LayoutPrincipal />
              </RotaProtegida>
            }
          >
            <Route path="/" element={<Inicio />} />
            <Route path="/flashcards" element={<Navigate to="/flashcards/hiragana" replace />} />
            <Route path="/flashcards/hiragana" element={<Flashcards aba="hiragana" />} />
            <Route path="/flashcards/katakana" element={<Flashcards aba="katakana" />} />
            <Route path="/flashcards/kanji" element={<Flashcards aba="kanji" />} />
            <Route path="/flashcards/imagens" element={<Flashcards aba="imagens" />} />
            <Route path="/frases" element={<Frases />} />
            <Route path="/study" element={<Navigate to="/frases" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProvedorAutenticacao>
    </BrowserRouter>
  );
}

export default App;
