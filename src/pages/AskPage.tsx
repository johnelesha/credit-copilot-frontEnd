import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { askQuestion } from "../api/ask";
import type { AskResult } from "../types";
import CitationList from "../components/ask/CitationList";

export default function AskPage() {
    const { user, logout } = useAuth();
    const [question, setQuestion] = useState(
        "What is the maximum debt burden ratio?",
    );
    const [edition, setEdition] = useState<"CP-2024" | "CP-2025" | "">("CP-2025");
    const [result, setResult] = useState<AskResult | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function onAsk() {
        setLoading(true);
        setError("");
        setResult(null);
        try {
            const data = await askQuestion(
                question.trim(),
                edition === "" ? undefined : edition,
            );
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ask failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50">
                <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
                    <div className="font-semibold text-slate-800">
                        Credit Copilot Lite
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                        <Link to="/assess" className="underline cursor-pointer">
                            Assess
                        </Link>
                        <span>
                            {user?.username} ({user?.role})
                        </span>
                        <button onClick={logout} className="underline cursor-pointer">
                            Logout
                        </button>
                    </div>
                </header>

                <main className="max-w-3xl mx-auto p-4 space-y-6">
                    <section className="bg-white border rounded-xl p-4 space-y-3">
                        <h1 className="text-xl font-semibold">Ask policy question</h1>

                        <textarea
                            className="w-full border rounded-lg px-3 py-2 text-sm min-h-22.5"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />

                        <div className="flex flex-wrap gap-2 items-center">
                            <label className="text-sm text-slate-600">
                                Policy edition{" "}
                                <select
                                    className="ml-1 border rounded-lg px-2 py-1.5 text-sm cursor-pointer"
                                    value={edition}
                                    onChange={(e) =>
                                        setEdition(e.target.value as "CP-2024" | "CP-2025" | "")
                                    }
                                >
                                    <option value="">Any</option>
                                    <option value="CP-2024">CP-2024</option>
                                    <option value="CP-2025">CP-2025</option>
                                </select>
                            </label>

                            <button
                                onClick={onAsk}
                                disabled={loading || !question.trim()}
                                className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm cursor-pointer disabled:opacity-60"
                            >
                                {loading ? "Searching…" : "Ask"}
                            </button>
                        </div>

                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 rounded p-2">
                                {error}
                            </div>
                        )}
                    </section>

                    {result && (
                        <>
                            <section className="space-y-2">
                                <h2 className="font-medium">Answer</h2>
                                <div className="bg-white border rounded-lg p-4 text-sm whitespace-pre-wrap">
                                    {result.answer}
                                </div>
                                {result.reason && (
                                    <p className="text-xs text-amber-700">
                                        Reason:{" "}
                                        {result.reason === "no_chunk_above_threshold"
                                            ? "Not enough grounded evidence in the policy documents"
                                            : result.reason}
                                    </p>
                                )}
                            </section>

                            <section className="space-y-2">
                                <h2 className="font-medium">Citations</h2>
                                <CitationList citations={result.citations} />
                            </section>
                        </>
                    )}

                    <section className="text-xs text-slate-500 space-y-1">
                        <p>Try:</p>
                        <ul className="list-disc ml-5">
                            <li>What is the maximum debt burden ratio? (CP-2025)</li>
                            <li>
                                What is the bank policy on crypto-backed loans? → should refuse
                            </li>
                        </ul>
                    </section>
                </main>
            </div>
        </>
    );
}
