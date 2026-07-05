import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import About from "./pages/About";
import History from "./pages/History";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Login from "./pages/Login";
import Reach from "./pages/Reach";
import Signup from "./pages/Signup";
import Studio from "./pages/Studio";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

function App() {
  return (
    <AuthProvider>
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
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="payment-cancel" element={<PaymentCancel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
