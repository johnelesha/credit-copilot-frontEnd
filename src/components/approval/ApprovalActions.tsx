import { useState } from "react";
import { approveAssessment, rejectAssessment } from "../../api/approval";
import { useAuth } from "../../context/useAuth";

interface Props {
    runId: string;
    status: string;
    onDone: (message: string) => void;
}

export default function ApprovalActions({ runId, status, onDone }: Props) {
    const { token, user } = useAuth();
    const [comment, setComment] = useState("Customer requested cancellation");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const canDecide =
        status === "pending_approval" &&
        (user?.role === "credit_officer" || user?.role === "senior_credit_officer");

    if (!canDecide || !token) return null;

    async function onApprove() {
        setLoading(true);
        setError("");
        try {
            const res = await approveAssessment(runId, token!);
            onDone(res.message);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Approve failed");
        } finally {
            setLoading(false);
        }
    }

    async function onReject() {
        setLoading(true);
        setError("");
        try {
            const res = await rejectAssessment(runId, token!, comment);
            onDone(res.message);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Reject failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="space-y-3 border rounded-lg p-4 bg-white">
                <h3 className="font-medium">Approval</h3>
                {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                        {error}
                    </div>
                )}
                <div className="flex flex-wrap gap-2">
                    <button
                        disabled={loading}
                        onClick={onApprove}
                        className="px-4 py-2 rounded-lg bg-green-700 text-white text-sm disabled:opacity-60 cursor-pointer"
                    >
                        Approve
                    </button>
                    <button
                        disabled={loading}
                        onClick={onReject}
                        className="px-4 py-2 rounded-lg bg-red-700 text-white text-sm disabled:opacity-60 cursor-pointer"
                    >
                        Reject
                    </button>
                </div>
                <input
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Reject comment"
                />
            </div>
        </>
    );
}
