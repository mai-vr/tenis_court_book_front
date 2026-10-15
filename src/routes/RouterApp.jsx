import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { Home } from "../views/Home";
import { Register } from "../views/Register";
import { Login } from "../views/Login";
import { Clubs } from "../views/Clubs";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clubs" element={<Clubs />} />
      </Routes>
    </BrowserRouter>
  );
};

export { RouterApp };
