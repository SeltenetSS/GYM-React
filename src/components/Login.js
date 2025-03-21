import { useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../api/AxiosInstance";

const Login = ({ role, type }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory(); // React Router v5 üçün

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = type === "signup" ? "/Auth/register-admin" : "/Auth/login-admin";
    const formData = new FormData();
    
    if (type === "signup") formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await API.post(endpoint, formData);
      if (type === "signin") {
        localStorage.setItem("token", response.data.token);
        history.push("/dashboard"); // Yeni səhifəyə keçid
      } else {
        history.push("/login?role=admin&type=signin"); // Qeydiyyatdan sonra giriş səhifəsinə yönləndir
      }
    } catch (err) {
      setError(type === "signup" ? "Qeydiyyat zamanı xəta baş verdi!" : "E-poçt və ya şifrə yanlışdır!");
    }
  };

  return (
    <div style={styles.container}>
      <h2>{type === "signup" ? "Qeydiyyat" : "Giriş"} - {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        {type === "signup" ? (
          <>
            Artıq hesabınız var?{" "}
            <span style={styles.link} onClick={() => history.push(`/login?role=${role}&type=signin`)}>
              Daxil olun
            </span>
          </>
        ) : (
          <>
            Hesabınız yoxdur?{" "}
            <span style={styles.link} onClick={() => history.push(`/login?role=${role}&type=signup`)}>
              Qeydiyyatdan keçin
            </span>
          </>
        )}
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
