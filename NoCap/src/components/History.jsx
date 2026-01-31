import { useState, useEffect } from "react";

function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState("");

    useEffect(() => {
        // Check if wallet is connected (this is a simple hack since we don't have a global state yet)
        // In a real app, we'd use a Context or Redux store.
        const checkConnection = async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    fetchHistory(accounts[0]);
                }
            }
        };
        checkConnection();
    }, []);

    const fetchHistory = async (wallet) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5001/get_history/${wallet}`);
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            }
        } catch (error) {
            console.error("Error fetching history:", error);
        }
        setLoading(false);
    };

    return (
        <div className="relative min-h-screen pt-24 pb-12 px-6">
            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-red-50 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,28,28,0.1),transparent)]" />
            </div>

            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-black mb-2">Analysis History</h1>
                        <p className="text-gray-400">Your past news verifications and analysis reports.</p>
                    </div>

                    {account ? (
                        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                            <span className="text-xs text-gray-500 block uppercase tracking-widest font-bold">Connected Wallet</span>
                            <span className="text-green-400 font-mono text-sm">{account.slice(0, 6)}...{account.slice(-4)}</span>
                        </div>
                    ) : (
                        <div className="bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-xl backdrop-blur-md">
                            <p className="text-red-400 font-medium">Please connect your wallet to view history.</p>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
                        <p className="text-gray-400">Retrieving your secure records...</p>
                    </div>
                ) : history.length > 0 ? (
                    <div className="grid gap-6">
                        {history.map((item, index) => (
                            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 transition-all group">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${item.prediction === "REAL" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                                                }`}>
                                                {item.prediction === "REAL" ? "✅ REAL" : "❌ FAKE"}
                                            </span>
                                            <span className="text-[10px] text-gray-500 font-mono">{new Date(item.timestamp).toLocaleString()}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-red-400 transition-colors">"{item.claim}"</h3>

                                        <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                                            <h4 className="text-[10px] text-red-400 font-bold uppercase tracking-widest mb-2">AI Reasoning Abstract:</h4>
                                            <p className="text-sm text-gray-300 line-clamp-2 italic">
                                                {item.reasoning}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="md:w-64 flex flex-col justify-between items-end border-l border-white/5 pl-6">
                                        <div className="text-right">
                                            <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Confidence Score</span>
                                            <span className={`text-lg font-bold ${item.confidence === 'High' ? 'text-green-400' : 'text-yellow-400'}`}>
                                                {item.confidence}
                                            </span>
                                        </div>

                                        <button className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white transition-all w-full">
                                            View Full Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : account ? (
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-20 text-center backdrop-blur-md">
                        <div className="mb-6 inline-flex p-4 bg-red-500/10 rounded-full border border-red-500/20">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">No Records Found</h2>
                        <p className="text-gray-400 max-w-sm mx-auto">You haven't analyzed any news yet. Start detecting misinformation to build your secure history.</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default History;
