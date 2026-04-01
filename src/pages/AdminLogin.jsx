import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin", "true");
      navigate("/admin");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            Smile Dental
          </h1>
          <p className="text-gray-500">
            Admin Dashboard Login
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;