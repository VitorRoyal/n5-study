import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { AuthProvider } from "./contexts/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/flashcards"
            element={
              <ProtectedRoute>
                <Flashcards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/study"
            element={
              <ProtectedRoute>
                <Study />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
