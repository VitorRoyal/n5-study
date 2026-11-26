import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { AuthProvider } from "./contexts/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LayoutPrincipal } from "./components/LayoutPrincipal";
import { Home } from "./modules/Home";
import { Flashcards } from "./modules/Flashcards";
import { Study } from "./modules/Study";
import { Login } from "./modules/Login";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <LayoutPrincipal />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/flashcards" element={<Navigate to="/flashcards/hiragana" replace />} />
            <Route path="/flashcards/hiragana" element={<Flashcards tab="hiragana" />} />
            <Route path="/flashcards/katakana" element={<Flashcards tab="katakana" />} />
            <Route path="/flashcards/kanji" element={<Flashcards tab="kanji" />} />
            <Route path="/flashcards/imagens" element={<Flashcards tab="images" />} />
            <Route path="/frases" element={<Study />} />
            <Route path="/study" element={<Navigate to="/frases" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
