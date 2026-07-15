import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Home } from "./modules/Home";
import { Flashcards } from "./modules/Flashcards";
import { Study } from "./modules/Study";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/study" element={<Study />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
