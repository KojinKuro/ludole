import { Container } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";

import AboutPage from "../../pages/AboutPage/AboutPage";
import AddGamePage from "../../pages/AddGamePage/AddGamePage";
import GamePage from "../../pages/GamePage/GamePage";
import MissingPage from "../../pages/MissingPage/MissingPage";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Container as="main" maxW="4xl" padding="15px">
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="/challenge/:date" element={<GamePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/addgame" element={<AddGamePage />} />
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </ErrorBoundary>
      </Container>
      <Footer />
    </>
  );
}

export default App;
