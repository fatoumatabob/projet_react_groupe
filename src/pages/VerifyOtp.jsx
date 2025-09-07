import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyOtp() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state?.user_id;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/verify-otp", { user_id, code });
      alert("Téléphone vérifié !");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Code OTP invalide");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Code OTP"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button type="submit">Vérifier</button>
    </form>
  );
}
