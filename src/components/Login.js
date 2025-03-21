import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../api/AxiosInstance";

export default function Login({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post(`/Auth/login-${role}`, { email, password });
      localStorage.setItem("token", response.data.token);
      history.push(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (err) {
      setError("E-poçt və ya şifrə yanlışdır!");
    }
  };

  return (
    <div className="login-container">
      <h2>{role === "admin" ? "Admin Girişi" : "İstifadəçi Girişi"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Şifrə:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Daxil ol</button>
      </form>
      <p>
        Hesabınız yoxdur?{" "}
        <span className="link" onClick={() => history.push("/signup")}>
          Qeydiyyatdan keçin
        </span>
      </p>
    </div>
  );
}
