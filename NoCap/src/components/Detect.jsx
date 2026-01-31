import { useState } from "react";
import WalletConnect from "./WalletConnect";

function Detect() {
  const [mode, setMode] = useState("article"); // article | url
  const [input, setInput] = useState("");
  const [textBody, setTextBody] = useState("");
  const [result, setResult] = useState("");
  const [account, setAccount] = useState("");

  const saveToHistory = async (data, wallet) => {
    if (!wallet || !data || data.status === "Loading..." || data.status === "ERROR") return;

    try {
      await fetch("http://localhost:5001/save_history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_wallet: wallet,
          claim: data.claim,
          prediction: data.prediction,
          status: data.status,
          evidence: data.evidence,
          reasoning: data.reasoning,
          confidence: data.confidence
        }),
      });
      console.log("History saved!");
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  const handlePredict = async () => {
    if (!input.trim() && !textBody.trim()) return;

    setResult({ status: "Loading..." });
    try {
      const response = await fetch("http://localhost:5001/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: input,
          text: textBody
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setResult(data);

      // Auto-save to history if wallet is connected
      if (account) {
        saveToHistory(data, account);
      }
    } catch (error) {
      console.error("Error predicting:", error);
      setResult({ status: "ERROR" });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20">

      {/* BACKGROUND IMAGE */}
      <img
        src="/public/detect.jpg"
        alt="news bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-4xl text-center px-6">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-7 drop-shadow-lg">
          Advanced AI Fact-Checker
        </h1>

        {/* TABS */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setMode("article")}
            className={`px-8 py-2 rounded-full border transition font-medium
    ${mode === "article"
                ? "bg-red-600 text-white border-red-600 shadow-lg"
                : "bg-white/10 text-white border-white/30 backdrop-blur-md hover:bg-white/20"
              }`}
          >
            Article/Text
          </button>

          <button
            onClick={() => setMode("url")}
            className={`px-8 py-2 rounded-full border transition font-medium
    ${mode === "url"
                ? "bg-red-600 text-white border-red-600 shadow-lg"
                : "bg-white/10 text-white border-white/30 backdrop-blur-md hover:bg-white/20"
              }`}
          >
            URL/Link
          </button>

        </div>

        {/* INPUT BAR */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex bg-white/90 rounded-xl overflow-hidden shadow-inner">
            <input
              type="text"
              placeholder={
                mode === "url"
                  ? "Paste tweet or news URL here..."
                  : "Enter news headline or claim..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-6 py-4 outline-none text-gray-800 placeholder-gray-500 bg-transparent"
            />
          </div>

          <div className="flex flex-col bg-white/90 rounded-xl overflow-hidden shadow-inner">
            <textarea
              placeholder="Paste the full text or additional context here (optional)..."
              value={textBody}
              onChange={(e) => setTextBody(e.target.value)}
              rows="4"
              className="flex-1 px-6 py-4 outline-none text-gray-800 placeholder-gray-500 bg-transparent resize-none"
            />
          </div>

          <button
            onClick={handlePredict}
            className="w-full md:w-auto px-12 py-4 bg-red-600 text-white font-bold hover:bg-red-700 rounded-xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 border border-red-500/50"
          >
            {result.status === "Loading..."
              ? (mode === "url" ? "Analyzing Web & Data..." : "Running Analysis...")
              : "Analyze Claim"}
          </button>
        </div>

        {/* RESULT */}
        {result.status && (
          <div className="mt-10 text-left max-w-3xl mx-auto backdrop-blur-xl bg-black/60 p-8 rounded-3xl border border-white/20 shadow-[0_0_50px_-12px_rgba(255,255,255,0.3)] text-white">
            {result.status === "Loading..." ? (
              <div className="py-10 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
                <p className="text-xl font-medium text-gray-300">Advanced AI is cross-referencing sources...</p>
              </div>
            ) : result.status === "ERROR" ? (
              <div className="text-center py-6">
                <span className="text-red-500 text-2xl font-bold">Analysis Failed</span>
                <p className="text-gray-400 mt-2">Could not connect to the fact-checking engine.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* CLAIM */}
                <div>
                  <h3 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-1">Claim:</h3>
                  <p className="text-lg font-medium leading-relaxed italic">{result.claim}</p>
                </div>

                <hr className="border-white/10" />

                {/* VERIFICATION */}
                <div className="flex items-center gap-4">
                  <h3 className="text-red-400 font-bold uppercase tracking-widest text-xs">Status:</h3>
                  <div className={`px-4 py-1 rounded-full font-bold text-sm ${result.prediction === "REAL" ? "bg-green-500/20 text-green-400 border border-green-500/50" :
                    "bg-red-500/20 text-red-500 border border-red-500/50"
                    }`}>
                    {result.prediction === "REAL" ? "✅ True" : "❌ False / Misleading"}
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-gray-400">Confidence:</span>
                    <span className={`text-xs font-bold ${result.confidence === "High" ? "text-green-400" : "text-yellow-400"
                      }`}>{result.confidence}</span>
                  </div>
                </div>

                {/* EVIDENCE */}
                <div>
                  <h3 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-3">Evidence:</h3>
                  <ul className="space-y-3">
                    {result.evidence.map((item, i) => (
                      <li key={i} className="text-sm text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* REASONING */}
                <div>
                  <h3 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-1">Reasoning:</h3>
                  <p className="text-sm text-gray-300 leading-relaxed bg-red-900/10 p-4 rounded-xl border border-red-900/30">
                    {result.reasoning}
                  </p>
                </div>

                {/* Signing Option (On-chain) */}
                {(result.prediction === "REAL" || result.prediction === "FAKE") && (
                  <div className="pt-4 border-t border-white/10 mt-6 overflow-hidden">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">On-Chain Verification:</p>
                    <WalletConnect onSign={(sig) => console.log("Signed:", sig)} onConnect={(acc) => setAccount(acc)} />
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-tighter">
                  <span>AI Analyst Ref ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  <span>Timestamp: {new Date().toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default Detect;
