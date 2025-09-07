/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login", { phone, password });
      localStorage.setItem("token", res.data.token);
      navigate("/articles"); // ✅ redirection après connexion
    } catch (err) {
      alert("Téléphone ou mot de passe incorrect");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Connexion</button>
    </form>
  );
}*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [login, setLogin] = useState(""); // username ou téléphone
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/auth/login", { login, password });

      if (data.requires_otp) {
        alert("Téléphone non vérifié. Un OTP vous a été envoyé (dev: 1111).");
        return navigate("/verify-otp", { state: { user_id: data.user_id } });
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nom d’utilisateur ou téléphone" value={login} onChange={e => setLogin(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Se connecter</button>
    </form>
  );
}




/*User::create([
    'full_name' => 'fatou bob',
    'username' => 'fatoumata',
    'phone' => '781551171',
    'password' => Hash::make('fatoumata1234'),
]);*/
