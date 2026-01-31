import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import Detect from "./components/Detect.jsx";
import Features from "./components/Features.jsx";
import Report from "./components/Report.jsx";
import History from "./components/History.jsx";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="/features" element={<Features />} />
        <Route path="/report" element={<Report />} />
        <Route path="/history" element={<History />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
