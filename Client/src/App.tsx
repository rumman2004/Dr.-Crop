import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import About from "./pages/About";
import History from "./pages/History";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Reach from "./pages/Reach";
import Studio from "./pages/Studio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="studio" element={<Studio />} />
          <Route path="service" element={<Navigate to="/studio" replace />} />
          <Route path="history" element={<History />} />
          <Route path="about" element={<About />} />
          <Route path="journal" element={<Journal />} />
          <Route path="reach" element={<Reach />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
