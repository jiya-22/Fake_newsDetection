import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  async function submit(e) {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch(apiUrl + "/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Login failed" });
        return;
      }

      // ✅ SUCCESS
      localStorage.setItem("isLoggedIn", "true");
      setMessage({ type: "success", text: "Login successful" });

      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (err) {
      setMessage({ type: "error", text: String(err) });
    }
  }

  return (
    <div>
      <h2>Sign In</h2>

      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && (
        <p style={{ color: message.type === "error" ? "red" : "green" }}>
          {message.text}
        </p>
      )}
    </div>
  );
}

export default SignIn;
