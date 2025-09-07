/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    phone: "",
    password: "",
    password_confirmation: ""
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register", form);
      alert("Inscription réussie, entrez le code OTP (1111)");
      navigate("/verify-otp"); // redirection vers une page OTP
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="full_name" placeholder="Nom complet" onChange={handleChange} />
      <input name="username" placeholder="Nom d’utilisateur" onChange={handleChange} />
      <input name="phone" placeholder="Téléphone" onChange={handleChange} />
      <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
      <input type="password" name="password_confirmation" placeholder="Confirmer" onChange={handleChange} />
      <button type="submit">S’inscrire</button>
    </form>
  );
}*/


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/auth/register", form);
      alert("Inscription réussie ! Code OTP (dev: 1111)");
      navigate("/verify-otp", { state: { user_id: data.user_id } });
    } catch (err) {
      alert(err?.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="full_name" placeholder="Nom complet" onChange={handleChange} />
      <input name="username" placeholder="Nom d'utilisateur" onChange={handleChange} />
      <input name="phone" placeholder="Téléphone" onChange={handleChange} />
      <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} />
      <input name="password_confirmation" type="password" placeholder="Confirmer" onChange={handleChange} />
      <button type="submit">S'inscrire</button>
    </form>
  );
}
