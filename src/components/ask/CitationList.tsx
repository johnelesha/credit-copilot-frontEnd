import type { Citation } from "../../types";

export default function CitationList({ citations }: { citations: Citation[] }) {
    if (!citations.length) {
        return <p className="text-sm text-slate-500">No citations.</p>;
    }

    return (
        <ul className="space-y-3">
            {citations.map((c, i) => (
                <li
                    key={`${c.sourceFile}-${i}`}
                    className="border rounded-lg p-3 bg-white text-sm"
                >
                    <div className="font-medium text-slate-800">
                        [{i + 1}] {c.sourceFile}
                        {c.clauseId ? ` · ${c.clauseId}` : ""}
                        {c.policyEdition ? ` · ${c.policyEdition}` : ""}
                    </div>
                    <p className="mt-1 text-slate-600 whitespace-pre-wrap">{c.snippet}</p>
                </li>
            ))}
        </ul>
    );
}
