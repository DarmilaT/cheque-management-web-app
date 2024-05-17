import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ChequeList from "./components/ChequeList";
import AddCheque from "./components/AddCheque";
import EditCheque from "./components/EditCheque";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addCheque" element={<AddCheque />} />
        <Route path="/chequeList" element={<ChequeList />} />
        <Route path="/editCheque/:id" element={<EditCheque/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
