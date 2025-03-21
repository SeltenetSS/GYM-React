import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/AxiosInstance";

export default function SignUp({ role }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/Auth/register-${role}`, { name, email, password });
      navigate("/login?role=" + role);
    } catch (err) {
      setError("Qeydiyyat zamanı xəta baş verdi!");
    }
  };

  return (
    <div className="signup-container">
      <h2>{role === "admin" ? "Admin Qeydiyyatı" : "İstifadəçi Qeydiyyatı"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Ad:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Qeydiyyatdan keç</button>
      </form>
      <p>
        Artıq hesabınız var?{" "}
        <span className="link" onClick={() => navigate("/login?role=" + role)}>
          Daxil olun
        </span>
      </p>
    </div>
  );
}
