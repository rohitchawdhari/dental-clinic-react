import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        {/* AI Chatbot (Har page par dikhega) */}
        <Chatbot />
        
      </div>
    </Router>
  );
}

export default App;