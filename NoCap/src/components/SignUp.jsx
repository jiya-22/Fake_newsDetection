import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  async function submit(e) {
    e.preventDefault();
    setMessage(null);
    const endpoint = mode === "signin" ? "/signin" : "/signup";
    try {
      const res = await fetch(apiUrl + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || JSON.stringify(data) });
        return;
      }
      setMessage({ type: "success", text: data.message || "OK" });
      // On sign in, navigate to home
      if (mode === "signin") {
        // simple client-side acknowledgment
        setTimeout(() => navigate("/"), 600);
      }
    } catch (err) {
      setMessage({ type: "error", text: String(err) });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{mode === "signin" ? "Sign In" : "Create account"}</h2>
          <div className="text-sm text-gray-500">
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="underline">
              {mode === "signin" ? "Create account" : "Have an account? Sign in"}
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-4 p-2 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={submit}>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 mb-3 w-full border rounded px-3 py-2" />

          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 mb-4 w-full border rounded px-3 py-2" />

          <button className="w-full bg-red-600 text-white py-2 rounded hover:opacity-95" type="submit">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4">This demo stores a hashed password in the backend DB. For production use HTTPS and a proper auth flow (JWT/sessions).</p>
      </div>
    </div>
  );
}

export default SignUp;