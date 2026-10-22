import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { Home } from "../views/Home";
import { Register } from "../views/Register";
import { Login } from "../views/Login";
import { Clubs } from "../views/Clubs";
import { OneClub } from "../views/OneClub";
import { Layout } from "../components/Layout";
import { Reservation } from "../views/Reservation";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:id" element={<OneClub />} />
          <Route
            path="/clubs/:id/reservation"
            element={
              <PrivateRoute>
                <Reservation />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { RouterApp };
