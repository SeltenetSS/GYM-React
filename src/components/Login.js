import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../api/AxiosInstance";

const Login = ({ role, type }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post(`/Auth/login-${role}`, { email, password });
      localStorage.setItem("token", response.data.token);
      history.push(`/${role}-dashboard`);
    } catch (err) {
      setError("E-poçt və ya şifrə yanlışdır!");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      
      await API.post(`/Auth/register-${role}`, formData);
   
      history.push(`/login?role=${role}&type=signin`); 
    } catch (err) {
      setError("Qeydiyyat zamanı xəta baş verdi!");
    }
  };

  return (
    <div style={styles.container}>
      <h2>{type === "signup" ? "Qeydiyyat" : "Daxil ol"}</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={type === "signup" ? handleSignUp : handleLogin}>
        {type === "signup" && (
          <input
            type="text"
            placeholder="Adınız"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="E-poçt"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifrə"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{type === "signup" ? "Qeydiyyatdan keç" : "Daxil ol"}</button>
      </form>
      <p>
        {type === "signin" ? "Hesabınız yoxdur?" : "Artıq hesabınız var?"}{" "}
        <span
          style={styles.link}
          onClick={() =>
            history.push(`/login?role=${role}&type=${type === "signup" ? "signin" : "signup"}`)
          }
        >
          {type === "signin" ? "Qeydiyyatdan keçin" : "Daxil olun"}
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  error: { color: "red" },
  link: { color: "blue", cursor: "pointer" },
};

export default Login;
