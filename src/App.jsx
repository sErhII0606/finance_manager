import PieChartComponent from "./components/PieChartComponent";
import Form from "./components/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SharedLayout from "./components/SharedLayout";
import Transactions from "./pages/Transactions";
import Error from "./pages/Error";
import Home from "./pages/Home";
import ProtectedRout from "./pages/ProtectedRout";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import CreditCards from "./pages/CreditCards";
import SingleCard from "./pages/SingleCard";
import SingleTransaction from "./pages/SingleTransaction";
import CashBalance from "./pages/CashBalance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRout>
              <SharedLayout />
            </ProtectedRout>
          }
        >
          <Route index element={<Home />} />
          <Route path="transactions" element={<Transactions />} />
          <Route
            path="transaction/:transactionId/info"
            element={<SingleTransaction />}
          />
          <Route path="creditCards" element={<CreditCards />} />
          <Route path="card/:cardId/info" element={<SingleCard />} />
        </Route>
        <Route path="user/cashBalance" element={<CashBalance />} />

        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
