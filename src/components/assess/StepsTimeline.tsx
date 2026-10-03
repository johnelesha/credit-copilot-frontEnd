import type { StepLog } from "../../types";

export default function StepsTimeline({ steps }: { steps: StepLog[] }) {
    return (
        <ol className="space-y-2 text-sm">
            {steps.map((s) => (
                <li key={`${s.step}-${s.name}`} className="flex gap-3">
                    <span className="font-mono text-slate-500 w-6">{s.step}.</span>
                    <div>
                        <div className="font-medium">
                            {s.name}{" "}
                            <span
                                className={
                                    s.status === "ok"
                                        ? "text-green-700"
                                        : s.status === "refer"
                                            ? "text-amber-700"
                                            : "text-red-700"
                                }
                            >
                                ({s.status})
                            </span>
                        </div>
                        {s.detail && <div className="text-slate-500">{s.detail}</div>}
                    </div>
                </li>
            ))}
        </ol>
    );
}
