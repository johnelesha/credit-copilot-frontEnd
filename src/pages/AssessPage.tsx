import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { assessApplication } from "../api/assess";
import type { AssessmentResult } from "../types";
import ResultSummary from "../components/assess/ResultSummary";
import RulesTable from "../components/assess/RulesTable";
import StepsTimeline from "../components/assess/StepsTimeline";
import ApprovalActions from "../components/approval/ApprovalActions";

export default function AssessPage() {
    const { token, user, logout } = useAuth();
    const [applicationId, setApplicationId] = useState("APP-001");
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);

    async function onAssess() {
        if (!token) return;
        setLoading(true);
        setError("");
        setInfo("");
        setResult(null);
        try {
            const data = await assessApplication(applicationId.trim(), token);
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Assess failed");
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
                        <Link to="/ask" className="underline">
                            Ask
                        </Link>
                        <span>
                            {user?.username} ({user?.role})
                        </span>
                        <button onClick={logout} className="underline cursor-pointer">
                            Logout
                        </button>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto p-4 space-y-6">
                    <section className="bg-white border rounded-xl p-4 space-y-3">
                        <h1 className="text-xl font-semibold">Assess application</h1>
                        <div className="flex flex-wrap gap-2">
                            <input
                                className="border rounded-lg px-3 py-2 text-sm min-w-40"
                                value={applicationId}
                                onChange={(e) => setApplicationId(e.target.value)}
                                placeholder="APP-001"
                            />
                            <button
                                onClick={onAssess}
                                disabled={loading}
                                className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm disabled:opacity-60 cursor-pointer"
                            >
                                {loading ? "Running…" : "Run assessment"}
                            </button>
                        </div>
                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 rounded p-2">
                                {error}
                            </div>
                        )}
                        {info && (
                            <div className="text-sm text-green-700 bg-green-50 rounded p-2">
                                {info}
                            </div>
                        )}
                    </section>

                    {result && (
                        <>
                            <section className="space-y-2">
                                <h2 className="font-medium">Summary</h2>
                                <ResultSummary result={result} />
                            </section>

                            <section className="space-y-2">
                                <h2 className="font-medium">Rules</h2>
                                <RulesTable rules={result.ruleResults} />
                            </section>

                            <section className="space-y-2">
                                <h2 className="font-medium">Pipeline steps</h2>
                                <div className="bg-white border rounded-lg p-4">
                                    <StepsTimeline steps={result.steps} />
                                </div>
                            </section>

                            {result.memo && (
                                <section className="space-y-2">
                                    <h2 className="font-medium">Memo</h2>
                                    <pre className="bg-white border rounded-lg p-4 text-xs whitespace-pre-wrap">
                                        {result.memo}
                                    </pre>
                                </section>
                            )}

                            <ApprovalActions
                                runId={result.runId}
                                status={result.status}
                                onDone={(msg) => {
                                    setInfo(msg);
                                    setResult({
                                        ...result,
                                        status: msg.toLowerCase().includes("reject")
                                            ? "rejected"
                                            : "approved",
                                    });
                                }}
                            />
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
