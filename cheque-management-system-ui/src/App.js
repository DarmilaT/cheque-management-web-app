import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Pages/NavBar";
import Home from "./Pages/Home";
import ChequeList from "./Pages/ChequeList";
import AddCheque from "./Pages/AddCheque";
import EditCheque from "./Pages/EditCheque";

function App() {
  return (
    <div className="bg-blue-gray-900 min-h-screen">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addCheque" element={<AddCheque />} />
          <Route path="/chequeList" element={<ChequeList />} />
          <Route path="/editCheque/:id" element={<EditCheque />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
