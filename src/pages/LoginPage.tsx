import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("credit_officer");
    const [password, setPassword] = useState("credit123");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(username, password);
            navigate("/assess");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
                <form
                    onSubmit={onSubmit}
                    className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4"
                >
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Credit Copilot Lite
                    </h1>
                    <p className="text-sm text-slate-500">
                        Sign in to assess applications
                    </p>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 rounded p-2">
                            {error}
                        </div>
                    )}

                    <label className="block text-sm">
                        <span className="text-slate-600">Username</span>
                        <input
                            className="mt-1 w-full border rounded-lg px-3 py-2"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>

                    <label className="block text-sm">
                        <span className="text-slate-600">Password</span>
                        <input
                            type="password"
                            className="mt-1 w-full border rounded-lg px-3 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-800 text-white rounded-lg py-2 hover:bg-slate-700 disabled:opacity-60 cursor-pointer"
                    >
                        {loading ? "Signing in…" : "Sign in"}
                    </button>

                    <p className="text-xs text-slate-400">
                        Demo: credit_officer / credit123 · senior_officer / senior123
                    </p>
                </form>
            </div>
        </>
    );
}
