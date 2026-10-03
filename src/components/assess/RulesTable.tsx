import type { RuleResult } from "../../types";

export default function RulesTable({ rules }: { rules: RuleResult[] }) {
    return (
        <>
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-100 text-left">
                        <tr>
                            <th className="px-3 py-2">Rule</th>
                            <th className="px-3 py-2">Result</th>
                            <th className="px-3 py-2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rules.map((r) => (
                            <tr key={r.rule} className="border-t">
                                <td className="px-3 py-2">{r.rule}</td>
                                <td className="px-3 py-2">
                                    <span
                                        className={
                                            r.result === "pass"
                                                ? "text-green-700"
                                                : r.result === "refer"
                                                    ? "text-amber-700"
                                                    : "text-red-700"
                                        }
                                    >
                                        {r.result}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-slate-600">{r.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
