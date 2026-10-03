import type { AssessmentResult } from "../../types";

export default function ResultSummary({
    result,
}: {
    result: AssessmentResult;
}) {
    const c = result.calculation;
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <Card label="Instalment" value={c.monthlyInstalment.toFixed(2)} />
                <Card label="DBR" value={`${(c.debtBurdenRatio * 100).toFixed(2)}%`} />
                <Card
                    label="Max eligible"
                    value={c.maximumEligibleAmount.toLocaleString()}
                />
                <Card label="Recommendation" value={result.recommendation} />
                <Card label="Policy" value={result.policyEdition} />
                <Card label="Status" value={result.status} />
                <Card label="Amount" value={result.recommendedAmount.toLocaleString()} />
                <Card label="Rate" value={`${c.annualRatePercent}%`} />
            </div>
        </>
    );
}

function Card({ label, value }: { label: string; value: string }) {
    return (
        <>
            <div className="bg-white border rounded-lg p-3">
                <div className="text-slate-500 text-xs">{label}</div>
                <div className="font-semibold text-slate-800 mt-1">{value}</div>
            </div>
        </>
    );
}
